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
exports.logout = exports.login = exports.verifyotp = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const sendMail_1 = require("../utils/sendMail");
const OtpRepository_1 = __importDefault(require("../repositories/OtpRepository"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// Creating instance of Repositories
const userRepository = new UserRepository_1.default();
const otpRepository = new OtpRepository_1.default();
// Signup controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword, email, username } = req.body;
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
            email,
            hashPassword,
        };
        res.status(200).json({
            success: true,
            message: "otp sended successfully",
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
        const { email, username, password, otp } = req.body;
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
            password,
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
        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }
        // Comparing the password that entered and the hashed password from the database
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, userDetails === null || userDetails === void 0 ? void 0 : userDetails.password);
        // If password correct create new User account
        if (isPasswordCorrect) {
            // Generate jwt cookie
            (0, generateToken_1.default)(userDetails._id, res);
            const responseData = {
                success: true,
                username: userDetails.username,
                email: userDetails.email,
            };
            return res.status(200).json(responseData);
        }
        else {
            // If password is wrong show incorrect password
            return res.status(400).json({ error: "Incorrect password" });
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
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
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
