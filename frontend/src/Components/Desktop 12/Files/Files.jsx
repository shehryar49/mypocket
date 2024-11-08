import React, { useState } from "react";
import Fileslayout from "./FilesLayout";

const Files = ({ access, files, setFiles }) => {
  const [fileAddedd, setFileAdded] = useState(false);
  return (
    <div>
      <Fileslayout
        files={files}
        setFiles={setFiles}
        access={access}
        fileAdded={fileAddedd}
        setFileAdded={setFileAdded}
      />
    </div>
  );
};

export default Files;
