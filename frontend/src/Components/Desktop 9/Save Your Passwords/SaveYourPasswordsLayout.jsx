import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const SaveYourPasswordsLayout = ({
  handleDate,
  date,
  handleEmail,
  email,
  handlePassword,
  password,
  handleNote,
  note,
  emailValid,
  handleShowPassword,
  showPassword,
  passwordMsg,
  handleAdd,
  fullEmail,
  fullPassword,
}) => {
  return (
    <div className="px-4">
      {" "}
      <div className="flex items-center flex-col gap-4 mt-4">
        {/* Heading */}
        <div className="flex justify-start items-start w-full md:block">
          <h1 className="text-2xl font-medium text-blue-900 dark:text-gray-200 ml-6">
            Save your passwords
          </h1>
        </div>

        {/* Input Field */}
        <div className="w-full dark:bg-gray-800 max-w-4xl 2xl:max-w-5xl flex flex-col items-center justify-center bg-zinc-100 mb-4 rounded-2xl px-4">
          {" "}
          {/* Padding added */}
          <div className="gap-2 flex flex-col mt-8 w-full">
            {/* Input Date */}
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={handleDate}
              className=" w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] h-12 mx-auto rounded-xl outline-none shadow-md dark:shadow-gray-400 dark:shadow-sm p-2 focus:bg-blue-100 focus:border-2 focus:border-blue-400 transition-all dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600"
            />

            {/* Input Note */}
            <input
              type="text"
              placeholder="Note"
              value={note}
              onChange={handleNote}
              className=" w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] h-12 mx-auto rounded-xl outline-none shadow-md p-2 dark:shadow-gray-400 dark:shadow-sm focus:bg-blue-100 focus:border-2 focus:border-blue-400 transition-all dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600"
            />

            {/* Input Email */}
            <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] mx-auto">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className={`w-full h-12 rounded-xl outline-none shadow-md p-2 focus:bg-blue-100 dark:focus:bg-gray-700 dark:bg-gray-700 focus:border-2 dark:shadow-gray-400 dark:shadow-sm ${
                  fullEmail
                    ? "focus:border-blue-400 focus:bg-blue-100 dark:focus:bg-gray-700 dark:text-gray-200"
                    : "focus:border-red-400 dark:focus:border-red-500 dark:border-red-500 border-2 border-red-400 bg-red-100 focus:bg-red-100 dark:text-gray-200 dark:focus:bg-gray-700"
                } focus:border-blue-400 transition-all`}
              />

              {/* Email Checking */}
              <div className="absolute right-6 top-4">
                {emailValid && <FaCheck className="text-green-500" />}
              </div>
            </div>

            {/* Input Password */}
            <div className="relative flex flex-col items-center justify-center gap-4">
              <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] mx-auto ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  className={`w-full h-12 rounded-xl outline-none shadow-md p-2 transition-all 
                    focus:bg-blue-100 focus:border-2 dark:focus:bg-gray-700 dark:bg-gray-700 dark:shadow-gray-400 dark:shadow-sm ${
                      fullPassword
                        ? "focus:border-blue-400 dark:text-gray-200"
                        : "focus:border-red-400 dark:focus:border-red-500 dark:border-red-500 dark:text-gray-200 dark:focus:bg-gray-700 border-2 border-red-400 bg-red-100 focus:bg-red-100"
                    }`}
                />
                {/* Show password Eye button */}
                <div className="absolute top-4 right-6 ">
                  <button onClick={handleShowPassword}>
                    {!showPassword ? (
                      <FaRegEye className="text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-500 transition-all" />
                    ) : (
                      <FaRegEyeSlash className="text-blue-600 hover:text-blue-500 transition-all dark:text-blue-500 dark:hover:text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Error Msg */}
              {password.length === 0 ? null : passwordMsg === "Strong" ? (
                <div className="flex items-center justify-center w-full max-w-sm rounded-sm bg-green-300 dark:bg-green-400 border-2 border-green-400">
                  <span className="text-green-700 text-xs dark:text-green-800 dark:font-semibold">
                    {passwordMsg}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full max-w-sm rounded-sm bg-red-300 dark:bg-red-400 border-2 border-red-400">
                  <span className="text-red-700 dark:text-red-800 dark:font-semibold text-xs">
                    {passwordMsg}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Add button */}
          <div className="mt-4 w-full flex justify-center">
            <button
              onClick={handleAdd}
              className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] bg-blue-500 dark:bg-blue-700 rounded p-2 text-white dark:text-gray-200 dark:hover:opacity-90 hover:bg-opacity-85 mb-4 transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveYourPasswordsLayout;
