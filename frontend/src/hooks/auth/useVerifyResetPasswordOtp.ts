import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { toast } from "sonner";

const useVerifyResetPasswordOtp = () => {
  const navigate = useNavigate();
  const verifyResetPasswordOtp = async (otp: string, email: string) => {
    try {
      const response = await axios.post("/api/auth/forgot-password/otp", {
        otp,
        email,
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("otpTimerRemaining");
        navigate("/forgot-password/reset", {
          state: { email: email, verified: true },
        });
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

  const resendOtp = async (email: string) => {
    try {
      const response = await axios.post(
        "/api/auth/forgot-password/resend-otp",
        {
          email,
        }
      );
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { verifyResetPasswordOtp, resendOtp };
};

export default useVerifyResetPasswordOtp;
