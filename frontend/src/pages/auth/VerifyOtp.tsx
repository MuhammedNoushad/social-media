import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useVerifyOtp from "../../hooks/auth/useVerifyOtp";
import AuthModel from "../../components/common/AuthModel";

function ConfirmOtp() {
  const location = useLocation();
  const userData = location.state?.userData;
  const { confirmOtp, resendOtp } = useVerifyOtp();
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(60); // Initial value of 60 seconds
  const [shouldResendOtp, setShouldResendOtp] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve the remaining time from localStorage on component mount
    const storedRemainingTime = localStorage.getItem("otpTimerRemaining");
    if (storedRemainingTime) {
      setRemainingTime(parseInt(storedRemainingTime, 10));
    }

    // Start the timer
    const timer = setTimeout(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // This effect will run only once on component mount

  useEffect(() => {
    if (remainingTime === 0) {
      setShouldResendOtp(true);
    } else {
      // Update the remaining time in localStorage
      localStorage.setItem("otpTimerRemaining", remainingTime.toString());

      // Start the next timer tick
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the timer on component unmount or when remainingTime changes
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

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
    if (remainingTime === 0) {
      setOtpError("Timer expired. Please resend the OTP.");
      return;
    }
    confirmOtp(trimmedOtp, userData);
  };

  const resetOtpHandler = () => {
    setShouldResendOtp(false);
    setOtp("");
    resendOtp(userData.email);
    setRemainingTime(60);
  };

  return (
    <AuthModel page="Confirm otp">
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-6">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-md md:text-xl">Enter the OTP we just sent you.</p>
          {remainingTime > 0 && (
            <p className="text-sm text-gray-500">
              Time remaining: {remainingTime} seconds
            </p>
          )}
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
          <a
            onClick={resetOtpHandler}
            className={`mt-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer hover:decoration-red-600 ${
              shouldResendOtp ? "" : "hidden"
            }`}
          >
            Resend OTP
          </a>
          <button
            className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-gray-600 text-white ${
              shouldResendOtp ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
