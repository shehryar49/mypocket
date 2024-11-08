import React, { useState } from "react";
import Fileslayout from "./Fileslayout";
import { TiFolderOpen } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import {
  FaRegFileAudio,
  FaRegFileVideo,
  FaRegFileZipper,
} from "react-icons/fa6";

const Files = ({ sharedFilesData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "lastModified",
    direction: "descending",
  });

  /**
   * The function `handleSortConfig` updates the sorting configuration based on the column key provided.
   */
  const handleSortConfig = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  /**
   * The function `getSortedFiles` sorts an array of files based on the specified sorting configuration.
   * @returns The `getSortedFiles` function is returning the `sharedFilesData` array sorted based on the
   * `sortConfig` object. The sorting is done based on the `key` and `direction` properties of the
   * `sortConfig` object. The sorting logic differs based on the `key` value - "name", "lastModified",
   * or "permission". The files are sorted either in ascending or
   */
  const getSortedFiles = () => {
    return sharedFilesData.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortConfig.key === "lastModified") {
        return sortConfig.direction === "ascending"
          ? new Date(a.lastModified) - new Date(b.lastModified)
          : new Date(b.lastModified) - new Date(a.lastModified);
      } else if (sortConfig.key === "permission") {
        return sortConfig.direction === "ascending"
          ? a.permission.localeCompare(b.permission)
          : b.permission.localeCompare(a.permission);
      }
    });
  };

  const sortedFiles = getSortedFiles();

  /**
   * The function `renderFileIcon` takes a file type as input and returns a corresponding icon component
   * based on the file type.
   * @returns The `renderFileIcon` function returns a JSX element based on the type of file passed as an
   * argument. If the file type is "image", it returns a div with an image icon. If the file type is
   * "video", it returns a div with a video icon. If the file type is "audio", it returns a div with an
   * audio icon. If the file type is "archive
   */
  const renderFileIcon = (file) => {
    if (file === "image") {
      return (
        <div className="size-8 flex items-center justify-center rounded-full dark:bg-amber-300 bg-amber-50">
          <CiImageOn className="text-amber-600 text-lg dark:text-amber-900" />
        </div>
      );
    } else if (file === "video") {
      return (
        <div className="size-8 flex items-center justify-center rounded-full dark:bg-green-300 bg-green-50">
          <FaRegFileVideo className="text-green-500 dark:text-green-800 text-lg" />
        </div>
      );
    } else if (file === "audio") {
      return (
        <div className="flex size-8 items-center justify-center rounded-full dark:bg-red-300 bg-red-50">
          <FaRegFileAudio className="text-red-500 dark:text-red-700 text-lg" />
        </div>
      );
    } else if (file === "archive") {
      return (
        <div className="size-8 flex items-center justify-center bg-indigo-50 dark:bg-indigo-300 rounded-full">
          <FaRegFileZipper className="text-indigo-600 dark:text-indigo-800 text-lg" />
        </div>
      );
    } else {
      return (
        <div className="size-8 flex items-center justify-center bg-indigo-50 dark:bg-indigo-300 rounded-full">
          <TiFolderOpen className="text-indigo-600 dark:text-indigo-800 text-lg" />
        </div>
      );
    }
  };

  /**
   * The function `renderPermissionColor` takes a file permission as input and returns a colored badge
   * based on the permission level.
   * @returns The `renderPermissionColor` function returns a JSX element based on the `file` parameter
   * provided. If the `file` is "Editor", it returns a green-colored rounded div with the text "Editor".
   * If the `file` is "View Only", it returns a slate-colored rounded div with the text "View Only". If
   * the `file` is "Administrator", it returns a red-colored
   */
  const renderPermissionColor = (file) => {
    if (file === "Editor") {
      return (
        <div className="w-[51px] h-6 rounded-full bg-green-50 dark:bg-green-300 flex items-center justify-center">
          <h1 className="text-xs font-semibold text-green-500 dark:text-green-700">
            {file}
          </h1>
        </div>
      );
    } else if (file === "View Only") {
      return (
        <div className="w-[74px] h-6 rounded-full bg-slate-50 dark:bg-slate-300 flex items-center justify-center">
          <h1 className="text-xs font-semibold text-slate-500 dark:text-slate-700">
            {file}
          </h1>
        </div>
      );
    } else if (file === "Administrator") {
      return (
        <div className="w-[95px] h-6 rounded-full bg-red-50 dark:bg-red-300 flex items-center justify-center">
          <h1 className="text-xs font-semibold text-red-500 dark:text-red-700">
            {file}
          </h1>
        </div>
      );
    }
  };

  return (
    <div>
      <Fileslayout
        renderFileIcon={renderFileIcon}
        renderPermissionColor={renderPermissionColor}
        sortedFiles={sortedFiles}
        handleSortConfig={handleSortConfig}
      />
    </div>
  );
};

export default Files;
