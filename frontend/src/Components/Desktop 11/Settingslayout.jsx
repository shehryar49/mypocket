import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import EditInfo from "./Edit Information/EditInfo";
import ChangePassword from "./Change Password/ChangePassword";
import Security from "./Security/Security";

const Settingslayout = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <style>
        {`
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    `}
      </style>

      <div
        className="flex flex-col md:flex-row dark:bg-gray-900 min-h-screen"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col w-full md:ml-64">
          <DashboardHeader Heading={"Settings"} display={"opacity-0"} />

          {/* Tabs for settings */}
          <div className="md:ml-4 mt-4 flex items-center justify-center md:justify-normal">
            <ul className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 p-1  w-[290px] text-slate-600 font-medium text-sm rounded-lg">
              <li
                onClick={() => setActiveTab("editInfo")}
                className={` ${
                  activeTab === "editInfo"
                    ? "bg-white dark:bg-gray-200 dark:text-gray-800 text-black dark:shadow-sm dark:shadow-slate-400 shadow-md"
                    : "hover:bg-white dark:hover:bg-gray-200 dark:hover:text-gray-800 hover:text-black"
                } cursor-pointer rounded-md p-1  transition-all`}
              >
                Edit Info
              </li>
              <li
                onClick={() => setActiveTab("changePassword")}
                className={` ${
                  activeTab === "changePassword"
                    ? "bg-white text-black shadow-md dark:bg-gray-200 dark:text-gray-800"
                    : "hover:bg-white hover:text-black dark:hover:bg-gray-200 dark:hover:text-gray-800"
                } cursor-pointer rounded-md p-1  transition-all`}
              >
                Change Password
              </li>
              <li
                onClick={() => setActiveTab("security")}
                className={` ${
                  activeTab === "security"
                    ? "bg-white text-black shadow-md dark:shadow-sm dark:shadow-slate-400 dark:bg-gray-200 dark:text-gray-800"
                    : "hover:bg-white hover:text-black dark:hover:bg-gray-200 dark:hover:text-gray-800"
                } cursor-pointer rounded-md p-1  transition-all`}
              >
                Security
              </li>
            </ul>
          </div>
          <div>
            {activeTab === "editInfo" && <EditInfo />}
            {activeTab === "changePassword" && <ChangePassword />}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settingslayout;
