import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const RecentFilesLayout = ({
  maxVisibleUsers,
  renderFilesIcon,
  handleSortConfig,
  sortedFiles,
}) => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl flex justify-start ml-6 dark:text-gray-200">
        Recent Files
      </h1>

      <div className="flex flex-col items-center mt-4 lg:mx-6 mx-6 md:mx-0">
        {/* Container for the files */}
        <div className="w-full h-screen overflow-x-auto dark:bg-gray-800 dark:border-gray-800 dark:shadow-gray-700 rounded-2xl shadow-lg border-t border-gray-200 p-4">
          {/* Header Row */}
          <div className="flex justify-between min-w-[500px] md:min-w-0 md:flex-wrap dark:border-gray-400 border-b font-semibold text-sm dark:text-gray-300 text-gray-400">
            <span className="w-1/4 flex items-center text-xs md:text-sm gap-1 mb-2">
              Name{" "}
              <span className="flex flex-col items-center">
                <FaCaretUp
                  className="hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("name")}
                />
                <FaCaretDown
                  className="-mt-1 hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("name")}
                />
              </span>
            </span>
            <span className="w-1/4 flex items-center gap-1 mb-2 text-xs md:text-sm">
              Shared Users{" "}
              <span className="flex flex-col items-center -mr-4 md:-mr-0">
                <FaCaretUp
                  className="hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("sharedUsers")}
                />
                <FaCaretDown
                  className="-mt-1 hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("sharedUsers")}
                />
              </span>
            </span>
            <span className="w-1/4 flex items-center gap-1 mb-2 text-xs ml-6 md:ml-0 md:text-sm">
              File Size{" "}
              <span className="flex flex-col items-center">
                <FaCaretUp
                  className="hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("fileSize")}
                />
                <FaCaretDown
                  className="-mt-1 hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("fileSize")}
                />
              </span>
            </span>
            <span className="w-1/4 flex items-center gap-1 mb-2 text-xs md:text-sm">
              Last Modified{" "}
              <span className="flex flex-col items-center -mr-4">
                <FaCaretUp
                  className="hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("lastModified")}
                />
                <FaCaretDown
                  className="-mt-1 hover:text-blue-400 dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleSortConfig("lastModified")}
                />
              </span>
            </span>
          </div>

          {/* Files Data */}
          {sortedFiles.map((file) => {
            const visibleUsers = file.sharedUsers.slice(0, maxVisibleUsers);
            const extraUserCount = file.sharedUsers.length - maxVisibleUsers;

            return (
              <div
                key={file.name}
                className="flex justify-between dark:text-gray-200 min-w-[500px] dark:border-gray-600 dark:border-b md:min-w-0 md:flex-wrap items-center py-2 shadow-sm text-sm font-medium"
              >
                {/* File Name with Icon */}
                <span className="w-1/4 flex items-center space-x-2">
                  {renderFilesIcon(file.fileType)}
                  <span className="text-xs md:text-sm">{file.name}</span>
                </span>

                {/* Shared Users */}
                <span className="w-1/4 flex items-center ml-12 md:ml-0">
                  {visibleUsers.map((user, index) => (
                    <div
                      className="bg-sky-300 dark:bg-blue-600 dark:border-blue-600 border text-xs md:text-sm border-white md:w-7 md:h-7  w-5 h-5 flex items-center justify-center rounded-xl -ml-2"
                      key={index}
                    >
                      {user[0]}{" "}
                    </div>
                  ))}
                  {/* Show "+ more" if there are extra users */}
                  {extraUserCount > 0 && (
                    <div className="bg-sky-100 dark:bg-sky-300 dark:text-blue-700 dark:border-sky-300 font-semibold border text-sm text-blue-500 md:w-7 md:h-7 w-5 h-5 flex items-center justify-center rounded-xl -ml-2">
                      +{extraUserCount}
                    </div>
                  )}
                </span>

                {/* File Size */}
                <span className="w-1/4 font-normal text-xs md:text-sm">
                  {file.fileSize}
                </span>

                {/* Last Modified Date */}
                <span className="w-1/4 font-normal text-xs md:text-sm">
                  {file.lastModified}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentFilesLayout;
