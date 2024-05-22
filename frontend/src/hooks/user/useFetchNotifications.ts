import axios from "../../axios/axios";

// Function for fetch notifications
const useFetchNotifications = () => {
  // Function for fetch notification of a specific user
  const fetchNotifications = async (userId: string) => {
    try {
      const response = await axios.get(`/api/user/notification/${userId}`);
      const data = response.data;

      console.log(data.notifications, "notifications");
      if (data.success) {
        return data.notifications;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Function for mark all notifications as read
  const markAllAsRead = async (userId: string) => {
    try {
      const response = await axios.post(`/api/user/notification/${userId}`);
      const data = response.data;
      console.log(data.notifications, "notifications");
      if (data.success) {
        return data.notifications;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    fetchNotifications,
    markAllAsRead,
  };
};

export default useFetchNotifications;
