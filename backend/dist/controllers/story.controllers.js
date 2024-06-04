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
exports.updateStoryViews = exports.fetchSingleUserStory = exports.deleteStory = exports.fetchAllStories = exports.addNewStory = void 0;
const StoryRepository_1 = __importDefault(require("../repositories/StoryRepository"));
const storyRepository = new StoryRepository_1.default();
// Function for add new story
const addNewStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { storyImg } = req.body;
        console.log(storyImg, "story img");
        const newStory = yield storyRepository.createNewStory(userId, storyImg);
        const stories = yield storyRepository.fetchAllStories();
        if (newStory) {
            res.status(200).json({
                success: true,
                message: "Story created successfully",
                stories,
            });
        }
        else {
            res.status(400).json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.addNewStory = addNewStory;
// Function for fetch all stories
const fetchAllStories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stories = yield storyRepository.fetchAllStories();
        if (stories) {
            res.status(200).json({ success: true, stories });
        }
        else {
            res.status(400).json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllStories = fetchAllStories;
// Function for delete story
const deleteStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storyId, userId } = req.params;
        yield storyRepository.deleteStory(storyId, userId);
        const stories = yield storyRepository.fetchSingleUserStory(userId);
        res.status(200).json({ success: true, message: "Story deleted", stories });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteStory = deleteStory;
// Function for fetch single user story
const fetchSingleUserStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const stories = yield storyRepository.fetchSingleUserStory(userId);
        if (stories) {
            res.status(200).json({ success: true, stories });
        }
        else {
            res.status(400).json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchSingleUserStory = fetchSingleUserStory;
// Function for update story views
const updateStoryViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storyId, userId } = req.params;
        const { viewedUserId } = req.body;
        if (userId === viewedUserId) {
            return res.status(400).json({ error: "You can't view your own story" });
        }
        yield storyRepository.updateStoryViews(storyId, userId, viewedUserId);
        const stories = yield storyRepository.fetchSingleUserStory(userId);
        res.status(200).json({ success: true, message: "Story updated", stories });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateStoryViews = updateStoryViews;
