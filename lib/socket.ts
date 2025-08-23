// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:5000", { transports: ["websocket"] });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
