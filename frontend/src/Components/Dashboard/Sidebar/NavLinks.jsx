import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineStorage } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { RiLockPasswordFill, RiFolderSharedFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div>
      <ul className="flex flex-col justify-center items-start text-white gap-6 2xl:gap-6 md:gap-4 mt-12 md:mt-1 md:mr-4">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <RxDashboard className="text-lg" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/myprofile"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <CgProfile className="text-lg" /> My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/mystorage"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <MdOutlineStorage className="text-lg" /> My Storage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/myfiles"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <SiFiles className="text-lg" /> My Files
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/mypasswords"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-full p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <RiLockPasswordFill className="text-lg" /> My Passwords
          </NavLink>
        </li>
        {/*<li>
          <NavLink
            to="/dashboard/sharedfiles"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <RiFolderSharedFill className="text-lg" /> Shared Files
          </NavLink>
        </li>*/}
        <li>
          {" "}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center text-gray-400 gap-2 cursor-pointer w-36 p-2 bg-white bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
                : "flex justify-start items-center text-gray-400 w-full p-2 gap-2 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-tr-full rounded-br-full transition-all whitespace-nowrap text-base"
            }
          >
            <IoMdSettings className="text-lg" /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
