import express from "express";
import { fetchAllConnections, fetchAllFollowers, fetchAllFollowings, follow, unfollow } from "../controllers/connection.controller";
import { suggestUsers } from "../controllers/user.controllers";
import verifyUser from "../middleware/verifyToken";
const connectionRoute = express.Router();

connectionRoute.get('/:userId',verifyUser, fetchAllConnections);
connectionRoute.post("/follow",verifyUser, follow);
connectionRoute.post("/unfollow",verifyUser, unfollow);

connectionRoute.get('/followings/:userId',verifyUser,fetchAllFollowings);
connectionRoute.get('/followers/:userId',verifyUser,fetchAllFollowers);
connectionRoute.get('/suggest-users/:userId',verifyUser,suggestUsers);

export default connectionRoute;
