// Dependences ||||||||||||||||||||||||||||||||||
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://iamdamba-minimal-chat-app.vercel.app/",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3001;

// Middlewares ||||||||||||||||||||||||||||||||||
app.use(cors());
app.use(express.json());

process.env.NODE_ENV === "production" &&
  app.use(express.static(path.join(__dirname, "client/dist")));
process.env.NODE_ENV === "production" &&
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
  );

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} has join room: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} has left`);
  });
});

// Listen ||||||||||||||||||||||||||||||||||
server.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
