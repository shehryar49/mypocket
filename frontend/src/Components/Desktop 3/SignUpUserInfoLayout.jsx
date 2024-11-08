import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const UserInfoLayout = ({
  showPassword,
  showVisibility,
  password,
  handlePassword,
  email,
  handleEmail,
  name,
  handleName,
  nameError,
  emailError,
  passwordError,
}) => {
  return (
    <div>
      <div className="ml-2 relative">
        {/* Name */}
        <p className="text-sm dark:text-gray-300">Name</p>
        <input
          type="text"
          placeholder="e.g John Wick"
          onChange={handleName}
          value={name}
          className="p-3 border-2 border-gray-200 rounded-lg outline-none bg-gray-100 w-72 md:w-80 mt-2 font-normal text-sm placeholder:italic focus:bg-blue-100 focus:border-blue-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
        />

        {/* Error message for name */}
        {nameError && (
          <p className="text-red-500 dark:text-red-600 text-xs mt-1 absolute">
            {nameError}
          </p>
        )}

        {/* Email */}
        <p className="text-sm mt-8 dark:text-gray-300">Email or Phone Number</p>
        <input
          type="text"
          placeholder="Enter email"
          onChange={handleEmail}
          value={email}
          className="p-3 border-2 placeholder:italic border-gray-200 rounded-lg outline-none bg-gray-100 w-72 md:w-80 mt-2 font-normal text-sm  focus:bg-blue-100 focus:border-blue-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
        />

        {/* Error message for email */}
        {emailError && (
          <p className="text-red-500 dark:text-red-600 text-xs mt-1 absolute">
            {emailError}
          </p>
        )}

        {/* Password */}
        <p className="text-sm mt-8 dark:text-gray-300">Password</p>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
          className="p-3 border-2 placeholder:italic border-gray-200 rounded-lg outline-none bg-gray-100 md:w-80 w-72 mt-2 font-normal text-sm  focus:bg-blue-100 focus:border-blue-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
        />

        {/* Error message for password */}
        {passwordError && (
          <p className="text-red-500 dark:text-red-600 text-xs mt-1 absolute">
            {passwordError}
          </p>
        )}
        {/* Button to show password */}
        <button onClick={showVisibility} className="absolute right-4 bottom-4">
          {showPassword ? (
            <FaRegEyeSlash className="text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 hover:text-blue-700" />
          ) : (
            <FaRegEye className="text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 hover:text-blue-700" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserInfoLayout;
