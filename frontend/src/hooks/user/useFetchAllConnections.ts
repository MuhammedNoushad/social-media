import axios from "../../axios/axios";

const useFetchAllConnections = () => {
  const fetchAllConnections = async (userId: string) => {
    try {
      const response = await axios.get(`/api/connection/${userId}`);
      const data = response.data;
      return data.connections;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { fetchAllConnections };
};

export default useFetchAllConnections;
