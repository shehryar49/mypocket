import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const DocumentFileCard = ({ file }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [Heart, setHeart] = useState(false);
  const navigate = useNavigate();
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
        className="bg-orange-100 dark:bg-gray-800 w-56 h-48 rounded-3xl flex items-center justify-center flex-col relative"
      >
        {/* Document icon */}
        <IoDocumentText className="w-8 h-10 dark:text-gray-300" />
        {/* Document Name */}
        <button onClick={()=>navigate("myfiles")} className="text-base font-medium mb-8 dark:text-gray-300">{file.name}</button>


      </div>
    </>
  );
};

export default DocumentFileCard;
