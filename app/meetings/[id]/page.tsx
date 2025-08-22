"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Participant {
  id: string;
  stream?: MediaStream;
}

export default function MeetingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const MAX_PARTICIPANTS = 6;

  // Function to initialize camera + mic
  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setParticipants([{ id: "You", stream }]);
    } catch (err) {
      console.error("Camera/Mic access failed:", err);
      alert("Please allow camera and microphone access!");
      router.push("/meetings");
    }
  };

  // On mount → start camera + mic
  useEffect(() => {
    initLocalStream();
  }, []);

  // Toggle Mic
  const toggleMic = async () => {
    if (!localStream) return;

    if (micOn) {
      // Stop audio tracks completely
      localStream.getAudioTracks().forEach((track) => track.stop());
      setMicOn(false);
    } else {
      // Reinitialize stream with audio
      const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Merge with existing video track
      if (localStream.getVideoTracks().length > 0) {
        newStream.addTrack(localStream.getVideoTracks()[0]);
      }
      setLocalStream(newStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = newStream;
      setMicOn(true);
    }
  };

  // Toggle Camera
  const toggleCam = async () => {
    if (!localStream) return;

    if (camOn) {
      // Stop video tracks completely
      localStream.getVideoTracks().forEach((track) => track.stop());
      setCamOn(false);
    } else {
      // Reinitialize stream with video
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Merge with existing audio track
      if (localStream.getAudioTracks().length > 0) {
        newStream.addTrack(localStream.getAudioTracks()[0]);
      }
      setLocalStream(newStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = newStream;
      setCamOn(true);
    }
  };

  // Demo: Add dummy participants
  const addParticipant = () => {
    if (participants.length >= MAX_PARTICIPANTS) return;
    setParticipants((prev) => [...prev, { id: `User${prev.length + 1}` }]);
  };

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Meeting ID: {params.id}
      </h1>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleMic}
          className={`px-4 py-2 rounded ${micOn ? "bg-green-600" : "bg-red-500"} text-white hover:opacity-90 transition`}
        >
          {micOn ? "Mic On" : "Mic Off"}
        </button>

        <button
          onClick={toggleCam}
          className={`px-4 py-2 rounded ${camOn ? "bg-green-600" : "bg-red-500"} text-white hover:opacity-90 transition`}
        >
          {camOn ? "Cam On" : "Cam Off"}
        </button>

        {participants.length < MAX_PARTICIPANTS && (
          <button
            onClick={addParticipant}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Participant (Demo)
          </button>
        )}
      </div>

      {/* Video Grid */}
      <div
        className={`grid gap-4 ${
          participants.length === 1
            ? "grid-cols-1"
            : participants.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 md:grid-cols-3"
        }`}
      >
        {participants.map((p) => (
          <div
            key={p.id}
            className="bg-black rounded-lg relative overflow-hidden shadow-lg"
          >
            {p.id === "You" ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white font-semibold">
                {p.id} Video
              </div>
            )}

            <span className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
              {p.id}
            </span>

            {p.id !== "You" && (
              <button
                onClick={() => removeParticipant(p.id)}
                className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-white rounded text-xs"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
