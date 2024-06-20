"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const story_controllers_1 = require("../controllers/story.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const isBlock_1 = __importDefault(require("../middleware/isBlock"));
const storyRoute = express_1.default.Router();
storyRoute.get("/", verifyToken_1.default, isBlock_1.default, story_controllers_1.fetchAllStories);
storyRoute.get("/:userId", verifyToken_1.default, isBlock_1.default, story_controllers_1.fetchSingleUserStory);
storyRoute.post("/:userId", verifyToken_1.default, isBlock_1.default, story_controllers_1.addNewStory);
storyRoute.put("/:storyId/:userId", verifyToken_1.default, isBlock_1.default, story_controllers_1.updateStoryViews);
storyRoute.delete("/:storyId/:userId", verifyToken_1.default, isBlock_1.default, story_controllers_1.deleteStory);
exports.default = storyRoute;
