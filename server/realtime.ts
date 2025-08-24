import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  // client can join a meeting room by id
  socket.on("join:meeting", (meetingId: string) => {
    socket.join(`meeting:${meetingId}`);
  });
  socket.on("disconnect", () => {});
});

// Optional REST endpoint to broadcast (handy for testing)
app.post("/broadcast", (req, res) => {
  const { room, event, payload } = req.body || {};
  if (room && event) {
    io.to(room).emit(event, payload);
  }
  res.json({ ok: true });
});

const PORT = process.env.SOCKET_PORT || 4001;
server.listen(PORT, () => {
  console.log(`[Realtime] Socket.IO on :${PORT}`);
});
