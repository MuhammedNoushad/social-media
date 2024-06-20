import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";

const userRepository = new UserRepository();

// Function for checking if user is blocked
const isBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { userId } = decoded as { userId: string };
    const user = await userRepository.findById(userId);

    if (user?.isBlock) {
      return res.status(401).json({ error: "User is blocked" });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default isBlock;
