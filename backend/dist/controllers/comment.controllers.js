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
exports.fetchCountPosts = exports.deleteComment = exports.editComment = exports.toggleLike = exports.addComment = void 0;
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
const NotificationRepository_1 = __importDefault(require("../repositories/NotificationRepository"));
const socket_1 = require("../socket/socket");
const postRepository = new PostRepository_1.default();
const notificationRepository = new NotificationRepository_1.default();
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { postId } = req.params;
        const { userId, comment, postOwnerId } = req.body;
        const commentData = yield postRepository.addComment(postId, userId, comment);
        const newComment = (_a = commentData === null || commentData === void 0 ? void 0 : commentData.comments) === null || _a === void 0 ? void 0 : _a[((_b = commentData === null || commentData === void 0 ? void 0 : commentData.comments) === null || _b === void 0 ? void 0 : _b.length) - 1];
        const postData = yield postRepository.getAllPosts();
        if (userId !== postOwnerId) {
            yield notificationRepository.createNotification(userId, postOwnerId, "comment");
            const notifications = yield notificationRepository.fetchNotifications(postOwnerId);
            const recieverId = (0, socket_1.getRecieverSocketId)(postOwnerId);
            if (recieverId) {
                socket_1.io.to(recieverId).emit("notification", notifications);
            }
        }
        if (commentData) {
            return res.status(200).json({ success: true, postData, newComment });
        }
        return res.status(400).json({ error: "Something went wrong" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.addComment = addComment;
// Function for toggle like
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userId, postOwnerId } = req.body;
        const updatedPostData = yield postRepository.toggleLike(postId, userId);
        if (!updatedPostData)
            return res.status(400).json({ error: "Something went wrong" });
        const postData = yield postRepository.getAllPosts();
        if (postOwnerId !== userId) {
            yield notificationRepository.createNotification(userId, postOwnerId, "like");
            const notifications = yield notificationRepository.fetchNotifications(postOwnerId);
            const recieverId = (0, socket_1.getRecieverSocketId)(postOwnerId);
            if (recieverId) {
                socket_1.io.to(recieverId).emit("notification", notifications);
            }
        }
        return res.status(200).json({ success: true, postData });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.toggleLike = toggleLike;
// Function for edit comment
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        const updatedPostData = yield postRepository.editComment(postId, commentId, comment);
        if (!updatedPostData)
            return res.status(400).json({ error: "Something went wrong" });
        const postData = yield postRepository.getAllPosts();
        res.status(200).json({ success: true, updatedPostData, postData });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.editComment = editComment;
// Function for delete comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, commentId } = req.params;
        const updatedPostData = yield postRepository.deleteComment(postId, commentId);
        if (!updatedPostData)
            res.status(400).json({ error: "Something went wrong" });
        const postData = yield postRepository.getAllPosts();
        res.status(200).json({ success: true, updatedPostData, postData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteComment = deleteComment;
// Function fetch the count of posts in the database
const fetchCountPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalPosts = yield postRepository.fetchTotalPostsCount();
        return res.status(200).json({ success: true, totalPosts });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchCountPosts = fetchCountPosts;
