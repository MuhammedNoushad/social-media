import { Key } from "react";
import IComment from "./IComment";
import IUserDetails from "./IUserDetails";

interface IReport {
  userId: IUserDetails;
  content: string;
}

interface IPosts {
  id: Key | null | undefined;
  _id: string;
  userId: IUserDetails;
  description: string;
  imageUrl: string;
  comments?: IComment[];
  likes?: string[];
  reports?: IReport[];
  isDeleted?: boolean;
  isBlocked?: boolean;
  createdAt: string;
}

export interface PostState {
  posts: IPosts[];
}

export default IPosts;
