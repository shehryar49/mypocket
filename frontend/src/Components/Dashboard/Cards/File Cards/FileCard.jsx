import React from "react";
import AudioFileCard from "./AudioFileCard";
import VideoFileCard from "./VideoFileCard";
import ImageFileCard from "./ImageFileCard";
import DocumentFileCard from "./DocumentFileCard";

const FileCard = ({ file }) => {
  const renderCardContent = () => {
    //if (file.type === "audio") {
    //  return <AudioFileCard file={file} />;
    //} else if (file.type === "video") {
    //  return <VideoFileCard file={file} />;
    //} else if (file.type === "image") {
    //  return <ImageFileCard />;
    //} else {
      return <DocumentFileCard file={file} />;
    //}
  };

  return <div>{renderCardContent()}</div>;
};

export default FileCard;
