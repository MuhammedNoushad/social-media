import { Route, Routes } from "react-router-dom";
import UserManagement from "../pages/admin/profile/UserManagement";
import NotFoundPage from "../pages/common/NotFoundPage";
import PrivateRoute from "./ProtectedRoute";
import AdminHome from "../pages/admin/home/AdminHome";

function AdminRouter() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute role="admin">
            <AdminHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <PrivateRoute role="admin">
            <UserManagement />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRouter;
