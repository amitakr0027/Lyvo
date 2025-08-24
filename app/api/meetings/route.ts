import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp, 
  Timestamp, 
  DocumentData, 
  updateDoc, 
  doc 
} from "firebase/firestore";
import { emitMeetingCreated } from "@/server/index";

// Meeting type
export interface Meeting {
  id: string;
  title: string;
  status: "scheduled" | "live" | "past";
  host: string;
  createdAt: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}

// Utility → live meeting ends in 15 mins
function getEndTimeForLive(): Date {
  return new Date(Date.now() + 15 * 60 * 1000);
}

// GET → return all meetings
export async function GET(req: NextRequest) {
  try {
    const snapshot = await getDocs(collection(db, "meetings"));
    const meetings: Meeting[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as DocumentData;

      const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;
      const startTime = data.startTime instanceof Timestamp ? data.startTime.toDate() : null;
      const endTime = data.endTime instanceof Timestamp ? data.endTime.toDate() : null;

      return {
        id: docSnap.id,
        title: data.title ?? "",
        status: (data.status as "scheduled" | "live" | "past") ?? "live",
        host: data.host ?? "",
        createdAt,
        startTime,
        endTime,
      };
    });

    // Auto-update expired → mark as past
    const now = new Date();
    for (const m of meetings) {
      if (m.endTime && now > m.endTime && m.status !== "past") {
        m.status = "past";
        // Persist in Firestore too ✅
        await updateDoc(doc(db, "meetings", m.id), { status: "past" });
      }
    }

    return NextResponse.json(meetings);
  } catch (err: unknown) {
    console.error("GET meetings error:", err);
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}

// POST → create new meeting
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      title: string;
      status: "scheduled" | "live";
      email: string;
      startTime?: string;
      endTime?: string;
    };

    const { title, status, email, startTime, endTime } = body;

    if (!email) {
      return NextResponse.json(
        { error: "No user email provided" },
        { status: 400 }
      );
    }

    let finalStartTime: Date | null = null;
    let finalEndTime: Date | null = null;

    if (status === "scheduled") {
      if (!startTime || !endTime) {
        return NextResponse.json(
          { error: "Scheduled meeting needs start and end time" },
          { status: 400 }
        );
      }
      finalStartTime = new Date(startTime);
      finalEndTime = new Date(endTime);
    } else if (status === "live") {
      finalStartTime = new Date();
      finalEndTime = getEndTimeForLive();
    }

    const docRef = await addDoc(collection(db, "meetings"), {
      title,
      status,
      host: email,
      createdAt: serverTimestamp(),
      startTime: finalStartTime ? Timestamp.fromDate(finalStartTime) : null,
      endTime: finalEndTime ? Timestamp.fromDate(finalEndTime) : null,
    });

    const meeting: Meeting = {
      id: docRef.id,
      title,
      status,
      host: email,
      createdAt: new Date(),
      startTime: finalStartTime,
      endTime: finalEndTime,
    };

    // Emit via socket
    emitMeetingCreated(meeting);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: unknown) {
    console.error("POST meetings error:", err);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}
