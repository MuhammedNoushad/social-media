import express from "express";
import {
  deleteProfilePic,
  fetchAllUsers,
  fetchCountUsers,
  fetchSigleUser,
  updateProfile,
} from "../controllers/user.controllers";
import verifyToken from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const userRoute = express.Router();

// Route for updating user profile
userRoute.put("/profile/:userId", verifyToken, updateProfile);
userRoute.delete(
  "/profile/:userId/delete-profile-picture",
  verifyToken,
  deleteProfilePic
);
userRoute.get("/users/count", verifyToken,isBlock, fetchCountUsers);

userRoute.get("/users", verifyToken,isBlock, fetchAllUsers);
userRoute.get("/:userId", verifyToken,isBlock, fetchSigleUser);

export default userRoute;
