// app/api/meetings/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Meeting from '@/models/Meeting';

export async function GET() {
  try {
    await dbConnect();
    
    const meetings = await Meeting.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' }, 
      { status: 500 }
    );
  }
}

// app/api/meetings/route.ts (add POST method)
export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { title, transcript, duration, participants } = await request.json();
    
    if (!title || !transcript) {
      return NextResponse.json(
        { error: 'Title and transcript are required' },
        { status: 400 }
      );
    }

    // Generate AI summary
    const aiSummary = await generateMeetingSummary(transcript, title);
    
    // Create meeting in database
    const meeting = await Meeting.create({
      title,
      date: new Date(),
      duration: duration || 60,
      participants: participants || 1,
      transcript,
      summary: aiSummary.summary,
      keyPoints: aiSummary.keyPoints,
      actionItems: aiSummary.actionItems,
      sentiment: aiSummary.sentiment
    });

    return NextResponse.json(
      { message: 'Meeting summary created successfully', meeting },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating meeting summary:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting summary' },
      { status: 500 }
    );
  }
}