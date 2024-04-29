import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ConfirmOtp from "../pages/auth/VerifyOtp";
import UserProfile from "../pages/user/profile/UserProfile";
import UserHome from "../pages/user/home/UserHome";
import UserEditProfile from "../pages/user/profile/UserEditProfile";
import NotFoundPage from "../pages/common/NotFoundPage";
import PrivateRoute from "./privateRoute";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<ConfirmOtp />} />
      <Route path="/home" element={<PrivateRoute><UserHome /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path="/edit-profile" element={<PrivateRoute><UserEditProfile /></PrivateRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;