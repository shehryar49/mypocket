import React, { useEffect, useRef, useState } from "react";
import SharedFilesLayout from "./SharedFilesLayout";
import { toast } from "sonner";

const SharedFiles = () => {
  const [sharedFilesData, setSharedFilesData] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [filePermission, setFilePermission] = useState("Permission");
  const fileInputRef = useRef(null);

  // Dummy Data
  const dummyData = [
    {
      name: "Boruto Vol 10.pdf",
      type: "document",
      size: "30 MB",
      lastModified: "2025/12/16",
      permission: "Editor",
    },
    {
      name: "Kashmir.png",
      type: "image",
      size: "4 MB",
      lastModified: "2023/09/11",
      permission: "Editor",
    },
    {
      name: "Marriage.mp4",
      type: "video",
      size: "100 MB",
      lastModified: "2024/09/16",
      permission: "View Only",
    },
    {
      name: "Naran.jpg",
      type: "image",
      size: "2 MB",
      lastModified: "2025/01/11",
      permission: "View Only",
    },
    {
      name: "Readme.txt",
      type: "document",
      size: "10 KB",
      lastModified: "2025/02/09",
      permission: "View Only",
    },
    {
      name: "React Component.jsx",
      type: "document",
      size: "20 MB",
      lastModified: "2024/01/01",
      permission: "Administrator",
    },
    {
      name: "Invoice Dec 23.doc",
      type: "document",
      size: "44 GB",
      lastModified: "2025/08/16",
      permission: "View Only",
    },
    {
      name: "Screenshot 22.jpg",
      type: "image",
      size: "798 TB",
      lastModified: "2025/08/16",
      permission: "Editor",
    },
    {
      name: "Cheat Codez.txt",
      type: "document",
      size: "889 KB",
      lastModified: "2025/08/16",
      permission: "Editor",
    },
    {
      name: "Landing Page.html",
      type: "document",
      size: "187 KB",
      lastModified: "2025/08/16",
      permission: "Administrator",
    },
    {
      name: "Website Styles.css",
      type: "document",
      size: "1.25 TB",
      lastModified: "2025/08/16",
      permission: "Editor",
    },
    {
      name: "Project Plan.ppt",
      type: "document",
      size: "35 MB",
      lastModified: "2024/10/05",
      permission: "Editor",
    },
    {
      name: "Vacation Photo Album.zip",
      type: "archive",
      size: "500 MB",
      lastModified: "2023/12/22",
      permission: "View Only",
    },
    {
      name: "Bleach Eps 05.mp4",
      type: "video",
      size: "250 MB",
      lastModified: "2023/06/18",
      permission: "View Only",
    },
    {
      name: "Classical Music.mp3",
      type: "audio",
      size: "5 MB",
      lastModified: "2023/07/09",
      permission: "View Only",
    },
  ];

  useEffect(() => {
    setSharedFilesData(dummyData);
    setFilteredFiles(dummyData);
  }, []);

  /**
   * The function `handleFilterChange` filters files based on their type.
   */
  const handleFilterChange = (fileType) => {
    if (fileType === "all") {
      setFilteredFiles(sharedFilesData);
    } else {
      setFilteredFiles(
        sharedFilesData.filter((file) => file.type === fileType)
      );
    }
  };

  /**
   * The function `formatFileSize` converts a file size in bytes to a human-readable format with
   * appropriate units (Bytes, KB, MB, GB, TB).
   * @returns The function `formatFileSize` takes a file size in bytes as input and converts it to a
   * human-readable format (e.g., KB, MB, GB, TB) based on the size. The function returns a string with
   * the converted size and the corresponding unit.
   */
  const formatFileSize = (size) => {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    let i = 0;

    while (size >= 1024 && i < sizes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${sizes[i]}`;
  };

  /**
   * The `formatDate` function takes a date object as input and returns a formatted date string in the
   * format "YYYY/MM/DD".
   * @returns The `formatDate` function returns a formatted date string in the format "YYYY/MM/DD".
   */
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);

    return `${year}/${month}/${day}`;
  };

  /**
   * The function `handleAddFile` takes an event object, extracts file information, categorizes the
   * file type, formats file size and last modified date, sets file permissions, and updates the shared
   * and filtered files data accordingly.
   */
  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        type: file.type.includes("image")
          ? "image"
          : file.type.includes("audio")
          ? "audio"
          : file.type.includes("video")
          ? "video"
          : file.type.includes("pdf") ||
            file.type.includes("docx") ||
            file.type.includes("doc")
          ? "document"
          : file.type.includes("zip")
          ? "archive"
          : "document",
        size: formatFileSize(file.size),
        lastModified: formatDate(new Date(file.lastModified)),
        permission:
          filePermission === "Permission" ? "View Only" : filePermission,
      };
      setSharedFilesData((prevFiles) => [...prevFiles, newFile]);
      setFilteredFiles((prevFiles) => [...prevFiles, newFile]);
      fileInputRef.current.value = "";
      setFilePermission("Permission");
      toast.success(`${newFile.name} has been uploaded.`);
    }
  };

  return (
    <div>
      <SharedFilesLayout
        handleFilterChange={handleFilterChange}
        sharedFilesData={sharedFilesData}
        setFilteredSearch={setFilteredSearch}
        filteredFiles={filteredFiles}
        filteredSearch={filteredSearch}
        handleAddFile={handleAddFile}
        filePermission={filePermission}
        setFilePermission={setFilePermission}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};
export default SharedFiles;
