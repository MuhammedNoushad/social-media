import express from "express";
import {
  fetchConverstions,
  fetchUsersToChat,
  getMessage,
  setMessage,
} from "../controllers/message.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const messageRoute = express.Router();

messageRoute.get("/chat-list/:userId", verifyUser, isBlock, fetchUsersToChat);
messageRoute.get("/:userId/:userToChatId", verifyUser, isBlock, getMessage);
messageRoute.post("/:userId/:userToChatId", verifyUser, isBlock, setMessage);
messageRoute.get(
  "/conversation/:userId",
  verifyUser,
  isBlock,
  fetchConverstions
);

export default messageRoute;
