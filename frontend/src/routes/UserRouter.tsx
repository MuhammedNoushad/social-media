import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ConfirmOtp from "../pages/auth/VerifyOtp";
import UserProfile from "../pages/user/profile/UserProfile";
import UserHome from "../pages/user/home/UserHome";
import UserEditProfile from "../pages/user/profile/UserEditProfile";

function UserRouter() {
  return (
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<ConfirmOtp />} />
      <Route path="/home" element={<UserHome />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/edit-profile" element={<UserEditProfile />} />
    </Routes>
  );
}

export default UserRouter;
