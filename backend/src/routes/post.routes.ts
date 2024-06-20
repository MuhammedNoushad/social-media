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
import {
  addComment,
  deleteComment,
  editComment,
  fetchCountPosts,
  toggleLike,
} from "../controllers/comment.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const postRoute = express.Router();

postRoute.get("/", verifyUser, isBlock, fetchAllPosts);
postRoute.put("/:postId", verifyUser, isBlock, editPost);
postRoute.post("/:userId", verifyUser, isBlock, createNewPost);
postRoute.get("/:userId", verifyUser, isBlock, getPostOfUser);
postRoute.delete("/:postId", verifyUser, isBlock, deletePost);

postRoute.post("/add-comment/:postId", verifyUser, isBlock, addComment);
postRoute.put("/comment/:postId/:commentId", verifyUser, isBlock, editComment);
postRoute.delete(
  "/comment/:postId/:commentId",
  verifyUser,
  isBlock,
  deleteComment
);

postRoute.post("/toggle-like/:postId", verifyUser, isBlock, toggleLike);
postRoute.get("/liked-users/:postId", verifyUser, isBlock, fetchAllLikedUsers);

postRoute.get("/posts/count", verifyUser, isBlock, fetchCountPosts);
postRoute.get("/posts/total-likes", verifyUser, isBlock, fetchTotalLikes);

postRoute.post("/report/:postId", verifyUser, isBlock, report);

export default postRoute;
