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
authRoute.post("/verifyotp", auth_controllers_js_1.verifyotp);
authRoute.post("/login", auth_controllers_js_1.login);
authRoute.post("/logout", auth_controllers_js_1.logout);
exports.default = authRoute;
