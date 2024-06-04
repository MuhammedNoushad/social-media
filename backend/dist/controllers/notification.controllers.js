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
exports.deleteNotifications = exports.setReadedNotifications = exports.fetchNotifications = void 0;
const NotificationRepository_1 = __importDefault(require("../repositories/NotificationRepository"));
const notificationRepository = new NotificationRepository_1.default();
// Function for fetch notifications
const fetchNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notifications = yield notificationRepository.fetchNotifications(userId);
        if (!notifications) {
            return res.status(400).json({ error: "Failed to fetch notifications" });
        }
        return res.status(200).json({ success: true, notifications });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchNotifications = fetchNotifications;
// Function for set the notification as readed
const setReadedNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notifications = yield notificationRepository.setReadedNotifications(userId);
        if (!notifications) {
            return res.status(400).json({ error: "Failed to set notifications" });
        }
        return res.status(200).json({ success: true, notifications });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.setReadedNotifications = setReadedNotifications;
// Function for delete the notification
const deleteNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const notification = yield notificationRepository.deleteNotification(notificationId);
        if (!notification) {
            return res.status(400).json({ error: "Failed to delete notifications" });
        }
        return res.status(200).json({ success: true, notification });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteNotifications = deleteNotifications;
