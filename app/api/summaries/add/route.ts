// app/api/summaries/add/route.js
import { NextResponse } from 'next/server';
import Summary from '@/models/Summary';
import { broadcastNewSummary } from '../updates/route';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['meeting', 'date', 'duration', 'participants', 'summary', 'keyPoints', 'actionItems', 'sentiment'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create new summary in database
    const newSummary = new Summary(body);
    await newSummary.save();
    
    // Broadcast to all connected clients
    broadcastNewSummary(newSummary);
    
    return NextResponse.json(
      { message: 'Summary added successfully', summary: newSummary },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding summary:', error);
    return NextResponse.json(
      { error: 'Failed to add summary' },
      { status: 500 }
    );
  }
}