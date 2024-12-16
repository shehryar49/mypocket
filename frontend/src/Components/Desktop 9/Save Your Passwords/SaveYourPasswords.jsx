import React, { useEffect, useState } from "react";
import SaveYourPasswordsLayout from "./SaveYourPasswordsLayout";
import validator from "validator";
import axios from 'axios';
import { toast } from "sonner";

const SaveYourPasswords = ({ setSavedPasswords }) => {
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [fullEmail, setFullEmail] = useState(true);
  const [fullPassword, setFullPassword] = useState(true);
  const API_URL = "http://127.0.0.1:8000";
  useEffect(() => {
    handleValidPassword();
  }, [password]);

  const handleDate = (e) => {
    const inputDate = e.target.value;
    setDate(inputDate);
  };

  const handleNote = (e) => {
    const inputNote = e.target.value;
    setNote(inputNote);
  };

  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmailvalid(validator.isEmail(inputEmail));
    setEmail(inputEmail);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * The function `handleValidPassword` checks if a password is strong, weak, or missing a number.
   */
  const handleValidPassword = () => {
    const hasNumber = /\d/;
    if (password.length >= 8 && hasNumber.test(password)) {
      setPasswordMsg("Strong");
      setPasswordValid(true);
    } else if (password.length >= 8 && !hasNumber.test(password)) {
      setPasswordMsg("Password must contain at least one number");
      setPasswordValid(false);
    } else {
      setPasswordMsg("Weak");
      setPasswordValid(false);
    }
  };

  /**
   * The `handleAdd` function in JavaScript React validates email and password inputs, saves them along
   * with other details in an array, and resets the input fields.
   */
  const handleAdd = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const isEmailValid = email.length > 0 && emailValid;
    const isPasswordValid = password.length > 0 && passwordValid;

    setFullEmail(isEmailValid);
    setFullPassword(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : currentDate;
      
    const token = localStorage.getItem("token");
    const config  = {headers: {Authorization: `Bearer ${token}`,'Content-type': 'application/json'},method: "POST",body: JSON.stringify(
                      {email: email,password: password,note: note})};
      
      fetch(API_URL+"/passwords",config).then((response) => {return response.json()}).then((response) => {
        setSavedPasswords((prevPasswords) => [
          ...prevPasswords,
          {
            serialNumber: response.id,
            date: formattedDate,
            note: note,
            email: email,
            password: password,
            maskedPassword: "*".repeat(password.length),
          },
        ]);    
        toast.success("Your password has been saved successfully.");
        setEmail("");
        setDate("");
        setPassword("");
        setNote("");
      });
    }
  };

  return (
    <div>
      <SaveYourPasswordsLayout
        handleDate={handleDate}
        handleEmail={handleEmail}
        handleNote={handleNote}
        handlePassword={handlePassword}
        handleShowPassword={handleShowPassword}
        handleAdd={handleAdd}
        date={date}
        email={email}
        password={password}
        note={note}
        emailValid={emailValid}
        showPassword={showPassword}
        passwordMsg={passwordMsg}
        fullEmail={fullEmail}
        fullPassword={fullPassword}
      />
    </div>
  );
};

export default SaveYourPasswords;
