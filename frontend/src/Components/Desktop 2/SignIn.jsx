import React, { useContext } from "react";
import { RectangleIcon } from "../../assets/RectangleIcon.jsx";
import UserInfo from "./SignInUserInfo";
import { AuthContext } from "../Context/AuthContext.jsx";

const SignIn = () => {
  const { isDarkMode } = useContext(AuthContext);
  return (
    <>
      <style>
        {`
    @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
    `}
      </style>
      <div
        className="relative dark:bg-gray-900 flex flex-col min-h-screen"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {/* Logo and Heading */}
        <div className=" w-full flex md:flex-row flex-col justify-center items-center mt-32">
          <h1 className="md:text-4xl dark:text-blue-600 2xl:text-5xl text-3xl font-bold text-blue-500 md:mt-0 mt-12">
            Sign in
          </h1>

          {/* Logo */}
          {isDarkMode ? (
            <img
              src="/assets/My-Pocket-Dark.png"
              alt="My Pocket"
              className="md:w-72 w-52 h-auto absolute md:right-1  md:mb-20 mb-44 mt-6 md:mt-0"
            />
          ) : (
            <img
              src="/assets/My-Pocket.png"
              alt="My Pocket"
              className="md:w-72 w-52 h-auto absolute md:right-1  md:mb-20 mb-44 mt-6 md:mt-0"
            />
          )}
        </div>

        {/* Rectangle Icon */}
        <div className=" flex justify-center h-24 md:mt-12 mt-12">
          <RectangleIcon />
        </div>

        {/* Sign in user info */}
        <div className="flex items-center justify-center mt-8 ">
          <div className="flex justify-center items-center w-72 flex-col gap-10">
            <p className="font-semibold dark:text-gray-300">
              Please log in to your account
            </p>

            {/* Email And Password */}
            <UserInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
