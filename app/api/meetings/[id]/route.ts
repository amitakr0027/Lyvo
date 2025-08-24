// route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc, arrayRemove } from "firebase/firestore";

// GET: join meeting + fetch participants
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No meeting ID provided" }, { status: 400 });

    const userEmail = req.headers.get("X-User-Email") || `guest-${Date.now()}`;
    const userId = req.headers.get("X-User-Id") || userEmail;

    const docRef = doc(db, "meetings", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists())
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    // Add user to participants if not already present
    const meetingData = snapshot.data();
    const existingParticipants: any[] = meetingData?.participants || [];

    const isAlreadyJoined = existingParticipants.some((p) => p.id === userId);
    if (!isAlreadyJoined) {
      await updateDoc(docRef, {
        participants: arrayUnion({
          id: userId,
          email: userEmail,
          joinedAt: new Date().toISOString(),
          micOn: true,
          camOn: true,
        }),
      });
    }

    const updatedSnapshot = await getDoc(docRef);
    const updatedData = updatedSnapshot.data();

    return NextResponse.json({ id: updatedSnapshot.id, ...updatedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch meeting" }, { status: 500 });
  }
}

// DELETE: delete meeting
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No meeting ID provided" }, { status: 400 });

    const docRef = doc(db, "meetings", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists())
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    await deleteDoc(docRef);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}

// PATCH: remove participant (optional)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { userId } = await req.json();

    if (!id || !userId) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const docRef = doc(db, "meetings", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists())
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    await updateDoc(docRef, {
      participants: arrayRemove({ id: userId }), // remove participant by ID
    });

    const updatedSnapshot = await getDoc(docRef);
    const updatedData = updatedSnapshot.data();

    return NextResponse.json({ id: updatedSnapshot.id, ...updatedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to remove participant" }, { status: 500 });
  }
}
