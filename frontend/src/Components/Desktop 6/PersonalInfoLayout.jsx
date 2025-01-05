import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { IoMail } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import { IoClose } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
const PersonalInfoLayout = ({
  firstName,
  contact,
  firstNameError,
  handleFirstName,
  handleContact,
  handleEditButton,
}) => {
  const API_URL = "http://localhost:8000";
  const { user ,imageUrl} = useContext(AuthContext);
  const handleAddImage = () => {};

  return (
    <div className="md:ml-8 mt-6">
      {/* User image,name email */}
      <div className="flex items-center justify-between ml-8 md:ml-0 ">
            
        {/* Image */}
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt="user"
            className="md:w-20 md:h-20 w-10 h-10 rounded-full dark:text-gray-300"
          />

          {/* Name and email */}
          <div className="flex flex-col justify-center gap-1">
            <h1 className="md:text-lg text-base font-medium dark:text-gray-300">
              {user.name}
            </h1>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        {/* Change image Button */}
        <div>
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
      </div>

      {/* User info input */}

      <div className="flex lg:flex-row flex-col lg:gap-32 gap-12 mt-16 items-center justify-center md:items-start md:justify-normal">
        {/* First Name */}
        <div className="flex flex-col justify-center gap-1">
          <h1 className="ml-2 font-medium dark:text-gray-300">First Name</h1>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={handleFirstName}
            className="md:w-96 w-80 p-3 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600 border-2  transition-all flex flex-shrink placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100"
          />
          {/* First name Error message */}
          {firstNameError && (
            <p className="text-red-500 text-xs ml-2">{firstNameError}</p>
          )}
        </div>
      </div>

      {/* User info input */}
      <div className="flex lg:flex-row flex-col lg:gap-32 gap-12 mt-12 items-center justify-center md:items-start md:justify-normal">
        {/* Contact Number */}
        <div className="flex flex-col justify-center gap-1">
          <h1 className="ml-2 font-medium dark:text-gray-300">
            Contact Number
          </h1>
          <input
            type="number"
            placeholder="Enter number"
            value={contact}
            onChange={handleContact}
            className="no-arrows md:w-96 w-80 p-3 border-2 transition-all placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600 "
          />
        </div>
          
      </div><br></br>
      <button
            onClick={handleEditButton}
            className="bg-blue-500 dark:bg-blue-700 dark:text-gray-200 dark:hover:opacity-90 text-white md:w-20 md:h-11 w-14 h-8 text-sm md:text-base rounded-lg hover:opacity-85 transition-all mr-14"
          >
            Edit
          </button>

    </div>
  );
};

export default PersonalInfoLayout;
