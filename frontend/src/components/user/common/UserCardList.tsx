import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserState from "../../../types/IUserState";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useFollow from "../../../hooks/user/useFollow";

interface IUserCardListProps {
  users: IUserState[];
}

const UserCardList: React.FC<IUserCardListProps> = ({ users }) => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const { follow } = useFollow();

  // Function for fetch Connection
  const fetchConnection = async () => {
    try {
      const response = await axios.get(`/api/connection/${user._id}`);
      const data = response.data;
      if (data.success) {
        setFollowing(data.connections.following);
        setFollowers(data.connections.followers);
      }
    } catch (error) {
      console.log(error, "error from fetchConnection");
    }
  };

  useEffect(() => {
    fetchConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // Function for handle follow User
  const handleFollow = async (userId: string) => {
    try {
      const response = await follow(user._id, userId);
      if (response) {
        setShowButton(false);
      }
    } catch (error) {
      console.log(error, "error from handleFollow");
    }
  };

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
              className="rounded-full h-10 w-10"
              src={user.profileimg || "/public/avathar.jpeg"}
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
          {/* Conditionally render the "Follow" button */}
          {showButton &&
            !following.some(
              (followingUser: { _id: string }) => followingUser._id === user._id
            ) &&
            (followers.some(
              (follower: { _id: string }) => follower._id === user._id
            ) ? (
              <button
                onClick={() => {
                  handleFollow(user._id);
                }}
                className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
              >
                Follow Back
              </button>
            ) : (
              <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
                Follow
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default UserCardList;
