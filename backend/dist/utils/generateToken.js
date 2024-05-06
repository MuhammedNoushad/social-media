"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookes = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "15d",
    });
    return token;
};
exports.default = generateTokenAndSetCookes;
