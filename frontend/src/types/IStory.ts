import IUserDetails from "./IUserDetails";

interface IStory {
  _id: string;
  userId: IUserDetails;
  story: {
    storyImg: string;
    viewed?: IUserDetails[];
  }[];
  description: string;
  createdAt: string;
}


export default IStory