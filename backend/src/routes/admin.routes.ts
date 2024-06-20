import express from "express";

import {
  blockUser,
  fetchChartData,
  fetchChartDataPost,
  fetchLatestUsers,
  getUsers,
} from "../controllers/admin.controllers";
import verifyToken from "../middleware/verifyToken";
import {
  reportedPosts,
  togglePostBlock,
} from "../controllers/post.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const adminRoute = express.Router();

adminRoute.get("/users", verifyUser, verifyToken, isBlock, getUsers);
adminRoute.put(
  "/block-user/:userId",
  verifyUser,
  isBlock,
  verifyToken,
  blockUser
);
adminRoute.get("/users/chart/data", verifyUser, isBlock, fetchChartData);

adminRoute.get("/users/latest", verifyUser, isBlock, fetchLatestUsers);

adminRoute.get("/reported-posts", verifyUser, isBlock, reportedPosts);
adminRoute.put("/block-post/:postId", verifyUser, isBlock, togglePostBlock);
adminRoute.get("/posts/chart/data", verifyUser, isBlock, fetchChartDataPost);

export default adminRoute;
