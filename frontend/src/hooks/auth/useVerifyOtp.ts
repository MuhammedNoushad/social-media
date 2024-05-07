import { toast } from "sonner";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";
import { useNavigate } from "react-router-dom";

type VerifyOtpFunction = (otp: string, formData: IFormInput) => Promise<void>;

const useVerifyOtp = (): VerifyOtpFunction => {
  const navigate = useNavigate();
  const confirmOtp: VerifyOtpFunction = async (otp, formData) => {
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

  return confirmOtp;
};

export default useVerifyOtp;
