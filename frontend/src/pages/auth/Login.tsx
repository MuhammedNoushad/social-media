import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import useGoogleLogin from "../../hooks/auth/useGoogleLogin";
import useLogin from "../../hooks/auth/useLogin";
import IFormInput from "../../types/IFormInputs";
import validateForm from "../../utils/fromValidation";

function Login() {
  const googleLogin = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Partial<IFormInput>>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<IFormInput>>({});

  const login = useLogin();

  // Function to toggle between showing and hiding the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle the inputs in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Function to handle form submission
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (formData.email && formData.password) {
        login(formData as IFormInput);
      }
    }
  };

  // Function to handle google signin
  const handleGoogleSignIn = (credentialResponse: { credential?: string }) => {
    if (credentialResponse?.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, given_name, name } = decoded as {
        email: string;
        given_name: string;
        name: string;
      };
      googleLogin({
        email,
        firstName: name?.split(" ")[0],
        lastName: name?.split(" ")[1],
        given_name,
      });
    }
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
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-3xl">Log in</h3>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-500 hover:underline">Sign up</span>{" "}
            </Link>
          </p>
          <GoogleLogin onSuccess={handleGoogleSignIn} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-2 border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t-2 border-gray-400"></div>
          </div>
        </div>
        <form className="w-full" onSubmit={formSubmitHandler}>
          <div className="mt-5">
            <label className="block mb-2 text-sm" htmlFor="your-email">
              Your Email
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              type="email"
              id="your-email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mt-4 relative">
            <label className="block mb-2 text-sm" htmlFor="your-password">
              Your Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                type={showPassword ? "text" : "password"}
                id="your-password"
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Forgot your password?
          </div>
          <div className="flex justify-center">
            {" "}
            <button
              type="submit"
              className="btn btn-wide mt-6 px-8 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-150"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
