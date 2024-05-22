import express from "express";
import { deleteNotifications, fetchNotifications, setReadedNotifications } from "../controllers/notification.controllers";

const notificationRoute = express.Router();

notificationRoute.get('/:userId',fetchNotifications)
notificationRoute.post('/:userId',setReadedNotifications)
notificationRoute.delete('/:notificationId',deleteNotifications)

export default notificationRoute