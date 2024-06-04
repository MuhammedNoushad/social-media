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
exports.fetchAllFollowers = exports.fetchAllFollowings = exports.fetchAllConnections = exports.unfollow = exports.follow = void 0;
const ConnectionRepository_1 = __importDefault(require("../repositories/ConnectionRepository"));
const NotificationRepository_1 = __importDefault(require("../repositories/NotificationRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const socket_1 = require("../socket/socket");
const userRepository = new UserRepository_1.default();
const connectionRepository = new ConnectionRepository_1.default();
const notificationRepository = new NotificationRepository_1.default();
// Function for following
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, followingId } = req.body;
        const followUser = yield userRepository.findById(followingId);
        if (!followUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const user = yield userRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isFollowing = yield connectionRepository.isFollowing(userId, followingId);
        if (isFollowing) {
            return res.status(400).json({ error: "Already following" });
        }
        yield notificationRepository.createNotification(userId, followingId, "follow");
        const notifications = yield notificationRepository.fetchNotifications(followingId);
        const recieverId = (0, socket_1.getRecieverSocketId)(followingId);
        if (recieverId) {
            socket_1.io.to(recieverId).emit("notification", notifications);
        }
        yield connectionRepository.followUser(userId, followingId);
        return res.status(200).json({ success: true, followUser });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.follow = follow;
// Function for unfollow user
const unfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, unfollowingId } = req.body;
        const unfollowUser = yield userRepository.findById(unfollowingId);
        if (!unfollowUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const user = yield userRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield connectionRepository.unfollowUser(userId, unfollowingId);
        return res.status(200).json({ success: true, unfollowUser });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.unfollow = unfollow;
// Function for fetch all connections
const fetchAllConnections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const connections = yield connectionRepository.fetchAllConnections(userId);
        return res.status(200).json({ success: true, connections });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllConnections = fetchAllConnections;
// Function for fetch all followings
const fetchAllFollowings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const followings = yield connectionRepository.fetchAllFollowings(userId);
        return res.status(200).json({ success: true, followings });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllFollowings = fetchAllFollowings;
// Function for fetch all followers
const fetchAllFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const followers = yield connectionRepository.fetchAllFollowers(userId);
        return res.status(200).json({ success: true, followers });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllFollowers = fetchAllFollowers;
