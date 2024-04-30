import axios from "../../axios/axios";
import { toast } from "sonner";
import IFormInput from "../../types/IFormInputs";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/features/userDetailsSlice";
import { addToken } from "../../store/features/tokenSlice";
import { useNavigate } from "react-router-dom";

// Hook for Google Login
const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleLogin = async (userData: IFormInput) => {
    try {
      const updatedUserData = {
        username: userData.given_name,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
      const response = await axios.post(
        "/api/auth/google-login",
        updatedUserData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data) {
        dispatch(setUser(data.responseData));
        dispatch(addToken(data.responseData.accessToken));
        if (data.responseData.isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
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

  return googleLogin;
};

export default useGoogleLogin;
