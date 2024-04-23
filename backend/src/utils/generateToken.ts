import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const generateTokenAndSetCookes = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN as Secret, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "develepment",
  });
};

export default generateTokenAndSetCookes;
