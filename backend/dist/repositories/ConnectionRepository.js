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
const connection_model_1 = __importDefault(require("../models/connection.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class ConnectionRepository {
    // Function for following
    followUser(userId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_model_1.default.findOneAndUpdate({ userId }, { $addToSet: { following: followingId } }, { upsert: true });
                yield connection_model_1.default.findOneAndUpdate({ userId: followingId }, { $addToSet: { followers: userId } }, { upsert: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   Function for unfollowing
    unfollowUser(userId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_model_1.default.findOneAndUpdate({ userId }, { $pull: { following: followingId } });
                yield connection_model_1.default.findOneAndUpdate({ userId: followingId }, { $pull: { followers: userId } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   Function for checking the user is following or not
    isFollowing(userId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield connection_model_1.default.findOne({
                    userId,
                    following: { $in: [new mongodb_1.ObjectId(followingId)] },
                });
                return !!connection;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetching all connections
    fetchAllConnections(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield connection_model_1.default.findOne({ userId })
                    .populate("followers")
                    .populate("following");
                return connection;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch all followings
    fetchAllFollowings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followings = yield connection_model_1.default.findOne({ userId }).populate({
                    path: "following",
                    select: "-password",
                });
                return followings;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch all followers
    fetchAllFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followers = yield connection_model_1.default.findOne({ userId }).populate({
                    path: "followers",
                    select: "-password",
                });
                return followers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch not following users
    suggestUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the connection for the user and populate the following field
                const connection = yield connection_model_1.default.findOne({ userId }).populate({
                    path: "following",
                    select: "_id",
                });
                if (!connection) {
                    return [];
                }
                // Extract the list of followed user IDs
                const followedUserIds = connection.following.map((follower) => follower._id.toString());
                // Find users that are not followed by the user and exclude the user themselves
                const suggestedUsers = yield user_model_1.default.find({
                    isAdmin: false,
                    isBlock: false,
                    _id: {
                        $nin: [...followedUserIds, userId],
                    },
                })
                    .select("-password")
                    .limit(5);
                return suggestedUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ConnectionRepository;
