import express from "express";
import {
  fetchConverstions,
  fetchUsersToChat,
  getMessage,
  setMessage,
} from "../controllers/message.controllers";

const messageRoute = express.Router();

messageRoute.get("/chat-list/:userId", fetchUsersToChat);
messageRoute.get("/:userId/:userToChatId", getMessage);
messageRoute.post("/:userId/:userToChatId", setMessage);
messageRoute.get("/conversation/:userId", fetchConverstions);

export default messageRoute;
