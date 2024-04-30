import { toast } from "sonner";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";

type VerifyOtpFunction = (otp: string, formData: IFormInput) => Promise<void>;

const useVerifyOtp = (): VerifyOtpFunction => {
  const confirmOtp: VerifyOtpFunction = async (otp, formData) => {
    try {
      // Send OTP and form data to the server
      const response = await axios.post("/api/auth/verify-otp", {
        otp,
        formData,
      });
      if (response.data.success) {
        console.log("Successfully verified");
      }
    } catch (error) {
      console.log("error from useConfirmOtp", error);
      toast.error("Invalid OTP");
    }
  };

  return confirmOtp;
};

export default useVerifyOtp;
