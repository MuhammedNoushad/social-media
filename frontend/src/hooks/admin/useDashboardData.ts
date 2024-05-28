import { useEffect, useState } from "react";

import axios from "../../axios/axios";
import IUserDetails from "../../types/IUserDetails";

const useDashboardData = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [latestUsers, setLatestUsers] = useState<IUserDetails[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any[]>([]);
  const [postData, setPostData] = useState<number[]>([]);

  // Function for fetch the total number of user
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get("/api/user/users/count");
      const data = response.data;
      if (data.success) {
        setTotalUsers(data.totalUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetch the total number of posts
  const fetchTotalPosts = async () => {
    try {
      const response = await axios.get("/api/posts/posts/count");
      const data = response.data;
      if (data.success) {
        setTotalPosts(data.totalPosts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetch the total number of likes
  const fetchTotalLikes = async () => {
    try {
      const response = await axios.get("/api/posts/posts/total-likes");
      const data = response.data;
      if (data.success) {
        setTotalLikes(data.totalLikes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetch latest registered users from the database
  const fetchLatestUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users/latest");
      const data = response.data;
      if (data.success) {
        setLatestUsers(data.usersData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetch the chart data for users
  const fetchChartData = async () => {
    try {
      const response = await axios.get("/api/admin/users/chart/data");
      const { success, chartData } = response.data;
      if (success) {
        setUserData(chartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetch the chart data for posts
  const fetchPostData = async () => {
    try {
      const response = await axios.get("/api/admin/posts/chart/data");
      const { success, chartData } = response.data;
      if (success) {
        setPostData(chartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalPosts();
    fetchTotalLikes();
    fetchLatestUsers();
    fetchChartData();
    fetchPostData();
  }, []);

  return {
    totalUsers,
    totalPosts,
    totalLikes,
    latestUsers,
    userData,
    postData,
  };
};

export default useDashboardData;
