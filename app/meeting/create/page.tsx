"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CreateMeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const userId = "YOUR_USER_ID"; // replace with auth user id

  const handleCreate = async () => {
    if (!title || !startsAt || !endsAt) {
      alert("Please fill all fields before creating a meeting.");
      return;
    }

    const res = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startsAt, endsAt, hostId: userId }),
    });
    const data = await res.json();
    if (data.success) {
      router.push(`/meetings/${data.meetingId}`);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create a New Meeting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startsAt">Start Time</Label>
            <Input
              id="startsAt"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endsAt">End Time</Label>
            <Input
              id="endsAt"
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="w-full rounded-lg text-lg py-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleCreate}
          >
            Create Meeting
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
