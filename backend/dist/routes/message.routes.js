"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controllers_1 = require("../controllers/message.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const messageRoute = express_1.default.Router();
messageRoute.get("/chat-list/:userId", verifyToken_1.default, message_controllers_1.fetchUsersToChat);
messageRoute.get("/:userId/:userToChatId", verifyToken_1.default, message_controllers_1.getMessage);
messageRoute.post("/:userId/:userToChatId", verifyToken_1.default, message_controllers_1.setMessage);
messageRoute.get("/conversation/:userId", verifyToken_1.default, message_controllers_1.fetchConverstions);
exports.default = messageRoute;
