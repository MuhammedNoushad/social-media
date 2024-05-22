import { Request, Response } from "express";

import NotificationRepository from "../repositories/NotificationRepository";

const notificationRepository = new NotificationRepository();

// Function for fetch notifications
export const fetchNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await notificationRepository.fetchNotifications(
      userId
    );

    if (!notifications) {
      return res.status(400).json({ error: "Failed to fetch notifications" });
    }

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for set the notification as readed
export const setReadedNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await notificationRepository.setReadedNotifications(
      userId
    );

    if (!notifications) {
      return res.status(400).json({ error: "Failed to set notifications" });
    }

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for delete the notification
export const deleteNotifications = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationRepository.deleteNotification(
      notificationId
    );

    if (!notification) {
      return res.status(400).json({ error: "Failed to delete notifications" });
    }

    return res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
