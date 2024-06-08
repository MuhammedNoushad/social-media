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

const adminRoute = express.Router();

adminRoute.get("/users", verifyUser, verifyToken, getUsers);
adminRoute.put("/block-user/:userId", verifyUser, verifyToken, blockUser);
adminRoute.get("/users/chart/data", verifyUser, fetchChartData);

adminRoute.get("/users/latest", verifyUser, fetchLatestUsers);

adminRoute.get("/reported-posts", verifyUser, reportedPosts);
adminRoute.put("/block-post/:postId", verifyUser, togglePostBlock);
adminRoute.get("/posts/chart/data", verifyUser, fetchChartDataPost);

export default adminRoute;
