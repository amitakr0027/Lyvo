// app/api/meetings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { emitMeetingCreated } from "@/server/index"; // import helper

// GET → return all meetings
export async function GET(req: NextRequest) {
  try {
    const snapshot = await getDocs(collection(db, "meetings"));
    const meetings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(meetings);
  } catch (err) {
    console.error("GET meetings error:", err);
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

// POST → create new meeting + emit socket event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, status, email } = body;

    if (!email) return NextResponse.json({ error: "No user email provided" }, { status: 400 });

    const docRef = await addDoc(collection(db, "meetings"), {
      title,
      status,
      host: email,
      createdAt: serverTimestamp(),
    });

    // 🔥 Emit event to all connected clients
    emitMeetingCreated({
      id: docRef.id,
      title,
      status,
      host: email,
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("POST meetings error:", err);
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
