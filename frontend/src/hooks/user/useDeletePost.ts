import { toast } from "sonner";

import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/features/postsSlice";

const useDeletePost = () => {
  const dispatch = useDispatch();
  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      const data = response.data;

      if (data.success) {
        toast.success("Post deleted successfully");
        dispatch(setPosts(data.postData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { deletePost };
};

export default useDeletePost;
