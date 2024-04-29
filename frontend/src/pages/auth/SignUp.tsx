import React, { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import IFormInput from "../../types/IFormInputs";
import useSignUp from "../../hooks/auth/useSignUp";
import validateForm from "../../utils/fromValidation";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<IFormInput>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<IFormInput>>({});
  const signup = useSignUp();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error for this field
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signup(formData);
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
          <h3 className="font-semibold text-3xl">Sign Up</h3>
          <p className="mt-2 text-sm">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-blue-500 hover:underline">Login</span>{" "}
            </Link>
          </p>
          <div className="mt-5 ">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src="google logo.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Signup with Google</span>
            </button>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-2 border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t-2 border-gray-400"></div>
          </div>
        </div>

        <form className="w-full" onSubmit={formSubmitHandler}>
          <div className="mt-5">
            <label className="block mb-2 text-sm" htmlFor="your-username">
              Your Username
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              type="text"
              id="your-username"
              name="username"
              placeholder="Enter your username"
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm" htmlFor="your-firstname">
              First Name
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.firstName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              type="text"
              id="your-firstname"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm" htmlFor="your-lastname">
              Last Name
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.lastName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              type="text"
              id="your-lastname"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

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

          <div className="mt-4 relative">
            <label className="block mb-2 text-sm" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                autoComplete="confirm-password"
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
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            {" "}
            <button
              type="submit"
              className="btn btn-wide mt-6 px-8 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-150"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
