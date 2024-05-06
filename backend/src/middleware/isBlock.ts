import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

// Middleware for checking if user is blocked
const isBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    console.log(token)

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized -  No Token Provided" });
    }

    const jwtToken = process.env.JWT_TOKEN;
    if (!jwtToken) {
      return res
        .status(500)
        .json({ error: "Internal Server Error - JWT Token not set" });
    }

    const decoded = jwt.verify(token, jwtToken) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized -  No Valid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user?.isBlock) {
      res.clearCookie("jwt");
      return res.status(403).json({ error: "User is blocked" });
    } else {
      next();
    }
  } catch (error) {}
};

export default isBlock;
