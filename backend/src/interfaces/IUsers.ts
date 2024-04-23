import { Document } from "mongoose";

interface IUsers extends Document {
  username: string;
  email: string;
  password: string;
  fname?: string;
  lname?: string;
  bio?: string;
  dob?: string;
  profileimg?: string;
  phone?: number;
  isBlock?: boolean;
  isAdmin?: boolean;
}

export default IUsers;
