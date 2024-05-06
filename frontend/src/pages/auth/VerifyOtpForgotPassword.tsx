import { useState } from "react";
// import { useLocation } from "react-router-dom";
import AuthModel from "../../components/common/AuthModel"; // Import AuthModel component
import { useLocation } from "react-router-dom";
import useVerifyResetPasswordOtp from "../../hooks/auth/useVerifyResetPasswordOtp";

function ConfirmOtpForgotPassword() {
  const { verifyResetPasswordOtp } = useVerifyResetPasswordOtp();
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const location = useLocation();

  const email = location.state?.email;

  const submitOtpHandler = () => {
    setOtpError("");
    const trimmedOtp = otp.trim();

    if (trimmedOtp.length === 0) {
      setOtpError("OTP cannot be empty");
      return;
    }

    if (trimmedOtp.includes(" ")) {
      setOtpError("OTP cannot contain spaces");
      return;
    }

    // Assuming otp is valid, proceed to next step
    verifyResetPasswordOtp(trimmedOtp, email);
  };

  return (
    <AuthModel page="Reset Password">
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-6">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-md md:text-xl">Enter the OTP we just sent you.</p>
        </div>
        <div className="flex flex-col max-w-md space-y-5">
          <input
            type="text"
            placeholder="OTP"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              otpError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOtp(e.target.value);
            }}
          />
          {otpError && <p className="mt-1 text-sm text-red-500">{otpError}</p>}
          <button
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-gray-600 text-white"
            onClick={submitOtpHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </AuthModel>
  );
}

export default ConfirmOtpForgotPassword;
