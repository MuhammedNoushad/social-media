import express from "express";
import {
  createNewPost,
  deletePost,
  editPost,
  fetchAllLikedUsers,
  fetchAllPosts,
  fetchTotalLikes,
  getPostOfUser,
  report,
} from "../controllers/post.controllers";
import verifyToken from "../middleware/verifyToken";
import {
  addComment,
  deleteComment,
  editComment,
  fetchCountPosts,
  toggleLike,
} from "../controllers/comment.controllers";

const postRoute = express.Router();

postRoute.get("/", verifyToken, fetchAllPosts);
postRoute.put("/:postId", editPost);
postRoute.post("/:userId", verifyToken, createNewPost);
postRoute.get("/:userId", verifyToken, getPostOfUser);
postRoute.delete("/:postId", deletePost);


postRoute.post("/add-comment/:postId", addComment);
postRoute.put("/comment/:postId/:commentId", editComment);
postRoute.delete("/comment/:postId/:commentId", deleteComment);

postRoute.post("/toggle-like/:postId", toggleLike);
postRoute.get("/liked-users/:postId", fetchAllLikedUsers);

postRoute.get("/posts/count", fetchCountPosts);
postRoute.get('/posts/total-likes',fetchTotalLikes)


postRoute.post("/report/:postId", report);

export default postRoute;
