"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserIdFromToken = exports.generateTokenAndSetCookies = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate token and set cookies
const generateTokenAndSetCookies = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "15d",
    });
    // Optionally set the token as a cookie here
    return token;
};
exports.generateTokenAndSetCookies = generateTokenAndSetCookies;
// Function to extract userId from the token
const extractUserIdFromToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        return decoded.userId;
    }
    catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
};
exports.extractUserIdFromToken = extractUserIdFromToken;
