import { useState } from "react";
import { useLocation } from "react-router-dom";
import useVerifyOtp from "../../hooks/auth/useVerifyOtp";
import AuthModel from "../../components/common/AuthModel"; // Import AuthModel component

function ConfirmOtp() {
  const location = useLocation();
  const userData = location.state?.userData;
  const verifyOtp = useVerifyOtp();
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");

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

    verifyOtp(trimmedOtp, userData);
  };

  return (
    <AuthModel page="Confirm otp">
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-6">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
          <p className="text-md md:text-xl">
            Enter the OTP we just sent you.
          </p>
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
          {otpError && (
            <p className="mt-1 text-sm text-red-500">{otpError}</p>
          )}
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

export default ConfirmOtp;
