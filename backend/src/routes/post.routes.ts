import express from "express";
import {
  createNewPost,
  fetchAllPosts,
  getPostOfUser,
  report,
} from "../controllers/post.controllers";
import verifyToken from "../middleware/verifyToken";
import { addComment, toggleLike } from "../controllers/comment.controllers";

const postRoute = express.Router();

postRoute.post("/:userId", verifyToken, createNewPost);
postRoute.get("/", verifyToken, fetchAllPosts);
postRoute.get("/:userId", verifyToken, getPostOfUser);


postRoute.post('/add-comment/:postId',addComment);

postRoute.post('/toggle-like/:postId',toggleLike)

postRoute.post('/report/:postId',report)

export default postRoute;
