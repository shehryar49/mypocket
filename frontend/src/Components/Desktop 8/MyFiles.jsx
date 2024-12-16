import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import FileCard from "./FileCard";
import RecentFiles from "./RecentFiles/RecentFiles";
import SearchResults from "./Search Bar/SearchResults";
import axios from "axios";
import  {
  FileBrowser,
  FileNavbar,
  FileToolbar,
  FileList,
  FileContextMenu,
  IconFA
} from '@codetez/react-file-manager-ctz'

const MyFiles = () => {
  /*const [filesData, setFilesData] = useState([]);
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
   and storing them in the `allSharedUsers` array. 
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
        {/* Sidebar }
        <Sidebar />

        <div className="flex flex-col w-full md:ml-64">
          {/* Heading }
          <DashboardHeader Heading={"My Files"} display={"opacity-0"} />

          {/* SearchBar }
          <SearchResults
            filteredSearch={filteredSearch}
            setFilteredSearch={setFilteredSearch}
            filesData={filesData}
          />

          {/* Heading for cards }
          <div className="flex  md:block">
            <h1 className="text-2xl mt-6 mb-1 ml-6 dark:text-gray-200">All Files</h1>
          </div>

          {/* File Cards }
          <div className="grid grid-cols-1 mt-1">
            {/* First three cards }
            <div className="flex flex-wrap xl:flex-nowrap justify-center">
              {filesData.slice(0, 3).map((fileTypeData) => (
                <div
                  key={fileTypeData.type}
                  className="flex justify-center mx-2 mb-2"
                >
                  <FileCard
                    sharedUsers={shared_Users}
                    insideFiles={fileTypeData.files.length}
                    fileType={fileTypeData.type}
                    name={"Gay"}
                    filesData={filesData}
                    className="transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Last two cards }
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

          {/* Recent Files }
          <div>
            <RecentFiles filesData={filesData} />
          </div>
        </div>
      </div>
    </>
  );*/
  const files = [
    {
        "isDir": true,
        id: "my-folder-id",
        size: "412032",
        name: 'my-folder',
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
    },
    {
        "isDir": true,
        id: "my-cabinet-id",
        size: "412032",
        name: 'my-cabintet',
        parentId: null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
    },
    {
        "isDir": true,
        id: "my-large-name-folder-id",
        size: "412032",
        name: 'my-large-name-folder-some-long-text-folder-name-with-extra-long',
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
    },
    {
        "isDir": false,
        "id": "6c96178b-caab-49f1-ab78-71b2bdd35df9",
        "name": "document.pdf",
        "fileName": "document-1721135342550.pdf",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "pdf",
        "size": "412032",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-16T13:09:02.816Z",
        "updatedAt": "2024-07-16T13:09:02.816Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-16T13:09:02.816Z"
    },
    {
        "isDir": false,
        "id": "f16c25af-7ad7-47a4-9059-420d84f0a9d9",
        "name": "sample.pdf",
        "fileName": "sample-1721302064130.pdf",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "pdf",
        "size": "4293938",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-18T11:27:45.531Z",
        "updatedAt": "2024-07-18T11:27:45.531Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-18T11:27:45.531Z"
    },
    {
        isDir: false,
        name: 'My test file name with large text in it with some extra text.txt',
        id: 'my-large-text-id',
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-18T11:27:45.531Z"
    },
    {
        "isDir": false,
        "id": "f0c51e56-0644-4d1e-9027-372c120501e3",
        "name": "IMG_20240715_102701.jpg",
        "fileName": "img_20240715_102701-1721366694102.jpg",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "jpg",
        "size": "2055155",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-19T05:24:54.897Z",
        "updatedAt": "2024-07-19T05:24:54.897Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-19T05:24:54.897Z"
    },
    {
        "isDir": false,
        "id": "9b6f1439-c9f6-463c-b249-839dd122b6ee",
        "name": "sample-checker.xlsx",
        "fileName": "sample-checker-1721658285985.xlsx",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "xlsx",
        "size": "8673",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-22T14:24:45.995Z",
        "updatedAt": "2024-07-22T14:24:45.995Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-22T14:24:45.995Z"
    },
    {
        "isDir": false,
        "id": "cb1760a2-eb5a-4563-8503-de7eca116bad",
        "name": "file_example_XLS_50.xls",
        "fileName": "file_example_xls_50-1721658842139.xls",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "xls",
        "size": "13824",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-22T14:34:02.149Z",
        "updatedAt": "2024-07-22T14:34:02.149Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-22T14:34:02.149Z"
    },
    {
        "isDir": false,
        "id": "9c38dedc-e53f-467e-8b51-d123d7a4e675",
        "name": "file_example_XLSX_100.xlsx",
        "fileName": "file_example_xlsx_100-1721659053462.xlsx",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "xlsx",
        "size": "9299",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-22T14:37:33.474Z",
        "updatedAt": "2024-07-22T14:37:33.474Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-22T14:37:33.474Z"
    },
    {
        "isDir": false,
        "id": "59e9d4fb-abb1-4033-9938-adc6dc4b537b",
        "name": "file_example_XLSX_1000.xlsx",
        "fileName": "file_example_xlsx_1000-1721659081824.xlsx",
        "filePath": "/public/uploads/codetez",
        "slug": null,
        "folderId": "a4ef0816-7628-4746-a6a7-84b3c37da851",
        "metadataId": null,
        "ext": "xlsx",
        "size": "42669",
        "versionNumber": null,
        "keyword": null,
        "note": null,
        "description": null,
        "remarks": null,
        "status": 1,
        "createdBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "updatedBy": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
        "createdAt": "2024-07-22T14:38:01.842Z",
        "updatedAt": "2024-07-22T14:38:01.842Z",
        "deletedAt": null,
        "updatedUser": {
            "id": "da0a005f-44d1-4bf8-98b3-fbd2db76d761",
            "userName": "CannyMinds",
            "firstName": "Christopher",
            "lastName": "CannyMinds"
        },
        "modDate": "2024-07-22T14:38:01.842Z"
    }
  ];
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
      {/*main content*/}
      <div className="flex flex-col w-full md:ml-64">
      <FileBrowser iconComponent={IconFA} files={files}>
          <FileNavbar />
          <FileToolbar />
          <FileList />
          <FileContextMenu />
      </FileBrowser>
      </div>
    </div>
  </>
  );
};

export default MyFiles;
