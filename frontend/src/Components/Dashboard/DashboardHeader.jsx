import React from "react";
import RectangleIcon from "../Global/RectangleIcon";

const DashboardHeader = ({ Heading, user, display }) => {
  return (
    <div>
      {/* Header */}
      <div className="ml-4 h-12 p-3 flex justify-center gap-4 mt-4 flex-col py-10">
        <h1 className="text-4xl font-medium text-gray-700 dark:text-gray-200">{Heading}</h1>
        <h1 className={`text-md text-gray-800 dark:text-gray-200 font-medium ${display}`}>
          Welcome, {user}
        </h1>
      </div>

      {/* Rectangle icon */}
      <div className="mt-3">
        <RectangleIcon />
      </div>
    </div>
  );
};

export default DashboardHeader;
