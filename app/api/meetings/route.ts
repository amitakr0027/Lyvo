import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function GET(req: NextRequest) {
  try {
    // Get user email from query param (frontend can send ?email=user@example.com)
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("email");
    if (!userEmail) return NextResponse.json({ error: "No user email provided" }, { status: 400 });

    const q = query(collection(db, "meetings"), where("host", "==", userEmail));
    const snapshot = await getDocs(q);
    const meetings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(meetings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

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

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
