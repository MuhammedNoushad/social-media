import express from "express";

import { blockUser, fetchChartData, fetchChartDataPost, fetchLatestUsers, getUsers } from "../controllers/admin.controllers";
import verifyToken from "../middleware/verifyToken";
import { reportedPosts, togglePostBlock } from "../controllers/post.controllers";

const adminRoute = express.Router();

adminRoute.get("/users", verifyToken, getUsers);
adminRoute.put("/block-user/:userId", verifyToken, blockUser);
adminRoute.get('/users/chart/data',fetchChartData)


adminRoute.get('/users/latest',fetchLatestUsers)

adminRoute.get('/reported-posts',reportedPosts)
adminRoute.put('/block-post/:postId',togglePostBlock)
adminRoute.get('/posts/chart/data',fetchChartDataPost)

export default adminRoute;
