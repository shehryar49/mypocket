import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import PersonalInfoLayout from "./PersonalInfoLayout";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import axios from 'axios';

const API_URL = "http://localhost:8000";
const PersonalInfo = () => {
  const { user, setUser,imageKey } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [contact, setContact] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const handleFirstName = (e) => {
    const inputName = e.target.value;
    setFirstName(inputName);
    setFirstNameError("");
  };

  const handleContact = (e) => {
    const inputNumber = e.target.value;
    setContact(inputNumber);
  };

  const handleEditButton = () => {
    let updatedUser = { ...user };
    console.log(updatedUser);
    // Validate first name and last name
    if (firstName.length > 0 && contact.length > 0) {
        updatedUser.name = firstName;
        setFirstNameError("");
        setFirstName("");
        const token = localStorage.getItem("token");
        const config = {headers : {Authorization: `Bearer ${token}`}};
        axios.get(API_URL + "/editinfo?" + new URLSearchParams({name: firstName, contact: contact,}).toString(), config).then((response) => {
            console.log(setUser);
            setUser(updatedUser);
            toast.success("Info updated");
        },(error) => {
            toast.error("Failed to update info.");
        }); 
    }
    else {
        toast.error("Fill the fields properly.");
    }
  };

  return (
    <div>
      <PersonalInfoLayout
        firstName={firstName}
        contact={contact}
        isValid={isValid}
        isVisible={isVisible}
        firstNameError={firstNameError}
        handleContact={handleContact}
        handleFirstName={handleFirstName}
        handleEditButton={handleEditButton}
      />
    </div>
  );
};

export default PersonalInfo;
