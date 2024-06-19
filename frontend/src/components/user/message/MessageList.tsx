import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "../../../axios/axios";
import { RootState } from "../../../store/store";
import { useSocketContext } from "../../../Context/SocketContext";
import IConversation from "../../../types/IConversation";
import formatMessageTimeStamp from "../../../utils/fromatMessageTimeStamp";

function MessageList({
  onHandleUserSelection,
}: {
  onHandleUserSelection: (userId: string) => void;
}) {
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const loggedUser = useSelector((state: RootState) => state.user);

  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("/api/user/users");
        const response = await axios.get(
          `/api/messages/chat-list/${loggedUser._id}`
        );
        const data = response.data.conversations;

        if (data) {
          // Sort conversations by updatedAt to get the latest chats on top
          const sortedConversations = data.sort(
            (a: IConversation, b: IConversation) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );

          setConversations(sortedConversations);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [loggedUser._id, conversations]);

  // Function for formating the last message
  const formatingLastMessage = (message: string) => {
    if (message.length > 20) {
      return message.slice(0, 20) + "...";
    } else {
      return message;
    }
  };

  return (
    <div className="p-4 border-x-2 border-gray-300 h-full">
      <header className="p-4 border-b border-gray-300 flex justify-center items-center text-black">
        <h1 className="text-2xl font-semibold font-roboto-condensed">
          {loggedUser.username}
        </h1>
      </header>
      <div className="overflow-y-auto h-[calc(100vh-112px)]">
        {conversations.map((conversation: IConversation) => {
          // Filter out the logged-in user from the participants
          const participant = conversation.participants.find(
            (user) => user._id !== loggedUser._id
          );
          return (
            <div
              onClick={() => onHandleUserSelection(participant?._id || "")}
              key={conversation._id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <div
                className={`w-12 h-12 bg-gray-300 rounded-full mr-3 relative me-4 avatar ${
                  onlineUsers.includes(participant?._id || "") ? "online" : ""
                }`}
              >
                <img
                  src={participant?.profileimg}
                  alt={`${participant?.username} Avatar`}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold font-roboto-condensed">
                  {participant?.username}
                </h2>
                <p className="text-gray-600 font-medium font-roboto-condensed">
                  {formatingLastMessage(conversation.lastMessage)}{" "}
                  <span className="text-gray-500 font-roboto-condensed font-normal text-xs ml-2">
                    *{formatMessageTimeStamp(conversation.updatedAt)}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MessageList;
