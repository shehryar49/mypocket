import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import RectangleIcon from "../Global/RectangleIcon";
import Cards from "./Cards/Cards";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const [sortOption, setSortOption] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  const handleSort = () => {
    setIsSorted(!isSorted);
  };

  const handleSorting = (option) => {
    setSortOption(option);
    setIsSorted(false);
  };

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
        `}
      </style>

      <div
        className="flex md:flex-row flex-col dark:bg-gray-900 min-h-screen"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col w-full md:ml-64 ">
          {/* Header */}
          <Header files={files} />

          {/* Top content */}
          <div className="flex justify-between mt-4">
            {/* Text */}
            <div className="flex flex-col justify-start items-start ml-4 dark:text-gray-300">
              <h1 className="text-base font-semibold">Task</h1>
              <p className="text-sm font-normal text-gray-400">
                Hi, here here welcome to task my pocket
              </p>
            </div>

            {/* Sort by Button */}
            <div>
              <button
                className="p-2 bg-gray-200 text-sm font-normal w-28 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 rounded-sm flex justify-center items-center gap-2 mr-4 hover:bg-gray-300 transition-all"
                onClick={handleSort}
              >
                Sort by{" "}
                {!isSorted ? (
                  <IoIosArrowDown className="text-lg" />
                ) : (
                  <IoIosArrowUp className="text-lg" />
                )}
              </button>
              {/* Sort by Options */}
              <div className="relative">
                <ul
                  className={`flex justify-start text-sm dark:bg-gray-800 dark:text-gray-300 bg-gray-200 border border-t-black w-28 flex-col py-1 dark:border-b dark:border-gray-700 rounded-sm cursor-pointer overflow-hidden absolute z-10 transition-all ${
                    !isSorted ? "max-h-0 opacity-0" : "max-h-100 opacity-100"
                  }`}
                >
                  <li
                    onClick={() => handleSorting("video")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-75 hover:rounded-sm hover:transition-all p-1 w-full"
                  >
                    Videos
                  </li>
                  <li
                    onClick={() => handleSorting("audio")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-75 hover:rounded-sm hover:transition-all p-1 w-full"
                  >
                    Audios
                  </li>
                  <li
                    onClick={() => handleSorting("image")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-75 hover:rounded-sm hover:transition-all p-1 w-full"
                  >
                    Images
                  </li>
                  <li
                    onClick={() => handleSorting("document")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-75 hover:rounded-sm hover:transition-all p-1 w-full"
                  >
                    Documents
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rectangle icon */}
          <div className="relative mt-4">
            <h1 className="text-xl font-semibold absolute top-8 left-10 dark:text-gray-300">
              Last 7 Days
            </h1>
            <RectangleIcon />
          </div>

          <div className="flex  flex-col mt-4 gap-2">
            {/* Cards (Main Content Area) */}
            <div>
              <Cards
                sortOption={sortOption}
                files={files}
                setFiles={setFiles}
              />
            </div>

            {/* Right Panel (Current Plan) */}
            {/* <RightPanel /> */}
          </div>

          {/* Cloud Pro - Positioned after both Cards and RightPanel */}
          {/* <CloudPro /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
