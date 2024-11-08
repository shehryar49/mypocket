import React, { useRef, useState } from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoFileCard = ({ file }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * The function `handleVideoPlay` toggles the play and pause state of an Video element in a React
   * component.
   */
  const handleVideoPlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * The function `handleVideoMute` toggles the mute state of an Video element and updates the state
   * accordingly.
   */
  const handleVideoMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  /**
   * The handleProgress function calculates the progress of an Video element and updates the progress
   * state accordingly.
   */
  const handleProgress = () => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  /**
   * The function `handleVideoEnded` sets the state variable `isPlaying` to `false` when an Video
   * element has ended.
   */
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };
  return (
    <>
      <style>
        {`
    @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
    `}
      </style>

      <div
        style={{ fontFamily: "Plus Jakarta Sans" }}
        className="bg-gray-100 dark:bg-gray-800 w-56 h-48 rounded-3xl flex items-center justify-center flex-col relative"
      >
        {/* Video */}
        <video
          src={file.src}
          ref={videoRef}
          onTimeUpdate={handleProgress}
          onEnded={handleVideoEnded}
          className="rounded-t-3xl w-full h-full object-cover"
        ></video>
        {/* Video icon */}
        <BiSolidMicrophone className="w-8 h-10" />

        {/* Playback */}
        <div className="bg-white dark:bg-gray-700  w-[220px] h-14 rounded-[22px] absolute bottom-1">
          <div className="flex items-center justify-center gap-2 mt-5">
            {/* Volume button */}
            <button onClick={handleVideoMute}>
              {!isMuted ? (
                <HiVolumeUp className="h-5 w-6 dark:text-gray-300" />
              ) : (
                <HiVolumeOff className="h-5 w-6 dark:text-gray-300" />
              )}
            </button>

            {/* Progress bar */}
            <div className="bg-gray-100 dark:bg-gray-500 w-32 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full w-12"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Play/Pause button */}
            <button onClick={handleVideoPlay}>
              {!isPlaying ? (
                <FaPlay className="h-4 w-6 dark:text-gray-300" />
              ) : (
                <FaPause className="h-4 w-6 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoFileCard;
