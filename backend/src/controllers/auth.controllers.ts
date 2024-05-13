import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserRepository from "../repositories/UserRepository";
import {
  sendEmailForForgotPassword,
  sendEmailWithVerification,
} from "../utils/sendMail";
import OtpRepository from "../repositories/OtpRepository";
import IUsers from "../interfaces/IUsers";
import generateTokenAndSetCookie from "../utils/generateToken";
import generatePassword from "../utils/generatePassword";
import { hasJSDocParameterTags } from "typescript";

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
      message: "OTP sent successfully",
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

    if (userDetails.isBlock) {
      return res.status(404).json({ error: "User is blocked" });
    }

    // Comparing the password that entered and the hashed password from the database
    if (userDetails && userDetails.password) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userDetails.password
      );

      // If password correct create new User account
      if (isPasswordCorrect) {
        // Generate jwt cookie
        const accessToken = generateTokenAndSetCookie(
          userDetails._id ? userDetails._id : "",
          res
        );
        const role = userDetails.isAdmin ? "admin" : "user";

        const responseData = {
          _id: userDetails._id || "",
          username: userDetails.username || "",
          firstName: userDetails.firstName || "",
          lastName: userDetails.lastName || "",
          email: userDetails.email || "",
          profileimg: userDetails.profileimg || "",
          bio: userDetails.bio || "",
          dob: userDetails.dob || "",
          phone:
            userDetails.phone !== undefined ? userDetails.phone : undefined,
          isBlock: userDetails.isBlock || false,
          isAdmin: userDetails.isAdmin || false,
          accessToken,
          role,
        };
        return res.status(200).json({ success: true, responseData });
      } else {
        // If password is wrong show incorrect password
        return res.status(400).json({ error: "Incorrect password" });
      }
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
    // Send success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle errors
    console.error("Error from logout controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for google login
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, username } = req.body;
    const user = await userRepository.findUser(email);

    if (user) {
      if (user.isBlock) {
        return res.status(404).json({ error: "User is blocked" });
      }
      const accessToken = generateTokenAndSetCookie(
        user._id ? user._id : "",
        res
      );
      const role = user.isAdmin ? "admin" : "user";
      const responseData = {
        _id: user._id || "",
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        profileimg: user.profileimg || "",
        bio: user.bio || "",
        dob: user.dob || "",
        phone: user.phone !== undefined ? user.phone : undefined,
        isBlock: user.isBlock || false,
        isAdmin: user.isAdmin || false,
        accessToken,
        role,
      };
      return res.status(200).json({ success: true, responseData });
    } else {
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
      } as IUsers;
      const createdUser = await userRepository.createNewUser(newUser);

      if (createdUser) {
        const accessToken = generateTokenAndSetCookie(
          createdUser._id ?? "default_id",
          res
        );
        const role = createdUser.isAdmin ? "admin" : "user";
        const responseData = {
          _id: createdUser._id,
          username: createdUser.username,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          profileimg: createdUser.profileimg || "",
          bio: createdUser.bio || "",
          dob: createdUser.dob || "",
          phone:
            createdUser.phone !== undefined ? createdUser.phone : undefined,
          isBlock: createdUser.isBlock || false,
          isAdmin: createdUser.isAdmin || false,
          accessToken,
          role,
        };
        return res.status(200).json({ success: true, responseData });
      }
    }
  } catch (error) {
    console.error("Error from google login controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for sending the otp for reset password
export const sendOtpForResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const isUserExist = await userRepository.existingEmail(email);

    if (!isUserExist) {
      return res.status(400).json({ error: "User not found" });
    }

    sendEmailForForgotPassword(email);

    return res
      .status(200)
      .json({ success: true, message: "Otp sent successfully", email });
  } catch (error) {
    console.error("Error from sendOtpForResetPassword controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for verify otp for reset password
export const verifyotpForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const otpDetails = await otpRepository.findOtpByEmail(email);

    if (!otpDetails) {
      return res.status(400).json({ error: "Otp not found" });
    }

    const isValidOtp = await bcrypt.compare(otp, otpDetails.otp);

    if (isValidOtp) {
      return res
        .status(200)
        .json({ success: true, message: "Otp verified successfully", email });
    } else {
      return res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    console.error("Error from verifyotpForgotPassword controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password not matched" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updtedUser = await userRepository.updatePassword(email, hashPassword);

    if (updtedUser) {
      return res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    }
  } catch (error) {
    console.error("Error from resetPassword controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for resend otp
export const resendOtpForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const isUserExist = await userRepository.existingEmail(email);

    if (!isUserExist) {
      return res.status(400).json({ error: "User not found" });
    }

    sendEmailForForgotPassword(email);

    return res
      .status(200)
      .json({ success: true, message: "Otp sent successfully" });
  } catch (error) {
    console.error("Error from resendOtp controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for resend otp for signup
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    sendEmailWithVerification(email);

    res.status(200).json({ success: true, message: "Otp sent successfully" });
  } catch (error) {
    console.error("Error from resendOtp controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
