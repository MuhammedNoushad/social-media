import React from "react";
import Sidebar from "../../../components/user/common/Sidebar";
import EditProfileCard from "../../../components/user/profile/EditProfileCard";

const UserEditProfile: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow flex lg:pl-60  justify-center">
        <EditProfileCard />
      </div>
    </div>
  );
};

export default UserEditProfile;
