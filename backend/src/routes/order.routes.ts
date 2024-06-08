import express from 'express';
import { paymentSuccess, purchaseVerification } from '../controllers/order.controller';
import verifyUser from '../middleware/verifyToken';

const orderRoute = express.Router();

orderRoute.post('/',verifyUser,purchaseVerification)
orderRoute.post('/success',verifyUser,paymentSuccess)


export default orderRoute