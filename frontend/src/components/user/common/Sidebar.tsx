import React from "react";
import {
  BiHome,
  BiSearch,
  BiCompass,
  BiChat,
  BiBell,
  BiAddToQueue,
  BiUser,
  BiLogOut,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../../store/features/tokenSlice";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="fixed top-0 bottom-0 flex flex-col bg-white rounded-r-3xl overflow-hidden lg:w-56 w-16">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img
            className="rounded-md h-11 mt-4"
            src="/public/logo.webp"
            alt="site logo"
          />
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiHome />
              </span>
              <span className="hidden lg:block text-sm font-medium">Home</span>
            </a>
          </li>
          <li>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiSearch />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Search
              </span>
            </a>
          </li>
          <li>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiCompass />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Explore
              </span>
            </a>
          </li>
          <li>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiChat />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Message
              </span>
            </a>
          </li>
          <li>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiBell />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Notifications
              </span>
              <span className="hidden lg:block ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                5
              </span>
            </a>
          </li>
          <li
            onClick={() => {
              navigate("/post");
            }}
          >
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiAddToQueue />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Create
              </span>
            </a>
          </li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiUser />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Profile
              </span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a
              href=''
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiLogOut />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
