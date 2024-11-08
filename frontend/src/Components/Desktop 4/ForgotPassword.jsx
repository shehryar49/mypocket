import React, { useContext, useState } from "react";
import { RectangleIcon } from "../../assets/RectangleIcon.jsx";
import UserInfo from "./UserInfo.jsx";
import OTPinput from "../Desktop 5/OTPinput.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";

const ForgotPassword = () => {
  const { isDarkMode } = useContext(AuthContext);
  const [showOtp, setShowOtp] = useState(false);

  const handleShowOtp = () => setShowOtp(true);
  const handleCancel = () => {
    setShowOtp(false);
  };

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap");
        `}
      </style>
      <div
        className="relative dark:bg-gray-900 flex flex-col min-h-screen"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {/* Logo and Heading */}
        <div className="w-full flex md:flex-row flex-col justify-center items-center mt-32">
          <h1 className="dark:text-blue-600 md:text-4xl 2xl:text-5xl text-3xl font-bold text-blue-500 md:mt-0 mt-12 flex-wrap md:w-48">
            Forgot password?
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
        <div className="flex justify-center h-24 md:mt-4 mt-12">
          <RectangleIcon />
        </div>

        <div className="flex items-center justify-center mt-8 flex-col">
          {/* Conditional Rendering of UserInfo or OTPinput */}
          {showOtp ? (
            <OTPinput handleCancel={handleCancel} />
          ) : (
            <UserInfo handleShowOtp={handleShowOtp} />
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
