// ForgotPasswordResetPage.jsx
import { useState } from "react";
import AuthModel from "../../components/common/AuthModel";

function ForgotPasswordResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const submitResetHandler = () => {
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate password and confirm password here
    // Ensure password meets requirements (e.g., length, complexity)
    // Ensure password and confirm password match

    // If validation passes, proceed with password reset
  };

  return (
    <AuthModel page="passwordReset">
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-6">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-md md:text-xl">Enter your new password below.</p>
        </div>
        <div className="flex flex-col max-w-md space-y-5">
          <label className="block  text-sm" htmlFor="your-email">
            Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-500">{passwordError}</p>
          )}
          <label className="block  text-sm" htmlFor="your-email">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              confirmPasswordError ? "border-red-500" : "border-gray-300"
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>
          )}
          <button
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-gray-600 text-white"
            onClick={submitResetHandler}
          >
            Reset Password
          </button>
        </div>
      </div>
    </AuthModel>
  );
}

export default ForgotPasswordResetPage;
