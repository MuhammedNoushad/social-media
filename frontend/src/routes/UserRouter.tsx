import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ConfirmOtp from "../pages/auth/VerifyOtp";
import UserProfile from "../pages/user/profile/UserProfile";
import UserHome from "../pages/user/home/UserHome";
import UserEditProfile from "../pages/user/profile/UserEditProfile";
import NotFoundPage from "../pages/common/NotFoundPage";
import PrivateRoute from "./ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute";

function UserRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedAuthRoute>
            <SignUp />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <ProtectedAuthRoute>
            <ConfirmOtp />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute role="user">
            <UserHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute role="user">
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute role="user">
            <UserEditProfile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;
