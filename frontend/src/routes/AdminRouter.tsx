import { Route, Routes } from "react-router-dom";
import UserManagement from "../pages/admin/profile/UserManagement";
import NotFoundPage from "../pages/common/NotFoundPage";
import PrivateRoute from "./privateRoute";
import AdminHome from "../pages/admin/home/AdminHome";

function AdminRouter() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRouter;
