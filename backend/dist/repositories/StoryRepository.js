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
const mongoose_1 = __importDefault(require("mongoose"));
const story_model_1 = __importDefault(require("../models/story.model"));
class StoryRepository {
    // Function for creating a new story
    createNewStory(userId, storyImg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingStory = yield story_model_1.default.findOne({ userId });
                if (existingStory) {
                    const newStory = yield story_model_1.default.findOneAndUpdate({ userId }, { $push: { story: { storyImg } } }, { new: true });
                    return newStory;
                }
                const newStory = yield story_model_1.default.create({
                    userId,
                    story: [{ storyImg }],
                });
                return newStory;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetching all stories
    fetchAllStories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stories = yield story_model_1.default.find({}).populate("userId", "username _id profileimg");
                return stories;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for deleting a story
    deleteStory(storyId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield story_model_1.default.updateOne({ userId, "story._id": storyId }, { $pull: { story: { _id: storyId } } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch single user story
    fetchSingleUserStory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stories = yield story_model_1.default.findOne({ userId }).populate({
                    path: "story.viewed",
                    model: "User",
                });
                return stories;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for updating story views
    updateStoryViews(storyId, userId, viewedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield story_model_1.default.updateOne({
                    userId,
                    story: { $elemMatch: { _id: new mongoose_1.default.Types.ObjectId(storyId) } },
                }, { $addToSet: { "story.$.viewed": viewedUserId } });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = StoryRepository;
