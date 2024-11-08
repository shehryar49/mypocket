import React from "react";
import { FaFacebook } from "react-icons/fa";

const FacebookButton = () => {
  return (
    <div>
      <button className=" mt-10 md:w-[324px] w-72 border-2 border-blue-400 text-blue-400 hover:opacity-80 p-2 rounded-md h-12 flex justify-center items-center">
        <FaFacebook className="text-blue-700 dark:text-blue-600" />{" "}
        <span className="ml-2">Sign in with Google</span>
      </button>
    </div>
  );
};

export default FacebookButton;
