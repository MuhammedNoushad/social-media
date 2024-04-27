import Sidebar from "../../../components/user/common/Sidebar";
import ProfileCard from "../../../components/user/profile/ProfileCard";

function UserProfile() {
  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow flex  justify-center px-4 sm:px-0">
        <ProfileCard />
      </div>
    </div>
  );
}

export default UserProfile;
