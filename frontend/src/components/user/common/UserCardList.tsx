import React from "react";
import IUserState from "../../../types/IUserState";

interface IUserCardListProps {
  users: IUserState[];
}

const UserCardList: React.FC<IUserCardListProps> = ({ users }) => {
  return (
    <div className="max-w-sm mx-auto mt-auto">
      {users.map((user: IUserState) => (
        <div
          key={user._id}
          className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
        >
          <div className="flex items-center">
            <img
              className="rounded-full h-10 w-10"
              src={user.profileimg || "avathar.jpeg"}
              alt={user.username}
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="leading-snug text-xs text-gray-600">
                @{user.username}
              </div>
            </div>
          </div>
          <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCardList;
