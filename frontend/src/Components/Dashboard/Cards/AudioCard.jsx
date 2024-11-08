import React from "react";
import { FaMicrophone } from "react-icons/fa";

const Card = () => {
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
        `}
      </style>

      <div
        style={{ fontFamily: "Plus Jakarta Sans" }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4 2xl:w-full w-80 max-w-sm before:absolute before:top-0 before:left-0 before:w-40 before:h-14 before:bg-blue-100 dark:before:bg-blue-600 before:rounded-br-full before:z-0 after:absolute after:bottom-0 after:right-0 after:w-32 after:h-12 after:bg-blue-100 dark:after:bg-blue-600 after:rounded-tl-full after:z-0"
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Microphone image */}
          <div className="relative">
            <div
              className="absolute 2xl:ml-48 ml-32 mt-8"
              style={{
                transform: "rotate(-15deg)",
                transformOrigin: "top left",
              }}
            >
              <img
                src="/assets/Microphone.png"
                alt="audio"
                className="w-16 h-36"
              />
              {/* Shadow img */}
              <img
                src="/assets/shadow.png"
                alt="shadow"
                className="absolute w-16 h-10"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              {/* Microphone icon */}
              <div>
                <span role="img" aria-label="audio">
                  <FaMicrophone className="text-lg text-gray-600 dark:text-gray-300" />
                </span>
              </div>
              {/* Text */}
              <h2 className="ml-4 font-semibold text-lg text-gray-800 dark:text-gray-200">
                Audio
              </h2>

              {/* Files */}
              <p className="text-sm text-gray-400 font-normal ml-28 2xl:ml-44 mt-2 dark:text-gray-400">
                34,430 Files
              </p>
            </div>

            {/* Shared with */}
            <div className="mt-10">
              <p className="text-sm text-gray-400 font-normal mb-1 dark:text-gray-400">
                Shared With:
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Shared User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex justify-between items-center mt-12">
            <p className="text-gray-400 font-normal self-end text-sm dark:text-gray-400">
              Last Edit: Jun 30th 2020
            </p>
            <button className="text-black dark:text-white flex items-center mr-5 self-end hover:text-blue-500 dark:hover:text-blue-200">
              Open
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
