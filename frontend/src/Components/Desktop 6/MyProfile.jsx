import React, { useContext } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { AuthContext } from "../Context/AuthContext";
import PersonalInfo from "./PersonalInfo";
import DashboardHeader from "../Dashboard/DashboardHeader";

const MyProfile = () => {
  const { user,setUser } = useContext(AuthContext);
  return (
    <>
      <style>
        {`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      `}
      </style>

      <div
        className="flex md:flex-row flex-col dark:bg-gray-900 min-h-screen"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col w-full md:ml-64">
          
          {/* Header */}
          <DashboardHeader Heading={"My Profile"} user={user.name} />

          {/* Personal info section */}
          <div>
            <PersonalInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
