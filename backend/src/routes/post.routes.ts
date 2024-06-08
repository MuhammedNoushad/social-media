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

const postRoute = express.Router();

postRoute.get("/",verifyUser, fetchAllPosts);
postRoute.put("/:postId",verifyUser, editPost);
postRoute.post("/:userId",verifyUser, createNewPost);
postRoute.get("/:userId",verifyUser, getPostOfUser);
postRoute.delete("/:postId",verifyUser, deletePost);


postRoute.post("/add-comment/:postId",verifyUser, addComment);
postRoute.put("/comment/:postId/:commentId",verifyUser, editComment);
postRoute.delete("/comment/:postId/:commentId",verifyUser, deleteComment);

postRoute.post("/toggle-like/:postId", verifyUser,toggleLike);
postRoute.get("/liked-users/:postId",verifyUser, fetchAllLikedUsers);

postRoute.get("/posts/count",verifyUser, fetchCountPosts);
postRoute.get('/posts/total-likes',verifyUser,fetchTotalLikes)


postRoute.post("/report/:postId",verifyUser, report);

export default postRoute;
