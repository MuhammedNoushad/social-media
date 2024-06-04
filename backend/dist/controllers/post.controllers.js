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
exports.fetchTotalLikes = exports.fetchAllLikedUsers = exports.editPost = exports.deletePost = exports.togglePostBlock = exports.reportedPosts = exports.report = exports.getPostOfUser = exports.fetchAllPosts = exports.createNewPost = void 0;
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
const postRepository = new PostRepository_1.default();
// Function for creating new post
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { imageUrl, desc: description } = req.body;
        console.log(userId, imageUrl, description);
        // Create new post
        const newPOst = {
            userId,
            imageUrl,
            description,
        };
        const postData = yield postRepository.createNewpost(newPOst);
        if (postData) {
            return res.status(200).json({
                success: true,
                message: "Post created successfully",
                postData,
            });
        }
        else {
            return res.status(400).json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        console.error("Error from createNewPost in post controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createNewPost = createNewPost;
// Function for fetching all posts
const fetchAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = yield postRepository.getAllPosts();
        if (!postData) {
            return res.status(400).json({ error: "Failed to fetch posts" });
        }
        const posts = postData.filter((post) => post.isBlocked === false && post.isDeleted === false);
        return res.status(200).json({ success: true, posts });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllPosts = fetchAllPosts;
// Function for fetching post of user
const getPostOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const posts = yield postRepository.getPostOfUser(userId);
        if (!posts) {
            return res.status(400).json({ error: "Failed to fetch posts" });
        }
        return res.status(200).json({ success: true, posts });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getPostOfUser = getPostOfUser;
// Function for report post
const report = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userId, content } = req.body;
        const reportData = yield postRepository.reportPost(postId, userId, content);
        if (!reportData)
            return res.status(400).json({ error: "Failed to report post" });
        const posts = yield postRepository.getAllPosts();
        const postData = posts === null || posts === void 0 ? void 0 : posts.filter((post) => post.isBlocked === false && post.isDeleted === false);
        return res.status(200).json({ success: true, postData });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.report = report;
// Function for fetch reported posts
const reportedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const reportedPosts = yield postRepository.fetchPostWithPagination(page, limit);
        const totalPosts = (yield postRepository.getTotalCountOfReportedPosts()) || 0;
        if (!reportedPosts) {
            return res.status(400).json({ error: "Failed to fetch posts" });
        }
        const totalPages = Math.ceil(totalPosts / limit);
        return res.status(200).json({ success: true, reportedPosts, totalPages });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.reportedPosts = reportedPosts;
// Function for block post
const togglePostBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const blockedPost = yield postRepository.toggleBlock(postId);
        if (!blockedPost) {
            res.status(400).json({ error: "Failed to block post" });
        }
        const message = (blockedPost === null || blockedPost === void 0 ? void 0 : blockedPost.isBlocked)
            ? "Post blocked successfully"
            : "Post unblocked successfully";
        res.status(200).json({ success: true, message });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.togglePostBlock = togglePostBlock;
// Function for delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const deletedPost = yield postRepository.deletePost(postId);
        if (!deletedPost) {
            res.status(400).json({ error: "Failed to delete post" });
        }
        const postData = yield postRepository.getAllPosts();
        return res.status(200).json({ success: true, postData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deletePost = deletePost;
// Function for edit post
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { description } = req.body;
        console.log(postId, description, "from edit post controller");
        const updatedPost = yield postRepository.editPost(postId, description);
        if (!updatedPost) {
            res.status(400).json({ error: "Failed to edit post" });
        }
        const postData = yield postRepository.getAllPosts();
        return res.status(200).json({ success: true, postData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.editPost = editPost;
// Function for fetch all liked users
const fetchAllLikedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const likedUsers = yield postRepository.fetchAllLikedUsers(postId);
        if (!likedUsers) {
            return res.status(400).json({ error: "Failed to fetch liked users" });
        }
        return res.status(200).json({ success: true, likedUsers });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllLikedUsers = fetchAllLikedUsers;
// function for fetch total likes from all the posts 
const fetchTotalLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalLikes = yield postRepository.fetchTotalLikes();
        if (!totalLikes) {
            return res.status(400).json({ error: "Failed to fetch total likes" });
        }
        return res.status(200).json({ success: true, totalLikes });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchTotalLikes = fetchTotalLikes;
