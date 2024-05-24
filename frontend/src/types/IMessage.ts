import IUserDetails from "./IUserDetails";

interface IMessage {
  createdAt: string | number | Date;
  _id: string;
  sender: IUserDetails;
  receiver: IUserDetails;
  message: string;
}

export default IMessage;
