import { useState } from "react";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/feactures/userDetailsSlice";

const useDeleteProfilePic = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteProfilePic = async (userId: string) => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `/api/user/profile/${userId}/delete-profile-picture`
      );

      dispatch(setUser(response.data.updatedProfile));
    } catch (error) {
      console.log("error form useDeleteProfilePic hook", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProfilePic, loading };
};

export default useDeleteProfilePic;
