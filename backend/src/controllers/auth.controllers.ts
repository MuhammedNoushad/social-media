import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserRepository from "../repositories/UserRepository";
import { sendEmailWithVerification } from "../utils/sendMail";
import OtpRepository from "../repositories/OtpRepository";
import IUsers from "../interfaces/IUsers";
import generateTokenAndSetCookie from "../utils/generateToken";

// Creating instance of Repositories
const userRepository = new UserRepository();
const otpRepository = new OtpRepository();

// Signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword, email, username, firstName, lastName } =
      req.body;

    // Checking if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password didn't match" });
    }

    // Checking if email or username already exists
    const existingEmail = await userRepository.existingEmail(email);
    const existingUsername = await userRepository.existingUsername(email);

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // send email
    sendEmailWithVerification(email);

    const responseData = {
      username,
      firstName,
      lastName,
      email,
      hashPassword,
    };
    res.status(200).json({
      success: true,
      message: "otp sended successfully",
      userData: responseData,
    });
  } catch (error: any) {
    // Handle errors
    console.error("Error from signup controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Verify the user entered OTP
export const verifyotp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { formData, otp } = req.body;
    const { email, firstName, lastName, username, hashPassword } = formData;

    // Find OTP details by email
    const otpDetails = await otpRepository.findOtpByEmail(email);

    if (!otpDetails) {
      return res.status(404).json({ error: "Something went wrong" });
    }

    // Compare the OTP entered by the user with the stored OTP
    const isValidOtp = await bcrypt.compare(otp, otpDetails?.otp);

    if (!isValidOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Create a new user object
    const newUser = {
      email,
      username,
      firstName,
      lastName,
      password: hashPassword,
    } as IUsers;

    // Create a new user in the database
    const createdUser = await userRepository.createNewUser(newUser);

    if (createdUser) {
      // If user created successfully, send success response
      return res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error from verifyotp controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// login controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // finding the user is existing or not
    const existingEmail = await userRepository.existingEmail(email);

    if (!existingEmail) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetching the user details from the database
    const userDetails = await userRepository.findUser(email);

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    // Comparing the password that entered and the hashed password from the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetails?.password
    );

    // If password correct create new User account
    if (isPasswordCorrect) {
      // Generate jwt cookie
      generateTokenAndSetCookie(userDetails._id, res);

      const responseData = {
        id: userDetails._id,
        username: userDetails.username,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      };
      return res.status(200).json({ success: true, responseData });
    } else {
      // If password is wrong show incorrect password
      return res.status(400).json({ error: "Incorrect password" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error from login controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Send success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle errors
    console.error("Error from logout controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
