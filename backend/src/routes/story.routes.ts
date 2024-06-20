import express from "express";
import {
  addNewStory,
  deleteStory,
  fetchAllStories,
  fetchSingleUserStory,
  updateStoryViews,
} from "../controllers/story.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const storyRoute = express.Router();

storyRoute.get("/", verifyUser, isBlock, fetchAllStories);
storyRoute.get("/:userId", verifyUser, isBlock, fetchSingleUserStory);
storyRoute.post("/:userId", verifyUser, isBlock, addNewStory);
storyRoute.put("/:storyId/:userId", verifyUser, isBlock, updateStoryViews);
storyRoute.delete("/:storyId/:userId", verifyUser, isBlock, deleteStory);

export default storyRoute;
