import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const generateTokenAndSetCookes = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN as Secret, {
    expiresIn: "15d",
  });
  return token;
};

export default generateTokenAndSetCookes;
