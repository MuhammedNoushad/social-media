import Sidebar from "../../../components/user/common/Sidebar";
import MessageContainer from "../../../components/user/message/MessageContainer";
import MessageList from "../../../components/user/message/MessageList";

function UserMessage() {
  return (
    <div className="flex h-screen ">
      <div className="w-1/12 ">
        <Sidebar page="message" />
      </div>
      <div className=" w-auto lg:w-3/12 ">
        <MessageList />
      </div>
      <div className=" w-8/12 hidden lg:block">
        <MessageContainer />
      </div>
    </div>
  );
}

export default UserMessage;
