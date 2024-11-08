import React, { useRef, useState } from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioFileCard = ({ file }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * The function `handleAudioPlay` toggles the play and pause state of an audio element in a React
   * component.
   */
  const handleAudioPlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * The function `handleAudioMute` toggles the mute state of an audio element and updates the state
   * accordingly.
   */
  const handleAudioMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  /**
   * The handleProgress function calculates the progress of an audio element and updates the progress
   * state accordingly.
   */
  const handleProgress = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  /**
   * The function `handleAudioEnded` sets the state variable `isPlaying` to `false` when an audio
   * element has ended.
   */
  const handleAudioEnded = () => {
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
        className="bg-blue-100 dark:bg-gray-800 w-56 h-48 rounded-3xl flex items-center justify-center flex-col relative"
      >
        {/* Audio */}
        <audio
          src={file.src}
          ref={audioRef}
          onTimeUpdate={handleProgress}
          onEnded={handleAudioEnded}
        ></audio>
        {/* Audio icon */}
        <BiSolidMicrophone className="w-8 h-10 dark:text-gray-300" />
        {/* Audio Name */}
        <h1 className="text-base font-medium mb-8 dark:text-gray-300">
          {file.name}
        </h1>

        {/* Playback */}
        <div className="bg-white dark:bg-gray-700 w-[220px] h-14 rounded-[22px] absolute bottom-1">
          <div className="flex items-center justify-center gap-2 mt-5">
            {/* Volume button */}
            <button onClick={handleAudioMute}>
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
            <button onClick={handleAudioPlay}>
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

export default AudioFileCard;
