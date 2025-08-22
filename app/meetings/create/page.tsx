"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function CreateMeetingPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) setUserEmail(user.email);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userEmail) return alert("Login first");

    setLoading(true);

    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status,
          email: userEmail,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/meetings"); // redirect to meetings list
      } else {
        alert("Failed to create meeting. Try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create New Meeting
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Meeting Title */}
        <input
          type="text"
          placeholder="Enter Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        {/* Meeting Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="live">Live</option>
          <option value="scheduled">Scheduled</option>
          <option value="past">Past</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>
    </div>
  );
}
