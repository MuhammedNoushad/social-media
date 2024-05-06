import express from "express";
import {
  deleteProfilePic,
  updateProfile,
} from "../controllers/user.controllers";
import isBlock from "../middleware/isBlock";

const userRoute = express.Router();

// Route for updating user profile
userRoute.put("/profile/:userId", isBlock, updateProfile);
userRoute.delete("/profile/:userId/delete-profile-picture", deleteProfilePic);

export default userRoute;
