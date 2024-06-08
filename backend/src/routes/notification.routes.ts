import express from "express";
import { deleteNotifications, fetchNotifications, setReadedNotifications } from "../controllers/notification.controllers";
import verifyUser from "../middleware/verifyToken";

const notificationRoute = express.Router();

notificationRoute.get('/:userId',verifyUser,fetchNotifications)
notificationRoute.post('/:userId',verifyUser,setReadedNotifications)
notificationRoute.delete('/:notificationId',verifyUser,deleteNotifications)

export default notificationRoute