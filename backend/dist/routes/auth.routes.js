"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_js_1 = require("../controllers/auth.controllers.js");
// creating the router instance
const authRoute = express_1.default.Router();
// // Authentication routes
authRoute.post("/signup", auth_controllers_js_1.signup);
authRoute.post("/verify-otp", auth_controllers_js_1.verifyotp);
authRoute.post('/resend-otp', auth_controllers_js_1.resendOtp);
authRoute.post("/login", auth_controllers_js_1.login);
authRoute.post("/logout", auth_controllers_js_1.logout);
authRoute.post("/google-login", auth_controllers_js_1.googleLogin);
//  Route for forgotpassword and resetpassword
authRoute.post("/forgot-password", auth_controllers_js_1.sendOtpForResetPassword);
authRoute.post("/forgot-password/otp", auth_controllers_js_1.verifyotpForgotPassword);
authRoute.put("/forgot-password/reset", auth_controllers_js_1.resetPassword);
authRoute.post("/forgot-password/resend-otp", auth_controllers_js_1.resendOtpForgotPassword);
exports.default = authRoute;
