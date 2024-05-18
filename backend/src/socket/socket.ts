import express from "express";
import { Server } from "socket.io";
import http from "http";

export const app = express();

// Initialize socket.io
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (userId: string) => {
  return userSocketMap[userId];
};

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("Connected to socket.io", socket.id);

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
    console.log("Disconnected from socket.io", socket.id);
    delete userSocketMap[userId];

    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});
