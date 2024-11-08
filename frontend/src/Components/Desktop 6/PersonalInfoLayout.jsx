import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { IoMail } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import { IoClose } from "react-icons/io5";

const PersonalInfoLayout = ({
  firstName,
  lastName,
  email,
  isValid,
  isVisible,
  contact,
  firstNameError,
  emailErrorMsg,
  emailLimit,
  limitMsg,
  handleFirstName,
  handleLastName,
  handleEmail,
  handleContact,
  handleEditButton,
  handleRemoveEmail,
  handleVisibility,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="md:ml-8 mt-6">
      {/* User image,name email */}
      <div className="flex items-center justify-between ml-8 md:ml-0 ">
        {/* Image */}
        <div className="flex items-center gap-3">
          <img
            src={user.image}
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

        {/* Edit Button */}
        <div>
          <button
            onClick={handleEditButton}
            className="bg-blue-500 dark:bg-blue-700 dark:text-gray-200 dark:hover:opacity-90 text-white md:w-20 md:h-11 w-14 h-8 text-sm md:text-base rounded-lg hover:opacity-85 transition-all mr-14"
          >
            Edit
          </button>
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

        {/* Last Name */}
        <div className="flex flex-col justify-center gap-1">
          <h1 className="ml-2 font-medium dark:text-gray-300">Last Name</h1>
          <input
            type="text"
            placeholder="Enter Last name"
            value={lastName}
            onChange={handleLastName}
            className="md:w-96 w-80 p-3 border-2 transition-all placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600 "
          />
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

        {/* Email input*/}
        <div
          className={`flex flex-col justify-center gap-1 ${
            isVisible ? "opacity-100 visible" : "opacity-0 invisible"
          }  transition-opacity duration-300`}
        >
          <h1 className="ml-2 font-medium dark:text-gray-300">Email</h1>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={handleEmail}
            className="md:w-96 w-80 p-3 border-2 transition-all placeholder:text-gray-600 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100 dark:bg-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:border-gray-600 "
          />

          {/* Error message */}
          {!isValid && (
            <p className="text-red-500 text-xs ml-2">{emailErrorMsg}</p>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col justify-center items-center md:items-start gap-8 mt-20">
        <h1 className="font-medium ml-1 dark:text-gray-300">
          My Email Address
        </h1>

        {/* Adding emails */}

        <div className="flex md:justify-center justify-start ml-16 md:ml-0 gap-3 flex-wrap">
          {user.extraEmails &&
            user.extraEmails.map((email, index) => (
              <div key={index}>
                <div className="flex items-center gap-4">
                  {/* Email icon */}
                  <div className="bg-blue-100 dark:bg-blue-300 rounded-full p-2">
                    <IoMail className=" text-blue-500 dark:text-blue-700" />
                  </div>

                  {/* email and time added */}
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-sm font-medium dark:text-gray-300">
                      {email.email}
                    </p>
                    {/* Time added */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(email.addedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div>
                    <button onClick={() => handleRemoveEmail(email.id)}>
                      <IoClose className="dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Add email address button */}
        <div className="ml-3 md:ml-0 mb-12">
          <button
            onClick={handleVisibility}
            className="w-44 h-16 bg-blue-100 dark:bg-blue-300 dark:text-gray-800 dark:hover:bg-opacity-90 text-sm rounded-lg text-blue-600 hover:bg-opacity-80 transition-all"
          >
            + Add Email Address
          </button>

          {/* Error message */}
          {emailLimit && (
            <p className=" mt-1 ml-1 w-44 md:w-full text-xs text-rose-500">
              {limitMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoLayout;
