import React from "react";
import { BiMailSend, BiUser } from "react-icons/bi";

const ProfileCard: React.FC = () => {
  return (
    <div className="relative w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable max-h-[33vh]">
      {/* card body */}
      <div className="px-9 py-9 flex flex-col items-center justify-center h-full">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
          <div className="mb-5 mr-5">
            <div className="relative inline-block shrink-0 rounded-2xl">
              <img
                className="inline-block shrink-0 rounded-full w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]"
                src="profilepic.jpg"
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
                    Muhammed Noushad{" "}
                  </p>
                  <a
                    href="javascript:void(0)"
                    className="inline-block ml-4 px-3 py-1 text-sm font-medium leading-normal text-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out border-0 shadow-none cursor-pointer"
                  >
                    Edit Profile
                  </a>
                </div>
                <div className="flex flex-wrap justify-center pr-2 mb-2 font-medium text-sm">
                  <a
                    className="flex items-center mr-5 text-secondary-dark hover:text-red-600"
                    href="javascript:void(0)"
                  >
                    <span className="mr-1">
                      <BiUser />
                    </span>{" "}
                    mammu{" "}
                  </a>
                  <a
                    className="flex items-center mr-5 text-secondary-dark hover:text-red-600"
                    href="javascript:void(0)"
                  >
                    <span className="mr-1">
                      <BiMailSend />
                    </span>{" "}
                    muhammed@example.com{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap items-center">
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  11 posts{" "}
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  320 Following{" "}
                </p>
                <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-medium leading-normal">
                  {" "}
                  2.5k Followers{" "}
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
