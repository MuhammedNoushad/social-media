import { useNavigate } from "react-router-dom";
import INotification from "../../../types/INotification";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { useSocketContext } from "../../../Context/SocketContext";

const NotificationModal = ({
  isOpen,
  notifications,
  setNotifications,
}: {
  isOpen: boolean;
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
}) => {
  const navigate = useNavigate();

  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("notification", (data) => {
      console.log(data, "from socket");
      setNotifications(data);
    });
  });

  return isOpen ? (
    <div
      className={`fixed left-16 top-0 bottom-0 w-80 p-4 bg-white border-x-4 border-l-red-500 z-50 transform translate-x-0 transition-transform ease-in-out duration-800`}
    >
      <div className="flex justify-center items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold font-roboto-condensed">
          Notifications
        </h2>
        {/* Add a close button if needed */}
      </div>
      <div className="overflow-y-auto">
        {notifications &&
          notifications.map((notification: INotification) => (
            <div
              key={notification._id}
              className="p-4 mb-4 border-b border-gray-200 last:border-b-0 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md"
            >
              <div className="flex items-center space-x-4 cursor-pointer">
                {/* Avatar */}
                <img
                  onClick={() => {
                    navigate(`/profile/${notification.from._id}`);
                  }}
                  src={notification.from.profileimg}
                  alt={`${notification.from.username}'s profile`}
                  className="w-10 h-10 rounded-full object-cover avatar"
                />
                <div className="text-gray-700">
                  {notification.type === "like" && (
                    <p className="font-roboto-condensed">
                      <span className="font-bold font-roboto-condensed">
                        {notification.from.username}
                      </span>{" "}
                      liked your post.{" "}
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                  )}
                  {notification.type === "comment" && (
                    <p className="font-roboto-condensed">
                      <span className="font-bold font-roboto-condensed">
                        {notification.from.username}
                      </span>{" "}
                      commented on your post.{" "}
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                  )}
                  {notification.type === "follow" && (
                    <p className="font-roboto-condensed">
                      <span className="font-bold font-roboto-condensed">
                        {notification.from.username}
                      </span>{" "}
                      started following you.{" "}
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default NotificationModal;
