import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import {
  MdOutlineNotificationsActive,
  MdOutlineDarkMode,
} from "react-icons/md";
import DarkModeToggle from "../Toggle Buttons/DarkModeToggle";
import EmailNotifiToggle from "../Toggle Buttons/EmailNotifiToggle";
const API_URL = "http://localhost:8000";
const EditInfoLayout = ({
  user,
  formattedBirth,
  handleDateOfBirth,
  updatedNumber,
  handleNumber,
  handleSaveChanges,
  handleAddImage,
}) => {
  console.log(user);
  return (
    <div>
      <div className="mx-6 mt-6 mb-6">
        {/* Toggle */}
        <div className="mt-10 flex items-center md:flex-row flex-col justify-center gap-5 md:gap-0 md:justify-between mx-auto">
          {/* Email Notification */}
          <div className="flex items-center justify-between dark:bg-gray-700 bg-gray-100 p-2 h-12 lg:w-72 md:w-60 w-72 rounded-full">
            <div className="flex items-center gap-2">
              {/* Icon */}
              <MdOutlineNotificationsActive className="text-yellow-500 text-2xl" />
              {/* Text */}
              <h1 className="text-base md:text-sm font-medium dark:text-gray-200">
                Email Notifications
              </h1>
            </div>
            {/* Toggle */}
            <div className="flex items-center justify-center mb-4 lg:mr-2 md:mr-0 mr-2">
              <EmailNotifiToggle />
            </div>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between dark:bg-gray-700 bg-gray-100 p-2 h-12 lg:w-72 w-72 md:w-56 rounded-full">
            <div className="flex items-center gap-2">
              {/* Icon */}
              <MdOutlineDarkMode className=" text-xl dark:text-gray-300" />
              {/* Text */}
              <h1 className="text-base md:text-sm font-medium dark:text-gray-200">
                Dark Mode
              </h1>
            </div>
            {/* Toggle */}
            <div className="flex items-center justify-center mb-4 lg:mr-2 md:mr-0 mr-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center justify-center md:justify-normal flex-col md:flex-row gap-4 mt-10">
          <img
            src={API_URL+`/profile_pic?id=${user.id}`}
            alt=""
            className="md:w-20 md:h-20 w-10 h-10 rounded-full"
          />

          {/* Upload */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-Upload"
            onChange={handleAddImage}
          />
          <label
            htmlFor="image-Upload"
            className="flex cursor-pointer items-center gap-2 bg-blue-500 dark:bg-blue-700 dark:hover:bg-opacity-90 dark:text-gray-200 transition-all hover:bg-blue-600 text-gray-100 font-medium p-1 rounded-lg justify-center px-2"
          >
            {/* Icon */}
            <IoCameraOutline className="text-lg" />
            {/* Text */}
            <p>Update Profile Picture</p>
          </label>
        </div>

        {/* Inputs */}
        <div className="flex flex-col mx-auto gap-12 mt-10 items-center justify-center md:items-start md:justify-normal">
          {/* Phone Number */}
          <div className="flex flex-col justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] gap-1">
            <h1 className="ml-2 font-medium dark:text-gray-300">
              Update Phone Number
            </h1>
            <input
              type="number"
              value={updatedNumber}
              onChange={handleNumber}
              placeholder="Enter number"
              className="no-arrows w-full p-3 border-2 transition-all flex flex-shrink placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col justify-center gap-1 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]">
            <h1 className="ml-2 font-medium dark:text-gray-300">
              Date Of Birth
            </h1>
            <input
              type="date"
              value={formattedBirth}
              onChange={handleDateOfBirth}
              placeholder="Enter date"
              className=" p-3 border-2 transition-all placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center items-center">
            <button
              onClick={handleSaveChanges}
              className="flex items-center bg-blue-500 dark:bg-blue-700 dark:hover:bg-opacity-90 dark:text-gray-200 transition-all hover:bg-blue-600 text-gray-100 font-medium p-2 rounded-lg justify-center"
            >
              {/* Text */}
              <p>Save Changes</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfoLayout;
