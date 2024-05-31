import express from "express";
import { addNewStory, deleteStory, fetchAllStories, fetchSingleUserStory, updateStoryViews } from "../controllers/story.controllers";

const storyRoute = express.Router();

storyRoute.get('/', fetchAllStories);
storyRoute.get('/:userId', fetchSingleUserStory);
storyRoute.post("/:userId", addNewStory);
storyRoute.put('/:storyId/:userId',updateStoryViews)
storyRoute.delete("/:storyId/:userId",deleteStory)

export default storyRoute;
