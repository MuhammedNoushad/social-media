"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const userRoute = express_1.default.Router();
// Route for updating user profile
userRoute.put("/profile/:userId", verifyToken_1.default, user_controllers_1.updateProfile);
userRoute.delete("/profile/:userId/delete-profile-picture", verifyToken_1.default, user_controllers_1.deleteProfilePic);
userRoute.get("/users/count", verifyToken_1.default, user_controllers_1.fetchCountUsers);
userRoute.get("/users", verifyToken_1.default, user_controllers_1.fetchAllUsers);
userRoute.get("/:userId", verifyToken_1.default, user_controllers_1.fetchSigleUser);
exports.default = userRoute;
