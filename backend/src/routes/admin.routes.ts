import express from "express";
import { blockUser, getUsers } from "../controllers/admin.controllers";
import verifyToken from "../middleware/verifyToken";
import { reportedPosts, togglePostBlock } from "../controllers/post.controllers";

const adminRoute = express.Router();

adminRoute.get("/users", verifyToken, getUsers);
adminRoute.put("/block-user/:userId", verifyToken, blockUser);

adminRoute.get('/reported-posts',reportedPosts)
adminRoute.put('/block-post/:postId',togglePostBlock)

export default adminRoute;
