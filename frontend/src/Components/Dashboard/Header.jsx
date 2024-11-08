import React, { useContext, useState } from "react";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import SearchBar from "./Search bar/SearchBar";
import { AuthContext } from "../Context/AuthContext";

const Header = ({ files }) => {
  const { isDarkMode } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleNotificationIcon = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive);
  };

  return (
    <>
      <style>
        {`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    `}
      </style>
      <div
        className="relative border-b h-12 p-3 flex items-center  border-b-gray-300 dark:bg-gray-800 dark:border-b-gray-800 py-10"
        style={{ fontFamily: "Poppins" }}
      >
        {/* SearchBar */}
        <div className="flex-grow">
          <SearchBar files={files} />
        </div>

        {/* Notifications */}
        <div className="flex items-center ml-auto gap-4 mx-auto md:mr-5 ">
          {isDarkMode ? (
            <IoNotificationsOutline
              onClick={handleNotificationIcon}
              className={`text-xl hover:text-yellow-500 cursor-pointer ${
                isActive && "text-yellow-500"
              } text-gray-400`}
            />
          ) : (
            <IoNotifications
              onClick={handleNotificationIcon}
              className={`text-xl hover:text-yellow-500 cursor-pointer dark:text-gray-500 ${
                isActive && "text-yellow-500"
              } dark:hover:text-yellow-500`}
            />
          )}
        </div>

        {/* Notification dropdown */}
        {isOpen && (
          <div className="relative">
            {/* Caret with border */}
            <div
              className="absolute md:right-5 md:top-5 w-5 right-0 top-5  border-l-8 border-r-8 border-b-8 border-transparent 
               dark:border-b-gray-700 border-b-blue-400 "
            ></div>

            {/* Dropdown menu */}
            <div className="dark:bg-gray-700 bg-sky-100 border-2 dark:border-0 border-blue-400 min-h-80 md:w-80 w-60 absolute md:top-7 top-7 z-20 md:right-2 -right-2 rounded-lg dark:border-gray-500 dark:border-b dark:border-l dark:border-r">
              <div className="p-4 dark:text-gray-200">
                {/* Notification content */}
                <p className="font-semibold">No new notifications</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
