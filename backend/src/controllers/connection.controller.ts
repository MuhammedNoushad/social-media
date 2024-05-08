import ConnectionRepository from "../repositories/ConnectionRepository";
import UserRepository from "../repositories/UserRepository";

const userRepository = new UserRepository();
const connectionRepository = new ConnectionRepository();

// Function for following
export const follow = async (req: any, res: any) => {
  try {
    const { userId, followingId } = req.body;

    const followUser = await userRepository.findById(followingId);

    if (!followUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = await connectionRepository.isFollowing(
      userId,
      followingId
    );

    if (isFollowing) {
      return res.status(400).json({ error: "Already following" });
    }

    await connectionRepository.followUser(userId, followingId);

    return res.status(200).json({ success: true, followUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for unfollow user
export const unfollow = async (req: any, res: any) => {
  try {
    const { userId, unfollowingId } = req.body;


    const unfollowUser = await userRepository.findById(unfollowingId);

    if (!unfollowUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await connectionRepository.unfollowUser(userId, unfollowingId);

    return res.status(200).json({ success: true, unfollowUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch all connections
export const fetchAllConnections = async (req: any, res: any) => {
  try {
    const { userId } = req.params;

    const connections = await connectionRepository.fetchAllConnections(userId);

    return res.status(200).json({ success: true, connections });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });
  }
};
