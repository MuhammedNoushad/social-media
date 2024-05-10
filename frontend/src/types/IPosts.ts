import IComment from "./IComment";
import IUserDetails from "./IUserDetails";

interface IPosts {
  _id: string;
  userId: IUserDetails
  description: string;
  imageUrl: string;
  comments?: IComment[];
  likes?: string[];
  reports?: string[];
  isDeleted?: boolean;
  isBlocked?: boolean;
}

export interface PostState {
  posts: IPosts[];
}

export default IPosts;
