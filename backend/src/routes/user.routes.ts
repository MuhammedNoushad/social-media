import express from "express";
import { updateProfile } from "../controllers/user.controllers";

const userRoute = express.Router();

// Route for updating user profile
userRoute.put("/profile/:userId",updateProfile);

export default userRoute;
