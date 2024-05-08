import axios from "../../axios/axios";

const useFollow = () => {
  const follow = async (userId: string, followingId: string) => {
    try {
      const response = await axios.post("/api/connection/follow", {
        userId,
        followingId,
      });

      const data = response.data;

      if (data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error from useFollow", error);
      throw error;
    }
  };
  const unfollow = async (userId: string, unfollowingId: string) => {
    try {
      const response = await axios.post("/api/connection/unfollow", {
        userId,
        unfollowingId,
      });

      const data = response.data;

      if (data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error from useUnfollow", error);
      throw error;
    }
  };

  return { follow, unfollow };
};

export default useFollow;
