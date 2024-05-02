import React from "react";
import { BiMailSend, BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state: RootState) => state.user);

  return (
    <div className="relative mt-6 w-auto min-w-0 mb-2 break-words bg-light/30 draggable max-h-max ">
      {/* card body */}
      <div className="px-9 py-9 flex flex-col items-center justify-center h-full">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
          <div className="mb-5 mr-5">
            <div className="relative inline-block shrink-0 rounded-2xl">
              <img
                className="object-cover  inline-block  shrink-0 rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px]"
                src={userDetails.profileimg || "avathar.jpeg"}
                alt="image"
              />
            </div>
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <p className="text-secondary-inverse hover:text-red-600 transition-colors duration-200 ease-in-out font-semibold text-[1.2rem] mr-1">
                    {" "}
                    {userDetails.firstName}
                    {userDetails.lastName}{" "}
                  </p>
                  <a
                    onClick={() => {
                      navigate("/edit-profile");
                    }}
                    className="inline-block ml-2 px-2 py-1 text-xs sm:text-sm sm:ml-4 sm:px-3 sm:py-1 font-medium leading-normal text-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out border-0 shadow-none cursor-pointer"
                  >
                    Edit Profile
                  </a>
                </div>
                <div className="flex flex-wrap justify-center pr-0 sm:pr-2 mb-2 font-medium text-xs sm:text-sm">
                  <a className="flex items-center mr-5 text-secondary-dark hover:text-red-600">
                    <span className="mr-1">
                      <BiUser />
                    </span>{" "}
                    {userDetails.username}{" "}
                  </a>
                  <a className="flex items-center mr-5 text-secondary-dark hover:text-red-600">
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
                <p className="text-base sm:text-lg text-gray-700 from-neutral-600 mb-2 sm:mb-4 text-center max-w-md">
                  {userDetails.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap items-center">
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  0 posts{" "}
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  0 Following{" "}
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  0 Followers{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
