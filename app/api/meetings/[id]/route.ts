import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No meeting ID provided" }, { status: 400 });

    const docRef = doc(db, "meetings", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch meeting" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No meeting ID provided" }, { status: 400 });

    const docRef = doc(db, "meetings", id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}
