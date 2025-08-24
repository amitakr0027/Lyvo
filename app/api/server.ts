import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // frontend ka origin daalna ho to yaha daalo
    methods: ["GET", "POST"],
  },
});

// Room participants store
const rooms: Record<string, string[]> = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // ✅ User joins a room
  socket.on("room:join", ({ room, email }) => {
    socket.join(room);

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(socket.id);

    console.log(`${email} joined room ${room}`);

    // Notify others in the room
    socket.to(room).emit("user:joined", { id: socket.id, email });
  });

  // ✅ Handle WebRTC Offer
  socket.on("offer", ({ targetId, sdp, fromId, email }) => {
    io.to(targetId).emit("incomming:call", { from: fromId, offer: sdp, email });
  });

  // ✅ Handle Answer
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  // ✅ Negotiation events
  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // ✅ Handle ICE candidates
  socket.on("ice-candidate", ({ targetId, candidate, fromId }) => {
    io.to(targetId).emit("ice-candidate", { candidate, fromId });
  });

  // ✅ Remove participant (host kick)
  socket.on("remove-participant", ({ meetingId, userId }) => {
    io.to(userId).emit("removed-by-host");
    io.to(meetingId).emit("participant-left", { userId });
    rooms[meetingId] = rooms[meetingId]?.filter((id) => id !== userId);
  });

  // ✅ Leave Meeting
  socket.on("leave-meeting", ({ meetingId, userId }) => {
    socket.leave(meetingId);
    io.to(meetingId).emit("participant-left", { userId });
    rooms[meetingId] = rooms[meetingId]?.filter((id) => id !== userId);
  });

  // ✅ Disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    for (const room in rooms) {
      if (rooms[room].includes(socket.id)) {
        rooms[room] = rooms[room].filter((id) => id !== socket.id);
        io.to(room).emit("participant-left", { userId: socket.id });
      }
    }
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
