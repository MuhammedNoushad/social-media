import express from "express";
import {
  deleteProfilePic,
  fetchAllUsers,
  fetchSigleUser,
  updateProfile,
} from "../controllers/user.controllers";
import verifyToken from "../middleware/verifyToken";

const userRoute = express.Router();

// Route for updating user profile
userRoute.put("/profile/:userId", verifyToken, updateProfile);
userRoute.delete(
  "/profile/:userId/delete-profile-picture",
  verifyToken,
  deleteProfilePic
);
userRoute.get("/users", verifyToken, fetchAllUsers);
userRoute.get("/:userId", verifyToken, fetchSigleUser);

export default userRoute;
