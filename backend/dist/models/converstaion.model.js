"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const converstaionSchema = new mongoose_1.Schema({
    participants: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
        required: true,
    },
    messages: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
        required: true,
        default: [],
    },
    lastMessage: {
        type: String,
        default: null
    }
}, { timestamps: true });
const Conversation = (0, mongoose_1.model)("Converstaion", converstaionSchema);
exports.default = Conversation;
