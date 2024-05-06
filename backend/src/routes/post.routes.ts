import express from "express";
import {
  createNewPost,
  fetchAllPosts,
  getPostOfUser,
} from "../controllers/post.controllers";
import verifyToken from "../middleware/verifyToken";

const postRoute = express.Router();

postRoute.post("/:userId", verifyToken, createNewPost);
postRoute.get("/", verifyToken, fetchAllPosts);
postRoute.get("/:userId", verifyToken, getPostOfUser);

export default postRoute;
