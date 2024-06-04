import { useDispatch } from "react-redux";

import axios from "../../axios/axios";
import { setPosts } from "../../store/features/postsSlice";

const useFetchAllPosts = () => {
  const dispatch = useDispatch();

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const data = response.data;

      if (data.success) {
        dispatch(setPosts(data.posts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchAllPosts };
};

export default useFetchAllPosts;
