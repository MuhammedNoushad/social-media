"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecieverSocketId = exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";
// Initialize socket.io
exports.server = http_1.default.createServer(exports.app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: clientURL,
        methods: ["GET", "POST"],
    },
});
const getRecieverSocketId = (userId) => {
    return userSocketMap[userId];
};
exports.getRecieverSocketId = getRecieverSocketId;
const userSocketMap = {};
exports.io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }
    exports.io.emit("onlineUsers", Object.keys(userSocketMap));
    // socket connection for voice call
    socket.on("voiceCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data.userToChatId);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("voiceCall", data);
        }
    });
    socket.on("rejectVoiceCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data.userToChatId);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("rejectVoiceCall", data);
        }
    });
    socket.on("rejectIncomingVoiceCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("rejectIncomingVoiceCall", data);
        }
    });
    socket.on("acceptIncomingVoiceCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("acceptIncomingVoiceCall", data);
        }
    });
    // socket connection for video call
    socket.on("videoCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data.userToChatId);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("videoCall", data);
        }
    });
    socket.on("endCall", (data) => {
        console.log(data, 'inside disconnect call');
        const recieverSocketId = (0, exports.getRecieverSocketId)(data.userToChatId);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("disconnectCall", data);
        }
    });
    socket.on("rejectCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data.userToChatId);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("rejectCall", data);
        }
    });
    socket.on("rejectIncomingCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("rejectIncomingCall", data);
        }
    });
    socket.on("acceptIncomingCall", (data) => {
        const recieverSocketId = (0, exports.getRecieverSocketId)(data);
        if (recieverSocketId) {
            exports.io.to(recieverSocketId).emit("acceptIncomingCall", data);
        }
    });
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        exports.io.emit("onlineUsers", Object.keys(userSocketMap));
    });
});
