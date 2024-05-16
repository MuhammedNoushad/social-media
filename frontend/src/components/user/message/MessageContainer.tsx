import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import axios from "../../../axios/axios";
import { RootState } from "../../../store/store";
import IMessage from "../../../types/IMessage";
import IConversation from "../../../types/IConversation";
import { useNavigate } from "react-router-dom";

function MessageContainer({ userToChatId }: { userToChatId: string }) {
  const [conversation, setConversation] = useState<IConversation>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userToChatData, setUserToChatData] = useState<any>({});

  const navigate = useNavigate();

  const loggedInUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch messages for the selected user
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `/api/messages/${loggedInUser._id}/${userToChatId}`
        );
        const data = response.data;

        if (data.success) {
          console.log(data.conversations, "data.conversations");
          setConversation(data.conversations);
        } else {
          toast.error("Error fetching messages");
        }
      } catch (error) {
        toast.error("Error fetching messages");
      }
    };

    const fetchUserToChatData = async () => {
      try {
        const response = await axios.get(`/api/user/${userToChatId}`);
        const data = response.data;
        if (data.success) {
          setUserToChatData(data.userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserToChatData();
    fetchConversation();
  }, [loggedInUser._id, userToChatId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-gray-100 py-2 px-4  fixed top-0 w-8/12 right-0 z-10">
        <div
          onClick={() => navigate(`/profile/${userToChatId}`)}
          className="flex items-center cursor-pointer"
        >
          <img
            src={userToChatData.profileimg}
            alt={userToChatData.username}
            className="w-10 h-10 rounded-full mr-2"
          />
          <h2 className="text-lg font-semibold">{userToChatData.username}</h2>
        </div>
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-x-auto mb-4 mt-16">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2 p-6 h-5">
            {conversation &&
              conversation.messages?.map((message: IMessage) => (
                <div
                  key={message._id}
                  className={`${
                    message.sender._id === loggedInUser._id
                      ? "col-start-1 col-end-8"
                      : "col-start-6 col-end-13"
                  } p-3 rounded-lg`}
                >
                  <div
                    className={`flex ${
                      message.sender._id === loggedInUser._id
                        ? "items-center justify-start"
                        : "items-center justify-start flex-row-reverse"
                    }`}
                  >
                    {message.receiver._id !== loggedInUser._id && (
                      <img
                        src={message.receiver.profileimg}
                        alt={message.receiver.username}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    )}
                    <div
                      className={`${
                        message.sender._id === loggedInUser._id
                          ? "relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                          : "flex items-center justify-center flex-shrink-0"
                      }`}
                    >
                      {message.sender._id === loggedInUser._id ? (
                        <div className="font-roboto-condensed font-medium text-base text-black text-pretty">
                          {message.message}
                        </div>
                      ) : (
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div className="font-roboto-condensed font-medium text-base text-black text-pretty">
                            {message.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  A
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vel ipsa commodi illum saepe numquam maxime asperiores
                    voluptate sit, minima perspiciatis.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-start-6 col-end-13 p-3 rounded-lg">
              <div className="flex items-center justify-start flex-row-reverse">
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                  <div>I'm ok what about you?</div>
                </div>
              </div>
            </div> */}
            {/* ... other message divs */}
          </div>
        </div>
        <div className="flex items-center border mx-4 border-gray-300 p-1 rounded-lg mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-lg bg-white focus:outline-none font-roboto-condensed font-medium text-base text-black"
          />
          <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
