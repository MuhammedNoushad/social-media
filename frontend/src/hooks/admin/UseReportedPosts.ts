import axios from "../../axios/axios";

// Function for fetch all reported posts
const useReportedPosts = () => {
  const reportedPosts = async () => {
    try {
      const response = await axios.get("/api/admin/reported-posts");
      const data = response.data;

      if (data.success) {
        return data.reportedPosts;
      }
    } catch (error) {
      console.log("error from useReportedPosts", error);
    }
  };
  return { reportedPosts };
};

export default useReportedPosts;
