import IMessage from "./IMessage";
import IUserDetails from "./IUserDetails";

interface IConversation {
  
  sender: IUserDetails;
  receiver: IUserDetails;
  messages: IMessage[];
}

export default IConversation;
