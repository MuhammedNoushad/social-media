import express from "express";
import {
  deleteNotifications,
  fetchNotifications,
  setReadedNotifications,
} from "../controllers/notification.controllers";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const notificationRoute = express.Router();

notificationRoute.get("/:userId", verifyUser, isBlock, fetchNotifications);
notificationRoute.post("/:userId", verifyUser, isBlock, setReadedNotifications);
notificationRoute.delete(
  "/:notificationId",
  verifyUser,
  isBlock,
  deleteNotifications
);

export default notificationRoute;
