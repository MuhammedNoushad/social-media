import express from "express";
import {
  createNewPost,
  fetchAllPosts,
  getPostOfUser,
} from "../controllers/post.controllers";
import verifyToken from "../middleware/verifyToken";
import { addComment } from "../controllers/comment.controllers";

const postRoute = express.Router();

postRoute.post("/:userId", verifyToken, createNewPost);
postRoute.get("/", verifyToken, fetchAllPosts);
postRoute.get("/:userId", verifyToken, getPostOfUser);


postRoute.post('/add-comment/:postId',addComment);

export default postRoute;
