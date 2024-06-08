"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_controller_1 = require("../controllers/connection.controller");
const user_controllers_1 = require("../controllers/user.controllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const connectionRoute = express_1.default.Router();
connectionRoute.get('/:userId', verifyToken_1.default, connection_controller_1.fetchAllConnections);
connectionRoute.post("/follow", verifyToken_1.default, connection_controller_1.follow);
connectionRoute.post("/unfollow", verifyToken_1.default, connection_controller_1.unfollow);
connectionRoute.get('/followings/:userId', verifyToken_1.default, connection_controller_1.fetchAllFollowings);
connectionRoute.get('/followers/:userId', verifyToken_1.default, connection_controller_1.fetchAllFollowers);
connectionRoute.get('/suggest-users/:userId', verifyToken_1.default, user_controllers_1.suggestUsers);
exports.default = connectionRoute;
