import React, { useContext } from "react";
import { RectangleIcon } from "../../assets/RectangleIcon.jsx";
import ButtonProperty from "./ButtonProperty";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const LetsGetStarted = () => {
  const { isDarkMode } = useContext(AuthContext);
  return (
    <>
      <style>
        {`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
        `}
      </style>

      <div
        className="relative dark:bg-gray-900 min-h-screen flex flex-col"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {/* Logo and Heading */}
        <div className=" w-full flex md:flex-row flex-col justify-center items-center mt-32">
          <h1 className="md:text-4xl 2xl:text-5xl text-3xl font-bold dark:text-blue-600 text-blue-500 md:mt-0 mt-12">
            Welcome
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

        {/* Sign in and Sign Up */}
        <div className="flex flex-col justify-center items-center mt-12 gap-14 mb-44 dark:text-gray-300">
          <p className="font-semibold md:text-base text-sm">Lets get started</p>

          <p className="font-semibold md:text-base text-sm">
            Existing customer / Get started
          </p>

          {/*Sign in Button */}
          <Link to="/signin">
            <ButtonProperty Text={"Sign in"} />
          </Link>

          <p className="font-semibold md:text-base text-sm">
            New customer?
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer md:text-base text-sm ml-1 hover:text-blue-400"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LetsGetStarted;
