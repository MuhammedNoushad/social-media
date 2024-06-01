import { Request, Response } from "express";
import Razorpay from "razorpay";
import UserRepository from "../repositories/UserRepository";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const options = {
  amount: 999 * 100,
  currency: "INR",
  receipt: "order_rcptid_11",
};

const userRepository = new UserRepository();

export const purchaseVerification = async (req: Request, res: Response) => {
  try {
    const response = await instance.orders.create(options);

    const responseData = {
      orderId: response.id,
      currency: response.currency,
      amount: response.amount,
    };

    res.status(200).json({ success: true, responseData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for verify the user account
export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    console.log(userId,req.body)

    await userRepository.verifyUserAccount(userId);

    const usersData = await userRepository.getUsers();

    res.status(200).json({ success: true, usersData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
