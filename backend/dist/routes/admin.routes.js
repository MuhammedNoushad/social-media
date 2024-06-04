"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("../controllers/admin.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const post_controllers_1 = require("../controllers/post.controllers");
const adminRoute = express_1.default.Router();
adminRoute.get("/users", verifyToken_1.default, admin_controllers_1.getUsers);
adminRoute.put("/block-user/:userId", verifyToken_1.default, admin_controllers_1.blockUser);
adminRoute.get('/users/chart/data', admin_controllers_1.fetchChartData);
adminRoute.get('/users/latest', admin_controllers_1.fetchLatestUsers);
adminRoute.get('/reported-posts', post_controllers_1.reportedPosts);
adminRoute.put('/block-post/:postId', post_controllers_1.togglePostBlock);
adminRoute.get('/posts/chart/data', admin_controllers_1.fetchChartDataPost);
exports.default = adminRoute;
