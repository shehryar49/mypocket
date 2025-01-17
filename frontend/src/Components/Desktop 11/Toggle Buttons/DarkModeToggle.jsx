import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`rounded-full w-[50px] h-6 transition-colors shadow-md duration-300 relative flex items-center ${
          isDarkMode ? "bg-blue-600 dark:bg-blue-700" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 ml-[0.9px]  bg-white rounded-full transition-transform duration-300 ${
            isDarkMode ? "transform translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
