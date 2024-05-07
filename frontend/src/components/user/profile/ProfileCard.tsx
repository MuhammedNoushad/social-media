import React from "react";
import {
  BiMailSend,
  BiUser,
  BiMessageSquareAdd,
  BiUserPlus,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import IUserState from "../../../types/IUserState";

const ProfileCard: React.FC<{ userDetails: IUserState; profile: string }> = ({
  userDetails,
  profile,
}) => {
  const navigate = useNavigate();

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
                    {userDetails.username}{" "}
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
                  0 posts
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                  0 Following
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                  0 Followers
                </p>
              </div>
            </div>
            {/* follow and message button here */}
            {profile === "others" && (
              <div className="flex justify-center my-4">
                <button className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-md mr-2">
                  <BiUserPlus className="mr-2" /> Follow
                </button>
                <button className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-md">
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
