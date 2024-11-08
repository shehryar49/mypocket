import React, { useContext } from "react";
import { RectangleIcon } from "../../assets/RectangleIcon.jsx";
import UserInfo from "./SignUpUserInfo";
import CheckBox from "./CheckBox";
import ButtonProperty from "../Desktop 1/ButtonProperty";
import { AuthContext } from "../Context/AuthContext.jsx";

const SignUpLayout = ({
  name,
  email,
  password,
  handleEmail,
  handleName,
  handlePassword,
  showVisibility,
  showPassword,
  isChecked,
  isValid,
  nameError,
  emailError,
  passwordError,
  checkboxError,
  setIsChecked,
  handleSignUp,
}) => {
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
        <div className="w-full flex md:flex-row flex-col justify-center items-center mt-32">
          <h1 className="md:text-4xl 2xl:text-5xl text-3xl font-bold text-blue-500 dark:text-blue-600 md:mt-0 mt-12">
            Sign up
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
        <div className="flex justify-center h-24 md:mt-12 mt-12">
          <RectangleIcon />
        </div>

        {/* Sign up user info */}
        <div className="flex items-center justify-center mt-8 ">
          <div className="flex justify-center items-center w-72 flex-col gap-7">
            <p className="font-semibold dark:text-gray-200">
              Please create a new account
            </p>

            {/* Name, Email and Password */}
            <UserInfo
              name={name}
              email={email}
              password={password}
              handleEmail={handleEmail}
              handleName={handleName}
              handlePassword={handlePassword}
              showVisibility={showVisibility}
              showPassword={showPassword}
              isValid={isValid}
              nameError={nameError}
              emailError={emailError}
              passwordError={passwordError}
            />

            {/* Agreements to terms */}
            <CheckBox
              checkboxError={checkboxError}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />

            {/* Sign up button */}
            <div className="mb-20 ml-2" onClick={handleSignUp}>
              <ButtonProperty Text={"Sign up"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpLayout;
