"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Users, CalendarDays, Clock, Video } from "lucide-react";

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

  // TODO: replace with auth user id
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
      <div className="flex justify-center items-center h-screen text-gray-600">
        <Loader2 className="animate-spin mr-2" />
        <span>Loading meetings...</span>
      </div>
    );

  // 👉 Some stats
  const total = meetings.length;
  const upcoming = meetings.filter((m) => m.status === "SCHEDULED").length;
  const live = meetings.filter((m) => m.status === "LIVE").length;
  const completed = meetings.filter((m) => m.status === "ENDED").length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header with stats */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">📅 Your Meetings</h1>
        <Link href="/meetings/create">
          <Button>Create New Meeting</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-4">
          <CardTitle>Total</CardTitle>
          <p className="text-2xl font-bold">{total}</p>
        </Card>
        <Card className="text-center p-4">
          <CardTitle>Upcoming</CardTitle>
          <p className="text-2xl font-bold text-yellow-600">{upcoming}</p>
        </Card>
        <Card className="text-center p-4">
          <CardTitle>Live</CardTitle>
          <p className="text-2xl font-bold text-green-600">{live}</p>
        </Card>
        <Card className="text-center p-4">
          <CardTitle>Completed</CardTitle>
          <p className="text-2xl font-bold text-gray-500">{completed}</p>
        </Card>
      </div>

      {/* Empty state */}
      {meetings.length === 0 && (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-300 rounded-lg">
          <p className="text-lg mb-4">No meetings yet 😔</p>
          <Link href="/meetings/create">
            <Button>Create your first meeting</Button>
          </Link>
        </div>
      )}

      {/* Meetings list */}
      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl border border-gray-200"
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-500" />
                {meeting.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {new Date(meeting.startsAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {new Date(meeting.startsAt).toLocaleTimeString()}{" "}
                {meeting.endsAt && " - " + new Date(meeting.endsAt).toLocaleTimeString()}
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
              <p className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {meeting.participants.length > 0
                  ? meeting.participants.map((p) => p.name).join(", ")
                  : "No participants"}
              </p>
            </CardContent>

            <CardFooter className="flex justify-end">
              {meeting.status === "LIVE" ? (
                <Link href={`/meetings/${meeting.id}`} className="w-full">
                  <Button className="w-full">Join Now</Button>
                </Link>
              ) : (
                <Link href={`/meetings/${meeting.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
