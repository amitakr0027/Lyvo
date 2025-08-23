// components/meeting/meeting-controls.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, Phone, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  micOn: boolean;
  camOn: boolean;
  isHost?: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onLeave: () => void;
}

export function MeetingControls({
  micOn,
  camOn,
  isHost = false,
  onToggleMic,
  onToggleCam,
  onLeave,
}: Props) {
  const router = useRouter();

  const handleEndMeeting = () => {
    if (isHost) {
      // Backend call to end meeting for all participants can be added here
    }
    router.push("/meetings");
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full px-6 py-3 shadow-lg z-50 flex flex-col items-center">
      {isHost && (
        <div className="mb-2 px-2 py-1 bg-yellow-500 text-black rounded text-sm font-semibold">Host</div>
      )}

      <div className="flex items-center space-x-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleMic}
          className={`text-white hover:bg-gray-700 flex items-center gap-1 ${micOn ? "bg-green-600" : "bg-red-600"}`}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          <span className="text-xs">{micOn ? "Mic On" : "Mic Off"}</span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleCam}
          className={`text-white hover:bg-gray-700 flex items-center gap-1 ${camOn ? "bg-green-600" : "bg-red-600"}`}
        >
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          <span className="text-xs">{camOn ? "Video On" : "Video Off"}</span>
        </Button>

        <Button
          size="sm"
          variant={isHost ? "destructive" : "secondary"}
          onClick={isHost ? handleEndMeeting : onLeave}
          className="flex items-center gap-1"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs">{isHost ? "End Meeting" : "Leave"}</span>
        </Button>

        <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
