import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import axios from "../../axios/axios";
import { setPosts } from "../../store/features/postsSlice";

const usePostComment = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const postComment = async (
    comment: string,
    postId: string,
    postOwnerId: string
  ) => {
    try {
      const response = await axios.post(`/api/posts/add-comment/${postId}`, {
        comment,
        userId: user._id,
        postOwnerId,
      });
      const data = response.data;

      if (data.success) {
        dispatch(setPosts(data.postData));
        return data.newComment;
      }
    } catch (error) {
      console.log("error from usePostComment", error);
      throw error;
    }
  };
  return { postComment };
};

export default usePostComment;
