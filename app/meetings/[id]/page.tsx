"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { io, Socket } from "socket.io-client";
import { VideoGrid } from "@/components/meeting/video-grid";
import { MeetingControls } from "@/components/meeting/meeting-controls";

interface Participant {
  id: string;
  stream?: MediaStream;
  email?: string;
  micOn?: boolean;
  camOn?: boolean;
  isHost?: boolean;
}

export default function MeetingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const meetingId = params.id;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const pcsRef = useRef<Record<string, RTCPeerConnection>>({});
  const socketRef = useRef<Socket | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [hostId, setHostId] = useState<string>("");

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid || `guest-${Date.now()}`;
  const userEmail = user?.email || `guest@example.com`;

  useEffect(() => {
    if (!user) {
      alert("Sign in to join the meeting");
      router.push("/auth/signin");
      return;
    }

    const init = async () => {
      // 1. Socket connection
      const socket = io("/", { path: "/api/socketio" });
      socketRef.current = socket;

      // 2. Local media
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      // 3. Add local participant
      setParticipants([{ id: userId, stream, email: userEmail, micOn: true, camOn: true, isHost: true }]);
      setHostId(userId);

      // 4. Join meeting
      socket.emit("join-meeting", { meetingId, userId, email: userEmail });

      // 5. Existing participants
      socket.on("existing-participants", (ids: string[]) => {
        ids.forEach(id => createPeerConnection(id, socket, stream, true));
      });

      // 6. New participant joins
      socket.on("new-participant", ({ userId: id, email }: { userId: string; email: string }) => {
        createPeerConnection(id, socket, stream, false, email);
      });

      // 7. Offer
      socket.on("offer", async ({ sdp, fromId }: { sdp: RTCSessionDescriptionInit; fromId: string }) => {
        const pc = createPeerConnection(fromId, socket, stream, false);
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { targetId: fromId, sdp: answer, fromId: userId });
      });

      // 8. Answer
      socket.on("answer", async ({ sdp, fromId }: { sdp: RTCSessionDescriptionInit; fromId: string }) => {
        const pc = pcsRef.current[fromId];
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      });

      // 9. ICE candidates
      socket.on("ice-candidate", ({ candidate, fromId }: { candidate: RTCIceCandidateInit; fromId: string }) => {
        const pc = pcsRef.current[fromId];
        if (!pc) return;
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      // 10. Participant left
      socket.on("participant-left", ({ userId }: { userId: string }) => {
        pcsRef.current[userId]?.close();
        delete pcsRef.current[userId];
        setParticipants(prev => prev.filter(p => p.id !== userId));
      });
    };

    init();

    return () => {
      socketRef.current?.emit("leave-meeting", { meetingId, userId });
      Object.values(pcsRef.current).forEach(pc => pc.close());
      socketRef.current?.disconnect();
    };
  }, [router, user, meetingId, userId, userEmail]);

  const createPeerConnection = (
    id: string,
    socket: Socket,
    localStream: MediaStream,
    isOffer: boolean,
    email?: string
  ): RTCPeerConnection => {
    if (pcsRef.current[id]) return pcsRef.current[id];

    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    pcsRef.current[id] = pc;

    // Local tracks
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    // Remote track
    pc.ontrack = (event: RTCTrackEvent) => {
      setParticipants(prev => [
        ...prev.filter(p => p.id !== id),
        { id, stream: event.streams[0], email, micOn: true, camOn: true },
      ]);
    };

    // ICE candidate
    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { targetId: id, candidate: event.candidate, fromId: userId });
      }
    };

    // Offer
    if (isOffer) {
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer);
        socket.emit("offer", { targetId: id, sdp: offer, fromId: userId });
      });
    }

    return pc;
  };

  const toggleMic = () => {
    if (!localStreamRef.current) return;
    const enabled = !micOn;
    localStreamRef.current.getAudioTracks().forEach(t => (t.enabled = enabled));
    setMicOn(enabled);
  };

  const toggleCam = () => {
    if (!localStreamRef.current) return;
    const enabled = !camOn;
    localStreamRef.current.getVideoTracks().forEach(t => (t.enabled = enabled));
    setCamOn(enabled);
  };

  const leaveMeeting = () => {
    socketRef.current?.emit("leave-meeting", { meetingId, userId });
    Object.values(pcsRef.current).forEach(pc => pc.close());
    router.push("/meetings");
  };

  const removeParticipant = (id: string) => {
    pcsRef.current[id]?.close();
    delete pcsRef.current[id];
    setParticipants(prev => prev.filter(p => p.id !== id));
    socketRef.current?.emit("remove-participant", { meetingId, userId: id });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Meeting Room: <span className="font-mono">{meetingId}</span>
      </h1>

      <VideoGrid
        participants={participants}
        localVideoRef={localVideoRef}
        onRemove={removeParticipant}
        hostId={hostId}
      />

      <MeetingControls
        micOn={micOn}
        camOn={camOn}
        isHost={userId === hostId}
        onToggleMic={toggleMic}
        onToggleCam={toggleCam}
        onLeave={leaveMeeting}
      />

      <video ref={localVideoRef} autoPlay muted className="hidden" />
    </div>
  );
}
