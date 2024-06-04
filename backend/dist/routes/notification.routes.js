"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controllers_1 = require("../controllers/notification.controllers");
const notificationRoute = express_1.default.Router();
notificationRoute.get('/:userId', notification_controllers_1.fetchNotifications);
notificationRoute.post('/:userId', notification_controllers_1.setReadedNotifications);
notificationRoute.delete('/:notificationId', notification_controllers_1.deleteNotifications);
exports.default = notificationRoute;
