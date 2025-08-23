import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore";

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

    // Add user to participants if not already
    await updateDoc(docRef, {
      participants: arrayUnion({
        id: userId,
        email: userEmail,
        joinedAt: new Date().toISOString(),
        micOn: true,
        camOn: true,
      }),
    });

    const meetingData = snapshot.data();
    return NextResponse.json({ id: snapshot.id, ...meetingData });
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
