import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socketio",
      cors: { origin: "*" },
    });

    const rooms: Record<string, Set<string>> = {}; // roomId -> userIds

    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      socket.on("join-meeting", ({ meetingId, userId, email }) => {
        if (!rooms[meetingId]) rooms[meetingId] = new Set();
        rooms[meetingId].add(userId);
        socket.join(meetingId);

        // send existing participants to new user
        const existing = Array.from(rooms[meetingId]).filter(id => id !== userId);
        socket.emit("existing-participants", existing);

        // broadcast new user to others
        socket.to(meetingId).emit("new-participant", { userId, email });
      });

      socket.on("offer", ({ targetId, sdp, fromId }) => {
        io.to(targetId).emit("offer", { sdp, fromId });
      });

      socket.on("answer", ({ targetId, sdp, fromId }) => {
        io.to(targetId).emit("answer", { sdp, fromId });
      });

      socket.on("ice-candidate", ({ targetId, candidate, fromId }) => {
        io.to(targetId).emit("ice-candidate", { candidate, fromId });
      });

      socket.on("leave-meeting", ({ meetingId, userId }) => {
        rooms[meetingId]?.delete(userId);
        socket.to(meetingId).emit("participant-left", { userId });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
