import IPosts from "../interfaces/IPosts";
import Post from "../models/post.model";

class PostRepository {
  // Create new post
  async createNewpost(postDetails: IPosts): Promise<IPosts | null> {
    try {
      const newPost = new Post(postDetails);

      if (newPost) {
        await newPost.save();
        return newPost.toObject();
      }
      return null;
    } catch (error) {
      console.error("Error from createOtp in OtpRepository", error);
      return null;
    }
  }

  // Function for fetching all posts
  async getAllPosts(): Promise<IPosts[] | null> {
    try {
      const posts = await Post.find({}).populate("userId");

      if (posts) {
        return posts.map((post) => post.toObject());
      }
      return null;
    } catch (error) {
      console.error("Error from get all posts in post controller", error);
      return null;
    }
  }

  // Function for fetching post of user
  async getPostOfUser(userId: string): Promise<IPosts[] | null> {
    try {
      const posts = await Post.find({ userId })
        .populate("userId")
        .sort({ createdAt: -1 });
        
      if (!posts) return null;
      return posts.map((post) => post.toObject());
    } catch (error) {
      return null;
    }
  }
}

export default PostRepository;
