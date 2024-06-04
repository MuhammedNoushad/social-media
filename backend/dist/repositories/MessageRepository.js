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
const converstaion_model_1 = __importDefault(require("../models/converstaion.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
class MessageRepository {
    // Function for get messages
    getMessages(userId, userToChatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conversation = yield converstaion_model_1.default.findOne({
                    participants: { $all: [userId, userToChatId] },
                })
                    .populate({
                    path: "messages",
                    populate: [
                        { path: "sender", select: "-password -role" },
                        { path: "receiver", select: "-password -role" },
                    ],
                })
                    .populate("participants", "-password -role");
                if (!conversation) {
                    conversation = yield converstaion_model_1.default.create({
                        participants: [userId, userToChatId],
                        messages: [],
                        lastMessage: "Start a conversation",
                    });
                    conversation = yield conversation.populate({
                        path: "messages",
                        populate: [
                            { path: "sender", select: "-password -role" },
                            { path: "receiver", select: "-password -role" },
                        ],
                    });
                    conversation = yield conversation.populate("participants", "-password -role");
                }
                return conversation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   Function for create message
    createMessage(userId, userToChatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield message_model_1.default.create({
                    sender: userToChatId,
                    receiver: userId,
                    message: message,
                });
                return newMessage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   Function for find conversation and add message
    findConversationAndAddMessage(userId, userToChatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conversation = yield converstaion_model_1.default.find({
                    participants: { $all: [userId, userToChatId] },
                }).populate({
                    path: "messages",
                    populate: [
                        { path: "sender", select: "-password -role" },
                        { path: "receiver", select: "-password -role" },
                    ],
                });
                // Check if the conversation is an array or a single document
                if (conversation.length === 0) {
                    conversation = yield (yield converstaion_model_1.default.create({
                        participants: [userId, userToChatId],
                        messages: [message],
                        lastMessage: message.message,
                    })).populate({
                        path: "messages",
                        populate: [
                            { path: "sender", select: "-password -role" },
                            { path: "receiver", select: "-password -role" },
                        ],
                    });
                }
                else {
                    conversation = yield converstaion_model_1.default.findOneAndUpdate({ participants: { $all: [userId, userToChatId] } }, {
                        $push: { messages: message },
                        $set: { lastMessage: message.message },
                    }, { upsert: true, new: true })
                        .populate({
                        path: "messages",
                        populate: [
                            { path: "sender", select: "-password -role" },
                            { path: "receiver", select: "-password -role" },
                        ],
                    })
                        .populate("participants", "-password -role");
                }
                return conversation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch conversation for a specific user
    getConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield converstaion_model_1.default.find({
                    participants: { $in: [userId] },
                }).populate({
                    path: "messages",
                    select: "message sender receiver",
                });
                return conversations;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch the users recently chat with
    getUsersToChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch conversations involving the user and sort by the most recent chatted with
                const conversations = yield converstaion_model_1.default.find({
                    participants: { $in: [userId] },
                })
                    .sort({ updatedAt: -1 })
                    .populate("participants", "-password -role");
                return conversations;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MessageRepository;
