import axios from "../../axios/axios";
import { APP_CLOUDNAME, APP_PRESET_KEY } from "../../config/config";

const presetKey: string = APP_PRESET_KEY;
const cloudname: string = APP_CLOUDNAME;

// Function for add a new story
const useAddStory = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadOnCloudinay = async (files: any) => {
    try {
      const file = files[0].originalFile.file;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", presetKey || "");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        {
          method: "post",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data, "data from cloudinary");
      return data.secure_url;
    } catch (error) {
      console.log("error from useAddStory", error);
      throw error;
    }
  };

  // Function for add a new story on the database with cloudinary
  const addNewStory = async (userId: string, storyImg: string) => {
    try {
      const response = await axios.post(`/api/story/${userId}`, {
        storyImg,
      });
      const data = response.data;
      if (data.success) {
        return data.stories;
      }
      return null;
    } catch (error) {
      console.log("error from useAddStory", error);
      throw error;
    }
  };

  return {
    uploadOnCloudinay,
    addNewStory,
  };
};

export default useAddStory;
