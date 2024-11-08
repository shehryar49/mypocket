import React from "react";
import { IoFilter } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

const HeaderButtonsLayout = ({
  filteredFiles,
  handleFilterVisibility,
  isFilterOpen,
  fileTypes,
  handleFilterChange,
  filePermission,
  handleAddFile,
  setFilePermission,
  fileInputRef,
}) => {
  return (
    <div className="flex justify-between items-center mt-8 lg:mx-12 mx-4">
      {/* Heading and Total Files */}
      <div className="flex items-center flex-col lg:flex-row gap-2">
        {/* Heading */}
        <h1 className="md:text-lg text-base font-semibold text-slate-800 dark:text-gray-200">
          Shared Files
        </h1>

        {/* Total Files */}

        <h1 className=" h-6 text-[10px] md:text-xs font-semibold text-indigo-600 dark:bg-indigo-200 dark:text-indigo-700 bg-indigo-50 flex items-center justify-center p-2 rounded-full">
          {filteredFiles.length} Total
        </h1>
      </div>

      {/* Add File button and Filter Button */}
      <div className="flex items-center gap-2">
        <div className="flex lg:flex-row flex-col items-center gap-2 justify-center">
          {/* Add File */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAddFile}
            id="fileUpload"
            className="hidden"
          />

          <label
            htmlFor="fileUpload"
            className="size-9 rounded-full border cursor-pointer hover:bg-slate-600 dark:bg-slate-600 dark:text-gray-200 dark:hover:text-blue-600 dark:border-slate-700 dark:hover:bg-gray-300 text-slate-600 hover:text-white transition-all flex items-center justify-center"
          >
            <MdAdd className="md:text-3xl text-2xl " />
          </label>

          {/* Select Permission */}
          <select
            value={filePermission}
            onChange={(e) => setFilePermission(e.target.value)}
            className="ml-2 p-2 border w-24 md:w-28 lg:w-36 rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:opacity-90 hover:bg-blue-100 transition-all outline-none cursor-pointer text-[10px] lg:text-sm"
          >
            <option value="Permission" disabled>
              Permission
            </option>
            <option value="View Only">View Only</option>
            <option value="Editor">Editor</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>

        {/* Filter Button */}
        <div
          onClick={handleFilterVisibility}
          className="w-24 h-10 hover:bg-opacity-90 transition-all cursor-pointer bg-indigo-600 text-white rounded-full p-2 flex items-center justify-center gap-3 font-semibold"
        >
          {/* Filter Icon */}
          <IoFilter />
          {/* Text */}
          <h1 className="md:text-sm text-xs">Filter</h1>
        </div>
        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className="absolute mt-2 w-48 top-[28rem] right-1 md:right-1 md:top-[21rem] border lg:right-6 lg:top-[21rem] bg-white dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-600 dark:border-gray-600  shadow-lg rounded-md z-10">
            {fileTypes.map((type, index) => (
              <div
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-300 font-medium text-sm"
                onClick={() => {
                  handleFilterChange(type.toLowerCase());
                }}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderButtonsLayout;
