import axios from "../../axios/axios";

// Function for fetching all connections
const useFetchAllConnections = () => {
  const fetchAllConnections = async (userId: string) => {
    try {
      const response = await axios.get(`/api/connection/${userId}`);
      const data = response.data;
      return data.connections;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Function for fetch all liked users of a post
  const fetchAllLikedUsers = async (postId: string) => {
    try {
      const response = await axios.get(`/api/posts/liked-users/${postId}`);
      const data = response.data;
      return data.likedUsers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { fetchAllConnections, fetchAllLikedUsers };
};

export default useFetchAllConnections;
