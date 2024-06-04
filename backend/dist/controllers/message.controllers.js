"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsersToChat = exports.fetchConverstions = exports.setMessage = exports.getMessage = void 0;
const MessageRepository_1 = __importDefault(require("../repositories/MessageRepository"));
const socket_1 = require("../socket/socket");
const messageRepository = new MessageRepository_1.default();
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userToChatId } = req.params;
        const conversations = yield messageRepository.getMessages(userId, userToChatId);
        if (!conversations) {
            return res.status(400).json({ error: "Failed to fetch messages" });
        }
        return res.status(200).json({ success: true, conversations });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessage = getMessage;
// Function for setting message
const setMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userToChatId } = req.params;
        const { message } = req.body;
        const newMessage = yield messageRepository.createMessage(userId, userToChatId, message);
        const conversation = yield messageRepository.findConversationAndAddMessage(userId, userToChatId, newMessage);
        if (!conversation) {
            return res.status(400).json({ error: "Failed to fetch messages" });
        }
        // socket connection for sending message
        const recieverSocketId = (0, socket_1.getRecieverSocketId)(userToChatId);
        if (recieverSocketId) {
            socket_1.io.to(recieverSocketId).emit("newConversation", conversation);
        }
        res.status(200).json({ success: true, conversation });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.setMessage = setMessage;
// Function for fetch all conversation of a user
const fetchConverstions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const conversations = yield messageRepository.getConversations(userId);
        if (!conversations) {
            return res.status(400).json({ error: "Failed to fetch messages" });
        }
        res.status(200).json({ success: true, conversations });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchConverstions = fetchConverstions;
// Function for fetch user to chat based on latest message
const fetchUsersToChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const conversations = yield messageRepository.getUsersToChat(userId);
        if (!conversations) {
            return res.status(400).json({ error: "Failed to fetch users" });
        }
        res.status(200).json({ success: true, conversations });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchUsersToChat = fetchUsersToChat;
