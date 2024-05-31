import IMessage from "./IMessage";
import IUserDetails from "./IUserDetails";

interface IConversation {
  _id: string;
  updatedAt: string | number | Date;
  sender: IUserDetails;
  receiver: IUserDetails;
  messages: IMessage[];
  participants: IUserDetails[];
  lastMessage: string;
}

export default IConversation;
