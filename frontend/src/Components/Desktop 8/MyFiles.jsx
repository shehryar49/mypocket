import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import FileCard from "./FileCard";
import RecentFiles from "./RecentFiles/RecentFiles";
import SearchResults from "./Search Bar/SearchResults";
import axios from "axios";

const MyFiles = () => {
  const [filesData, setFilesData] = useState([]);
  const [shared_Users, setShared_Users] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  // dummyData
  const API_URL = "http://localhost:8000";
  const dummyData = [
    {
      name: "Document",
      type: "document",
      insideFiles: 300,
      files: [
        {
          name: "Report.docx",
          sharedUsers: ["Anas"],
          fileSize: "1 MB",
          lastModified: "2024-08-09",
        },
        {
          name: "Ux-Ui.zip",
          sharedUsers: ["Anila", "Ali", "Zain"],
          fileSize: "4 MB",
          lastModified: "2024-09-01",
        },
      ],
    },
    {
      name: "Audio",
      type: "audio",
      insideFiles: 400,
      files: [
        {
          name: "Birds chirping.mp3",
          sharedUsers: ["Anas"],
          fileSize: "1 MB",
          lastModified: "2024-08-10",
        },
        {
          name: "voice recording.mp3",
          sharedUsers: ["Anila", "Ali", "Zain", "Hassan"],
          fileSize: "4 MB",
          lastModified: "2024-09-01",
        },
      ],
    },
    {
      name: "Videos",
      type: "video",
      insideFiles: 20,
      files: [
        {
          name: "The Notebook.mp4",
          sharedUsers: ["Anas"],
          fileSize: "1 GB",
          lastModified: "2024-08-10",
        },
        {
          name: "Mr.Beast.mp4",
          sharedUsers: ["Anila", "Ali", "Zain"],
          fileSize: "4 MB",
          lastModified: "2024-09-01",
        },
      ],
    },
    {
      name: "Images",
      type: "image",
      insideFiles: 100,
      files: [
        {
          name: "Website Design.png",
          sharedUsers: ["Asad", "Ali", "Usman"],
          fileSize: "0.5 MB",
          lastModified: "2024-09-04",
        },
        {
          name: "profile.png",
          sharedUsers: ["Anila", "Ali", "Zain"],
          fileSize: "1 MB",
          lastModified: "2024-09-01",
        },
      ],
    }
  ];

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/files",config).then((response) => {
      setFilesData(response.data.data);
      //console.log(response.data.data);
      //console.log(dummyData);
    });
    //setFilesData(dummyData);
    /* This block of code is iterating over the `dummyData` array, which contains different types of
   files with shared user information. It is extracting all unique shared users from the files data
   and storing them in the `allSharedUsers` array. */
    const allSharedUsers = [];
    dummyData.forEach((type) => {
      type.files.forEach((file) => {
        file.sharedUsers.forEach((user) => {
          if (!allSharedUsers.some((u) => u === user)) {
            allSharedUsers.push(user);
          }
        });
      });
    });
    setShared_Users(allSharedUsers);
  }, []);

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

        <div className="flex flex-col w-full md:ml-64">
          {/* Heading */}
          <DashboardHeader Heading={"My Files"} display={"opacity-0"} />

          {/* SearchBar */}
          <SearchResults
            filteredSearch={filteredSearch}
            setFilteredSearch={setFilteredSearch}
            filesData={filesData}
          />

          {/* Heading for cards */}
          <div className="flex  md:block">
            <h1 className="text-2xl mt-6 mb-1 ml-6 dark:text-gray-200">All Files</h1>
          </div>

          {/* File Cards */}
          <div className="grid grid-cols-1 mt-1">
            {/* First three cards */}
            <div className="flex flex-wrap xl:flex-nowrap justify-center">
              {filesData.slice(0, 3).map((fileTypeData) => (
                <div
                  key={fileTypeData.type}
                  className="flex justify-center mx-2 mb-2"
                >
                  <FileCard
                    sharedUsers={shared_Users}
                    insideFiles={fileTypeData.insideFiles}
                    fileType={fileTypeData.type}
                    name={fileTypeData.name}
                    filesData={filesData}
                    className="transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Last two cards */}
            <div className="flex flex-wrap xl:flex-nowrap justify-center lg:mt-4 gap-2">
              {filesData.slice(3, 5).map((fileTypeData, index) => (
                <div
                  key={fileTypeData.type}
                  className="flex justify-center lg:mx-12"
                >
                  <FileCard
                    sharedUsers={shared_Users}
                    insideFiles={fileTypeData.insideFiles}
                    fileType={fileTypeData.type}
                    name={fileTypeData.name}
                    filesData={filesData}
                    className="transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <RecentFiles filesData={filesData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFiles;
