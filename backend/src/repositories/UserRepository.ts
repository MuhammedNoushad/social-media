import IUsers from "../interfaces/IUsers";
import User from "../models/user.model";
import { MongooseError } from "mongoose";

// Creating the UserRepository
 class UserRepository {
  // Checking the user email is existing or not
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
  // Checking the user name is existing or not
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
      return userData || null; // Return null if user is not found
    } catch (error) {
      console.error("Error from findUser in UserRepository", error);
      throw error;
    }
  }
}


export default UserRepository