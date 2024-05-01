import { Document } from "mongoose";

interface IPosts extends Document {
  userId: string;
  imageUrl?: string;
  description: string;
  likes?: string[];
  comments?: string[];
}

export default IPosts;
