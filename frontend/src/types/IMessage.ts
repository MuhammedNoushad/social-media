import IUserDetails from "./IUserDetails";

interface IMessage {
  _id: string;
  sender: IUserDetails;
  receiver: IUserDetails;
  message: string;
}

export default IMessage;
