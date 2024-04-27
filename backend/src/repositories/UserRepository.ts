import IUsers from "../interfaces/IUsers";
import User from "../models/user.model";
import { MongooseError } from "mongoose";

// Creating the UserRepository
class UserRepository {
  // Checking if the user email exists
  async existingEmail(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email });
      return !!user;
    } catch (error) {
      if (error instanceof MongooseError) {
        console.error(
          "Mongoose Error from existingEmail in UserRepository",
          error
        );
      } else {
        console.error("Error from existingEmail in UserRepository", error);
      }
      return false;
    }
  }

  // Checking if the username exists
  async existingUsername(username: string): Promise<boolean> {
    try {
      const user = await User.findOne({ username });
      return !!user;
    } catch (error) {
      if (error instanceof MongooseError) {
        console.error(
          "Mongoose Error from existingUsername in UserRepository",
          error
        );
      } else {
        console.error("Error from existingUsername in UserRepository", error);
      }
      return false;
    }
  }

  // Create new user
  async createNewUser(userDetails: IUsers): Promise<IUsers | null> {
    try {
      const newUser = new User(userDetails);
      await newUser.save();
      return newUser.toObject();
    } catch (error) {
      console.error("Error from createNewUser in UserRepository", error);
      return null;
    }
  }

  // Find user by email
  async findUser(email: string): Promise<IUsers | null> {
    try {
      const userData = await User.findOne({ email });
      return userData || null;
    } catch (error) {
      console.error("Error from findUser in UserRepository", error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(
    userDetails: IUsers,
    userId: string
  ): Promise<IUsers | null> {
    try {
      console.log(userDetails);
      // Find the user by userId
      const user = await User.findById(userId).select("-password");

      // If user not found, return null
      if (!user) {
        console.error("User not found");
        return null;
      }

      // Validate userDetails
      if (
        !userDetails.username ||
        !userDetails.firstName ||
        !userDetails.lastName
      ) {
        console.error("Incomplete user details provided");
        return null;
      }

      // Update user details
      user.username = userDetails.username;
      user.firstName = userDetails.firstName;
      user.lastName = userDetails.lastName;

      // Optional fields
      if (userDetails.bio) {
        user.bio = userDetails.bio;
      }
      if (userDetails.dob) {
        user.dob = userDetails.dob;
      }
      if (userDetails.phone) {
        user.phone = userDetails.phone;
      }

      // Save the updated user
      await user.save();

      // Return the updated user details
      return user;
    } catch (error) {
      console.error("Error from updateProfile in UserRepository", error);
      throw error;
    }
  }
}

export default UserRepository;
