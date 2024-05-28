import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import PostRepository from "../repositories/PostRepository";

const userRepository = new UserRepository();
const postRespository = new PostRepository();

// For fetch all the users that are not admin from the database
export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const usersData = await userRepository.fetchUsersDataWithPagination(
      page,
      limit
    );
    const totalUsers = await userRepository.fetchTotalUsersCount();
    const totalPages = Math.ceil(totalUsers / limit);

    if (!usersData) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.status(200).json({ success: true, usersData, totalPages });
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

    const blockedUser = await userRepository.toggleBlock(userId);

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

// Function for fetch all latest registered users from the database
export const fetchLatestUsers = async (req: Request, res: Response) => {
  try {
    const limit = 5;

    const usersData = await userRepository.fetchLatestUsers(limit);
    if (!usersData) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.status(200).json({ success: true, usersData });
  } catch (error) {
    // Handle errors
    console.error("Error from fetchLatestUsers admin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch data for chart
export const fetchChartData = async (req: Request, res: Response) => {
  try {
    const chartData = await userRepository.fetchDataForChart();
    if (!chartData) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    return res.status(200).json({
      success: true,
      chartData: chartData[0].chartData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error from fetchChartData admin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch data for chart post
export const fetchChartDataPost = async (req: Request, res: Response) => {
  try {
    const chartData = (await postRespository.fetchDataForChartPost()) || [];

    if (!chartData) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    return res.status(200).json({
      success: true,
      chartData: chartData[0].chartData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error from fetchChartDataPost admin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
