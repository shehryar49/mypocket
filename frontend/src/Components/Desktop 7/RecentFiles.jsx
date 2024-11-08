import React, { useEffect, useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { BsFillFileEarmarkLock2Fill } from "react-icons/bs";
import { FaFileAudio, FaFileImage, FaFileVideo } from "react-icons/fa6";

const RecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState([]);

  const dummyFiles = [
    { name: "memory.jpg", type: "image", size: 2 }, //2MB
    { name: "password.txt", type: "password", size: 5 }, //5MB
    { name: "school.png", type: "image", size: 1 }, //1MB
    { name: "Video.mp4", type: "video", size: 20 }, //20MB
    { name: "Song.mp3", type: "audio", size: 5 }, //5MB
  ];

  useEffect(() => {
    setRecentFiles(dummyFiles);
  }, []);

  const renderFileIcon = (file) => {
    if (file === "audio") {
      return (
        <FaFileAudio className="w-9 h-9 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "video") {
      return (
        <FaFileVideo className="w-9 h-9 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "password") {
      return (
        <BsFillFileEarmarkLock2Fill className="w-9 h-9 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else if (file === "image") {
      return (
        <FaFileImage className="w-9 h-9 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    } else {
      return (
        <IoDocumentText className="w-9 h-9 text-white bg-sky-300 rounded-full p-1 rotate-12" />
      );
    }
  };

  return (
    <div className="xl:w-[460px] md:w-[300px] 2xl:w-[700px] flex flex-col gap-2  ">
      {/* Heading */}
      <div className="flex md:justify-between items-center">
        <h1 className="text-sm flex-grow font-semibold ml-2">Recent Files</h1>
        <h2 className="font-normal text-sm text-blue-500 cursor-pointer mr-6 md:mr-20 lg:mr-0 hover:text-blue-700">
          See All
        </h2>
      </div>
      {/* Files */}
      <div className="mt-4">
        {recentFiles &&
          recentFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-80 md:w-48 lg:w-80 border-b p-2 border-b-gray-300"
            >
              {/* Name and icon */}
              <div className="flex items-center gap-3">
                {renderFileIcon(file.type)}
                <p className="text-sm font-medium">{file.name}</p>
              </div>

              {/* size */}
              <div className="flex items-center">
                <p className="text-gray-400 text-xs font-medium">
                  {file.size} MB
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentFiles;
