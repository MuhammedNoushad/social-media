import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";
import { setUser } from "../../store/feactures/userDetailsSlice"; 
import { useNavigate } from "react-router-dom";

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
    } catch (error) {
      console.log("error from useLogin hook", error);
    }
  };

  return login;
};

export default useLogin;
