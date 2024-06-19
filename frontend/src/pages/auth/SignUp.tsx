import React, { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import IFormInput from "../../types/IFormInputs";
import useSignUp from "../../hooks/auth/useSignUp";
import validateForm from "../../utils/fromValidation";
import AuthModel from "../../components/common/AuthModel";

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
  const { signup, loading } = useSignUp();

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
    <AuthModel page="Sign Up">
      <form noValidate className="w-full" onSubmit={formSubmitHandler}>
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
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>
      </form>
    </AuthModel>
  );
}

export default Login;
