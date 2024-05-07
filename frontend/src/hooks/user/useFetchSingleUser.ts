import axios from "../../axios/axios";

const useFetchSingleUser = () => {
  const fetchSingleUser = async (userId: string) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      const data = response.data;

      if (data.success) {
        return data.userData;
      }
    } catch (error) {
      console.log("error from useFetchSingleUser", error);
      throw error;
    }
  };
  return { fetchSingleUser };
};

export default useFetchSingleUser;
