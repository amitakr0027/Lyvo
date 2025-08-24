// components/meeting/video-grid.tsx
import React from "react";
import { Mic, MicOff, VideoOff } from "lucide-react";

interface Participant {
  id: string;
  stream?: MediaStream;
  micOn?: boolean;
  camOn?: boolean;
  email?: string;
  isHost?: boolean;
}

interface VideoGridProps {
  participants: Participant[];
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  onRemove: (id: string) => void;
  hostId: string;
}

export function VideoGrid({ participants, onRemove, hostId }: VideoGridProps) {
  if (participants.length === 1) {
    const p = participants[0];
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg w-[60vw] h-[60vh] flex justify-center items-center">
          {p.camOn && p.stream ? (
            <video
              autoPlay
              playsInline
              ref={(el) => {
                if (el && p.stream) el.srcObject = p.stream;
              }}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white">
              <VideoOff className="w-8 h-8 mb-2" />
              <span className="text-sm md:text-base">Camera Off</span>
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
            <span>{p.email || p.id}</span>
            {p.micOn ? <Mic className="w-4 h-4 text-green-400" /> : <MicOff className="w-4 h-4 text-red-400" />}
          </div>

          {p.isHost && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black px-1 py-0.5 text-xs rounded">
              Host
            </div>
          )}
        </div>
      </div>
    );
  }

  const gridCols =
    participants.length === 2
      ? "grid-cols-2"
      : participants.length <= 4
      ? "grid-cols-2 md:grid-cols-2"
      : "grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-4 justify-center items-center p-2`} style={{ minHeight: "calc(100vh - 80px)" }}>
      {participants.map((p) => (
        <div
          key={p.id}
          className="relative bg-black rounded-lg overflow-hidden shadow-lg flex justify-center items-center"
          style={{ minHeight: "200px" }}
        >
          {p.camOn && p.stream ? (
            <video
              autoPlay
              playsInline
              ref={(el) => {
                if (el && p.stream) el.srcObject = p.stream;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white">
              <VideoOff className="w-8 h-8 mb-2" />
              <span className="text-sm md:text-base">Camera Off</span>
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
            <span>{p.email || p.id}</span>
            {p.micOn ? <Mic className="w-4 h-4 text-green-400" /> : <MicOff className="w-4 h-4 text-red-400" />}
          </div>

          {p.id !== hostId && (
            <button
              onClick={() => onRemove(p.id)}
              className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-white rounded text-xs hover:bg-red-600"
            >
              Remove
            </button>
          )}

          {p.isHost && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black px-1 py-0.5 text-xs rounded">
              Host
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
