import { useState } from "react";
import Sidebar from "../../../components/user/common/Sidebar";
import MessageContainer from "../../../components/user/message/MessageContainer";
import MessageList from "../../../components/user/message/MessageList";
import MessagePlaceholder from "../../../components/user/common/MessagePlaceholder";
import { useLocation } from "react-router-dom";

function UserMessage() {
  const location = useLocation();
  const userToChatId = location.state?.userId;

  const [selectedUser, setSelectedUser] = useState<string>(userToChatId || "");
  const handleUserSelection = (userId: string) => {
    setSelectedUser(userId);
  };
  return (
    <div className="flex h-screen ">
      <div className="w-1/12 ">
        <Sidebar page="message" />
      </div>
      <div className=" w-auto lg:w-3/12 ">
        <MessageList onHandleUserSelection={handleUserSelection} />
      </div>
      <div className=" w-8/12 ">
        {selectedUser ? (
          <MessageContainer userToChatId={selectedUser} />
        ) : (
          <MessagePlaceholder />
        )}
      </div>
    </div>
  );
}

export default UserMessage;
