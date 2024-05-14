import express from "express";

import {
  googleLogin,
  login,
  logout,
  resendOtp,
  resendOtpForgotPassword,
  resetPassword,
  sendOtpForResetPassword,
  signup,
  verifyotp,
  verifyotpForgotPassword,
} from "../controllers/auth.controllers.js";

// creating the router instance
const authRoute = express.Router();

// // Authentication routes
authRoute.post("/signup", signup);
authRoute.post("/verify-otp", verifyotp);
authRoute.post('/resend-otp',resendOtp)
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.post("/google-login", googleLogin);

//  Route for forgotpassword and resetpassword
authRoute.post("/forgot-password", sendOtpForResetPassword);
authRoute.post("/forgot-password/otp", verifyotpForgotPassword);
authRoute.put("/forgot-password/reset", resetPassword);
authRoute.post("/forgot-password/resend-otp", resendOtpForgotPassword);

export default authRoute;
