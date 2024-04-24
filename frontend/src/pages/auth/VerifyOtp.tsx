import { useState } from "react";
import { useLocation } from "react-router-dom";
import useVerifyOtp from "../../hooks/auth/useVerifyOtp";

function ConfirmOtp() {
  const location = useLocation();
  const userData = location.state?.userData;

  const verifyOtp = useVerifyOtp();

  const [otp, setOtp] = useState<string>("");

  const submitOtpHandler = () => {
    verifyOtp(otp, userData);
  };

  return (
    <div
      className="p-4 min-h-screen flex flex-col items-center justify-center bg-cover bg-center font-poppins"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),url('/bg.jpg')",
      }}
    >
      <div className="w-full max-w-md p-6 rounded-lg bg-white bg-clip-padding flex flex-col items-center">
        <img className="rounded-md h-11 mt-4" src="logo.webp" alt="site logo" />
        <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-24">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
            <p className="text-md md:text-xl">
              Enter the OTP we just sent you.
            </p>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
            <input
              type="text"
              placeholder="otp"
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-gray-300 rounded-lg font-medium placeholder:font-normal"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setOtp(e.target.value);
              }}
            />
            <button
              className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium  bg-gray-600 text-white"
              onClick={submitOtpHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOtp;
