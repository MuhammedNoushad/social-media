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

      console.log(data.userData);
      if (data.success) {
        toast.success("Otp send successfully");
        // If data has a success field set to true, navigate to the "/confirm-otp" route
        navigate("/verify-otp", { state: { userData: data.userData } });
      } else {
        // Handle other cases where success is not true
      }
    } catch (error) {
      console.log("error from useSignUp hook", error);
    }
  };

  return signup;
};

export default useSignUp;
