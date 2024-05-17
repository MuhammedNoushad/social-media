import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IUserDetails from "../../../types/IUserDetails";
import axios from "../../../axios/axios";
import { RootState } from "../../../store/store";
import { useSocketContext } from "../../../Context/SocketContext";

function MessageList({
  onHandleUserSelection,
}: {
  onHandleUserSelection: (userId: string) => void;
}) {
  const [users, setUsers] = useState<IUserDetails[]>([]);
  const loggedUser = useSelector((state: RootState) => state.user);

  const { onlineUsers  } = useSocketContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/users");
        const data = response.data.usersData;

        if (data) {
          const filteredUsers = data.filter(
            (user: { _id: string }) => user._id !== loggedUser._id
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [loggedUser._id]);

  return (
    <div className="p-4 border-x-2 border-gray-300 h-full">
      <header className="p-4 border-b border-gray-300 flex justify-center items-center text-black">
        <h1 className="text-2xl font-semibold font-roboto-condensed">
          {loggedUser.username}
        </h1>
      </header>
      <div className="overflow-y-auto h-[calc(100vh-112px)]">
        {users.map((user: IUserDetails) => (
          <div
            onClick={() => onHandleUserSelection(user._id)}
            key={user._id}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <div
              className={`w-12 h-12 bg-gray-300 rounded-full mr-3 relative me-4 avatar ${
                onlineUsers.includes(user._id) ? "online" : ""
              }`}
            >
              <img
                src={user.profileimg}
                alt={`${user.username} Avatar`}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold font-roboto-condensed">
                {user.firstName}
                {""} {user.lastName}
              </h2>
              <p className="text-gray-600 font-roboto-condensed">
                @{user.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MessageList;
