import React from "react";
import { useNavigate } from "react-router-dom";
import IUserState from "../../../types/IUserState";

interface IUserCardListProps {
  users: IUserState[];
}

const UserCardList: React.FC<IUserCardListProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto mt-auto">
      {users.map((user: IUserState) => (
        <div
          onClick={() => navigate(`/profile/${user._id}`)}
          key={user._id}
          className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
        >
          <div className="flex items-center">
            <img
              className="rounded-full h-10 w-10 md:h-12 md:w-12"
              src={user.profileimg || "/public/avathar.jpeg"}
              alt={user.username}
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm md:text-base text-gray-900 font-bold font-roboto-condensed">
                {user.firstName} {user.lastName}
              </div>
              <div className="leading-snug text-xs md:text-sm text-gray-600 font-roboto-condensed">
                @{user.username}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardList;
