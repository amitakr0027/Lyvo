"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useRealtime(room?: string, handlers?: {
  onToken?: (chunk: string) => void;
  onDone?: (payload: any) => void;
  onNew?: (payload: any) => void;
}) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SOCKET_IO_URL || process.env.SOCKET_IO_URL || "http://localhost:4001";
    const socket = io(url, { transports: ["websocket"] });
    socketRef.current = socket;

    if (room) {
      socket.emit("join:meeting", room.replace("meeting:", ""));
    }

    socket.on("summary:token", (p: any) => {
      if (!room || p?.room === room) handlers?.onToken?.(p?.chunk || "");
    });
    socket.on("summary:done", (p: any) => {
      if (!room || p?.room === room) handlers?.onDone?.(p?.summary);
    });
    socket.on("summary:new", (p: any) => {
      handlers?.onNew?.(p?.summary);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);
}
