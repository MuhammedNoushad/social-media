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
}

export default PostRepository;