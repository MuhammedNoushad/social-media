import axios from "../../axios/axios";

const useBlockUser = () => {
  const blockUser = async (userId: string): Promise<void> => {
    try {
      const response = await axios.put(`/api/admin/block-user/${userId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return blockUser;
};

export default useBlockUser;
