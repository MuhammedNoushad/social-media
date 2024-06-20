"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.resendOtpForgotPassword = exports.resetPassword = exports.verifyotpForgotPassword = exports.sendOtpForResetPassword = exports.googleLogin = exports.logout = exports.login = exports.verifyotp = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const sendMail_1 = require("../utils/sendMail");
const OtpRepository_1 = __importDefault(require("../repositories/OtpRepository"));
const generateToken_1 = require("../utils/generateToken");
const generatePassword_1 = __importDefault(require("../utils/generatePassword"));
// Creating instance of Repositories
const userRepository = new UserRepository_1.default();
const otpRepository = new OtpRepository_1.default();
// Signup controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword, email, username, firstName, lastName } = req.body;
        // Checking if the password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password didn't match" });
        }
        // Checking if email or username already exists
        const existingEmail = yield userRepository.existingEmail(email);
        const existingUsername = yield userRepository.existingUsername(email);
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Hash password
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        // send email
        (0, sendMail_1.sendEmailWithVerification)(email);
        const responseData = {
            username,
            firstName,
            lastName,
            email,
            hashPassword,
        };
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            userData: responseData,
        });
    }
    catch (error) {
        // Handle errors
        console.error("Error from signup controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.signup = signup;
// Verify the user entered OTP
const verifyotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formData, otp } = req.body;
        const { email, firstName, lastName, username, hashPassword } = formData;
        // Find OTP details by email
        const otpDetails = yield otpRepository.findOtpByEmail(email);
        if (!otpDetails) {
            return res.status(404).json({ error: "Something went wrong" });
        }
        // Compare the OTP entered by the user with the stored OTP
        const isValidOtp = yield bcrypt_1.default.compare(otp, otpDetails === null || otpDetails === void 0 ? void 0 : otpDetails.otp);
        if (!isValidOtp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        // Create a new user object
        const newUser = {
            email,
            username,
            firstName,
            lastName,
            password: hashPassword,
        };
        // Create a new user in the database
        const createdUser = yield userRepository.createNewUser(newUser);
        if (createdUser) {
            // If user created successfully, send success response
            return res
                .status(200)
                .json({ success: true, message: "User created successfully" });
        }
    }
    catch (error) {
        // Handle errors
        console.error("Error from verifyotp controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.verifyotp = verifyotp;
// login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // finding the user is existing or not
        const existingEmail = yield userRepository.existingEmail(email);
        if (!existingEmail) {
            return res.status(404).json({ error: "User not found" });
        }
        // Fetching the user details from the database
        const userDetails = yield userRepository.findUser(email);
        console.log(userDetails, "userDetails");
        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }
        if (userDetails.isBlock) {
            return res.status(404).json({ error: "User is blocked" });
        }
        // Comparing the password that entered and the hashed password from the database
        if (userDetails && userDetails.password) {
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, userDetails.password);
            // If password correct create new User account
            if (isPasswordCorrect) {
                // Generate jwt cookie
                const accessToken = (0, generateToken_1.generateTokenAndSetCookies)(userDetails._id ? userDetails._id : "", res);
                const role = userDetails.isAdmin ? "admin" : "user";
                const responseData = {
                    _id: userDetails._id || "",
                    username: userDetails.username || "",
                    firstName: userDetails.firstName || "",
                    lastName: userDetails.lastName || "",
                    email: userDetails.email || "",
                    profileimg: userDetails.profileimg || "",
                    bio: userDetails.bio || "",
                    dob: userDetails.dob || "",
                    phone: userDetails.phone !== undefined ? userDetails.phone : undefined,
                    isBlock: userDetails.isBlock || false,
                    isAdmin: userDetails.isAdmin || false,
                    isVerified: userDetails.isVerified || false,
                    accessToken,
                    role,
                };
                return res.status(200).json({ success: true, responseData });
            }
            else {
                // If password is wrong show incorrect password
                return res.status(400).json({ error: "Incorrect password" });
            }
        }
    }
    catch (error) {
        // Handle errors
        console.error("Error from login controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
// User logout controller
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Send success response
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        // Handle errors
        console.error("Error from logout controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.logout = logout;
// Controller for google login
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, firstName, lastName, username } = req.body;
        const user = yield userRepository.findUser(email);
        if (user) {
            if (user.isBlock) {
                return res.status(404).json({ error: "User is blocked" });
            }
            const accessToken = (0, generateToken_1.generateTokenAndSetCookies)(user._id ? user._id : "", res);
            const role = user.isAdmin ? "admin" : "user";
            const responseData = {
                _id: user._id || "",
                username: user.username || "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                profileimg: user.profileimg || "",
                bio: user.bio || "",
                dob: user.dob || "",
                phone: user.phone !== undefined ? user.phone : undefined,
                isBlock: user.isBlock || false,
                isAdmin: user.isAdmin || false,
                accessToken,
                role,
            };
            return res.status(200).json({ success: true, responseData });
        }
        else {
            const password = (0, generatePassword_1.default)();
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
            };
            const createdUser = yield userRepository.createNewUser(newUser);
            if (createdUser) {
                const accessToken = (0, generateToken_1.generateTokenAndSetCookies)((_a = createdUser._id) !== null && _a !== void 0 ? _a : "default_id", res);
                const role = createdUser.isAdmin ? "admin" : "user";
                const responseData = {
                    _id: createdUser._id,
                    username: createdUser.username,
                    firstName: createdUser.firstName,
                    lastName: createdUser.lastName,
                    email: createdUser.email,
                    profileimg: createdUser.profileimg || "",
                    bio: createdUser.bio || "",
                    dob: createdUser.dob || "",
                    phone: createdUser.phone !== undefined ? createdUser.phone : undefined,
                    isBlock: createdUser.isBlock || false,
                    isAdmin: createdUser.isAdmin || false,
                    accessToken,
                    role,
                };
                return res.status(200).json({ success: true, responseData });
            }
        }
    }
    catch (error) {
        console.error("Error from google login controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.googleLogin = googleLogin;
// Function for sending the otp for reset password
const sendOtpForResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isUserExist = yield userRepository.existingEmail(email);
        if (!isUserExist) {
            return res.status(400).json({ error: "User not found" });
        }
        (0, sendMail_1.sendEmailForForgotPassword)(email);
        return res
            .status(200)
            .json({ success: true, message: "Otp sent successfully", email });
    }
    catch (error) {
        console.error("Error from sendOtpForResetPassword controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendOtpForResetPassword = sendOtpForResetPassword;
// Function for verify otp for reset password
const verifyotpForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const otpDetails = yield otpRepository.findOtpByEmail(email);
        if (!otpDetails) {
            return res.status(400).json({ error: "Otp not found" });
        }
        const isValidOtp = yield bcrypt_1.default.compare(otp, otpDetails.otp);
        if (isValidOtp) {
            return res
                .status(200)
                .json({ success: true, message: "Otp verified successfully", email });
        }
        else {
            return res.status(400).json({ error: "Invalid Otp" });
        }
    }
    catch (error) {
        console.error("Error from verifyotpForgotPassword controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.verifyotpForgotPassword = verifyotpForgotPassword;
// Function for reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password not matched" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const updtedUser = yield userRepository.updatePassword(email, hashPassword);
        if (updtedUser) {
            return res
                .status(200)
                .json({ success: true, message: "Password reset successfully" });
        }
    }
    catch (error) {
        console.error("Error from resetPassword controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
// Function for resend otp
const resendOtpForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isUserExist = yield userRepository.existingEmail(email);
        if (!isUserExist) {
            return res.status(400).json({ error: "User not found" });
        }
        (0, sendMail_1.sendEmailForForgotPassword)(email);
        return res
            .status(200)
            .json({ success: true, message: "Otp sent successfully" });
    }
    catch (error) {
        console.error("Error from resendOtp controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.resendOtpForgotPassword = resendOtpForgotPassword;
// Function for resend otp for signup
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        (0, sendMail_1.sendEmailWithVerification)(email);
        res.status(200).json({ success: true, message: "Otp sent successfully" });
    }
    catch (error) {
        console.error("Error from resendOtp controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.resendOtp = resendOtp;
