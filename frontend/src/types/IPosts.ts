import IComment from "./IComment";
import IUserDetails from "./IUserDetails";

interface IReport {
  userId: string;
  content: string;
}

interface IPosts {
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
