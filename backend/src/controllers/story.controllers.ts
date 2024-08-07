import { Request, Response } from "express";
import StoryRepository from "../repositories/StoryRepository";

const storyRepository = new StoryRepository();

// Function for add new story
export const addNewStory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { storyImg } = req.body;

    console.log(storyImg, "story img");

    const newStory = await storyRepository.createNewStory(userId, storyImg);

    const stories = await storyRepository.fetchAllStories();

    if (newStory) {
      res.status(200).json({
        success: true,
        message: "Story created successfully",
        stories,
      });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch all stories
export const fetchAllStories = async (req: Request, res: Response) => {
  try {
    const stories = await storyRepository.fetchAllStories();

    if (stories) {
      res.status(200).json({ success: true, stories });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for delete story
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { storyId, userId } = req.params;
    await storyRepository.deleteStory(storyId, userId);

    const stories = await storyRepository.fetchSingleUserStory(userId);

    res.status(200).json({ success: true, message: "Story deleted", stories });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch single user story
export const fetchSingleUserStory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const stories = await storyRepository.fetchSingleUserStory(userId);

    if (stories) {
      res.status(200).json({ success: true, stories });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for update story views
export const updateStoryViews = async (req: Request, res: Response) => {
  try {
    const { storyId, userId } = req.params;
    const { viewedUserId } = req.body;

    if (userId === viewedUserId) {
      return res.status(400).json({ error: "You can't view your own story" });
    }

    await storyRepository.updateStoryViews(storyId, userId, viewedUserId);
    const stories = await storyRepository.fetchSingleUserStory(userId);
    res.status(200).json({ success: true, message: "Story updated", stories });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
