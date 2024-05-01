import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { toast } from "sonner";

const useResetPassword = () => {
  const navigate = useNavigate();
  const resetPassword = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await axios.put("/api/auth/forgot-password/reset", {
        email,
        password,
        confirmPassword,
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };
  return { resetPassword };
};

export default useResetPassword;
