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
const notificaton_model_1 = __importDefault(require("../models/notificaton.model"));
class NotificationRepository {
    // Function for the fetch all notifications of a user
    fetchNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notificaton_model_1.default.find({ to: userId })
                    .sort({
                    createdAt: -1,
                })
                    .populate("from", "username _id profileimg")
                    .populate("to", "username _id profileimg");
                return notifications;
            }
            catch (error) {
                console.error("Error from fetchNotifications in NotificationRepository", error);
                return null;
            }
        });
    }
    // Function for creating a new notification
    createNotification(from, to, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the notification already exists
                const existingNotification = yield notificaton_model_1.default.findOne({
                    from,
                    to,
                    type,
                });
                if (existingNotification) {
                    return existingNotification ? existingNotification.toObject() : null;
                }
                // Create a new notification
                const newNotification = new notificaton_model_1.default({
                    from,
                    to,
                    type,
                });
                const savedNotification = yield newNotification.save();
                return savedNotification ? savedNotification.toObject() : null;
            }
            catch (error) {
                console.error("Error from createNotification in NotificationRepository", error);
                return null;
            }
        });
    }
    // Function for set the notification as readed
    setReadedNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield notificaton_model_1.default.updateMany({ to: userId, isRead: false }, { $set: { isRead: true } });
                const getAllNotifications = yield this.fetchNotifications(userId);
                return getAllNotifications;
            }
            catch (error) {
                console.error("Error from setReadedNotifications in NotificationRepository", error);
                return null;
            }
        });
    }
    // Function for deleting a notification
    deleteNotification(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedNotification = yield notificaton_model_1.default.findByIdAndDelete(notificationId);
                return deletedNotification ? deletedNotification.toObject() : null;
            }
            catch (error) {
                console.error("Error from deleteNotification in NotificationRepository", error);
                return null;
            }
        });
    }
}
exports.default = NotificationRepository;
