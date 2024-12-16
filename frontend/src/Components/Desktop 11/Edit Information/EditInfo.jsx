import React, { useContext, useState } from "react";
import EditInfoLayout from "./EditInfoLayout";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

const EditInfo = ({}) => {
  const {
    user,
    imageUrl,
    setUser,
    setImageUrl,
    emailNotifications,
    setEmailNotifications,
    isDarkMode,
    setIsDarkMode,
  } = useContext(AuthContext);
  console.log(imageUrl);
  /**
   * The function `handleAddImage` takes an event object, extracts an image file from it, revokes any
   * existing image URL, and creates a new URL for the selected image in the user state.
   */
  const handleAddImage = (e) => {
    console.log('trying image upload');
    const image = e.target.files[0];
    const token = localStorage.getItem("token");
    const headers = {Authorization: `Bearer ${token}`};
    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      fetch(API_URL+"/profile_pic", {method: "POST", body: formData, headers: headers}).then((response) => {
        toast.success("Profile Picture updated.");
        console.log("setting image key");
        setImageUrl(API_URL+`/profile_pic?id=${user.id}&r=`+Math.random().toString());
      });

    }
  };
  return (
    <div>
      <EditInfoLayout
        user={user}
        imageUrl={imageUrl}
        handleAddImage={handleAddImage}
      />
    </div>
  );
};

export default EditInfo;
