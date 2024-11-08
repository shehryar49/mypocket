import React from "react";
import TwoFactorToggle from "../Toggle Buttons/TwoFactorToggle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SecurityLayout = ({
  loginTime,
  loginDevice,
  ipAddress,
  activeSessions,
  handleDeleteAccount,
  isConfirmDelete,
  setIsConfirmDelete,
  password,
  handlePassword,
  showPassword,
  handleShowPassword,
  handleCancelButton,
}) => {
  return (
    <div className="relative mx-6 mt-6 mb-8">
      {/* Security Content */}
      <div className="flex flex-col gap-6">
        {/* Two Factor */}
        <div className="flex items-center justify-between lg:w-[500px] md:w-[400px] w-80">
          {/* text */}
          <div className="flex gap-1 flex-col">
            <h1 className="ml-2 font-medium dark:text-gray-200">
              Two-Factor Authentication
            </h1>
            <p className="ml-2 font-normal text-gray-500 text-sm dark:text-gray-300">
              Enable or disable 2FA on your account
            </p>
          </div>
          {/* Toggle */}
          <div className="flex mb-7">
            <TwoFactorToggle />
          </div>
        </div>

        {/* Last Sign In */}
        <div className="flex gap-1 flex-col mb-3">
          <h1 className="ml-2 font-medium dark:text-gray-200">Last sign in</h1>
          <p className="ml-2 font-normal text-gray-500 text-sm dark:text-gray-300">
            Today at {loginTime}, {loginDevice} {ipAddress}
          </p>
        </div>

        {/* Active Sessions */}
        <div className="flex gap-1 flex-col">
          <h1 className="ml-2 font-medium dark:text-gray-200">
            Active Sessions
          </h1>
          <p className="ml-2 font-normal text-gray-500 text-sm dark:text-gray-300">
            Total active sessions ({activeSessions.length})
          </p>
        </div>

        {/* Delete Button */}
        <div className="md:ml-1 mt-2 flex items-center">
          <button
            onClick={() => setIsConfirmDelete(true)}
            className="flex items-center dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-red-700 bg-blue-500 transition-all hover:bg-red-600 text-gray-100 font-medium p-2 rounded-lg justify-center"
          >
            {/* Text */}
            <p>Delete Account</p>
          </button>
        </div>
      </div>

      {/* Background blur */}
      <div
        className={`fixed inset-0 ${
          isConfirmDelete
            ? "bg-black/30 backdrop-blur-sm z-10"
            : "pointer-events-none"
        }`}
      ></div>

      {/* Confirm Delete Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-20 ${
          isConfirmDelete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-lg mx-auto p-4 flex flex-col items-center text-center border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-800 bg-white">
          {/* Title */}
          <h1 className="font-medium text-xl mb-2 dark:text-gray-200">
            Are you absolutely sure?
          </h1>

          {/* Message */}
          <p className="font-normal text-gray-500 text-sm mb-4 dark:text-gray-300">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>

          {/* Password Input */}
          <div className="relative w-full mb-4 flex flex-col gap-2 mt-4">
            <h1 className="font-medium text-sm text-start ml-1 dark:text-gray-300">
              Enter your password to confirm
            </h1>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              onChange={handlePassword}
              placeholder="Enter your password"
              className="w-full p-2 border-2 shadow-sm border-gray-300 rounded-lg transition-colors focus:bg-blue-100 outline-none focus:border-blue-400 dark:shadow-gray-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-400"
            />

            {/*Show Password Button*/}
            <button
              onClick={handleShowPassword}
              className="absolute right-4 bottom-[14px]"
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-blue-500 dark:hover:text-blue-400 hover:text-blue-600 transition-all" />
              ) : (
                <FaRegEye className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all" />
              )}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-2 mt-3">
            <button
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-600 dark:bg-red-700 dark:text-gray-200 dark:hover:bg-opacity-90 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
            <button
              onClick={handleCancelButton}
              className="flex-1 bg-blue-500 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-opacity-90 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLayout;
