"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Participant = {
  id: string;
  name: string;
};

type Meeting = {
  id: string;
  title: string;
  code: string;
  host: { name?: string; email?: string };
  participants: Participant[];
  startsAt: string;
  endsAt?: string;
  status: string;
};

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace this with actual logged-in user ID from auth
  const userId = "USER_ID_FROM_AUTH";

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch(`/api/meetings?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setMeetings(data.meetings);
        } else {
          console.error("Failed to fetch meetings:", data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2" />
        <span>Loading meetings...</span>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Meetings</h1>
        <Link href="/meetings/create">
          <Button>Create Meeting</Button>
        </Link>
      </div>

      {/* Empty state */}
      {meetings.length === 0 && (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-300 rounded-lg">
          No meetings found 😔
          <div className="mt-4">
            <Link href="/meetings/create">
              <Button>Create your first meeting</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Meetings list */}
      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="border-2 border-indigo-200 hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <CardTitle className="text-xl">{meeting.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Code:</strong>{" "}
                <span className="text-indigo-600 font-mono">{meeting.code}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    meeting.status === "LIVE"
                      ? "text-green-600"
                      : meeting.status === "SCHEDULED"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {meeting.status}
                </span>
              </p>
              <p>
                <strong>Host:</strong>{" "}
                {meeting.host.name ?? meeting.host.email ?? "Unknown"}
              </p>
              <p>
                <strong>Participants:</strong>{" "}
                {meeting.participants.map((p) => p.name).join(", ") || "None"}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(meeting.startsAt).toLocaleString()}{" "}
                {meeting.endsAt ? "- " + new Date(meeting.endsAt).toLocaleString() : ""}
              </p>

              <div className="mt-2 flex justify-end">
                <Link href={`/meetings/${meeting.id}`}>
                  <Button variant="outline" size="sm">
                    View / Join
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
