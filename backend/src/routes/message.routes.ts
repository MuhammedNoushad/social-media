import express from "express";
import {
  fetchConverstions,
  fetchUsersToChat,
  getMessage,
  setMessage,
} from "../controllers/message.controllers";
import verifyUser from "../middleware/verifyToken";

const messageRoute = express.Router();

messageRoute.get("/chat-list/:userId", verifyUser, fetchUsersToChat);
messageRoute.get("/:userId/:userToChatId", verifyUser, getMessage);
messageRoute.post("/:userId/:userToChatId", verifyUser, setMessage);
messageRoute.get("/conversation/:userId", verifyUser, fetchConverstions);

export default messageRoute;
