import { toast } from "sonner";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const useVerifyOtp = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confirmOtp = async (otp: string, formData: any) => {
    try {
      // Send OTP and form data to the server
      const response = await axios.post("/api/auth/verify-otp", {
        otp,
        formData,
      });
      if (response.data.success) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("error from useConfirmOtp", error);
      toast.error("Invalid OTP");
    }
  };

  const resendOtp = async (email: string) => {
    try {
      const response = await axios.post("/api/auth/resend-otp", {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("error from resendOtp", error);
    }
  };

  return { confirmOtp, resendOtp };
};

export default useVerifyOtp;
