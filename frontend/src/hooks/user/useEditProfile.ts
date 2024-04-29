import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import IUserState from "../../types/IUserState";
import { setUser } from "../../store/features/userDetailsSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type EditProfileFunction = (
  userDetails: Omit<IUserState, "password">,
  id: string
) => Promise<void>;

const useEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editProfile: EditProfileFunction = async (userDetails, userId) => {
    try {
      const response = await axios.put(
        `/api/user/profile/${userId}`,
        userDetails
      );
      const data = response.data;

      dispatch(setUser(data.updatedProfile));

      toast.success("Profile has been updated successfully");

      navigate("/profile");
    } catch (error) {
      console.log("error from useEditProfile", error);
      throw error;
    }
  };
  return editProfile;
};

export default useEditProfile;
