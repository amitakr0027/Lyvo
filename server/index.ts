// server/socketServer.ts
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});

interface Participant {
  id: string;
  socketId: string;
}

const rooms: { [key: string]: Participant[] } = {};

// Connection handler
io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("join-room", ({ roomId, userId }) => {
    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push({ id: userId, socketId: socket.id });

    // Notify other participants
    socket.to(roomId).emit("user-joined", { id: userId, socketId: socket.id });

    // Relay signals
    socket.on("signal", (data) => {
      io.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
    });

    socket.on("disconnect", () => {
      rooms[roomId] = rooms[roomId].filter((p) => p.socketId !== socket.id);
      socket.to(roomId).emit("user-left", { id: userId });
    });
  });
});

// Helper to emit meetingCreated globally
export const emitMeetingCreated = (meeting: {
  id: string;
  title: string;
  status: string;
  host: string;
}) => {
  io.emit("meetingCreated", meeting);
};

httpServer.listen(5000, () => console.log("Socket.IO server running on 5000"));
