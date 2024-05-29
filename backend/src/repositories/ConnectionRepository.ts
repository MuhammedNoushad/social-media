import { ObjectId } from "mongodb";

import Connection from "../models/connection.model";
import User from "../models/user.model";
import IConnection from "../interfaces/IConnection";

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

  // Function for fetch all followings
  async fetchAllFollowings(userId: string) {
    try {
      const followings = await Connection.findOne({ userId }).populate({
        path: "following",
        select: "-password",
      });
      return followings;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch all followers
  async fetchAllFollowers(userId: string) {
    try {
      const followers = await Connection.findOne({ userId }).populate({
        path: "followers",
        select: "-password",
      });
      return followers;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch not following users
  async suggestUsers(userId: string) {
    try {
      // Fetch the connection for the user and populate the following field
      const connection = await Connection.findOne({ userId }).populate({
        path: "following",
        select: "_id",
      });

      if (!connection) {
        return [];
      }

      // Extract the list of followed user IDs
      const followedUserIds = connection.following.map((follower) =>
        follower._id.toString()
      );

      // Find users that are not followed by the user and exclude the user themselves
      const suggestedUsers = await User.find({
        isAdmin: false,
        isBlock: false,
        _id: {
          $nin: [...followedUserIds, userId],
        },
      })
        .select("-password")
        .limit(5);

      return suggestedUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default ConnectionRepository;
