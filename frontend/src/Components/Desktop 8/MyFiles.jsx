import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from "axios";
import { toast } from "sonner";
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';


setChonkyDefaults({ iconComponent: ChonkyIconFA });
import {
  FileBrowser,
  FileContextMenu,
  FileList,
  ChonkyActions,
  FileToolbar,
} from 'chonky';

import { TbArrowBadgeRight } from "react-icons/tb";

const API_URL = "http://localhost:8000";
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
  const [files,setFiles] = useState([]);
  const [folderChain,setFolderChain] = useState([{id: '/root',name: 'root',isDir: true}]);
  const [currentPath,setCurrentPath] = useState("");
  /*const files = [
    { id: 'lht', name: 'Projects', isDir: true },
    {
        id: 'mcd',
        name: 'chonky-sphere-v2.png',
        thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
    },
  ];*/
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {path: '/root'}};
    axios.get(API_URL+"/files",config).then((response) => {
      console.log(response.data.data);
      setFiles(response.data.data);
      setCurrentPath("/root");
    });
  },[]);
  const handlePathChange = (e) => {
    setCurrentPath(e.target.value);
  };
  const reloadFiles = () => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {path: currentPath}};
    axios.get(API_URL+"/files",config).then((response) => {
      console.log(response.data.data);
      setFiles(response.data.data);
    });
  };
  const uploadFile = () => {
      var upload_btn = document.getElementById('upload-file');
      var files = upload_btn.files;
      if(files.length == 1) {
        var file = files[0];
        var path = currentPath;
        var formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const config = {headers: {Authorization: `Bearer ${token}`},method: "POST",body: formData};
        var url = new URL(API_URL+"/upload");
        url.searchParams.append('path', currentPath);
        fetch(url.toString(), config).then(() => {
          toast.success("File Uploaded");
          reloadFiles();
        });

      }
  };
  const deleteFolder = (path) => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    var url = new URL(API_URL+"/folder");
    url.searchParams.append('folder_path',path);
    axios.delete(url.toString(),config).then(() => {
      toast.success("Folder deleted");
      reloadFiles();
    });
  }
  const deleteFile = (path) => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    var url = new URL(API_URL+"/file");
    url.searchParams.append('path',path);
    axios.delete(url.toString(),config).then(() => {
      toast.success("File deleted");
      
      reloadFiles();
    });
  }
  
  const handleAction = React.useCallback((data) => {
    if(data.id == "open_files" && data.payload.files.length == 1 && data.payload.targetFile.isDir) {
        const targetFile = data.payload.targetFile;
        var path = "/";
        path = targetFile.id;
        const token = localStorage.getItem("token");
        const config = {headers: {Authorization: `Bearer ${token}`},params: {path: path}};
        axios.get(API_URL+"/files",config).then((response) => {
            setFiles(response.data.data);
            setCurrentPath(targetFile.id);
        });
    }
    else if(data.id == "open_files" && data.payload.files.length == 1 && !data.payload.targetFile.isDir) {
      const targetFile = data.payload.targetFile;
      toast.success("Your file is being decrypted. Download will begin automatically.");
    }
    else if(data.id == "upload_files") {
      var upload_btn = document.getElementById('upload-file');
      upload_btn.click();
    }
    else if(data.id == "create_folder") {
      setOpen(true);
    }
    else if(data.id == "delete_files") {
      var todelete = data.state.contextMenuTriggerFile.id;
      var files = data.state.selectedFiles; 
      for(var i = 0; i < files.length; i++) {
        var file = files[i];
        if(file.isDir)
          deleteFolder(file.id);
        else
          deleteFile(file.id);
      }
      //console.log(JSON.stringify(files));;
    }
  
  }, []);

  const myFileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.DeleteFiles
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createFolder = (foldername) => {
    const path = currentPath;
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {foldername: foldername,path: path}};
    axios.get(API_URL+"/createfolder",config).then(() => {
      toast.success("Folder created");
      reloadFiles();
    });
  };
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
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const foldername = formJson.foldername;
            createFolder(foldername);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create new folder</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="foldername"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        <input id="upload-file" type="file" hidden="true" onChange={uploadFile}/>
        <div className="flex w-full md-4">
        <input type="text" class="border border-gray-300" placeholder="Path" value={currentPath} onChange={handlePathChange} />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reloadFiles}>Go</button>
        </div><br></br>
<br></br>
        <FileBrowser files={files} onFileAction={handleAction} fileActions={myFileActions}>
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
