import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Meeting from '@/models/Meeting';
import { generateMeetingSummary } from '@/lib/ai/generateSummary';

// Utility → live meeting ends in 15 mins
function getEndTimeForLive(): Date {
  return new Date(Date.now() + 15 * 60 * 1000);
}

export async function GET() {
  try {
    await dbConnect();
    
    const meetings = await Meeting.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    // Auto-update expired meetings → mark as past (from Firebase version)
    const now = new Date();
    for (const meeting of meetings) {
      if (meeting.endTime && now > meeting.endTime && meeting.status !== 'past') {
        await Meeting.findByIdAndUpdate(meeting._id, { status: 'past' });
        meeting.status = 'past';
      }
    }

    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, transcript, duration, participants, status, email, startTime, endTime } = body;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    let finalStartTime: Date | null = null;
    let finalEndTime: Date | null = null;

    // Handle different meeting types (from Firebase version)
    if (status === 'scheduled') {
      if (!startTime || !endTime) {
        return NextResponse.json(
          { error: 'Scheduled meeting needs start and end time' },
          { status: 400 }
        );
      }
      finalStartTime = new Date(startTime);
      finalEndTime = new Date(endTime);
    } else if (status === 'live') {
      finalStartTime = new Date();
      finalEndTime = getEndTimeForLive();
    }

    // Generate AI summary if transcript is provided
    let aiSummary = { summary: '', keyPoints: [], actionItems: [], sentiment: 'neutral' };
    if (transcript) {
      aiSummary = await generateMeetingSummary(transcript, title);
    }

    // Create meeting in database
    const meetingData: any = {
      title,
      status: status || 'scheduled',
      host: email || 'unknown',
      date: new Date(),
      duration: duration || 60,
      participants: participants || 1,
      startTime: finalStartTime,
      endTime: finalEndTime
    };

    // Only include AI fields if transcript was provided
    if (transcript) {
      meetingData.transcript = transcript;
      meetingData.summary = aiSummary.summary;
      meetingData.keyPoints = aiSummary.keyPoints;
      meetingData.actionItems = aiSummary.actionItems;
      meetingData.sentiment = aiSummary.sentiment;
    }

    const meeting = await Meeting.create(meetingData);

    return NextResponse.json(
      { message: 'Meeting created successfully', meeting },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}