// // app/api/summaries/route.js
// import { NextResponse } from 'next/server';

// // Connect to your database (example using MongoDB with Mongoose)
// import mongoose from 'mongoose';
// import Summary from '@/models/Summary';

// // Initialize connection
// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
//   await mongoose.connect(process.env.MONGODB_URI);
// };

// export async function GET() {
//   try {
//     await connectDB();
    
//     // Fetch summaries from database, sorted by date (newest first)
//     const summaries = await Summary.find({})
//       .sort({ createdAt: -1 })
//       .lean();
    
//     return NextResponse.json({ summaries });
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch summaries' }, 
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Summary from "@/models/Summary";
import { generateSummaryAI } from "@/lib/ai";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get("meetingId") || undefined;

  const q: any = {};
  if (meetingId) q.meetingId = meetingId;

  const data = await Summary.find(q).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  // 1) insert as pending (clients listening to SSE will see this immediately)
  const doc = await Summary.create({
    meetingId: body.meetingId,
    source: body.source || "manual",
    transcript: body.transcript,
    notes: body.notes,
    status: "pending",
  });

  try {
    // 2) run AI
    const ai = await generateSummaryAI({ transcript: body.transcript, notes: body.notes });

    // 3) update to ready
    doc.summary = ai.summary;
    doc.keyPoints = ai.keyPoints;
    doc.actionItems = ai.actionItems;
    doc.sentiment = ai.sentiment;
    doc.status = "ready";
    await doc.save();
  } catch (e) {
    doc.status = "failed";
    await doc.save();
  }

  return NextResponse.json({ ok: true, id: String(doc._id) });
}
