import React from "react";
import ButtonProperty from "../Desktop 1/ButtonProperty";
import { Link } from "react-router-dom";

const UserInfoLayout = ({ email, handleEmail, isValid, handleOtp }) => {
  return (
    <div>
      <div className="flex items-center justify-center mt-8 ">
        <div className="flex justify-start items-start w-72 flex-col mb-4">
          <p className="mb-8 md:w-[350px] dark:text-gray-200">
            Enter your email for the verification process, we will send code to
            your email
          </p>

          {/* Email*/}
          <p className="text-sm dark:text-gray-300">Email or Phone Number</p>
          <input
            type="text"
            placeholder="example@xyz.com"
            value={email}
            onChange={handleEmail}
            className="p-3 border-2 border-gray-200 rounded-lg outline-none bg-gray-100 w-72 md:w-80 mt-2 font-normal text-sm placeholder:italic placeholder:font-light focus:bg-blue-100 focus:border-blue-400 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
          />

          {isValid ? (
            <span className="text-green-500 ml-1 text-sm dark:text-green-500">
              Looks good!
            </span>
          ) : (
            email.length != 0 && (
              <span className="text-red-500 dark:text-red-600 ml-1 text-sm">
                Please enter a valid email
              </span>
            )
          )}

          {/* Continue Button */}

          <div className="mt-12 md:mr-12 mb-36" onClick={handleOtp}>
            <ButtonProperty Text={"Continue"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoLayout;
