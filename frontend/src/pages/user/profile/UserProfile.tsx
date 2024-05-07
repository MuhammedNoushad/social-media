import Sidebar from "../../../components/user/common/Sidebar";
import { DefaultGallery } from "../../../components/user/profile/ProfielPostGallery";
import ProfileCard from "../../../components/user/profile/ProfileCard";

function UserProfile() {
  return (
    <div className="flex h-screen">
      <div className="w-2/12 ">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col w-10/12 gap:6 lg:gap-12">
        <div className="flex-grow lg:p-4 lg:max-h-[26vh]">
          <ProfileCard />
        </div>
        <div className="p-4 mx-auto mb-auto">
          <DefaultGallery />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
