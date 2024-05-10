import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import axios from "../../axios/axios";
import { setPosts } from "../../store/features/postsSlice";

const useLikePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const likePost = async (postId: string) => {
    try {
      const response = await axios.post(`/api/posts/toggle-like/${postId}`, {
        userId: user._id,
      });
      const data = response.data;

      if (data.success) {
        dispatch(setPosts(data.postData));
      }
    } catch (error) {
      console.log("error from useLikePost", error);
      throw error;
    }
  };
  return { likePost };
};

export default useLikePost;
