import express from "express";
import { createNewPost, fetchAllPosts, getPostOfUser } from "../controllers/post.controllers";

const postRoute = express.Router();

postRoute.post('/:userId',createNewPost)
postRoute.get('/',fetchAllPosts);
postRoute.get('/:userId',getPostOfUser)

export default postRoute