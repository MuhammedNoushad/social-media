"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controllers_1 = require("../controllers/notification.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const isBlock_1 = __importDefault(require("../middleware/isBlock"));
const notificationRoute = express_1.default.Router();
notificationRoute.get("/:userId", verifyToken_1.default, isBlock_1.default, notification_controllers_1.fetchNotifications);
notificationRoute.post("/:userId", verifyToken_1.default, isBlock_1.default, notification_controllers_1.setReadedNotifications);
notificationRoute.delete("/:notificationId", verifyToken_1.default, isBlock_1.default, notification_controllers_1.deleteNotifications);
exports.default = notificationRoute;
