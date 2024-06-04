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
const mongodb_1 = require("mongodb");
const post_model_1 = __importDefault(require("../models/post.model"));
class PostRepository {
    // Create new post
    createNewpost(postDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = yield new post_model_1.default(postDetails).populate("userId", "comments.userId");
                if (newPost) {
                    yield newPost.save();
                    return newPost.toObject();
                }
                return null;
            }
            catch (error) {
                console.error("Error from createNewpost in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetching all posts
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_model_1.default.find({ isDeleted: false })
                    .sort({ createdAt: -1 })
                    .populate("reports.userId", "username _id profileimg")
                    .populate("userId", "username _id profileimg isVerified")
                    .populate("comments.userId", "username _id profileimg");
                if (posts) {
                    return posts.map((post) => post.toObject());
                }
                return null;
            }
            catch (error) {
                console.error("Error from getAllPosts in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetching post of user
    getPostOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_model_1.default.find({ userId, isDeleted: false })
                    .populate("userId", "username _id profileimg")
                    .populate("comments.userId", "username _id profileimg")
                    .sort({ createdAt: -1 });
                if (!posts)
                    return null;
                return posts.map((post) => post.toObject());
            }
            catch (error) {
                console.error("Error from getPostOfUser in PostRepository", error);
                return null;
            }
        });
    }
    // Function for adding a new comment
    addComment(postId, userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findOneAndUpdate({ _id: postId }, { $push: { comments: { userId, comment } } }, { new: true })
                    .populate("userId", "username _id profileimg")
                    .populate("comments.userId", "username _id profileimg");
                if (!post)
                    return null;
                return post.toObject();
            }
            catch (error) {
                console.error("Error from addComment in PostRepository", error);
                return null;
            }
        });
    }
    // Function for toggle like
    toggleLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield post_model_1.default.findById(postId);
                if (!postData)
                    return null;
                const isLiked = postData.likes.includes(new mongodb_1.ObjectId(userId));
                if (isLiked) {
                    postData.likes = postData.likes.filter((id) => !id.equals(new mongodb_1.ObjectId(userId)));
                }
                else {
                    postData.likes.push(new mongodb_1.ObjectId(userId));
                }
                // Save the updated postData
                const updatedPost = yield postData.save();
                return updatedPost ? updatedPost.toObject() : null;
            }
            catch (error) {
                console.error("Error from toggleLike in PostRepository", error);
                return null;
            }
        });
    }
    // Function for report
    reportPost(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield post_model_1.default.findById(postId);
                if (!postData)
                    return null;
                const isReported = postData.reports.some((report) => report.userId.toString() === userId);
                if (isReported) {
                    return null;
                }
                postData.reports.push({ userId: new mongodb_1.ObjectId(userId), content });
                // Save the updated postData
                const updatedPost = yield postData.save();
                return updatedPost ? updatedPost.toObject() : null;
            }
            catch (error) {
                console.error("Error from reportPost in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetching block posts
    toggleBlock(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findById(postId);
                if (!post)
                    return null;
                post.isBlocked = !post.isBlocked;
                // Save the updated postData
                const updatedPost = yield post.save();
                return updatedPost ? updatedPost.toObject() : null;
            }
            catch (error) {
                console.log("Error from blockPost in PostRepository", error);
                return null;
            }
        });
    }
    // Function for delete post
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPost = yield post_model_1.default.findByIdAndUpdate(postId, {
                    isDeleted: true,
                });
                return deletedPost;
            }
            catch (error) {
                console.log("Error from deletePost in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetch reported posts with pagination
    fetchPostWithPagination(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_model_1.default.find({ isDeleted: false, reports: { $ne: [] } })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate("userId", "username _id profileimg")
                    .populate("comments.userId", "username _id profileimg")
                    .sort({ createdAt: -1 });
                if (!posts)
                    return null;
                return posts.map((post) => post.toObject());
            }
            catch (error) {
                console.log("Error from fetchPostWithPagination in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetch total count of reported posts
    getTotalCountOfReportedPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPost = yield post_model_1.default.countDocuments({
                    isDeleted: false,
                    reports: { $ne: [] },
                });
                return totalPost;
            }
            catch (error) {
                console.log("Error from getTotalCountOfReportedPosts in PostRepository", error);
            }
        });
    }
    // Function for edit comment
    editComment(postId, commentId, newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findOneAndUpdate({
                    _id: postId,
                    "comments._id": commentId,
                }, {
                    $set: {
                        "comments.$.comment": newComment,
                    },
                }, { new: true });
                return post;
            }
            catch (error) {
                console.log("Error from editComment in PostRepository", error);
                return null;
            }
        });
    }
    // Function for delete comment
    deleteComment(postId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findOneAndUpdate({
                    _id: postId,
                    "comments._id": commentId,
                }, {
                    $pull: {
                        comments: {
                            _id: commentId,
                        },
                    },
                }, { new: true });
                return post;
            }
            catch (error) {
                console.log("Error from deleteComment in PostRepository", error);
                return null;
            }
        });
    }
    // Function for edit post
    editPost(postId, newDiscription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findOneAndUpdate({
                    _id: postId,
                }, {
                    $set: {
                        description: newDiscription,
                    },
                }, { new: true });
                return post;
            }
            catch (error) {
                console.log("Error from editPost in PostRepository", error);
                return null;
            }
        });
    }
    // Function for  fetch all liked users
    fetchAllLikedUsers(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.default.findById(postId).populate("likes");
                if (!post)
                    return null;
                return post.likes;
            }
            catch (error) {
                console.log("Error from fetchAllLikedUsers in PostRepository", error);
                return null;
            }
        });
    }
    // Function for fetch the total count of posts
    fetchTotalPostsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPost = yield post_model_1.default.countDocuments({ isDeleted: false });
                return totalPost;
            }
            catch (error) {
                console.log("Error from fetchTotalPostsCount in PostRepository", error);
            }
        });
    }
    // Function for fetch total likes from all the posts
    fetchTotalLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalLikes = yield post_model_1.default.aggregate([
                    { $match: { isDeleted: false } },
                    { $unwind: "$likes" },
                    { $group: { _id: null, totalLikes: { $sum: 1 } } },
                ]);
                if (totalLikes.length > 0) {
                    return totalLikes[0].totalLikes;
                }
                else {
                    return 0;
                }
            }
            catch (error) {
                console.log("Error from fetchTotalLikes in PostRepository", error);
            }
        });
    }
    // Function for fetch data for chart post 
    fetchDataForChartPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chartData = yield post_model_1.default.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m",
                                    date: "$createdAt"
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } },
                    { $group: {
                            _id: null,
                            posts: { $push: "$count" }
                        } },
                    { $project: {
                            _id: 0,
                            success: { $literal: true },
                            chartData: "$posts"
                        } }
                ]);
                return chartData;
            }
            catch (error) {
                console.log("Error from fetchDataForChartPost in PostRepository", error);
            }
        });
    }
}
exports.default = PostRepository;
