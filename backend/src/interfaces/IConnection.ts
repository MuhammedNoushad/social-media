import { ObjectId } from "mongoose";

interface IConnection {
  userId: string;
  followers: { _id: ObjectId }[];
  following: { _id: ObjectId }[];
}
export default IConnection;
