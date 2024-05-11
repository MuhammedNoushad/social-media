import { ObjectId } from "mongodb";

import IPosts from "../interfaces/IPosts";
import Post from "../models/post.model";

class PostRepository {
  // Create new post
  async createNewpost(postDetails: IPosts): Promise<IPosts | null> {
    try {
      const newPost = await new Post(postDetails).populate(
        "userId",
        "comments.userId"
      );
      if (newPost) {
        await newPost.save();
        return newPost.toObject();
      }
      return null;
    } catch (error) {
      console.error("Error from createNewpost in PostRepository", error);
      return null;
    }
  }

  // Function for fetching all posts
  async getAllPosts(): Promise<IPosts[] | null> {
    try {
      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("userId", "username _id profileimg")
        .populate("comments.userId", "username _id profileimg");
      if (posts) {
        return posts.map((post) => post.toObject());
      }
      return null;
    } catch (error) {
      console.error("Error from getAllPosts in PostRepository", error);
      return null;
    }
  }

  // Function for fetching post of user
  async getPostOfUser(userId: string): Promise<IPosts[] | null> {
    try {
      const posts = await Post.find({ userId })
        .populate("userId", "username _id profileimg")
        .populate("comments.userId", "username _id profileimg")
        .sort({ createdAt: -1 });
      if (!posts) return null;
      return posts.map((post) => post.toObject());
    } catch (error) {
      console.error("Error from getPostOfUser in PostRepository", error);
      return null;
    }
  }

  // Function for adding a new comment
  async addComment(
    postId: string,
    userId: string,
    comment: string
  ): Promise<IPosts | null> {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: { userId, comment } } },
        { new: true }
      )
        .populate("userId", "username _id profileimg")
        .populate("comments.userId", "username _id profileimg");
      if (!post) return null;
      return post.toObject();
    } catch (error) {
      console.error("Error from addComment in PostRepository", error);
      return null;
    }
  }

  // Function for toggle like
  async toggleLike(postId: string, userId: string): Promise<IPosts | null> {
    try {
      const postData = await Post.findById(postId);
      if (!postData) return null;

      const isLiked = postData.likes.includes(new ObjectId(userId));

      if (isLiked) {
        postData.likes = postData.likes.filter(
          (id) => !id.equals(new ObjectId(userId))
        );
      } else {
        postData.likes.push(new ObjectId(userId));
      }

      // Save the updated postData
      const updatedPost = await postData.save();
      return updatedPost ? updatedPost.toObject() : null;
    } catch (error) {
      console.error("Error from toggleLike in PostRepository", error);
      return null;
    }
  }

  // Function for report
  async reportPost(
    postId: string,
    userId: string,
    content: string
  ): Promise<IPosts | null> {
    try {
      const postData = await Post.findById(postId);

      if (!postData) return null;

      const isReported = postData.reports.some(
        (report) => report.userId.toString() === userId
      );
      if (isReported) {
        return null;
      }

      postData.reports.push({ userId: new ObjectId(userId), content });

      // Save the updated postData
      const updatedPost = await postData.save();

      return updatedPost ? updatedPost.toObject() : null;
    } catch (error) {
      console.error("Error from reportPost in PostRepository", error);
      return null;
    }
  }
}
export default PostRepository;
