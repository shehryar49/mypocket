import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import Files from "./Files/Files";
import SearchResults from "./Search Bar/SearchResults";
import FilterButton from "./Header/FilterButton";

const SharedFilesLayout = ({
  sharedFilesData,
  setFilteredSearch,
  filteredSearch,
  filteredFiles,
  handleFilterChange,
  handleAddFile,
  filePermission,
  setFilePermission,
  fileInputRef
}) => {
  return (
    <>
      <style>
        {`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      `}
      </style>

      <div
        className="flex flex-col md:flex-row dark:bg-gray-900"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col w-full md:ml-64">
          <DashboardHeader Heading={"Shared Files"} display={"opacity-0"} />

          {/* Search Bar */}
          <SearchResults
            sharedFilesData={sharedFilesData}
            filteredSearch={filteredSearch}
            setFilteredSearch={setFilteredSearch}
          />

          {/* Header */}
          <FilterButton
            sharedFilesData={sharedFilesData}
            filteredFiles={filteredFiles}
            handleFilterChange={handleFilterChange}
            handleAddFile={handleAddFile}
            filePermission={filePermission}
            setFilePermission={setFilePermission}
            fileInputRef={fileInputRef}
          />

          {/* Shared Files List*/}
          <Files sharedFilesData={filteredFiles} />
        </div>
      </div>
    </>
  );
};

export default SharedFilesLayout;
