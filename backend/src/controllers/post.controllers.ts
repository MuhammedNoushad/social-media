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
      return res.status(200).json({
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
    const postData = await postRepository.getAllPosts();

    if (!postData) {
      return res.status(400).json({ error: "Failed to fetch posts" });
    }

    const posts = postData.filter(
      (post) => post.isBlocked === false && post.isDeleted === false
    );

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

// Function for report post
export const report = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    const reportData = await postRepository.reportPost(postId, userId, content);

    if (!reportData)
      return res.status(400).json({ error: "Failed to report post" });

    const posts = await postRepository.getAllPosts();

    const postData = posts?.filter(
      (post) => post.isBlocked === false && post.isDeleted === false
    );

    return res.status(200).json({ success: true, postData });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch reported posts
export const reportedPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const postData = await postRepository.fetchPostWithPagination(page, limit);
    const totalPosts = await postRepository.getTotalCountOfReportedPosts();

    if (!postData) {
      return res.status(400).json({ error: "Failed to fetch posts" });
    }

    const reportedPosts = postData.filter(
      (post) => post.reports && post.reports.length > 0
    );

    return res.status(200).json({ success: true, reportedPosts, totalPosts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for block post
export const togglePostBlock = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const blockedPost = await postRepository.toggleBlock(postId);

    if (!blockedPost) {
      res.status(400).json({ error: "Failed to block post" });
    }

    const message = blockedPost?.isBlocked
      ? "Post blocked successfully"
      : "Post unblocked successfully";

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const deletedPost = await postRepository.deletePost(postId);

    if (!deletedPost) {
      res.status(400).json({ error: "Failed to delete post" });
    }

    const postData = await postRepository.getAllPosts();

    return res.status(200).json({ success: true, postData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for edit post
export const editPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const {  description } = req.body;

    console.log(postId, description, "from edit post controller");

    const updatedPost = await postRepository.editPost(postId, description);

    if (!updatedPost) {
      res.status(400).json({ error: "Failed to edit post" });
    }

    const postData = await postRepository.getAllPosts();

    return res.status(200).json({ success: true, postData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
