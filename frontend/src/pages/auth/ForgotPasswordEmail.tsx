// ForgotPasswordEmailPage.jsx
import { useState } from "react";
import AuthModel from "../../components/common/AuthModel";

function ForgotPasswordEmailPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const submitEmailHandler = () => {
    setEmailError("");
    // Validate email format here if needed

    // Assuming email is valid, proceed to next step
    // Redirect to ForgotPasswordResetPage with email in location state
  };

  return (
    <AuthModel page="forgetPassword">
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-6">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-md md:text-xl">
            Enter your email address to reset your password.
          </p>
        </div>
        <div className="flex flex-col max-w-md space-y-5">
          <label className="block  text-sm" htmlFor="your-email">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
          <button
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-gray-600 text-white"
            onClick={submitEmailHandler}
          >
            Continue
          </button>
        </div>
      </div>
    </AuthModel>
  );
}

export default ForgotPasswordEmailPage;
