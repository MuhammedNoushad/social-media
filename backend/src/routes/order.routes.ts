import express from "express";
import {
  paymentSuccess,
  purchaseVerification,
} from "../controllers/order.controller";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const orderRoute = express.Router();

orderRoute.post("/", verifyUser, isBlock, purchaseVerification);
orderRoute.post("/success", verifyUser, isBlock, paymentSuccess);

export default orderRoute;
