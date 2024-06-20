"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const isBlock_1 = __importDefault(require("../middleware/isBlock"));
const orderRoute = express_1.default.Router();
orderRoute.post("/", verifyToken_1.default, isBlock_1.default, order_controller_1.purchaseVerification);
orderRoute.post("/success", verifyToken_1.default, isBlock_1.default, order_controller_1.paymentSuccess);
exports.default = orderRoute;
