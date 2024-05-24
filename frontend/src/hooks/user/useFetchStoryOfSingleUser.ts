// Hook for fetch story of single user

import axios from "axios";

const useFetchStoryOfSingleUser = () => {
  const fetchStoryOfSingleUser = async (userId: string) => {
    try {
      const response = await axios.get(`/api/story/${userId}`);
      const data = response.data;
      if (data.success) {
        return data.stories;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function for delete story
  const deleteStory = async (storyId: string, userId: string) => {
    try {
      const response = await axios.delete(`/api/story/${storyId}/${userId}`);
      const data = response.data;

      console.log(data, " form delete story");
      if (data.success) {
        return data.stories;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchStoryOfSingleUser, deleteStory };
};

export default useFetchStoryOfSingleUser;
