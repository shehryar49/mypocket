import React from "react";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import SharedUser from "./SharedUser";

const FileCard = ({ sharedUsers, name, insideFiles, fileType, filesData }) => {
  // console.log(sharedUsers)
  return (
    <div>
      {/* File card */}
      <div className="w-80 h-48 dark:bg-gray-800  rounded-3xl shadow-md dark:shadow-gray-700 dark:border-gray-800 border-t border-gray-100 flex flex-col justify-between">
        {/* Icon,Name,date */}
        <div className="flex items-center justify-between mt-6 mx-4">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div>
              <FaFolder className="text-blue-600 dark:text-blue-700 dark:bg-sky-300 bg-sky-100 p-2 w-8 h-8 rounded-lg" />
            </div>

            {/* Name */}
            <div className="flex flex-col justify-center ">
              <h1 className="text-base font-medium dark:text-gray-300">{name}</h1>
              <h1 className="text-sm font-medium text-gray-400">
                Sep 25, 2022
              </h1>
            </div>
          </div>

          {/* kebab icon */}
          <div className="">
            <BsThreeDotsVertical className="hover:bg-sky-100 dark:text-gray-300 dark:hover:bg-sky-300 dark:hover:text-blue-700 cursor-pointer hover:text-blue-600 p-2 w-8 h-8 rounded-xl" />
          </div>
        </div>

        {/* Shared Users and files */}
        <div>
          <SharedUser
            user={sharedUsers}
            insideFiles={insideFiles}
            fileType={fileType}
            filesData={filesData}
          />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
