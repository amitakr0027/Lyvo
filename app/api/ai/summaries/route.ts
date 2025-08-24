import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SummaryModel from "@/lib/models/Summary";
import { generateMeetingSummary } from "@/lib/ai";
import ioClient from "socket.io-client";

export const runtime = "nodejs"; // ensure Node runtime for mongoose/OpenAI

export async function GET() {
  await connectDB();
  const docs = await SummaryModel.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ summaries: docs });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      meeting = "Untitled Meeting",
      meetingId = "",
      transcript = "",
      date = "Today",
      duration = "30 min",
      participants = 0,
      createdBy = "",
      streamRoom = "", // optional: meeting room for real-time
    } = body || {};

    // kick off socket connection if we want to stream progress
    const SOCKET_IO_URL = process.env.SOCKET_IO_URL || "http://localhost:4001";
    const socket = ioClient(SOCKET_IO_URL, { transports: ["websocket"] });

    // If streaming, join the room
    if (streamRoom) {
      socket.emit("join:meeting", streamRoom.replace("meeting:", ""));
    }

    // Generate with streaming tokens => forward to room as 'summary:token'
    const ai = await generateMeetingSummary({
      transcript,
      meetingTitle: meeting,
      onToken: (chunk) => {
        if (streamRoom) {
          socket.emit("summary:token", { room: streamRoom, chunk });
        }
      },
    });

    const doc = await SummaryModel.create({
      meeting,
      meetingId,
      date,
      duration,
      participants,
      summary: ai.summary,
      keyPoints: ai.keyPoints,
      actionItems: ai.actionItems,
      sentiment: ai.sentiment,
      transcript,
      createdBy,
    });

    // Tell listeners a new summary is available
    if (streamRoom) {
      socket.emit("summary:done", { room: streamRoom, summary: doc });
      // Also broadcast "summary:new" to a global room if you like
      socket.emit("summary:new", { summary: doc });
    }

    socket.close();

    return NextResponse.json({ ok: true, summary: doc }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/ai/summaries error", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed" }, { status: 500 });
  }
}
