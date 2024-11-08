import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { RiUploadLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Files from "./Files/Files";
import Create from "./Create/Create";

const UploadLayout = ({
  isCreate,
  setIsCreate,
  createFolder,
  setCreateFolder,
  name,
  setName,
  handleCreate,
  access,
  setAccess,
  files,
  setFiles,
}) => {
  return (
    <>
      <style>
        {`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      `}
      </style>

      <div
        className="flex flex-col md:flex-row dark:bg-gray-900 min-h-screen"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col w-full md:ml-64">
          <DashboardHeader Heading={"Upload"} display={"opacity-0"} />

          {/*Create and Upload Button */}
          <div className="flex items-center gap-3 mt-6 ml-6">
            {/* Upload Button */}
            <button className="w-28 h-9 bg-blue-500 dark:bg-blue-700 dark:hover:bg-opacity-90 dark:text-gray-200 text-white flex items-center justify-center gap-3 p-2 rounded-md hover:bg-blue-600 transition-colors">
              {/* Icon */}
              <RiUploadLine />
              {/* Text */}
              <h1 className="text-base font-medium">Upload</h1>
            </button>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className={`w-28 h-9 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-opacity-90 flex items-center justify-center gap-3 p-2 rounded-md hover:bg-gray-400 transition-colors ${
                createFolder && "pointer-events-none"
              }`}
            >
              {/* Icon */}
              <IoMdAdd />
              {/* Text */}
              <h1 className="text-base font-medium">Create</h1>
            </button>
          </div>

          {/* Files */}
          {isCreate && (
            <Create
              setIsCreate={setIsCreate}
              setCreateFolder={setCreateFolder}
              name={name}
              setName={setName}
              setAccess={setAccess}
            />
          )}

          {createFolder ? (
            <Files access={access} files={files} setFiles={setFiles} />
          ) : (
            // Add a folder
            <div
              className={`${
                isCreate && "hidden"
              } flex justify-center items-center mt-28`}
            >
              <h1 className="text-2xl font-medium text-gray-500 dark:text-gray-400">
                Create a folder to upload files
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadLayout;
