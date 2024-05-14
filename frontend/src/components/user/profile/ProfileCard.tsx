import React, { useEffect, useState } from "react";
import {
  BiMailSend,
  BiUser,
  BiMessageSquareAdd,
  BiUserPlus,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import IUserState from "../../../types/IUserState";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useFollow from "../../../hooks/user/useFollow";

const ProfileCard: React.FC<{ userDetails: IUserState; profile: string }> = ({
  userDetails,
  profile,
}) => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [followedByUser, setFollowedByUser] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { follow, unfollow } = useFollow();

  const post = useSelector((state: RootState) => state.posts.posts);
  const ownPosts = post.filter((post) => {
    return post.userId?._id === userDetails._id;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connections: any = useSelector(
    (state: RootState) => state.connection.connection
  );
  const numberOfFollowers = connections.followers.length;
  const numberOfFollowing = connections.following.length;

  // Function for fetch Connection
  const fetchConnection = async () => {
    try {
      const response = await axios.get(`/api/connection/${user._id}`);
      const data = response.data;
      if (data.success) {
        const isFollowing = data.connections.following.some(
          (followingUser: { _id: string }) =>
            followingUser._id === userDetails._id
        );
        setFollowing(isFollowing);
        const isFollowedByUser = data.connections.followers.some(
          (follower: { _id: string }) => follower._id === userDetails._id
        );
        setFollowedByUser(isFollowedByUser);
      }
    } catch (error) {
      console.log(error, "error from fetchConnection");
    }
  };

  useEffect(() => {
    fetchConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, userDetails._id]);

  // Function for handle follow User
  const handleFollow = async () => {
    try {
      const response = await follow(user._id, userDetails._id);
      if (response) {
        setFollowing(true);
      }
    } catch (error) {
      console.log(error, "error from handleFollow");
    }
  };

  // Function for handle unfollow User
  const handleUnfollow = async () => {
    try {
      const response = await unfollow(user._id, userDetails._id);
      if (response) {
        setFollowing(false);
      }
    } catch (error) {
      console.log(error, "error from handleUnfollow");
    }
  };

  return (
    <div className="relative w-auto min-w-0 break-words bg-light/30 draggable max-h-max font-roboto-condensed">
      {/* card body */}
      <div className=" py-9 lg:mr-40 flex flex-col items-center justify-center h-full">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap gap-12">
          <div className="mb-5 mr-5">
            <div className="relative inline-block shrink-0 rounded-2xl">
              <img
                className="object-cover inline-block shrink-0 rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px]"
                src={userDetails.profileimg || "/public/avathar.jpeg"}
                alt="image"
              />
            </div>
          </div>
          <div className="grow gap-y-5">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <p className="text-secondary-inverse font-bold hover:text-red-600 transition-colors duration-200 ease-in-out text-[1.2rem] mr-1 font-roboto-condensed">
                    {userDetails.firstName} {userDetails.lastName}
                  </p>
                  {profile === "own" && (
                    <a
                      onClick={() => {
                        navigate("/edit-profile");
                      }}
                      className="inline-block ml-2 px-2 py-1 text-xs sm:text-sm sm:ml-4 sm:px-3 sm:py-1 font-roboto-condensed font-medium leading-normal text-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out border-0 shadow-none cursor-pointer"
                    >
                      Edit Profile
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap justify-center pr-0 sm:pr-2 mb-2 font-roboto-condensed font-medium text-xs sm:text-sm">
                  <a className="flex items-center mr-5 text-secondary-dark hover:text-red-600">
                    <span className="mr-1">
                      <BiUser />
                    </span>{" "}
                    @{userDetails.username}{" "}
                  </a>
                  <a
                    href={`mailto:${userDetails.email}`}
                    className="flex items-center mr-5 text-secondary-dark hover:text-red-600"
                  >
                    <span className="mr-1">
                      <BiMailSend />
                    </span>{" "}
                    {userDetails.email}{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap items-center">
                <p className="text-base sm:text-lg text-gray-700 from-neutral-600 mb-2 sm:mb-4 text-center max-w-md font-roboto-condensed">
                  {userDetails.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap items-center">
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                  {ownPosts.length} posts
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                  {numberOfFollowing} Following
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                  {numberOfFollowers} Followers
                </p>
              </div>
            </div>
            {/* follow and message button here */}
            {profile === "others" && (
              <div className="flex justify-center my-4">
                {following ? (
                  <button
                    onClick={handleUnfollow}
                    className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                  >
                    <BiUserPlus className="mr-2" /> Unfollow
                  </button>
                ) : followedByUser ? (
                  <button
                    onClick={handleFollow}
                    className="flex items-center justify-center  bg-blue-500 hover:bg-blue-600 text-white font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                  >
                    <BiUserPlus className="mr-2" /> Follow Back
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="flex items-center justify-center  bg-blue-500 hover:bg-blue-600 text-white font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                  >
                    <BiUserPlus className="mr-2" /> Follow
                  </button>
                )}

                <button className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-lg">
                  <BiMessageSquareAdd className="mr-2" /> Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
