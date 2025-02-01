import React, { useEffect, useState } from "react";
import { flushSync } from 'react-dom';
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { useAuth } from "../Context/AuthContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
var rid = 0;
var rootID = 0;
var tmp = 0;
const MyFiles = () => {
  const {fileBrowserRoot,searchedText,setSearchedText} = useAuth();
  const [files,setFiles] = useState([]);
  const [currentPath,setCurrentPath] = useState("");
  const [open, setOpen] = React.useState(false);
  const [shareopen, setshareOpen] = React.useState(false);
  const [filesToShare,setFilesToShare] = React.useState([]);
  const [emails, setEmails] = useState([]);

  const getrootid = async () => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    const response = await axios.get(API_URL+"/rootid",config);
    return response.data.id;
  };

  useEffect(() => {
    if(fileBrowserRoot !== null) {
      rid = fileBrowserRoot;
      rootID = fileBrowserRoot;
      const token = localStorage.getItem("token");
      const config = {headers: {Authorization: `Bearer ${token}`},params: {folderid: fileBrowserRoot.toString()}};
      axios.get(API_URL+"/files",config).then((response) => {
        console.log(response.data.data);
        const filtered = response.data.data.filter((x) => {return x["name"].includes(searchedText)});
        setFiles(filtered);
      });
    }
    else
    {
      getrootid().then((id) => {
          rid = id;
          rootID = id;
          const token = localStorage.getItem("token");
          const config = {headers: {Authorization: `Bearer ${token}`},params: {folderid: id.toString()}};
          axios.get(API_URL+"/files",config).then((response) => {
            const filtered = response.data.data.filter((x) => {return x["name"].includes(searchedText)});
            setFiles(filtered);
          });
        
      });
    }

  },[]);


  const reloadFiles = () => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {folderid: rid}};
    console.log("using rid "+rid.toString()+" to refresh");
    axios.get(API_URL+"/files",config).then((response) => {
      console.log(response.data.data);
      setFiles(response.data.data);
    });
  };
  const uploadFile = () => {
      flushSync(() => {});
      var upload_btn = document.getElementById('upload-file');
      var files = upload_btn.files;
      if(files.length == 1) {
        var file = files[0];
        var formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const config = {headers: {Authorization: `Bearer ${token}`},method: "POST",body: formData};
        var url = new URL(API_URL+"/resource");
        url.searchParams.append('parentrid', rid);
        fetch(url.toString(), config).then((response) => response.json()).then((response) => {
          if('error' in response)
            throw new Error(response.error);
          toast.success("File Uploaded");
          reloadFiles();
        }).catch((error) => {
          toast.error(error.message);
        })

      }
  };
  const deleteFolder = (todelete) => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    var url = new URL(API_URL+"/resource");
    url.searchParams.append('id',todelete);
    axios.delete(url.toString(),config).then(() => {
      toast.success("Folder deleted");
      reloadFiles();
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
  }
  const deleteFile = (todelete) => {

    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    var url = new URL(API_URL+"/resource");
    url.searchParams.append('id',todelete);
    axios.delete(url.toString(),config).then((response) => {
      toast.success("File deleted");    
      reloadFiles();
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
  }
  const sharefiles  = (email,rw) => {
    var writeable = false;
    if(rw === "on")
      writeable = true;
    else
      writeable = false;
    if(filesToShare.length > 1) {
      toast.error("Select one file at a time!");
      setFilesToShare([]);
      return;
    }
    if(filesToShare.length == 0) {
      toast.error("Select a file to share!");
      setFilesToShare([]);
      return;
    }
    const payload = {
      sharedTo: email,
      rid: filesToShare[0].id,
      writeable: writeable
    };
    setFilesToShare([]);  
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},method: "POST",body: JSON.stringify(payload)};
    fetch(API_URL+"/acl",config).then((response) => response.json())
    .then((result) => {
      console.log(result);
      if('error' in result) 
        throw new Error(result.error);
      toast.success("Folder/File shared!");
    }).catch((err) => {
      toast.error(err.message);
    });

  };
  const downloadFile = (id) => {
    const token = localStorage.getItem("token");
    var url = new URL(API_URL+"/decrypted_resource");
    url.searchParams.append("token",token);
    url.searchParams.append("rid",id);
    window.open(url.toString());
  
  };
  const checkDecryption = (id) => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/decryption_status",config).then((res) => {
      var done = response.data.done;
      if(!done)
        setTimeout(function (){ checkDecryption(id); },5000);
      else
      {
        downloadFile(id);
      }  
    });
  };
  const handleAction = React.useCallback((data) => {
    if(data.id == "open_files" && data.payload.files.length == 1 && ('targetFile' in data.payload) && data.payload.targetFile.isDir) {
        const targetFile = data.payload.targetFile;
        const token = localStorage.getItem("token");
        const config = {headers: {Authorization: `Bearer ${token}`},params: {folderid: targetFile.id}};
        rid = targetFile.id;
        axios.get(API_URL+"/files",config).then((response) => {
              setFiles(response.data.data);
        });
    }
    else if(data.id == "open_files" && data.payload.files.length == 1 && ('targetFile' in data.payload) && !data.payload.targetFile.isDir) {
      const targetFile = data.payload.targetFile;
      const token = localStorage.getItem("token");
      const id = targetFile.id;
      const config = {headers: {Authorization: `Bearer ${token}`},params: {'rid': id}};
      axios.get(API_URL+"/decrypt",config).then((response) => {
        toast.success("Your file is being decrypted. Download will begin automatically.");
        setTimeout(function (){ downloadFile(id); },5000);
      }).catch((err) => {
        toast.error(err.message);
      });

    }
    else if(data.id == "upload_files") {
      var upload_btn = document.getElementById('upload-file');
      upload_btn.click();
    }
    else if(data.id == "create_folder") {
      setOpen(true);
    }
    else if(data.id == "delete_files") {
      var files = data.state.selectedFiles; 
      flushSync(() => {});
      for(var i = 0; i < files.length; i++) {
        var file = files[i];
        if(file.isDir)
          deleteFolder(file.id);
        else
          deleteFile(file.id);
      }
    }
    else if(data.id == "share") {
      var files = data.state.selectedFiles;
      const token = localStorage.getItem("token");
      if(files.length != 1) {
        alert("Select one file/folder to share!");
        return;
      }
      var id = files[0].id;
      const config = {headers: {Authorization: `Bearer ${token}`},params: {id: id}};
      axios.get(API_URL+"/acl",config).then((res) => {
        setEmails(res.data.emails);
        tmp = res.data;
      });
      setFilesToShare(files);
      setshareOpen(true);

    }
    else if(data.id == "refresh") {
      flushSync(() => {});
      reloadFiles();
    }
    else if(data.id == "home") {
      rid = rootID;
      reloadFiles();
    }
  
  }, []);
  const shareFile = defineFileAction({
    id: 'share',
    button: {
        name: 'Share',
        toolbar: true,
    },
  } );
  const reloadAction = defineFileAction({
  id: 'refresh',
  button: {
      name: 'Refresh',
      toolbar: true,
  },
  } );
  const homeAction = defineFileAction({
    id: 'home',
    button: {
        name: 'Home',
        toolbar: true,
    },
    } );
  


  const myFileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.DeleteFiles,
    reloadAction,
    homeAction,
    shareFile
  ];



  const handleShareClose = () => {
    setshareOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createFolder = (foldername) => {
    const path = currentPath;
    const token = localStorage.getItem("token");
    if(rid == 0)
      return;
    const config = {headers: {Authorization: `Bearer ${token}`},params: {foldername: foldername,parentid: rid}};
    axios.get(API_URL+"/createfolder",config).then((response) =>{
      toast.success("Folder created");
      reloadFiles();
    }).catch((err) => {
      if(err.response)
        toast.error(err.response.data.error);
      else
        toast.error(err.message);    
    });
  };
  const removeSharedAccess = (index) => {
    const token = localStorage.getItem("token");
    const id = filesToShare[0].id;
    const email = emails[index];
    const config = {headers: {Authorization: `Bearer ${token}`},'method': 'DELETE'};
    var url = new URL(API_URL+"/acl");
    url.searchParams.append("email",email);
    url.searchParams.append("id",id);
    fetch(url.toString(),config).then((response) => response.json()).then((response) =>{
      setEmails(emails.filter(e => email !== e));
    }).catch((error) => {
      console.log(error.message);
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
        open={shareopen}
        onClose={handleShareClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            sharefiles(formJson.email,formJson.rw);
            handleShareClose();

          },
        }}
      >
        <DialogTitle>Share this</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
          />
          <input name="rw" type="checkbox" />
          <label class="ml-2">Write Access</label>
          <List>
          {emails.map((email, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" onClick={() => removeSharedAccess(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={email} />
            </ListItem>
          ))}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
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
