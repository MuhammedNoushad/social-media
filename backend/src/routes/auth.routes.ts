import express from "express";

import {
  googleLogin,
  login,
  logout,
  signup,
  verifyotp,
} from "../controllers/auth.controllers.js";

// creating the router instance
const authRoute = express.Router();

// // Authentication routes
authRoute.post("/signup", signup);
authRoute.post("/verify-otp", verifyotp);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.post('/google-login', googleLogin)

export default authRoute;
