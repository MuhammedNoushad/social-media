import React from "react";
import {
  BiHome,
  BiUser,
  BiBarChartAlt,
  BiMessageSquare,
  BiLogOut,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="fixed top-0 bottom-0 flex flex-col bg-white rounded-r-3xl overflow-hidden lg:w-56 w-16">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img
            className="rounded-md h-11 mt-4"
            src="/public/logo.webp"
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
              <span className="hidden lg:block text-sm font-medium">
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
              <span className="hidden lg:block text-sm font-medium">
                Users
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiBarChartAlt />
              </span>
              <span className="hidden lg:block text-sm font-medium">
                Reports
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiMessageSquare />
              </span>
              <span className="hidden lg:block text-sm font-medium">Ads</span>
            </a>
          </li>
          <li>
            <a
              href="#"
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

export default AdminSidebar;