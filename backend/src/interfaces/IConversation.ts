import IMessage from "./IMessage";
import IUsers from "./IUsers";

interface IConversation {
  participants: IUsers[];
  messages: IMessage[];
}

export default IConversation