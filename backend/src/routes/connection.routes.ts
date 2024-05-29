import express from "express";
import { fetchAllConnections, fetchAllFollowers, fetchAllFollowings, follow, unfollow } from "../controllers/connection.controller";
import { suggestUsers } from "../controllers/user.controllers";
const connectionRoute = express.Router();

connectionRoute.get('/:userId', fetchAllConnections);
connectionRoute.post("/follow", follow);
connectionRoute.post("/unfollow", unfollow);

connectionRoute.get('/followings/:userId',fetchAllFollowings);
connectionRoute.get('/followers/:userId',fetchAllFollowers);
connectionRoute.get('/suggest-users/:userId',suggestUsers);

export default connectionRoute;
