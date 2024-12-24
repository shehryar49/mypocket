import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import CircularProgressBar from "./CircularProgressBar";
import FilesStorage from "./FilesStorage";
import RecentFiles from "./RecentFiles";
import TotalStorageProgressBar from "./TotalStorageProgressBar";
import axios from 'axios';

const MyStorage = () => {
  const [storageData, setStorageData] = useState({});
  const [storagePercent, setStoragePercent] = useState(0);
  const [cloudStoragePercent, setCloudStoragePercent] = useState(0);
  const API_URL = "http://localhost:8000";
  // DummyData
  const dummyData = {
    totalStorage: 256, //256GB
    usedStorage: 85, //85GB
    availableStorage: 43, //43GB
    cloudStorage: 2048, //2TB
    usedCloudStorage: 131, //131GB
    filesStorage: [
      { name: "Passwords", type: "password", size: 55, count: 1427 }, //55GB
      { name: "Videos", type: "video", size: 9.9, count: 53 }, //9.9GB
      { name: "Document", type: "document", size: 9, count: 127 }, //9GB
      { name: "Images", type: "image", size: 6.8, count: 1432 }, //6.8GB
      { name: "Audio", type: "audio", size: 3, count: 421 }, //3 GB
    ],
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/storage_info",config).then((response) => {
      const json = response.data;
      dummyData['filesStorage'][0]['count'] = json['passwords'];
      dummyData['filesStorage'][1]['count'] = json['videos'];
      dummyData['filesStorage'][4]['count'] = json['audios'];
      dummyData['filesStorage'][3]['count'] = json['images'];
      dummyData['filesStorage'][2]['count'] = json['documents'];
      dummyData.usedStorage = (json['total_storage']/1024).toFixed(4);
      dummyData.availableStorage = dummyData.totalStorage - dummyData.usedStorage;
      setStorageData(dummyData);
      
    });
  }, []);

  useEffect(() => {
    if (storageData.totalStorage) {
      handleTotalStoragePercent();
    }
  }, [storageData]);

  /**
   * The function calculates the percentage of used storage out of total storage and sets the result in
   * state.
   */
  const handleTotalStoragePercent = () => {
    const percent = (storageData.usedStorage / storageData.totalStorage) * 100;
    setStoragePercent(Math.round(percent));
  };

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
          <DashboardHeader Heading={"My Storage"} display={"opacity-0"} />

          {/* Storage */}
          <div className="flex flex-col md:flex-row justify-between h-auto md:h-64 ">
            {/* Internal and cloud storage */}
            <div className="flex flex-col gap-4 p-4 flex-grow max-w-lg justify-center">
              {/* Internal storage */}
              <div className="flex items-center border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-xl h-24">
                <CircularProgressBar
                  handleTotalStoragePercent={storagePercent}
                />

                {/* Internal storage Data used */}
                <div className="flex flex-col gap-2 ml-2">
                  <h1 className="md:text-xs lg:text-sm text-sm font-normal text-gray-500 dark:text-gray-300">
                    Internal Storage
                  </h1>
                  <p className="md:text-xs lg:text-sm text-sm font-semibold dark:text-gray-200">
                    {storageData.usedStorage} GB of {storageData.totalStorage}{" "}
                    GB used
                  </p>

                </div>
              </div>

            </div>

            {/* Files and complete Storage */}
            <div className="flex flex-col items-center mt-6 md:mt-0 p-4">
              {/* Files Storage */}

              <FilesStorage storageData={storageData.filesStorage} />
            </div>
          </div>
 
        </div>
      </div>
    </>
  );
};

export default MyStorage;
