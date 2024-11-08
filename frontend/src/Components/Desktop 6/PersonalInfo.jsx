import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import PersonalInfoLayout from "./PersonalInfoLayout";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const PersonalInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [emailLimit, setEmailLimit] = useState(false);
  const [limitMsg, setLimitMsg] = useState("");

  const handleFirstName = (e) => {
    const inputName = e.target.value;
    setFirstName(inputName);
    setFirstNameError("");
  };

  const handleLastName = (e) => {
    const inputName = e.target.value;
    setLastName(inputName);
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setIsValid(validator.isEmail(inputEmail));
    setEmail(inputEmail);
  };

  const handleContact = (e) => {
    const inputNumber = e.target.value;
    setContact(inputNumber);
  };

  /**
   * The function `handleVisibility` checks the number of extra email addresses a user has and updates
   * visibility and email limit accordingly.
   */
  const handleVisibility = () => {
    const emailCount = user.extraEmails ? user.extraEmails.length : 0;

    if (emailCount < 2) {
      setIsVisible(!isVisible);
      setEmailLimit(false);
      setLimitMsg("");
    } else {
      setLimitMsg("You can only add up to 2 email addresses.");
      setIsVisible(false);
      setEmailLimit(true);
      setTimeout(() => {
        setEmailLimit(false);
      }, 5000);
    }
  };

  /**
   * The function `handleRemoveEmail` removes a specific email from the `extraEmails` array in the
   * `user` object and updates the state accordingly.
   */
  const handleRemoveEmail = (emailToDelete) => {
    const updatedEmail = user.extraEmails.filter(
      (email) => email.id !== emailToDelete
    );

    setUser({ ...user, extraEmails: updatedEmail });
    setEmailLimit(false);
  };

  const handleEditButton = () => {
    let updatedUser = { ...user };

    // Validate first name and last name
    if (firstName.length > 0 && lastName.length > 0) {
      updatedUser.name = firstName + " " + lastName;
      setFirstNameError("");
      setFirstName("");
      setLastName("");
      toast.success("Name changed successfully!");
    } else if (firstName.length > 0) {
      updatedUser.name = firstName;
      setFirstName("");
      toast.success("Name changed successfully!");
    } else if (firstName.length === 0 && lastName.length > 0) {
      setFirstNameError("First name is required.");
    } else {
      setFirstNameError("");
    }

    // Contact
    if (contact.length > 0) {
      updatedUser.contact = contact;
      setContact("");
      toast.success("New contact has been added.");
    }

    // Email Validation
    if (email.length > 0) {
      if (isValid) {
        const newEmail = {
          id: uuidv4(),
          email: email,
          addedAt: new Date().toISOString(),
        };

        const updatedEmail = user.extraEmails
          ? [...user.extraEmails, newEmail]
          : [newEmail];
        updatedUser.extraEmails = updatedEmail;

        toast.success("New email has been added.");

        if (updatedEmail.length >= 2) {
          setEmailLimit(true);
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setEmail("");
        setEmailErrorMsg("");
      } else {
        setEmailErrorMsg("Please enter a valid email address.");
      }
    } else {
      setEmailErrorMsg("");
    }

    setUser(updatedUser);
  };

  return (
    <div>
      <PersonalInfoLayout
        firstName={firstName}
        lastName={lastName}
        contact={contact}
        email={email}
        isValid={isValid}
        isVisible={isVisible}
        firstNameError={firstNameError}
        emailErrorMsg={emailErrorMsg}
        emailLimit={emailLimit}
        limitMsg={limitMsg}
        handleRemoveEmail={handleRemoveEmail}
        handleContact={handleContact}
        handleVisibility={handleVisibility}
        handleEmail={handleEmail}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleEditButton={handleEditButton}
      />
    </div>
  );
};

export default PersonalInfo;
