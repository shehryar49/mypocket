import React, { useContext, useState } from "react";
import EditInfoLayout from "./EditInfoLayout";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";

const EditInfo = ({}) => {
  const {
    user,
    setUser,
    emailNotifications,
    setEmailNotifications,
    isDarkMode,
    setIsDarkMode,
  } = useContext(AuthContext);
  const [updatedNumber, setUpdatedNumber] = useState("");
  const [birth, setBirth] = useState("");
  const [formattedBirth, setFormattedBirth] = useState("");

  const handleNumber = (e) => {
    const inputNumber = e.target.value;
    setUpdatedNumber(inputNumber);
  };

  /**
   * The function `handleDateOfBirth` takes an input date, formats it to a specific date format, and
   * sets the formatted date in the state.
   */
  const handleDateOfBirth = (e) => {
    const inputBirth = e.target.value;
    const options = { year: "numeric", month: "long", day: "numeric" };
    setBirth(new Date(inputBirth).toLocaleDateString("en-Us", options));
    setFormattedBirth(inputBirth);
  };

  /**
   * The function `handleSaveChanges` updates the user's contact information and date of birth, then
   * resets the input fields for updated number and birth date.
   */
  const handleSaveChanges = () => {
    if (formattedBirth && updatedNumber > 0) {
      setUser({ ...user, contact: updatedNumber, dateOfBirth: birth });
      setUpdatedNumber("");
      setFormattedBirth("");
      toast.success(
        "Phone number and date of birth have been updated successfully!"
      );
    } else if (formattedBirth) {
      setUser({ ...user, dateOfBirth: birth });
      setFormattedBirth("");
      toast.success("Date of birth has been added successfully!");
    } else if (updatedNumber > 0) {
      setUser({ ...user, contact: updatedNumber });
      setUpdatedNumber("");
      toast.success("Phone number has been updated successfully!");
    } else {
      toast.error("Please enter a valid phone number and/or date of birth.");
    }
  };

  /**
   * The function `handleAddImage` takes an event object, extracts an image file from it, revokes any
   * existing image URL, and creates a new URL for the selected image in the user state.
   */
  const handleAddImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      if (user.image) {
        URL.revokeObjectURL(user.image);
      }
      setUser({ ...user, image: URL.createObjectURL(image) });
      toast.success("Profile picture uploaded successfully!");
    }
  };
  return (
    <div>
      <EditInfoLayout
        user={user}
        handleDateOfBirth={handleDateOfBirth}
        handleNumber={handleNumber}
        updatedNumber={updatedNumber}
        formattedBirth={formattedBirth}
        handleSaveChanges={handleSaveChanges}
        handleAddImage={handleAddImage}
      />
    </div>
  );
};

export default EditInfo;
