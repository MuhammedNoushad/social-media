import axios from "../../axios/axios";

const useFetchUserPosts = () => {
  const fetchUserPosts = async (userId: string) => {
    try {
      const response = await axios.get(`/api/posts/${userId}`);

      const data = response.data;
      console.log(data.posts);
      if (data.success) {
        return data.posts;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log("error from useFetchUserPosts", error);
      throw error;
    }
  };

  return { fetchUserPosts };
};

export default useFetchUserPosts;
