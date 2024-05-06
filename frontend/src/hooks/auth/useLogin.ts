import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";
import { setUser } from "../../store/features/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToken } from "../../store/features/tokenSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userData: IFormInput) => {
    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.responseData.accessToken);
        dispatch(setUser(data.responseData));
        dispatch(
          addToken({
            token: data.responseData.accessToken,
            role: data.responseData.role,
          })
        );
        if (data.responseData.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/home");
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

  return login;
};

export default useLogin;
