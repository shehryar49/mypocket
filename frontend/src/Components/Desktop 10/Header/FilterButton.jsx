import React, { useState } from "react";
import HeaderButtonsLayout from "./HeaderButtonsLayout";

const FilterButton = ({
  sharedFilesData,
  handleFilterChange,
  filteredFiles,
  handleAddFile,
  filePermission,
  setFilePermission,
  fileInputRef,
}) => {
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterVisibility = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const fileTypes = ["All", "Image", "Video", "Audio", "Document", "Archive"];

  const handleFilterClick = (fileType) => {
    setSelectedFileType(fileType);
    handleFilterChange(fileType.toLowerCase());
    setIsFilterOpen(false);
  };
  return (
    <div>
      <HeaderButtonsLayout
        sharedFilesData={sharedFilesData}
        handleFilterVisibility={handleFilterVisibility}
        isFilterOpen={isFilterOpen}
        fileTypes={fileTypes}
        handleFilterChange={handleFilterClick}
        filteredFiles={filteredFiles}
        handleAddFile={handleAddFile}
        setFilePermission={setFilePermission}
        filePermission={filePermission}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default FilterButton;
