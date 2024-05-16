import axios from "../../axios/axios";

const useFetchConversation = () => {
  const fetchAllConversations = async (userId: string) => {
    try {
      const response = await axios.get(`/api/message/conversations/${userId}`);
      const data = response.data;

      if (data.success) {
        return data.conversations;
      }
    } catch (error) {
      console.log("error from useFetchConverstaion", error);
      throw error;
    }
  };
  return {
    fetchAllConversations,
  };
};

export default useFetchConversation;
