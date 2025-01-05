import React, { useContext, useState } from "react";
import NavLinks from "./NavLinks";
import UploadButton from "./UploadButton";
import { AuthContext } from "../../Context/AuthContext";
import Logout from "./Logout";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user ,imageUrl} = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <style>
        {`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    `}
      </style>
      <div
        className="bg-black dark:bg-gray-950 md:fixed z-20  md:h-96 md:w-64 md:min-h-screen"
        style={{ fontFamily: "Poppins" }}
      >
        {/* User for medium screens */}
        <div className="md:block hidden">
          <div className="flex md:justify-between items-center md:gap-0 mt-4">
            {user.image ? (
              <img src={user.image} alt="" className="w-12 ml-3 rounded-full" />
            ) : (
              <img
                src={imageUrl}
                className="w-12 ml-3 rounded-full"
              />
            )}
            <h1 className="text-white md:mr-5">{user.name}</h1>
          </div>
        </div>

        {/* My Pocket */}
        <div
          className="bg-teal-900 p-2 md:mt-2 mt-6 mb-6 flex md:justify-center items-center h-16 md:w-64 cursor-default"
          style={{
            boxShadow:
              "0 4px 2px -1px rgb(37, 99, 235), 0 2px 4px -1px rgba(0, 80, 222, 0.25)",
          }}
        >
          <img src="/assets/logo.png" alt="logo" className="w-14 h-auto" />
          <h1 className="text-2xl font-bold text-center">MY POCKET</h1>

          {/* Bars and close icon */}
          <div
            className="md:hidden block cursor-pointer absolute top-11 right-8"
            onClick={handleVisibility}
          >
            {!isVisible ? (
              <FaBars className="text-xl" />
            ) : (
              <IoClose className="text-xl" />
            )}
          </div>
        </div>

        <div
          className={`md:flex md:flex-col md:justify-center md:items-center 2xl:gap-4 md:gap-2 gap-4 ml-4 md:ml-0 transition-all duration-300 ${
            isVisible ? "block" : "hidden"
          } md:block`}
        >
          {/* NavLinks */}
          <NavLinks />

          {/* Upload Button */}
          <div className="md:mr-5 flex md:gap-4 justify-center items-center w-full mt-3 md:mt-1 2xl:mt-6">
            {/*<div>
              <NavLink to="/dashboard/upload" className="flex justify-start">
                <UploadButton />
              </NavLink>
            </div>*/}

            {/* Logout button for med screens */}
            <div className=" hidden md:block">
              <div className="flex justify-end">
                <Logout />
              </div>
            </div>
          </div>

          {/* Logo */}
          {/* <div className="w-full md:block hidden">
            <div
              className="bg-teal-900 p-2 flex justify-end items-end h-36 w-full drop-shadow-xl md:mt-8"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgb(37, 99, 235), 0 2px 4px -1px rgba(0, 80, 222, 0.25)",
              }}
            >
              <img src="/assets/logo.png" alt="" className="w-32" />
            </div>
          </div> */}

          {/* User */}
          <div className="sm:block md:hidden">
            <div className="flex md:justify-center items-center gap-4 md:gap-0 mt-4 md:mt-12">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-14 md:mr-10 rounded-full"
                />
              ) : (
                <img src="/assets/dummy-user.png" className="w-14 md:mr-10" />
              )}
              <h1 className="text-white md:mr-12 dark:text-gray-200">
                {user.name}
              </h1>
            </div>
          </div>

          {/* Logout Button */}
          <div className="sm:block md:hidden">
            <div className="md:ml-12 flex justify-center items-center md:block">
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
