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
      const posts = await Post.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .populate("reports.userId", "username _id profileimg")
        .populate("userId", "username _id profileimg isVerified")
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
      const posts = await Post.find({ userId, isDeleted: false })
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

  // Function for fetching block posts
  async toggleBlock(postId: string): Promise<IPosts | null> {
    try {
      const post = await Post.findById(postId);
      if (!post) return null;

      post.isBlocked = !post.isBlocked;

      // Save the updated postData
      const updatedPost = await post.save();
      return updatedPost ? updatedPost.toObject() : null;
    } catch (error) {
      console.log("Error from blockPost in PostRepository", error);
      return null;
    }
  }

  // Function for delete post
  async deletePost(postId: string) {
    try {
      const deletedPost = await Post.findByIdAndUpdate(postId, {
        isDeleted: true,
      });

      return deletedPost;
    } catch (error) {
      console.log("Error from deletePost in PostRepository", error);
      return null;
    }
  }

  // Function for fetch reported posts with pagination
  async fetchPostWithPagination(page: number, limit: number) {
    try {
      const posts = await Post.find({ isDeleted: false, reports: { $ne: [] } })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("userId", "username _id profileimg")
        .populate("comments.userId", "username _id profileimg")
        .sort({ createdAt: -1 });
      if (!posts) return null;
      return posts.map((post) => post.toObject());
    } catch (error) {
      console.log(
        "Error from fetchPostWithPagination in PostRepository",
        error
      );
      return null;
    }
  }

  // Function for fetch total count of reported posts
  async getTotalCountOfReportedPosts() {
    try {
      const totalPost = await Post.countDocuments({
        isDeleted: false,
        reports: { $ne: [] },
      });
      return totalPost;
    } catch (error) {
      console.log(
        "Error from getTotalCountOfReportedPosts in PostRepository",
        error
      );
    }
  }

  // Function for edit comment
  async editComment(postId: string, commentId: string, newComment: string) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: postId,
          "comments._id": commentId,
        },
        {
          $set: {
            "comments.$.comment": newComment,
          },
        },
        { new: true }
      );

      return post;
    } catch (error) {
      console.log("Error from editComment in PostRepository", error);
      return null;
    }
  }

  // Function for delete comment
  async deleteComment(postId: string, commentId: string) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: postId,
          "comments._id": commentId,
        },
        {
          $pull: {
            comments: {
              _id: commentId,
            },
          },
        },
        { new: true }
      );
      return post;
    } catch (error) {
      console.log("Error from deleteComment in PostRepository", error);
      return null;
    }
  }

  // Function for edit post
  async editPost(postId: string, newDiscription: string) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $set: {
            description: newDiscription,
          },
        },
        { new: true }
      );
      return post;
    } catch (error) {
      console.log("Error from editPost in PostRepository", error);
      return null;
    }
  }

  // Function for  fetch all liked users
  async fetchAllLikedUsers(postId: string) {
    try {
      const post = await Post.findById(postId).populate("likes");

      if (!post) return null;

      return post.likes;
    } catch (error) {
      console.log("Error from fetchAllLikedUsers in PostRepository", error);
      return null;
    }
  }

  // Function for fetch the total count of posts
  async fetchTotalPostsCount() {
    try {
      const totalPost = await Post.countDocuments({ isDeleted: false });
      return totalPost;
    } catch (error) {
      console.log("Error from fetchTotalPostsCount in PostRepository", error);
    }
  }

  // Function for fetch total likes from all the posts
  async fetchTotalLikes() {
    try {
      const totalLikes = await Post.aggregate([
        { $match: { isDeleted: false } }, 
        { $unwind: "$likes" }, 
        { $group: { _id: null, totalLikes: { $sum: 1 } } }, 
      ]);

      if (totalLikes.length > 0) {
        return totalLikes[0].totalLikes;
      } else {
        return 0;
      }
    } catch (error) {
      console.log("Error from fetchTotalLikes in PostRepository", error);
    }
  }

  // Function for fetch data for chart post 
  async fetchDataForChartPost() {
    try {
      const chartData = await Post.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt"
              }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } },
        { $group: {
          _id: null,
          posts: { $push: "$count" }
        }},
        { $project: {
          _id: 0,
          success: { $literal: true },
          chartData: "$posts"
        }}
      ])
      return chartData;
    } catch (error) {
      console.log("Error from fetchDataForChartPost in PostRepository", error);
    }
  }
}
export default PostRepository;
