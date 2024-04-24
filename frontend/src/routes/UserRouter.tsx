import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ConfirmOtp from "../pages/auth/VerifyOtp";

function UserRouter() {
  return (
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<ConfirmOtp />} />
    </Routes>
  );
}

export default UserRouter;
