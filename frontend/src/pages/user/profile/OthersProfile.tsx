import { useParams } from "react-router-dom";
import Sidebar from "../../../components/user/common/Sidebar";
import { DefaultGallery } from "../../../components/user/profile/ProfielPostGallery";
import ProfileCard from "../../../components/user/profile/ProfileCard";
import { useEffect, useState } from "react";
import useFetchSingleUser from "../../../hooks/user/useFetchSingleUser";
import IUserState from "../../../types/IUserState";

function OthersProfile() {
  const { userId } = useParams();
  const { fetchSingleUser } = useFetchSingleUser();

  const initialUserData: IUserState = {
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profileimg: "",
    bio: "",
    dob: "",
    phone: undefined,
    isBlock: false,
    isAdmin: false,
  };

  const [userData, setUserData] = useState<IUserState>(initialUserData);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const user = await fetchSingleUser(userId);
        setUserData(user);
      }
    };
    fetchUser();
  }, [userId, fetchSingleUser]);

  return (
    <div className="flex h-screen">
      <div className="w-2/12 ">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col w-10/12 gap:6 lg:gap-12">
        <div className="flex-grow lg:mb-4 lg:mr-44 lg:py-4 lg:max-h-[26vh]">
          <ProfileCard userDetails={userData} profile="others" />
        </div>
        <div className="p-4 lg:ml-24 lg:mr-60 mb-auto lg:mt-8">
          <DefaultGallery userId={userId as string} profile="others" />
        </div>
      </div>
    </div>
  );
}

export default OthersProfile;
