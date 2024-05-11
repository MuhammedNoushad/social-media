import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import { setPosts } from "../../store/features/postsSlice";

const useReportPost = () => {
    const dispatch = useDispatch()
  const reportPost = async (
    postId: string,
    userId: string,
    content: string
  ) => {
    try {
      const response = await axios.post(`/api/posts/report/${postId}`, {
        userId,
        content,
      });
      const data = response.data;

      if(data.success){
        dispatch (setPosts(data.postData))
        return true;
      }

    } catch (error) {
      console.log(error);
    }
  };
  return { reportPost };
};

export default useReportPost;
