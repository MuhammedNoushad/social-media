"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controllers_1 = require("../controllers/message.controllers");
const messageRoute = express_1.default.Router();
messageRoute.get("/chat-list/:userId", message_controllers_1.fetchUsersToChat);
messageRoute.get("/:userId/:userToChatId", message_controllers_1.getMessage);
messageRoute.post("/:userId/:userToChatId", message_controllers_1.setMessage);
messageRoute.get("/conversation/:userId", message_controllers_1.fetchConverstions);
exports.default = messageRoute;
