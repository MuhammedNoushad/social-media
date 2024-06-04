"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const story_controllers_1 = require("../controllers/story.controllers");
const storyRoute = express_1.default.Router();
storyRoute.get('/', story_controllers_1.fetchAllStories);
storyRoute.get('/:userId', story_controllers_1.fetchSingleUserStory);
storyRoute.post("/:userId", story_controllers_1.addNewStory);
storyRoute.put('/:storyId/:userId', story_controllers_1.updateStoryViews);
storyRoute.delete("/:storyId/:userId", story_controllers_1.deleteStory);
exports.default = storyRoute;
