import { Request, Response } from "express";
import PostRepository from "../repositories/PostRepository";
import NotificationRepository from "../repositories/NotificationRepository";
import { getRecieverSocketId, io } from "../socket/socket";

const postRepository = new PostRepository();
const notificationRepository = new NotificationRepository();

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, comment, postOwnerId } = req.body;

    const commentData = await postRepository.addComment(
      postId,
      userId,
      comment
    );
    const newComment =
      commentData?.comments?.[commentData?.comments?.length - 1];

    const postData = await postRepository.getAllPosts();

    await notificationRepository.createNotification(
      userId,
      postOwnerId,
      "comment"
    );

    const notifications = await notificationRepository.fetchNotifications(
      postOwnerId
    );

    const recieverId = getRecieverSocketId(postOwnerId);

    if (recieverId) {
      io.to(recieverId).emit("notification", notifications);
    }

    if (commentData) {
      return res.status(200).json({ success: true, postData, newComment });
    }

    return res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for toggle like

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, postOwnerId } = req.body;

    const updatedPostData = await postRepository.toggleLike(postId, userId);

    if (!updatedPostData)
      return res.status(400).json({ error: "Something went wrong" });

    const postData = await postRepository.getAllPosts();

    await notificationRepository.createNotification(
      userId,
      postOwnerId,
      "like"
    );

    const notifications = await notificationRepository.fetchNotifications(
      postOwnerId
    );

    const recieverId = getRecieverSocketId(postOwnerId);

    if (recieverId) {
      io.to(recieverId).emit("notification", notifications);
    }

    return res.status(200).json({ success: true, postData });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for edit comment
export const editComment = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    const updatedPostData = await postRepository.editComment(
      postId,
      commentId,
      comment
    );

    if (!updatedPostData)
      return res.status(400).json({ error: "Something went wrong" });

    const postData = await postRepository.getAllPosts();

    res.status(200).json({ success: true, updatedPostData, postData });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for delete comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;

    const updatedPostData = await postRepository.deleteComment(
      postId,

      commentId
    );

    if (!updatedPostData)
      res.status(400).json({ error: "Something went wrong" });

    const postData = await postRepository.getAllPosts();

    res.status(200).json({ success: true, updatedPostData, postData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
