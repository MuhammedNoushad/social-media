import mongoose from "mongoose";
import Story from "../models/story.model";

class StoryRepository {
  // Function for creating a new story
  async createNewStory(userId: string, storyImg: string) {
    try {
      const existingStory = await Story.findOne({ userId });

      if (existingStory) {
        const newStory = await Story.findOneAndUpdate(
          { userId },
          { $push: { story: { storyImg } } },
          { new: true }
        );

        return newStory;
      }

      const newStory = await Story.create({
        userId,
        story: [{ storyImg }],
      });
      return newStory;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetching all stories
  async fetchAllStories() {
    try {
      const stories = await Story.find({}).populate(
        "userId",
        "username _id profileimg"
      );
      return stories;
    } catch (error) {
      throw error;
    }
  }

  // Function for deleting a story
  async deleteStory(storyId: string, userId: string) {
    try {
      await Story.updateOne(
        { userId, "story._id": storyId },
        { $pull: { story: { _id: storyId } } }
      );
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch single user story
  async fetchSingleUserStory(userId: string) {
    try {
      const stories = await Story.findOne({ userId }).populate({
        path: "story.viewed",
        model: "User",
      });
      return stories;
    } catch (error) {
      throw error;
    }
  }

  // Function for updating story views
  async updateStoryViews(
    storyId: string,
    userId: string,
    viewedUserId: string
  ) {
    try {
      await Story.updateOne(
        {
          userId,
          story: { $elemMatch: { _id: new mongoose.Types.ObjectId(storyId) } },
        },
        { $addToSet: { "story.$.viewed": viewedUserId } }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default StoryRepository;
