"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateMeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const userId = "YOUR_USER_ID"; // replace with auth user id

  const handleCreate = async () => {
    const res = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startsAt, endsAt, hostId: userId }),
    });
    const data = await res.json();
    if (data.success) {
      alert(`Meeting created! Code: ${data.meetingId}`);
      router.push(`/meetings/${data.meetingId}`);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create Meeting</h1>
      <Input
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="Start Time"
        value={startsAt}
        onChange={(e) => setStartsAt(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="End Time"
        value={endsAt}
        onChange={(e) => setEndsAt(e.target.value)}
      />
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
}
