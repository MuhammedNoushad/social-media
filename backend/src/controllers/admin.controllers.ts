import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

const userRepository = new UserRepository();

// For fetch all the users that are not admin from the database
export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersData = await userRepository.getUsers();

    if (!usersData) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.status(200).json({ success: true, usersData });
  } catch (error) {
    // Handle errors
    console.error("Error from getUsers admin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// For block specified users in the database
export const blockUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const blockedUser = await userRepository.blockUser(userId);

    if (!blockedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true, blockedUser });
  } catch (error) {
    // Handle errors
    console.error("Error from blockUser controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
