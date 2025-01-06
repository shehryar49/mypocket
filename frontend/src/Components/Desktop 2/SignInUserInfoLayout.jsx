import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonProperty from "../Desktop 1/ButtonProperty";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";

const UserInfoLayout = ({
  handleEmail,
  handlePassword,
  showVisibility,
  email,
  password,
  isValid,
  showPassword,
  handleSignIn, // This prop is passed down from SignInUserInfo.jsx
  errorMessage,
}) => {
  return (
    <div>
      <div className="ml-2 relative">
        {/* Email */}
        <p className="text-sm dark:text-gray-300">Email or Phone Number</p>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={handleEmail}
          className="p-3 border-2 border-gray-200 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all rounded-lg outline-none bg-gray-100 w-72 md:w-80 mt-2 font-normal text-sm focus:bg-blue-100 focus:border-blue-400"
        />
        {/*Email Check */}
        {isValid && (
          <span className="absolute right-7 top-11 ">
            <FaCheck className="text-green-600 dark:text-green-500" />
          </span>
        )}

        {/* Password */}
        <p className="text-sm mt-5 dark:text-gray-300">Password</p>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
          className="p-3 border-2 border-gray-200 rounded-lg outline-none bg-gray-100 md:w-80 w-72 mt-2 font-normal text-sm focus:bg-blue-100 focus:border-blue-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
        />
        {/* Button to show password */}
        <button
          onClick={showVisibility}
          className="absolute right-7 top-36 mb-6"
        >
          {showPassword ? (
            <FaRegEyeSlash className="text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 hover:text-blue-700" />
          ) : (
            <FaRegEye className="text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 hover:text-blue-700" />
          )}
        </button>

        {/* Forgot Password */}
        <Link
          to="/forgotpassword"
          className="text-red-500 dark:text-red-600 hover:opacity-90 transition-all text-sm font-semibold mt-2 md:ml-48 ml-40 cursor-pointer"
        >
          Forgot password?
        </Link>

        {/* Login Buttons */}
        <div className="flex flex-col gap-0 mb-20">
          {/* Sign in button */}
          <div onClick={handleSignIn}>
            <ButtonProperty Text={"Sign in"} />
          </div>

          {/* Showing error message when email is incorrect */}
          {errorMessage && (
            <span className="absolute text-red-500 dark:text-red-600 text-xs mt-14 md:ml-9 ml-6 w-72">
              {errorMessage}
            </span>
          )}

          {/* Sign in with Google Button */}
          <GoogleButton />
        </div>
      </div>
    </div>
  );
};

export default UserInfoLayout;
