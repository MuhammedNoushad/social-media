import express from "express";
import { addNewStory, deleteStory, fetchAllStories, fetchSingleUserStory } from "../controllers/story.controllers";

const storyRoute = express.Router();

storyRoute.get('/', fetchAllStories);
storyRoute.get('/:userId', fetchSingleUserStory);
storyRoute.post("/:userId", addNewStory);
storyRoute.delete("/:storyId/:userId",deleteStory)

export default storyRoute;
