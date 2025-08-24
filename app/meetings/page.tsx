"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { connectSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Trash2,
  Video,
  PlusCircle,
  Radio,
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  status: "live" | "scheduled" | "past";
  host: string;
  createdAt?: { seconds: number; nanoseconds: number };
  scheduledAt?: { seconds: number; nanoseconds: number };
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "past">(
    "all"
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchMeetings = async () => {
    try {
      const res = await fetch(`/api/meetings`);
      const data: Meeting[] = await res.json();
      setMeetings(data);
    } catch (err) {
      console.error("Error fetching meetings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        fetchMeetings();
      } else {
        setLoading(false);
      }
    });

    const socket = connectSocket();
    socket.on("meetingCreated", (meeting: Meeting) => {
      setMeetings((prev) => [meeting, ...prev]);
    });

    return () => {
      unsubscribe();
      socket.off("meetingCreated");
    };
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
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
    } finally {
      setDeletingId(null);
    }
  };

  // 🔥 Date formatter
  const formatDate = (ts?: { seconds: number; nanoseconds: number }) => {
    if (!ts?.seconds) return null;
    return new Date(ts.seconds * 1000).toLocaleString();
  };

  const filteredMeetings = meetings
    .filter((m) => filter === "all" || m.status === filter)
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Meetings
        </h1>

        <Link
          href="/meetings/create"
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md"
        >
          <PlusCircle size={18} /> New Meeting
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-3">
          {(["all", "live", "scheduled", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                filter === f
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Meeting Cards */}
      {filteredMeetings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No meetings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMeetings.map((m) => {
            const createdAt = formatDate(m.createdAt) || "Unknown";
            const scheduledAt = formatDate(m.scheduledAt);

            return (
              <div
                key={m.id}
                className="relative border rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
              >
                <Link href={`/meetings/${m.id}`} className="block space-y-3">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                    <Video size={20} className="text-indigo-500" /> {m.title}
                  </h2>

                  {/* 🔥 Status badges */}
                  {m.status === "live" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">
                      <Radio size={14} /> 🚨 LIVE NOW
                    </span>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        m.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  )}

                  <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm">
                    <Calendar size={16} /> Host: {m.host}
                  </p>

                  {/* 🔥 Show Scheduled + Created both */}
                  {scheduledAt && (
                    <p className="text-blue-600 dark:text-blue-400 flex items-center gap-2 text-sm font-medium">
                      <Clock size={16} /> Scheduled: {scheduledAt}
                    </p>
                  )}

                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-xs">
                    <Clock size={14} /> Created: {createdAt}
                  </p>
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(m.id)}
                  disabled={deletingId === m.id}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  {deletingId === m.id ? "..." : <Trash2 size={16} />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
