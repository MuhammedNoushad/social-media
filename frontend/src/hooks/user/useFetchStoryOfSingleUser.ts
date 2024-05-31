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

  // Function for push user id to story view
  const addStoryView = async (
    storyId: string,
    userId: string,
    viewedUserId: string
  ) => {
    try {
      const response = await axios.put(`/api/story/${storyId}/${userId}`, {
        viewedUserId,
      });
      const data = response.data;
      if (data.success) {
        return data.stories;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchStoryOfSingleUser, deleteStory, addStoryView };
};

export default useFetchStoryOfSingleUser;
