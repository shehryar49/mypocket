import React, { useContext } from "react";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthContext";

const Logout = () => {
    const {logout} = useContext(AuthContext);
  return (
    <div>
      <button onClick={logout} className="bg-sky-400 transition-all text-xs p-2 md:p-1 font-semibold gap-2 rounded-sm flex justify-center items-center w-60 md:w-24 mb-12 md:mb-0 mt-5 md:mt-0 hover:opacity-75">
        <IoLogOut className="text-base" /> Logout
      </button>
    </div>
  );
};

export default Logout;
