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
exports.paymentSuccess = exports.purchaseVerification = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const options = {
    amount: 999 * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
};
const userRepository = new UserRepository_1.default();
const purchaseVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield instance.orders.create(options);
        const responseData = {
            orderId: response.id,
            currency: response.currency,
            amount: response.amount,
        };
        res.status(200).json({ success: true, responseData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.purchaseVerification = purchaseVerification;
// Function for verify the user account
const paymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        console.log(userId, req.body);
        yield userRepository.verifyUserAccount(userId);
        const usersData = yield userRepository.getUsers();
        res.status(200).json({ success: true, usersData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.paymentSuccess = paymentSuccess;
