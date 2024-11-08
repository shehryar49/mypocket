import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <div>
      <button className=" mt-10 md:w-[324px] w-72 border-2 hover:opacity-80 transition-all border-blue-400 text-blue-400 p-2 rounded-md h-12 flex justify-center items-center">
        <FcGoogle /> <span className="ml-2">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;
