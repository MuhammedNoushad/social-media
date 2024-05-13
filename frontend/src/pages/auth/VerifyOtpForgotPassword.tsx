import { useState, useEffect } from "react";
import AuthModel from "../../components/common/AuthModel";
import { useLocation } from "react-router-dom";
import useVerifyResetPasswordOtp from "../../hooks/auth/useVerifyResetPasswordOtp";

function ConfirmOtpForgotPassword() {
  const { verifyResetPasswordOtp, resendOtp } = useVerifyResetPasswordOtp();
  const [shouldResendOtp, setShouldResendOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(
    parseInt(localStorage.getItem("otpTimerRemaining") || "60", 10)
  );

  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    const storedRemainingTime = localStorage.getItem("otpTimerRemaining");
    if (storedRemainingTime) {
      setRemainingTime(parseInt(storedRemainingTime, 10));
    }

    const timer = setTimeout(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setShouldResendOtp(true);
    } else {
      localStorage.setItem("otpTimerRemaining", remainingTime.toString());

      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShouldResendOtp(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [remainingTime, email, resendOtp]);

  useEffect(() => {
    localStorage.setItem("otpTimerRemaining", remainingTime.toString());
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
    verifyResetPasswordOtp(trimmedOtp, email);
  };

  const resetOtpHandler = () => {
    setShouldResendOtp(false);
    setOtp("");
    resendOtp(email);
    setRemainingTime(60);
  };

  return (
    <AuthModel page="Reset Password">
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
            value={otp}
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
          <div className="flex justify-between">
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
      </div>
    </AuthModel>
  );
}

export default ConfirmOtpForgotPassword;
