"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const orderRoute = express_1.default.Router();
orderRoute.post('/', order_controller_1.purchaseVerification);
orderRoute.post('/success', order_controller_1.paymentSuccess);
exports.default = orderRoute;
