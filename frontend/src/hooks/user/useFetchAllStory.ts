import axios from "../../axios/axios";

// Hook for fetch all story
const useFetchAllStory = () => {
  const fetchAllStory = async () => {
    try {
      const response = await axios.get("/api/story/");
      const data = response.data;
      if (data.success) {
        return data.stories;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { fetchAllStory };
};

export default useFetchAllStory;
