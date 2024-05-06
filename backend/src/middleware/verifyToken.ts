import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      if (!decoded) {
        return res.status(401).json({ error: "Invalid token" });
      }
      next();
    });
  } catch (error) {
    console.error(error);
  }
};

export default verifyUser;
