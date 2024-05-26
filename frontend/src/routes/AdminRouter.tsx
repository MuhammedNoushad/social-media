import { Route, Routes } from "react-router-dom";

import UserManagement from "../pages/admin/user/UserManagement";
import NotFoundPage from "../pages/common/NotFoundPage";
import PrivateRoute from "./ProtectedRoute";
import AdminHome from "../pages/admin/home/AdminHome";
import PostManagement from "../pages/admin/posts/PostManagement";
import AdManagement from "../pages/admin/ads/AdManagement";
import CreateAds from "../pages/admin/ads/CreateAds";
import EditAd from "../pages/admin/ads/EditAd";

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
      <Route
        path="/post-management"
        element={
          <PrivateRoute role="admin">
            <PostManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/ads"
        element={
          <PrivateRoute role="admin">
            <AdManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/ads/add"
        element={
          <PrivateRoute role="admin">
            <CreateAds />
          </PrivateRoute>
        }
      />
      <Route
        path="/ads/edit/:adId"
        element={
          <PrivateRoute role="admin">
            <EditAd />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRouter;
