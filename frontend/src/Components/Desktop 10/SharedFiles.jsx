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
  defineFileAction
} from 'chonky';

import { TbArrowBadgeRight } from "react-icons/tb";

const API_URL = "http://localhost:8000";
const SharedFiles = () => {
    const [files,setFiles] = useState([]);
  const [currentPath,setCurrentPath] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {path: '/root'}};
    axios.get(API_URL+"/sharedfiles",config).then((response) => {
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
    if(data.id == "open_files" && data.payload.files.length == 1 && ('targetFile' in data.payload) && data.payload.targetFile.isDir) {
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
    else if(data.id == "open_files" && data.payload.files.length == 1 && ('targetFile' in data.payload) && !data.payload.targetFile.isDir) {
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
    }
  
  }, []);
  const shareFile = defineFileAction({
    id: 'share',
    button: {
        name: 'Share',
        toolbar: true,
    },
} );
  const myFileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.DeleteFiles,
    shareFile
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
export default SharedFiles;
