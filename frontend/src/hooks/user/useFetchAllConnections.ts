import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import IUserDetails from "../../types/IUserDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// Function for fetching all connections
const useFetchAllConnections = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<IUserDetails[]>([]);

  const user = useSelector((state: RootState) => state.user);

  // Function for fetch all connections
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

  // Function for suggest users for the logged in users
  const suggestUsers = async (userId: string) => {
    try {
      const response = await axios.get(`/api/connection/suggest-users/${userId}`);
      const data = response.data;
      setSuggestedUsers(data.users);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    suggestUsers(user._id);
  }, [user._id]);

  return { fetchAllConnections, fetchAllLikedUsers , suggestedUsers,setSuggestedUsers };
};

export default useFetchAllConnections;
