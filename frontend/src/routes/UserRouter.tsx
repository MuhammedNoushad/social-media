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
import ForgotPasswordEmailPage from "../pages/auth/ForgotPasswordEmail";
import ForgotPasswordResetPage from "../pages/auth/ForgotPasswordReset";
import ConfirmOtpForgotPassword from "../pages/auth/VerifyOtpForgotPassword";
import UserCreatePost from "../pages/user/home/UserCreatePost";
import RestrictedAuthRoute from "./RestrictedAuthRoute";
import NotFoundRoute from "./NotFoundRoute";
import OthersProfile from "../pages/user/profile/OthersProfile";
import UserMessage from "../pages/user/home/UserMessage";
import VideoCall from "../components/user/message/video call/VideoCall";
import Explore from "../pages/user/home/Explore";
import AudioCall from "../components/user/message/video call/AudioCall";

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
        path="/forgot-password"
        element={
          <ProtectedAuthRoute>
            <ForgotPasswordEmailPage />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/forgot-password/otp"
        element={
          <ProtectedAuthRoute>
            <RestrictedAuthRoute>
              <ConfirmOtpForgotPassword />
            </RestrictedAuthRoute>
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/forgot-password/reset"
        element={
          <ProtectedAuthRoute>
            <RestrictedAuthRoute>
              <ForgotPasswordResetPage />
            </RestrictedAuthRoute>
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
        path="/profile/:userId"
        element={
          <PrivateRoute role="user">
            <OthersProfile />
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
      <Route
        path="/post"
        element={
          <PrivateRoute role="user">
            <UserCreatePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/message"
        element={
          <PrivateRoute role="user">
            <UserMessage />
          </PrivateRoute>
        }
      />
      <Route
        path="/video-call/:roomID/:username"
        element={
          <PrivateRoute role="user">
            <VideoCall />
          </PrivateRoute>
        }
      />
      <Route
        path="/voice-call/:roomID/:username"
        element={
          <PrivateRoute role="user">
            <AudioCall />
          </PrivateRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <PrivateRoute role="user">
            <Explore />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <NotFoundRoute>
            <NotFoundPage />
          </NotFoundRoute>
        }
      />
    </Routes>
  );
}

export default UserRouter;
