import { useState } from "react";
import axios from "../../axios/axios";

// Hook for fetch all story
const useFetchAllStory = () => {
  const [storyLoader, setStoryLoader] = useState(false);
  const fetchAllStory = async () => {
    try {
      setStoryLoader(true);
      const response = await axios.get("/api/story/");
      const data = response.data;
      if (data.success) {
        return data.stories;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStoryLoader(false);
    }
  };
  return { fetchAllStory, storyLoader };
};

export default useFetchAllStory;
