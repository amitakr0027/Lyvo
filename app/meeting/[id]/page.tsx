"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Participant = { id: string; name: string; email?: string };

type Meeting = {
  id: string;
  title: string;
  code: string;
  host: { id: string; name?: string; email?: string };
  participants: Participant[];
  startsAt: string;
  endsAt?: string;
  status: string;
};

export default function SingleMeetingPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = "YOUR_USER_ID"; // replace with auth user id

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const res = await fetch(`/api/meetings?meetingId=${id}&userId=${userId}`);
        const data = await res.json();
        if (data.success && data.meetings.length > 0) {
          setMeeting(data.meetings[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeeting();
  }, [id]);

  const handleJoin = async () => {
    try {
      const res = await fetch("/api/meetings/join", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId: id, userId, name: "Guest" }),
      });
      const data = await res.json();
      if (data.success) alert("Joined meeting successfully!");
      else alert("Error: " + data.error);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading meeting...</div>;
  if (!meeting) return <div className="p-4 text-red-500">Meeting not found!</div>;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{meeting.title}</h1>
      <p><strong>Code:</strong> {meeting.code}</p>
      <p><strong>Status:</strong> {meeting.status}</p>
      <p><strong>Host:</strong> {meeting.host.name ?? meeting.host.email ?? "Unknown"}</p>
      <p><strong>Participants:</strong> {meeting.participants.map((p) => p.name).join(", ") || "None"}</p>
      <p><strong>Time:</strong> {new Date(meeting.startsAt).toLocaleString()} {meeting.endsAt ? "- " + new Date(meeting.endsAt).toLocaleString() : ""}</p>
      <Button onClick={handleJoin}>Join Meeting</Button>
    </div>
  );
}
