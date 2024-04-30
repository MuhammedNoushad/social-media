import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

const userRepository = new UserRepository();

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
