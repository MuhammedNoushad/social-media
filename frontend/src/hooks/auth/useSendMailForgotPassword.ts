import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { toast } from "sonner";

const useSendMailForgotPassword = () => {
  const navigate = useNavigate();
  const sendMailForgotPassword = async (email: string) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/forgot-password/otp", { state: { email: email , verified : true } });
      }
      console.log(data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };
  return {sendMailForgotPassword};
};

export default useSendMailForgotPassword;
