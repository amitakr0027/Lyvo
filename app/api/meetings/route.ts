// app/api/meetings/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ---------------- GET: /api/meetings?userId=xxx ----------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing userId" },
        { status: 400 }
      );
    }

    const meetings = await prisma.meeting.findMany({
      where: {
        OR: [
          { hostId: userId },
          { participants: { some: { userId } } },
        ],
      },
      include: {
        host: true,
        participants: true,
      },
      orderBy: { startsAt: "asc" },
    });

    return NextResponse.json({ success: true, meetings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}

// ---------------- POST: /api/meetings ----------------
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title: string;
      startsAt: string;
      endsAt?: string;
      hostId: string;
    };

    const { title, startsAt, endsAt, hostId } = body;

    if (!title || !startsAt || !hostId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // generate 6-char unique meeting code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const meeting = await prisma.meeting.create({
      data: {
        title,
        hostId,
        code,
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : null,
      },
    });

    return NextResponse.json({
      success: true,
      meetingId: meeting.id,
      code: meeting.code,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}

// ---------------- PATCH: /api/meetings/join ----------------
export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      userId: string;
      meetingId: string;
      name?: string;
      email?: string;
    };

    const { userId, meetingId, name, email } = body;

    if (!meetingId || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing userId or meetingId" },
        { status: 400 }
      );
    }

    // check if already joined
    const existing = await prisma.participant.findFirst({
      where: { userId, meetingId },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: "Already joined" });
    }

    const participant = await prisma.participant.create({
      data: {
        userId,
        meetingId,
        name: name ?? "Guest",
        email: email ?? null,
        joinedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, participant });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to join meeting" },
      { status: 500 }
    );
  }
}
