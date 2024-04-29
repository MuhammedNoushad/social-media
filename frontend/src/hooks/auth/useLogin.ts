import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";
import { setUser } from "../../store/feactures/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
        dispatch(setUser(data.responseData));
        navigate("/home");
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
