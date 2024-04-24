import axios from "../../axios/axios";
import IFormInput from "../../types/IFormInputs";

const useLogin = () => {
  const login = async (userData: IFormInput) => {
    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;

      if (data.success) {
        console.log("logged successfull", data);
      }
    } catch (error) {
      console.log("error from useLogin hook", error);
    }
  };
  return login;
};

export default useLogin;
