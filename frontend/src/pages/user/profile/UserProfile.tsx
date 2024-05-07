import Sidebar from "../../../components/user/common/Sidebar";
import { DefaultGallery } from "../../../components/user/profile/ProfielPostGallery";
import ProfileCard from "../../../components/user/profile/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function UserProfile() {
  const userDetails = useSelector((state: RootState) => state.user);

  return (
    <div className="flex h-screen">
      <div className="w-2/12 ">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col w-10/12 gap:6 lg:gap-12">
        <div className="flex-grow lg:p-4 lg:max-h-[26vh]">
          <ProfileCard userDetails={userDetails} profile="own" />
        </div>
        <div className="p-4 lg:ml-24 mr-auto mb-auto">
          <DefaultGallery userId={userDetails._id} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
