import { Request, Response } from "express";
import PostRepository from "../repositories/PostRepository";
import IPosts from "../interfaces/IPosts";

const postRepository = new PostRepository();

// Function for creating new post
export const createNewPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { imageUrl, desc: description } = req.body;
    console.log(userId, imageUrl, description);

    // Create new post
    const newPOst = {
      userId,
      imageUrl,
      description,
    } as IPosts;

    const postData = await postRepository.createNewpost(newPOst);

    if (postData) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Post created successfully",
          postData,
        });
    } else {
      return res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.error("Error from createNewPost in post controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetching all posts
export const fetchAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.getAllPosts();

    if (!posts) {
      return res.status(400).json({ error: "Failed to fetch posts" });
    }

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetching post of user
export const getPostOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await postRepository.getPostOfUser(userId);
    if (!posts) {
      return res.status(400).json({ error: "Failed to fetch posts" });
    }
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
