import { Request, Response } from "express";
import PostRepository from "../repositories/PostRepository";

const postRepository = new PostRepository();

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, comment } = req.body;

    const commentData = await postRepository.addComment(
      postId,
      userId,
      comment
    );
    const newComment =
      commentData?.comments?.[commentData?.comments?.length - 1];

    const postData = await postRepository.getAllPosts();

    if (commentData) {
      return res.status(200).json({ success: true, postData, newComment });
    }

    return res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
