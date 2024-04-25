import { model, Schema } from "mongoose";
import IUsers from "../interfaces/IUsers";

// Defining user schema

const userSchema = new Schema<IUsers>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bio: {
      type: String,
    },
    dob: {
      type: Date,
    },
    profileimg: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model<IUsers>("User", userSchema);

export default User;
