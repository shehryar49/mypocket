import React from "react";
import { Link } from "react-router-dom";

const ButtonProperty = ({Text}) => {
  return (
    <div>
      <button
        className="bg-blue-500 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-opacity-90 p-2 md:w-[324px] w-72 rounded-md h-12 text-white hover:opacity-85 flex flex-1 justify-center items-center"
      >
        {Text}
      </button>
    </div>
  );
};

export default ButtonProperty;
