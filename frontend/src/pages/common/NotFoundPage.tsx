import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/common/AdminSidebar";
import Sidebar from "../../components/user/common/Sidebar";
import { RootState } from "../../store/store";
import NotFoundCard from "../../components/common/NotFoundCard";

const NotFoundPage: React.FC = () => {
  const role = useSelector((state: RootState) => state.token.role);
  const [isAdmin, setIsAdmin] = useState(role === "admin");

  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, [role]);

  return (
    <div className="flex h-screen">
      <div>{isAdmin ? <AdminSidebar /> : <Sidebar  page="not-found"/>}</div>
      <div className="flex-grow flex  justify-center px-4 sm:px-0">
        <NotFoundCard />
      </div>
    </div>
  );
};

export default NotFoundPage;
