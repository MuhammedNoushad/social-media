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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Middleware for checking if user is blocked
const isBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized -  No Token Provided" });
        }
        const jwtToken = process.env.JWT_TOKEN;
        if (!jwtToken) {
            return res
                .status(500)
                .json({ error: "Internal Server Error - JWT Token not set" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtToken);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized -  No Valid Token" });
        }
        const user = yield user_model_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user === null || user === void 0 ? void 0 : user.isBlock) {
            res.clearCookie("jwt");
            return res.status(403).json({ error: "User is blocked" });
        }
        else {
            next();
        }
    }
    catch (error) { }
});
exports.default = isBlock;
