import { ObjectId } from "mongoose";

interface IStory {
  userId: ObjectId;
  story: {
    storyImg: string;
    viewed: ObjectId[];
    createdOn: Date;
    expiredOn: Date;
    isExpired: boolean;
  }[];
}

export default IStory;
