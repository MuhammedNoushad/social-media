import { Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

// Function to generate token and set cookies
const generateTokenAndSetCookies = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN as Secret, {
    expiresIn: "15d",
  });
  // Optionally set the token as a cookie here
  return token;
};

// Function to extract userId from the token
const extractUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as Secret) as JwtPayload;
    return decoded.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export { generateTokenAndSetCookies, extractUserIdFromToken };
