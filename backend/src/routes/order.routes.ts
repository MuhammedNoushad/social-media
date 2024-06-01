import express from 'express';
import { paymentSuccess, purchaseVerification } from '../controllers/order.controller';

const orderRoute = express.Router();

orderRoute.post('/',purchaseVerification)
orderRoute.post('/success',paymentSuccess)


export default orderRoute