import Notification from "../models/notificaton.model";

class NotificationRepository {
  // Function for the fetch all notifications of a user
  async fetchNotifications(userId: string) {
    try {
      const notifications = await Notification.find({ to: userId })
        .sort({
          createdAt: -1,
        })
        .populate("from", "username _id profileimg")
        .populate("to", "username _id profileimg");
      return notifications;
    } catch (error) {
      console.error(
        "Error from fetchNotifications in NotificationRepository",
        error
      );
      return null;
    }
  }

  // Function for creating a new notification
  async createNotification(
    from: string,
    to: string,
    type: string
  ): Promise<INotification | null> {
    try {
      // Check if the notification already exists
      const existingNotification = await Notification.findOne({
        from,
        to,
        type,
      });
      if (existingNotification) {
        return existingNotification ? existingNotification.toObject() : null;
      }

      // Create a new notification
      const newNotification = new Notification({
        from,
        to,
        type,
      });
      const savedNotification = await newNotification.save();
      return savedNotification ? savedNotification.toObject() : null;
    } catch (error) {
      console.error(
        "Error from createNotification in NotificationRepository",
        error
      );
      return null;
    }
  }

  // Function for set the notification as readed
  async setReadedNotifications(userId: string) {
    try {
      await Notification.updateMany(
        { to: userId, isRead: false },
        { $set: { isRead: true } }
      );

      const getAllNotifications = await this.fetchNotifications(userId);

      return getAllNotifications;
    } catch (error) {
      console.error(
        "Error from setReadedNotifications in NotificationRepository",
        error
      );
      return null;
    }
  }

  // Function for deleting a notification
  async deleteNotification(notificationId: string) {
    try {
      const deletedNotification = await Notification.findByIdAndDelete(
        notificationId
      );
      return deletedNotification ? deletedNotification.toObject() : null;
    } catch (error) {
      console.error(
        "Error from deleteNotification in NotificationRepository",
        error
      );
      return null;
    }
  }
}

export default NotificationRepository;
