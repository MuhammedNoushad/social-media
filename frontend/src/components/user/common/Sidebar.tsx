import React, { useState } from "react";
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
import Dialog from "../../common/Dialog";
import { clearState } from "../../../store/features/userDetailsSlice";
import SearchModal from "./SerachModal";

// Component for the sidebar
const Sidebar: React.FC = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("w-auto");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setShowLogoutDialog(true);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearState());
    dispatch(clearToken());
    navigate("/");
    setShowLogoutDialog(false);
  };

  // Function to cancel logout
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Function for toggle search
  const toggleSearch = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    setIsSearchOpen(!isSearchOpen);
    setSidebarWidth(isSearchOpen ? "w-auto" : "w-14");
  };

  // Render the sidebar
  return (
    <div className="min-h-screen flex flex-row">
      <div
        className={`fixed top-0 bottom-0 flex flex-col bg-white rounded-r-3xl overflow-hidden ${sidebarWidth}`}
      >
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
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiHome />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Home
              </span>
            </a>
          </li>
          <li onClick={toggleSearch}>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiSearch />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Search
              </span>
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiCompass />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Explore
              </span>
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiChat />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Message
              </span>
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiBell />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Notifications
              </span>
              {!isSearchOpen && (
                <span className="hidden lg:block ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                  5
                </span>
              )}
            </a>
          </li>
          <li
            onClick={() => {
              navigate("/post");
            }}
          >
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiAddToQueue />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
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
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiUser />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Profile
              </span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiLogOut />
              </span>
              <span
                className={`hidden ${
                  !isSearchOpen && "lg:block"
                } text-sm font-medium font-roboto-condensed`}
              >
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <Dialog
        title="Logout"
        message="Are you sure you want to logout?"
        isOpen={showLogoutDialog}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default Sidebar;
