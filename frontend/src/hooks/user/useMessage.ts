import axios from "../../axios/axios";

const useMessage = () => {
  const sendMessage = async (
    message: string,
    userId: string,
    userToChatId: string
  ) => {
    try {
      const response = await axios.post(
        `/api/messages/${userId}/${userToChatId}`,
        { message }
      );
      const data = response.data;
      if (data.success) {
        return data.conversation;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { sendMessage };
};

export default useMessage;
