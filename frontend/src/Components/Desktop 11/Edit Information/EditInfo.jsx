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
  
  return (
    <div>
      <EditInfoLayout
        user={user}
      />
    </div>
  );
};

export default EditInfo;
