// app/api/summaries/updates/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for clients
const clients: Set<ReadableStreamDefaultController> = new Set();

export async function GET(request: NextRequest) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache, no-transform',
    'Access-Control-Allow-Origin': '*',
  });

  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);
      
      // Send connection message
      controller.enqueue(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
      
      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        clients.delete(controller);
      });
    },
    cancel() {
      clients.delete(this);
    }
  });

  return new Response(stream, { headers });
}

// Broadcast function
export function broadcastNewSummary(summary: any) {
  clients.forEach(controller => {
    try {
      controller.enqueue(`data: ${JSON.stringify(summary)}\n\n`);
    } catch (error) {
      console.error('Error sending to client:', error);
      clients.delete(controller);
    }
  });
}