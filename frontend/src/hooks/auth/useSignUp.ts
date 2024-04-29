import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";
import { toast } from "sonner";

type SignUpFunction = (formData: IFormInput) => Promise<void>;

const useSignUp = (): SignUpFunction => {
  const navigate = useNavigate();

  const signup: SignUpFunction = async (formData: IFormInput) => {
    try {
      const response = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;

      if (data.success) {
        toast.success("Otp send successfully");
        // If data has a success field set to true, navigate to the "/confirm-otp" route
        navigate("/verify-otp", { state: { userData: data.userData } });
      } else {
        // Handle other cases where success is not true
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

  return signup;
};

export default useSignUp;
