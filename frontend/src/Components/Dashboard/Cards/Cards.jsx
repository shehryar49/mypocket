import { useEffect, useState } from "react";
import AudioCard from "./AudioCard";
import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import FileCard from "./File Cards/FileCard";
import axios from 'axios';

const API_URL = "http://localhost:8000";

const Cards = ({ sortOption, setFiles, files }) => {
  // Dummy files
  const dummyFiles = [
    { name: "video.mp4", type: "video", src: "/assets/dummyVideo.mp4" },
    { name: "image.png", type: "image", src: "https://picsum.photos/200/300" },
    { name: "audio.mp3", type: "audio", src: "/assets/dummyAudio.mp3" },
    { name: "document.pdf", type: "document", src: "document.pdf" },
  ];

  useEffect(() => {
//    setFiles(dummyFiles);
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/recentfiles",config).then((response) => {
      console.log(response.data.files);
      setFiles(response.data.files);
    }).catch((err) => {
      
    });
  }, []);

  const sortedFiles = [...files];

  /* This block of code is sorting the `sortedFiles` array based on the `sortOption` provided. */
  if (sortOption) {
    sortedFiles.sort((a, b) => {
      if (a.type === sortOption && b.type !== sortOption) {
        return -1;
      } else if (a.type !== sortOption && b.type === sortOption) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return (
    <div className="mt-8 md:ml-2 md:mb-20">
      {/* Container for top cards */}
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 w-full">
        <AudioCard />
        <VideoCard />
        <ImageCard />
      </div>

      {/* Container for sorted files */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4 md:mt-10 w-full">
        {sortedFiles.map((file, index) => (
          <FileCard key={index} file={file} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
