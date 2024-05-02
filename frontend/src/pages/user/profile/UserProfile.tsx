import Sidebar from "../../../components/user/common/Sidebar";
import { DefaultGallery } from "../../../components/user/profile/ProfielPostGallery";
import ProfileCard from "../../../components/user/profile/ProfileCard";

function UserProfile() {
  return (
    <div className="flex h-screen">
      <div className="w-64 ">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex-grow p-4">
          <ProfileCard />
        </div>
        <div className="p-4 m-auto">
          <DefaultGallery />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
