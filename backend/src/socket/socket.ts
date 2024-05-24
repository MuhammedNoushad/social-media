import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

const clientURL = process.env.CLIENT_URL || "http://localhost:5173";

// Initialize socket.io
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: clientURL,
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (userId: string) => {
  return userSocketMap[userId];
};

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("videoCall", (data) => {
    const recieverSocketId = getRecieverSocketId(data.userToChatId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("videoCall", data);
    }
  });

  socket.on("rejectCall", (data) => {
    const recieverSocketId = getRecieverSocketId(data.userToChatId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("rejectCall", data);
    }
  });

  socket.on("rejectIncomingCall", (data) => {
    const recieverSocketId = getRecieverSocketId(data);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("rejectIncomingCall", data);
    }
  });

  socket.on("acceptIncomingCall", (data) => {
    const recieverSocketId = getRecieverSocketId(data);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("acceptIncomingCall", data);
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];

    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});
