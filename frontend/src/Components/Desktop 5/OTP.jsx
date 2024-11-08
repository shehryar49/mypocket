import React from "react";
import ConfirmationButtons from "./ConfirmationButtons";

const OTP = ({ otp, inputRef, handleInput, handleCancel }) => {
  const handleChange = (i, e) => {
    // Dummy function for input field
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
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-bold text-lg dark:text-gray-200">
            Enter 4 digit code
          </h1>

          <div
            className="border border-gray-200 dark:bg-gray-800 dark:border-gray-800 w-[343px] h-[298px] p-2 flex justify-center mt-4 rounded-lg flex-col items-center"
            style={{
              boxShadow:
                "-4px 0 10px rgba(0, 0, 0, 0.1), 4px 0 10px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.1), 0 -2px 0 rgba(255, 255, 255, 0)",
            }}
          >
            <p className="text-sm p-4 font-light dark:text-gray-300">
              A four digit code should have come to your email address that you
              indicated.
            </p>

            {/* Input fields for OTP */}
            <div className="flex gap-8 mt-2 mb-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  name={index}
                  ref={inputRef[index]}
                  value={value}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleInput(index, e.key)}
                  className="w-12 h-20 focus:bg-blue-100 text-center border bg-gray-100 border-gray-200 rounded-md shadow-md text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
                  maxLength="1"
                />
              ))}
            </div>

            {/* Confirmation Buttons */}
            <ConfirmationButtons handleCancel={handleCancel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
