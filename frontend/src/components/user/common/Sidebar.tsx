import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearToken } from "../../../store/features/tokenSlice";
import Dialog from "../../common/Dialog";
import { clearState } from "../../../store/features/userDetailsSlice";
import SearchModal from "./SerachModal";
import NotificationModal from "./NotificationModal";
import useFetchNotifications from "../../../hooks/user/useFetchNotifications";
import { RootState } from "../../../store/store";
import INotification from "../../../types/INotification";

// Component for the sidebar
const Sidebar = ({ page }: { page: string }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("w-auto");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const loggedInUser = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fetchNotifications, markAllAsRead } = useFetchNotifications();

  let countOfUnreadNotifications = 0;

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

    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    }
  };

  // Function for toggel notification modal
  const handleNotificationtoggle = async (
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    e.preventDefault();

    const response = await markAllAsRead(loggedInUser._id);
    if (response) {
      setNotifications(response);
    }

    setIsNotificationOpen(!isNotificationOpen);
    setSidebarWidth(isNotificationOpen ? "w-auto" : "w-14");

    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchNotifications(loggedInUser._id);
      setNotifications(response);
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notifications.length > 0) {
    countOfUnreadNotifications = notifications.filter(
      (notification) => !notification.isRead
    ).length;
  }

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
          <li
            onClick={() => {
              navigate("/home");
            }}
          >
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiHome />
              </span>
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Home
                </span>
              )}
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
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Search
                </span>
              )}
            </a>
          </li>
          <li onClick={() => navigate("/explore")}>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiCompass />
              </span>
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Explore
                </span>
              )}
            </a>
          </li>
          <li onClick={() => navigate("/message")}>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiChat />
              </span>
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Message
                </span>
              )}
            </a>
          </li>
          <li onClick={handleNotificationtoggle}>
            <a
              href=""
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiBell />
              </span>
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Notifications
                </span>
              )}
              {!isSearchOpen &&
                !isNotificationOpen &&
                countOfUnreadNotifications > 0 && (
                  <span className="hidden lg:block ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                    {countOfUnreadNotifications}
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
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Create
                </span>
              )}
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
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Profile
                </span>
              )}
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
              {page !== "message" && (
                <span
                  className={`hidden ${
                    !isSearchOpen && !isNotificationOpen && "lg:block"
                  } text-sm font-medium font-roboto-condensed`}
                >
                  Logout
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
      <NotificationModal
        setNotifications={setNotifications}
        notifications={notifications}
        isOpen={isNotificationOpen}
      />
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
