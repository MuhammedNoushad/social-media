import express from "express";
import {
  deleteProfilePic,
  updateProfile,
} from "../controllers/user.controllers";

const userRoute = express.Router();

// Route for updating user profile
userRoute.put("/profile/:userId", updateProfile);
userRoute.delete("/profile/:userId/delete-profile-picture", deleteProfilePic);

export default userRoute;
