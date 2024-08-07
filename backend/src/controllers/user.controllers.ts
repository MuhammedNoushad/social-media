import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import ConnectionRepository from "../repositories/ConnectionRepository";

const userRepository = new UserRepository();
const connectionRepository = new ConnectionRepository();

// Function for updating user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userDetails = req.body;
    const { userId } = req.params;

    // Updating the profile of the user
    const updatedProfile = await userRepository.updateProfile(
      userDetails,
      userId
    );

    if (updatedProfile) {
      res.status(200).json({ success: true, updatedProfile });
    }
  } catch (error) {
    // Handle errors
    console.error("Error from updateProfile user controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for deleting the profile picture of user
export const deleteProfilePic = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedProfile = await userRepository.removeProfileImage(userId);

    if (updatedProfile) {
      res.status(200).json({ success: true, updatedProfile });
    }
  } catch (error) {
    // Handle errors
    console.error("Error from delteProfilePic user controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch all users
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const usersData = await userRepository.getUsers();

    if (!usersData) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.status(200).json({ success: true, usersData });
  } catch (error) {
    // Handle errors
    console.error("Error from fetchAllUsers user controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch single user
export const fetchSigleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userData = await userRepository.findById(userId);

    if (!userData) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true, userData });
  } catch (error) {
    // Handle errors
    console.error("Error from fetchSigleUser user controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for count all the users in the database
export const fetchCountUsers = async (req: Request, res: Response) => {
  try {
    const totalUsers = await userRepository.fetchTotalUsersCount();
    return res.status(200).json({ success: true, totalUsers });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for suggest users for the logged in users
export const suggestUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const users = await connectionRepository.suggestUsers(userId);
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
