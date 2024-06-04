"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_controller_1 = require("../controllers/connection.controller");
const user_controllers_1 = require("../controllers/user.controllers");
const connectionRoute = express_1.default.Router();
connectionRoute.get('/:userId', connection_controller_1.fetchAllConnections);
connectionRoute.post("/follow", connection_controller_1.follow);
connectionRoute.post("/unfollow", connection_controller_1.unfollow);
connectionRoute.get('/followings/:userId', connection_controller_1.fetchAllFollowings);
connectionRoute.get('/followers/:userId', connection_controller_1.fetchAllFollowers);
connectionRoute.get('/suggest-users/:userId', user_controllers_1.suggestUsers);
exports.default = connectionRoute;
