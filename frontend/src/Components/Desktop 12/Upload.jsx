import React, { useState } from "react";
import UploadLayout from "./UploadLayout";

const Upload = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [name, setName] = useState(false);
  const [access, setAccess] = useState("onlyYou");
  const [files, setFiles] = useState([]);

  const handleCreate = () => {
    setIsCreate(true);
    setName("");
  };
  return (
    <div>
      <UploadLayout
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        createFolder={createFolder}
        setCreateFolder={setCreateFolder}
        name={name}
        setName={setName}
        handleCreate={handleCreate}
        access={access}
        setAccess={setAccess}
        files={files}
        setFiles={setFiles}
      />
    </div>
  );
};

export default Upload;
