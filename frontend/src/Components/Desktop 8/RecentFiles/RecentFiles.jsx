import { useState } from "react";
import RecentFilesLayout from "./RecentFilesLayout";
import { FaFolder, FaImage, FaVideo } from "react-icons/fa";
import { FaFileShield } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";

const RecentFiles = ({ filesData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "lastModified",
    direction: "descending",
  });

  const maxVisibleUsers = 3;

  /**
   * The function `handleSortConfig` toggles the sorting direction between ascending and descending based
   * on the column key.
   */
  const handleSortConfig = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  /**
   * The `parseFileSize` function converts file size values from different units (GB, MB, KB, Bytes) to
   * Bytes.
   * @returns The `parseFileSize` function takes a string representing a file size in different units
   * (GB, MB, KB, Bytes) and converts it to bytes. The function splits the input string into the
   * numerical value and the unit, then calculates the file size in bytes based on the unit. The
   * function returns the file size in bytes as a number.
   */
  const parseFileSize = (fileSize) => {
    const [value, unit] = fileSize.split(" ");
    const numberValue = parseFloat(value);

    switch (unit) {
      case "GB":
        return numberValue * 1024 * 1024 * 1024;
      case "MB":
        return numberValue * 1024 * 1024;
      case "KB":
        return numberValue * 1024;
      case "Bytes":
        return numberValue;
      default:
        return 0;
    }
  };

  /**
   * The `renderFilesIcon` function takes a file type as input and returns a corresponding icon element
   * based on the file type.
   * @returns The `renderFilesIcon` function returns a JSX element based on the type of file passed as
   * an argument. If the file is "image", it returns a div element with orange background color. If the
   * file is "video", it returns a div element with purple background color. If the file is "audio", it
   * returns a div element with red background color. If the file is "password",
   */
  const renderFilesIcon = (file) => {
    if (file === "image") {
      return (
        <div>
          <FaImage className="text-orange-500 bg-yellow-100 dark:text-orange-600 dark:bg-yellow-300 w-3 h-4 md:p-2  md:w-8 md:h-8 rounded-lg" />
        </div>
      );
    } else if (file === "video") {
      return (
        <div>
          <FaVideo className="text-green-600 dark:text-green-700 dark:bg-green-300 bg-green-100  w-3 h-4 md:p-2  md:w-8 md:h-8 rounded-lg" />
        </div>
      );
    } else if (file === "audio") {
      return (
        <div>
          <MdAudiotrack className="text-red-500 bg-red-100 dark:text-red-700 dark:bg-red-300  w-3 h-4 md:p-2  md:w-8 md:h-8 rounded-lg" />
        </div>
      );
    } else if (file === "password") {
      return (
        <div>
          <FaFileShield className="text-blue-600 dark:text-blue-700 dark:bg-sky-300 bg-sky-100  w-3 h-4 md:p-2  md:w-8 md:h-8 rounded-lg" />
        </div>
      );
    } else {
      return (
        <div>
          <FaFolder className="text-blue-600 bg-sky-100 dark:text-blue-700 dark:bg-sky-300 w-3 h-4 md:p-2  md:w-8 md:h-8 rounded-lg" />
        </div>
      );
    }
  };

  const getSortedFiles = () => {
    const allFiles = [];
    /* The code snippet `filesData.forEach((type)=>{ type.files.forEach((file)=>{
    allFiles.push({...file,fileType:type.type}) }) })` is iterating over an array of objects called
    `filesData`. For each object in `filesData`, it is accessing the `files` property which is an array
    of files. */

    filesData.forEach((type) => {
      type.files.forEach((file) => {
        allFiles.push({ ...file, fileType: type.type });
      });
    });
    /* This code block is responsible for sorting the files based on the sorting configuration defined in
     the `sortConfig` state. Here's a breakdown of what each part does: */
    return allFiles.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortConfig.key === "fileSize") {
        return sortConfig.direction === "ascending"
          ? parseFileSize(a.fileSize) - parseFileSize(b.fileSize)
          : parseFileSize(b.fileSize) - parseFileSize(a.fileSize);
      } else if (sortConfig.key === "sharedUsers") {
        return sortConfig.direction === "ascending"
          ? a.sharedUsers.length - b.sharedUsers.length
          : b.sharedUsers.length - a.sharedUsers.length;
      } else if (sortConfig.key === "lastModified") {
        return sortConfig.direction === "ascending"
          ? new Date(a.lastModified) - new Date(b.lastModified)
          : new Date(b.lastModified) - new Date(a.lastModified);
      }
    });
  };

  const sortedFiles = getSortedFiles();

  return (
    <div>
      <RecentFilesLayout
        maxVisibleUsers={maxVisibleUsers}
        renderFilesIcon={renderFilesIcon}
        handleSortConfig={handleSortConfig}
        sortedFiles={sortedFiles}
      />
    </div>
  );
};

export default RecentFiles;
