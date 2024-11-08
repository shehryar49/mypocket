import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Fileslayout = ({
  renderFileIcon,
  renderPermissionColor,
  sortedFiles,
  handleSortConfig,
}) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center mt-4 lg:mx-6 mx-6 md:mx-0 dark:bg-gray-800">
        {/* Container for the files */}
        <div className="w-full overflow-x-auto h-screen  p-4">
          {/* Header Row */}
          <div className="flex justify-between min-w-[600px] md:min-w-0 text-xs lg:text-sm font-semibold dark:text-gray-300 dark:border-gray-400 text-slate-800 border-slate-300 border-b border-t py-4 px-2">
            {/* File Name */}
            <span className="w-[40%] min-w-[150px] flex items-center">
              File Name
              <span className="flex flex-col items-center ml-1">
                <FaCaretUp
                  className="hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => handleSortConfig("name")}
                />
                <FaCaretDown
                  className="-mt-1 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => handleSortConfig("name")}
                />
              </span>
            </span>

            {/* Last Modified */}
            <span className="w-[30%] min-w-[120px] flex flex-col items-start">
              <span className="flex items-center">
                Last Modified
                <span className="flex flex-col items-center ml-1 mr-8">
                  <FaCaretUp
                    className="hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                    onClick={() => handleSortConfig("lastModified")}
                  />
                  <FaCaretDown
                    className="-mt-1 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                    onClick={() => handleSortConfig("lastModified")}
                  />
                </span>
              </span>
            </span>

            {/* File Permission */}
            <span className="w-[20%] min-w-[100px] flex flex-col items-start justify-center mr-8 lg:mr-10 2xl:mr-20">
              <span className="flex items-center truncate">
                File Permission
                <span className="flex flex-col items-center ml-1">
                  <FaCaretUp
                    className="hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                    onClick={() => handleSortConfig("permission")}
                  />
                  <FaCaretDown
                    className="-mt-1 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                    onClick={() => handleSortConfig("permission")}
                  />
                </span>
              </span>
            </span>
          </div>

          {/* Files Data */}
          {sortedFiles.map((file, index) => {
            return (
              <div
                key={index}
                className="flex justify-between min-w-[600px] md:min-w-0 text-slate-600 dark:text-gray-200 dark:shadow-gray-900 dark:shadow-sm items-center py-2 shadow-sm text-sm font-semibold border-b"
              >
                {/* File Name with Icon */}
                <span className="w-[40%] min-w-[150px] flex items-center space-x-2">
                  {renderFileIcon(file.type)}
                  {/* Name and Size */}
                  <div className="flex flex-col">
                    <span className="text-xs lg:text-sm break-words">
                      {file.name}
                    </span>
                    <span className="text-xs font-normal text-slate-600 dark:text-slate-300">
                      {file.size}
                    </span>
                  </div>
                </span>

                {/* Last Modified Date */}
                <span className="w-[30%] min-w-[120px] text-xs lg:text-sm text-start ml-5 font-normal">
                  {file.lastModified}
                </span>

                {/* File Permission and Dots */}
                <div className="w-[20%] min-w-[100px] flex items-center justify-start ml-4">
                  <span className="text-xs lg:text-sm text-left">
                    {renderPermissionColor(file.permission)}
                  </span>
                </div>
                <div className="mr-4">
                  <HiOutlineDotsVertical className="text-lg text-gray-400 dark:text-gray-200 dark:hover:text-blue-400 cursor-pointer hover:text-blue-500 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fileslayout;
