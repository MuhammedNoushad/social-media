import { ObjectId } from "mongodb";

import { follow } from "../controllers/connection.controller";
import Connection from "../models/connection.model";

class ConnectionRepository {
  // Function for following
  async followUser(userId: string, followingId: string) {
    try {
      await Connection.findOneAndUpdate(
        { userId },
        { $addToSet: { following: followingId } },
        { upsert: true }
      );
      await Connection.findOneAndUpdate(
        { userId: followingId },
        { $addToSet: { followers: userId } },
        { upsert: true }
      );
    } catch (error) {
      throw error;
    }
  }

  //   Function for unfollowing
  async unfollowUser(userId: string, followingId: string) {
    try {
      await Connection.findOneAndUpdate(
        { userId },
        { $pull: { following: followingId } }
      );

      await Connection.findOneAndUpdate(
        { userId: followingId },
        { $pull: { followers: userId } }
      );
    } catch (error) {
      throw error;
    }
  }

  //   Function for checking the user is following or not
  async isFollowing(userId: string, followingId: string) {
    try {
      const connection = await Connection.findOne({
        userId,
        following: { $in: [new ObjectId(followingId)] },
      });
      return !!connection;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetching all connections
  async fetchAllConnections(userId: string) {
    try {
      const connection = await Connection.findOne({ userId })
        .populate("followers")
        .populate("following");
      return connection;
    } catch (error) {
      throw error;
    }
  }
}

export default ConnectionRepository;
