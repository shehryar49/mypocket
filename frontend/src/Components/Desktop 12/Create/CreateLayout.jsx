import React from "react";
import { FaFolder } from "react-icons/fa";
import { FaRegCircle, FaCircleDot } from "react-icons/fa6";

const CreateLayout = ({
  onlyCircle,
  handleOnlyCircle,
  specificCircle,
  handleSpecificCircle,
  isChecked,
  handleCheck,
  handleName,
  name,
  handleCreateButton,
  handleCancelButton,
}) => {
  return (
    <div className="flex justify-center md:justify-start md:ml-8 md:items-start items-center">
      {/* Create Folder */}
      <div className="flex flex-col mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] sm:mx-auto md:mx-0 px-4 md:px-0 ">
        {/* Name and Icon */}
        <div className="flex items-center gap-3 border-b pb-4 dark:border-gray-300 border-gray-300 w-full ">
          <FaFolder className="text-blue-400 dark:text-blue-600 text-2xl" />
          <h1 className="text-lg font-medium dark:text-gray-200">
            Create Folder
          </h1>
        </div>

        {/* Input Field */}
        <div className="mt-4 mb-4">
          <div className="flex flex-col justify-center w-full gap-2">
            <h1 className="ml-2 font-medium dark:text-gray-300">Name</h1>
            <input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Enter name"
              className="w-full p-3 border-2 transition-all placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:bg-gray-600 dark:border-gray-600 dark:focus:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400 rounded-lg bg-gray-100 outline-none focus:border-blue-400 focus:bg-blue-100"
            />
          </div>
        </div>

        {/* Who can access */}
        <h1 className="ml-2 font-medium mb-2 dark:text-gray-300">
          Who can access
        </h1>
        <div className="gap-3 flex flex-col">
          {/* Only You */}
          <div className="flex items-center w-full gap-4 dark:bg-gray-700 bg-stone-100 p-2 px-3 rounded-md">
            {/* Checkbox */}
            <button onClick={handleOnlyCircle}>
              {onlyCircle ? (
                <FaRegCircle className="hover:opacity-70 dark:text-gray-300 transition-opacity" />
              ) : (
                <FaCircleDot className="hover:opacity-70 dark:text-gray-300 transition-opacity" />
              )}
            </button>
            <div className="flex flex-col">
              <h1 className="font-medium dark:text-gray-200">Only you</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only you can access this folder
              </p>
            </div>
          </div>

          {/* Specific People */}
          <div className="flex items-center w-full gap-4 dark:bg-gray-700 bg-stone-100 p-2 px-3 rounded-md">
            {/* Checkbox */}
            <button onClick={handleSpecificCircle}>
              {specificCircle ? (
                <FaCircleDot className="hover:opacity-70 dark:text-gray-300  transition-opacity" />
              ) : (
                <FaRegCircle className="hover:opacity-70 dark:text-gray-300  transition-opacity" />
              )}
            </button>
            <div className="flex flex-col">
              <h1 className="font-medium dark:text-gray-200">
                Specific people
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 ">
                Choose who to share this folder with
              </p>
            </div>
          </div>
        </div>

        {/* Add automation */}
        <div>
          <h1 className="ml-2 font-medium mb-2 mt-4 dark:text-gray-300">
            Add Automation
          </h1>
          <div className="flex items-center w-full gap-4 dark:bg-gray-600 bg-stone-100 p-2 px-3 rounded-md">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
                className="appearance-none size-5 border bg-white dark:bg-transparent border-black checked:bg-blue-500 dark:border-gray-200 cursor-pointer rounded-md dark:checked:bg-blue-600 dark:checked:border-blue-600 checked:border-transparent focus:outline-none transition-colors"
              />
            </label>
            <p className="lg:text-sm text-xs dark:text-gray-300 ">
              Set up this folder to automatically handle tasks like organizing
              your content and converting files. You will set up your automation
              after we create the folder.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex md:justify-between justify-center items-center mt-14 mb-8 w-full">
          <div></div>
          <div className="flex gap-4 items-center">
            {/* Cancel Button */}
            <button
              onClick={handleCancelButton}
              className="w-24 h-9 p-2 rounded-md dark:bg-gray-600 dark:hover:bg-opacity-90 dark:text-gray-200 bg-stone-200 hover:bg-stone-300 transition-colors"
            >
              Cancel
            </button>

            {/* Create Button */}
            <button
              onClick={handleCreateButton}
              className="w-24 h-9 p-2 rounded-md bg-blue-500 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-opacity-90 hover:bg-blue-600 text-white transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLayout;
