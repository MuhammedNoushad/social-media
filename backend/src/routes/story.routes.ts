import express from "express";
import {
  addNewStory,
  deleteStory,
  fetchAllStories,
  fetchSingleUserStory,
  updateStoryViews,
} from "../controllers/story.controllers";
import verifyUser from "../middleware/verifyToken";

const storyRoute = express.Router();

storyRoute.get("/", verifyUser, fetchAllStories);
storyRoute.get("/:userId", verifyUser, fetchSingleUserStory);
storyRoute.post("/:userId", verifyUser, addNewStory);
storyRoute.put("/:storyId/:userId", verifyUser, updateStoryViews);
storyRoute.delete("/:storyId/:userId", verifyUser, deleteStory);

export default storyRoute;
