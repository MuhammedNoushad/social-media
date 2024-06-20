import express from "express";
import {
  fetchAllConnections,
  fetchAllFollowers,
  fetchAllFollowings,
  follow,
  unfollow,
} from "../controllers/connection.controller";
import { suggestUsers } from "../controllers/user.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";
const connectionRoute = express.Router();

connectionRoute.get("/:userId", verifyUser, isBlock, fetchAllConnections);
connectionRoute.post("/follow", verifyUser, isBlock, follow);
connectionRoute.post("/unfollow", verifyUser, isBlock, unfollow);

connectionRoute.get(
  "/followings/:userId",
  verifyUser,
  isBlock,
  fetchAllFollowings
);
connectionRoute.get(
  "/followers/:userId",
  verifyUser,
  isBlock,
  fetchAllFollowers
);
connectionRoute.get(
  "/suggest-users/:userId",
  verifyUser,
  isBlock,
  suggestUsers
);

export default connectionRoute;
