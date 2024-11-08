import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { BsFillFileEarmarkLock2Fill } from "react-icons/bs";
import { FaFileAudio, FaFileImage, FaFileVideo } from "react-icons/fa6";

const FilesStorage = ({ storageData }) => {
  const renderFileIcon = (file) => {
    if (file === "audio") {
      return (
        <FaFileAudio className="xl:w-9 xl:h-9 lg:w-7 lg:h-7 w-7 h-7 md:w-5 md:h-5 text-white dark:bg-sky-600 dark:text-gray-100 bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "video") {
      return (
        <FaFileVideo className="xl:w-9 xl:h-9 lg:w-7 lg:h-7 w-7 h-7 md:w-5 md:h-5 dark:bg-sky-600 dark:text-gray-100 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "password") {
      return (
        <BsFillFileEarmarkLock2Fill className="xl:w-9 xl:h-9 lg:w-7 lg:h-7 w-7 h-7 dark:bg-sky-600 dark:text-gray-100 md:w-5 md:h-5 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "image") {
      return (
        <FaFileImage className="xl:w-9 xl:h-9 lg:w-7 lg:h-7 w-7 h-7 md:w-5 md:h-5 dark:bg-sky-600 dark:text-gray-100 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else {
      return (
        <IoDocumentText className="xl:w-9 xl:h-9 lg:w-7 lg:h-7 w-7 h-7 md:w-5 md:h-5 dark:bg-sky-600 dark:text-gray-100 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    }
  };

  /* The `renderProgressBarColors` function in the provided code snippet is responsible for rendering
different colored progress bars based on the type of file and its size. */
  const renderProgressBarColors = (file, size) => {
    if (file === "password") {
      return (
        <div className="bg-gray-200 dark:bg-gray-400 w-full h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${(size / 128) * 100}%`,
            }}
          ></div>
        </div>
      );
    } else if (file === "video") {
      return (
        <div className="bg-gray-200 dark:bg-gray-400 w-full h-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(size / 128) * 100}%`,
            }}
          ></div>
        </div>
      );
    } else if (file === "image") {
      return (
        <div className="bg-gray-200 dark:bg-gray-400 w-full h-2 rounded-full">
          <div
            className="bg-blue-800 h-2 rounded-full"
            style={{
              width: `${(size / 128) * 100}%`,
            }}
          ></div>
        </div>
      );
    } else if (file === "audio") {
      return (
        <div className="bg-gray-200 dark:bg-gray-400 w-full h-2 rounded-full">
          <div
            className="bg-blue-900 h-2 rounded-full"
            style={{
              width: `${(size / 128) * 100}%`,
            }}
          ></div>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-200 dark:bg-gray-400 w-full h-2 rounded-full">
          <div
            className="bg-blue-700 h-2 rounded-full"
            style={{
              width: `${(size / 128) * 100}%`,
            }}
          ></div>
        </div>
      );
    }
  };

  return (
    <div>
      {/* Files */}
      <div className="flex flex-col gap-8 justify-center">
        {storageData &&
          storageData.map((file, index) => (
            <div
              key={index}
              className="w-full flex items-center lg:gap-12 md:gap-4"
            >
              {/* File Details */}
              <div className="flex gap-4 items-center flex-grow dark:text-gray-300">
                {/* Icon */}
                <div>{renderFileIcon(file.type)}</div>

                {/* Name and Storage Info */}
                <div className="flex flex-col justify-center">
                  <h1 className="font-medium text-sm">{file.name}</h1>

                  {/* Storage and files */}
                  <div className="flex gap-1">
                    <h1 className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      {file.count} items ∙
                    </h1>
                    <h1 className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      {file.size} GB
                    </h1>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center w-32 ml-2 xl:mr-24 lg:mr-16">
                {renderProgressBarColors(file.type, file.size)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilesStorage;
