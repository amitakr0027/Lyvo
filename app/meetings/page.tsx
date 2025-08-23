"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { connectSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";

interface Meeting {
  id: string;
  title: string;
  status: "live" | "scheduled" | "past";
  host: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "past">("all");
  const router = useRouter();

  // Fetch all meetings (sab users ke liye)
  const fetchMeetings = async () => {
    try {
      const res = await fetch(`/api/meetings`);
      const data: Meeting[] = await res.json();
      setMeetings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Firebase auth check
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        fetchMeetings();
      } else {
        setLoading(false);
      }
    });

    // Socket.io setup
    const socket = connectSocket();
    socket.on("meetingCreated", (meeting: Meeting) => {
      setMeetings((prev) => [meeting, ...prev]); // nayi meeting top pe show
    });

    return () => {
      unsubscribe();
      socket.off("meetingCreated");
    };
  }, []);

  // Delete meeting
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;
    try {
      const res = await fetch(`/api/meetings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMeetings((prev) => prev.filter((m) => m.id !== id));
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete meeting");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting meeting");
    }
  };

  // Filter + search
  const filteredMeetings = meetings
    .filter((m) => filter === "all" || m.status === filter)
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {/* Header + Search + Create */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Meetings</h1>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* Create Meeting */}
          <Link
            href="/meetings/create"
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Create
          </Link>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {(["all", "live", "scheduled", "past"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Meetings List */}
      {filteredMeetings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No meetings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMeetings.map((m) => (
            <div
              key={m.id}
              className="border p-5 rounded-xl shadow-md hover:shadow-xl transition hover:bg-gray-50 flex justify-between items-center"
            >
              <Link href={`/meetings/${m.id}`} className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{m.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium mt-1 inline-block ${
                    m.status === "live"
                      ? "bg-green-500"
                      : m.status === "scheduled"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {m.status.toUpperCase()}
                </span>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">Host: {m.host}</p>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(m.id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
