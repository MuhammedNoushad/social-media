import { useSelector } from "react-redux";
import axios from "../../axios/axios";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCreatePost = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const createPost = async (formData: { desc: string; imageUrl: string }) => {
    try {
      console.log(formData);
      const response = await axios.post(`/api/posts/${userData._id}`, formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/profile");
      }
    } catch (error) {
      console.log("error from useCreatePost", error);
      throw error;
    }
  };
  return { createPost };
};

export default useCreatePost;
