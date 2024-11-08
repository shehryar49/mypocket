import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const TotalStorageProgressBar = ({ handleTotalStoragePercent }) => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div>
      {/* Circular Progress */}
      <div className="relative w-36 h-36 lg:w-36 lg:h-36 md:w-28 md:h-28">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="custom-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#D6ECFD" />
              <stop offset="100%" stopColor="#D6ECFD" />
            </linearGradient>
          </defs>
          {/* Background Circle */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke={isDarkMode ? "#9ca3af" : "#dbeafe"}
            strokeWidth="6"
          ></circle>
          {/* Progress Circle */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            className="stroke-current text-blue-600 dark:text-blue-700"
            strokeWidth="6"
            strokeDasharray="100"
            strokeDashoffset={100 - handleTotalStoragePercent}
            strokeLinecap="round"
          ></circle>
        </svg>

        {/* Percentage Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-2xl font-semibold dark:text-gray-300">
            {handleTotalStoragePercent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalStorageProgressBar;
