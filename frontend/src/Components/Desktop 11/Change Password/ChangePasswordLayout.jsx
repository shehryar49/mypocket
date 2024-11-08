import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePasswordLayout = ({
  showCurrentPassword,
  handleShowCurrentPassword,
  showNewPassword,
  handleShowNewPassword,
  showConfirmPassword,
  handleShowConfirmPassword,
  currentPassword,
  handleCurrentPassword,
  newPassword,
  handleNewPassword,
  confirmPassword,
  handleConfirmPassword,
  newPasswordValid,
  newPasswordMsg,
  confirmPasswordValid,
  confirmPasswordMsg,
  currentPasswordValid,
  currentPasswordMsg,
  handleChangePassword,
  formSubmitted,
}) => {
  return (
    <div className="mx-6 mt-6 mb-6">
      <div className="flex flex-col mx-auto gap-6 mt-10 items-center justify-center md:items-start md:justify-normal">
        {/* Current Password */}
        <div className="relative flex flex-col justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] gap-1">
          <h1 className="ml-2 font-medium dark:text-gray-300">
            Current Password
          </h1>

          {/* Input and eye button */}
          <div className="relative">
            <input
              type={`${showCurrentPassword ? "text" : "password"}`}
              value={currentPassword}
              onChange={handleCurrentPassword}
              placeholder="Enter password"
              className={`w-full h-12 rounded-xl outline-none shadow-md p-2 focus:border-2 focus:bg-blue-100 transition-all dark:border-gray-600  dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400  ${
                formSubmitted && currentPasswordValid
                  ? "focus:border-blue-400 focus:bg-blue-100 "
                  : ""
              }
                  ${
                    formSubmitted && !currentPasswordValid
                      ? "focus:border-red-400 border-2 border-red-400 bg-red-100 focus:bg-red-100 dark:border-red-500 dark:focus:border-red-500"
                      : ""
                  }
              } focus:border-blue-400 transition-all`}
            />

            {/*Show Password Button*/}
            <button
              onClick={handleShowCurrentPassword}
              className="absolute right-4 bottom-4"
            >
              {showCurrentPassword ? (
                <FaRegEyeSlash className="text-blue-500 dark:text-blue-600 dark:hover:text-blue-500 hover:text-blue-600 transition-all" />
              ) : (
                <FaRegEye className="text-blue-500 dark:text-blue-600 hover:text-blue-600 transition-all" />
              )}
            </button>
          </div>

          {/* current Password Error Msg */}
          <div className="flex items-center h-4 justify-center mt-3">
            {!currentPasswordValid && currentPasswordMsg ? (
              <div className="flex items-center justify-center w-full max-w-sm rounded-sm dark:bg-red-400 bg-red-300 border-2 border-red-400">
                <span className="text-red-700 dark:font-semibold dark:text-red-800 text-xs">
                  {currentPasswordMsg}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/*New Password */}
        <div className="relative flex flex-col justify-center gap-1 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]">
          <h1 className="ml-2 font-medium dark:text-gray-300">New Password</h1>

          {/* Input and Eye button */}
          <div className="relative">
            <input
              type={`${showNewPassword ? "text" : "password"}`}
              value={newPassword}
              onChange={handleNewPassword}
              placeholder="Enter password"
              className={`w-full h-12 rounded-xl outline-none shadow-md p-2 focus:bg-blue-100 focus:border-2 transition-all dark:border-gray-600  dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 ${
                formSubmitted && newPasswordValid
                  ? "focus:border-blue-400 focus:bg-blue-100"
                  : ""
              }
                  ${
                    formSubmitted && !newPasswordValid
                      ? "focus:border-red-400 border-2 border-red-400 bg-red-100 focus:bg-red-100 dark:border-red-500 dark:focus:border-red-500"
                      : ""
                  }
              } focus:border-blue-400 transition-all`}
            />

            {/*Show Password Button*/}
            <button
              onClick={handleShowNewPassword}
              className="absolute right-4 bottom-4"
            >
              {showNewPassword ? (
                <FaRegEyeSlash className="text-blue-500 dark:text-blue-600 dark:hover:text-blue-500 hover:text-blue-600 transition-all" />
              ) : (
                <FaRegEye className="text-blue-500 dark:text-blue-600 dark:hover:text-blue-500 hover:text-blue-600 transition-all" />
              )}
            </button>
          </div>

          {/* New Password Error Msg */}
          <div className="flex items-center h-4 justify-center mt-3">
            {newPassword.length === 0 ? null : newPasswordMsg === "Strong" ? (
              <div
                className="
                transition-all flex items-center justify-center w-full max-w-sm rounded-sm dark:bg-green-400 bg-green-300 border-2 border-green-400"
              >
                <span className="text-green-700  dark:text-green-800 dark:font-semibold text-xs">
                  {newPasswordMsg}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full max-w-sm rounded-sm dark:bg-red-400 bg-red-300 border-2 border-red-400">
                <span className="text-red-700 dark:text-red-800 dark:font-semibold text-xs">
                  {newPasswordMsg}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative flex flex-col justify-center gap-1 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]">
          <h1 className="ml-2 font-medium dark:text-gray-300">New Password</h1>

          {/* Input and Eye button */}
          <div className="relative">
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              placeholder="Enter password"
              className={`w-full h-12 rounded-xl outline-none shadow-md p-2 focus:bg-blue-100 focus:border-2 transition-all dark:border-gray-600  dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400${
                formSubmitted && confirmPasswordValid
                  ? "focus:border-blue-400 focus:bg-blue-100"
                  : ""
              }
                  ${
                    formSubmitted && !confirmPasswordValid
                      ? "focus:border-red-400 border-2 border-red-400 bg-red-100 focus:bg-red-100 dark:border-red-500 dark:focus:border-red-500"
                      : ""
                  }
              } focus:border-blue-400 transition-all`}
            />

            {/*Show Password Button*/}
            <button
              onClick={handleShowConfirmPassword}
              className="absolute right-4 bottom-4"
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash className="text-blue-500 dark:text-blue-600 dark:hover:text-blue-500 hover:text-blue-600 transition-all" />
              ) : (
                <FaRegEye className="text-blue-500 dark:text-blue-600 dark:hover:text-blue-500 hover:text-blue-600 transition-all" />
              )}
            </button>
          </div>

          {/* New Password Error Msg */}
          <div className="flex items-center h-4 justify-center mt-3">
            {confirmPassword.length === 0 ? null : confirmPasswordMsg ===
              "Strong" ? (
              <div className="flex items-center justify-center w-full max-w-sm rounded-sm dark:bg-green-400 bg-green-300 border-2 border-green-400">
                <span className="text-green-700 dark:text-green-800 dark:font-semibold text-xs">
                  {confirmPasswordMsg}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full max-w-sm rounded-sm dark:bg-red-400 bg-red-300 border-2 border-red-400">
                <span className="text-red-700 dark:text-red-800 dark:font-semibold text-xs">
                  {confirmPasswordMsg}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Change Password Button*/}
        <div className="flex justify-center items-center">
          <button
            onClick={handleChangePassword}
            className="flex items-center bg-blue-500 dark:bg-blue-700 dark:hover:bg-opacity-90 dark:text-gray-200 transition-all hover:bg-blue-600 text-gray-100 font-medium p-2 rounded-lg justify-center"
          >
            {/* Text */}
            <p>Change Password</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordLayout;
