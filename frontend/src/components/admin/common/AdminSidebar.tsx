import React, { useState } from "react";
import {
  BiHome,
  BiUser,
  BiBarChartAlt,
  BiMessageSquare,
  BiLogOut,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../../store/features/tokenSlice";
import Dialog from "../../common/Dialog";
import { clearState } from "../../../store/features/userDetailsSlice";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearState());
    dispatch(clearToken());
    navigate("/");
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="fixed top-0 bottom-0 flex flex-col bg-white rounded-r-3xl overflow-hidden lg:w-56 w-16">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img
            className="rounded-md h-11 mt-4"
            src="/logo.webp"
            alt="site logo"
          />
        </div>
        <ul className="flex flex-col py-4">
          <li onClick={() => navigate("/")}>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiHome />
              </span>
              <span className="hidden lg:block text-sm font-medium font-roboto-condensed">
                Dashboard
              </span>
            </a>
          </li>
          <li onClick={() => navigate("/admin/user-management")}>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiUser />
              </span>
              <span className="hidden lg:block text-sm font-medium font-roboto-condensed">Users</span>
            </a>
          </li>
          <li onClick={() => navigate("/admin/post-management")}>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiBarChartAlt />
              </span>
              <span className="hidden lg:block text-sm font-medium font-roboto-condensed">
                Reports
              </span>
            </a>
          </li>
          <li onClick={() => navigate("/admin/ads")}>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiMessageSquare />
              </span>
              <span className="hidden lg:block text-sm font-medium font-roboto-condensed">Ads</span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiLogOut />
              </span>
              <span className="hidden lg:block text-sm font-medium font-roboto-condensed">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
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

export default AdminSidebar;
