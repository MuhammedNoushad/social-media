import { Document } from "mongoose";

interface IPosts extends Document {
  userId: string;
  imageUrl?: string;
  description: string;
  likes?: string[];
  comments?: string[];
  reports?: { userId: string; content: string }[];
  isBlocked?: boolean;
  isDeleted?: boolean;
}

export default IPosts;
