import React, { useState } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

const CheckBox = ({ checkboxError, isChecked, setIsChecked }) => {
  const showChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <div className="flex w-full justify-center items-center ml-4 gap-2 md:gap-0 md:mb-4 mb-7">
        <button onClick={showChecked}>
          {isChecked ? (
            <IoIosCheckbox className="text-blue-500 cursor-pointer h-7 w-8" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-blue-500 h-7 w-8 cursor-pointer" />
          )}
        </button>
        <p className="text-sm md:w-80 w-64 dark:text-gray-200">
          Agree to the terms of use and privacy policy
        </p>

        {/* Error msg for checkbox */}
        <span className="text-red-500 dark:text-red-600 absolute text-xs md:mt-16 mt-24 ml-2 md:mr-6 w-72 md:w-auto">
          {checkboxError}
        </span>
      </div>
    </div>
  );
};

export default CheckBox;
