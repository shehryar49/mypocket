import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";

const ImageFileCard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [Heart, setHeart] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSeen = () => {
    setIsSeen(!isSeen);
  };

  const handleAdded = () => {
    setIsAdded(!isAdded);
  };

  const handleHeart = () => {
    setHeart(!Heart);
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
        className="bg-white dark:bg-gray-800 w-56 h-48 rounded-3xl flex items-center justify-center flex-col relative overflow-hidden"
      >
        {/* Image */}
        <img
          src="https://picsum.photos/200/300"
          className="object-cover w-full h-full"
          alt="Random"
        />

        {/* Buttons*/}
        <div className="bg-white dark:bg-gray-700 w-[220px] h-14 rounded-[22px] absolute bottom-1">
          <div className="flex items-center justify-center gap-2 mt-5">
            {/* Edit button */}
            <button onClick={handleEdit}>
              {!isEdit ? (
                <RiEdit2Fill className="h-5 w-6 dark:text-gray-300" />
              ) : (
                <RiEdit2Fill className="h-5 w-6 text-blue-500 dark:text-blue-600 transition-all" />
              )}
            </button>

            {/* Seen button */}
            <button onClick={handleSeen}>
              {!isSeen ? (
                <FaEye className="h-5 w-6 dark:text-gray-300" />
              ) : (
                <FaEye className="h-5 w-6 text-blue-500 dark:text-blue-600 transition-all" />
              )}
            </button>

            {/* Add Button */}
            <button onClick={handleAdded}>
              {!isAdded ? (
                <MdPersonAddAlt1 className="h-5 w-6 dark:text-gray-300" />
              ) : (
                <MdPersonAddAlt1 className="h-5 w-6 text-blue-500 dark:text-blue-600 transition-all" />
              )}
            </button>

            {/* Heart Button */}
            <button className="ml-16" onClick={handleHeart}>
              {!Heart ? (
                <TiHeartFullOutline className="h-5 w-6 dark:text-gray-300" />
              ) : (
                <TiHeartFullOutline className="h-5 w-6 text-red-500 dark:text-red-600 transition-all" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageFileCard;
