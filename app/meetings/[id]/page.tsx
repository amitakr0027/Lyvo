"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [hostId, setHostId] = useState<string>("");

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid || `guest-${Date.now()}`;
  const userEmail = user?.email || `guest@example.com`;

  const socketRef = useRef<Socket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Record<string, RTCPeerConnection>>({});

  // -------------------- WebRTC Functions --------------------
  const createPeer = useCallback(
    async (peerId: string, remoteEmail?: string, isOffer = true) => {
      if (peersRef.current[peerId]) return peersRef.current[peerId];

      const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
      peersRef.current[peerId] = pc;

      localStreamRef.current?.getTracks().forEach((track) => pc.addTrack(track, localStreamRef.current!));

      pc.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setParticipants((prev) => [
          ...prev.filter((p) => p.id !== peerId),
          { id: peerId, stream: remoteStream, email: remoteEmail, micOn: true, camOn: true },
        ]);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate)
          socketRef.current?.emit("ice-candidate", { targetId: peerId, candidate: event.candidate, fromId: userId });
      };

      if (isOffer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current?.emit("offer", { targetId: peerId, sdp: offer, fromId: userId, email: userEmail });
      }

      return pc;
    },
    [userId, userEmail]
  );

  // -------------------- Init --------------------
  useEffect(() => {
    if (!user) {
      alert("Sign in to join the meeting");
      router.push("/auth/signin");
      return;
    }

    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.muted = true;
        localVideoRef.current.playsInline = true;
        localVideoRef.current.srcObject = stream;
        await localVideoRef.current.play().catch(() => {});
      }

      setMicOn(true);
      setCamOn(true);

      setParticipants([{ id: userId, email: userEmail, stream, micOn: true, camOn: true, isHost: true }]);
      setHostId(userId);

      const socket = io("http://localhost:8000"); // server.ts address
      socketRef.current = socket;

      socket.emit("room:join", { room: meetingId, email: userEmail });

      // -------------------- Socket Events --------------------
      socket.on("user:joined", ({ id, email }) => {
        if (id === socket.id) return;
        createPeer(id, email, true);
      });

      socket.on("incomming:call", async ({ from, offer, email }: any) => {
        const pc = await createPeer(from, email, false);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("call:accepted", { to: from, ans: answer });
      });

      socket.on("call:accepted", async ({ from, ans }: any) => {
        const pc = peersRef.current[from];
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(ans));
      });

      socket.on("peer:nego:needed", async ({ from, offer }: any) => {
        const pc = peersRef.current[from];
        if (!pc) return;
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("peer:nego:done", { to: from, ans: answer });
      });

      socket.on("peer:nego:final", async ({ from, ans }: any) => {
        const pc = peersRef.current[from];
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(ans));
      });

      socket.on("ice-candidate", ({ candidate, fromId }: any) => {
        const pc = peersRef.current[fromId];
        if (!pc) return;
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on("participant-left", ({ userId: id }: any) => {
        peersRef.current[id]?.close();
        delete peersRef.current[id];
        setParticipants((prev) => prev.filter((p) => p.id !== id));
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      Object.values(peersRef.current).forEach((pc) => pc.close());
    };
  }, [router, user, meetingId, userId, userEmail, createPeer]);

  // -------------------- UI Handlers --------------------
  const toggleMic = () => {
    if (!localStreamRef.current) return;
    const next = !micOn;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = next));
    setMicOn(next);
  };

  const toggleCam = () => {
    if (!localStreamRef.current) return;
    const next = !camOn;
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = next));
    setCamOn(next);
  };

  const leaveMeeting = () => {
    socketRef.current?.emit("leave-meeting", { meetingId, userId });
    Object.values(peersRef.current).forEach((pc) => pc.close());
    router.push("/meetings");
  };

  const removeParticipant = (id: string) => {
    peersRef.current[id]?.close();
    delete peersRef.current[id];
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    socketRef.current?.emit("remove-participant", { meetingId, userId: id });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Meeting Room: <span className="font-mono">{meetingId}</span>
      </h1>

      <VideoGrid participants={participants} localVideoRef={localVideoRef} onRemove={removeParticipant} hostId={hostId} />

      <MeetingControls
        micOn={micOn}
        camOn={camOn}
        isHost={userId === hostId}
        onToggleMic={toggleMic}
        onToggleCam={toggleCam}
        onLeave={leaveMeeting}
      />

      <video ref={localVideoRef} autoPlay muted playsInline className="hidden w-64 h-28" />
    </div>
  );
}
