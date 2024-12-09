import React, { useContext, useEffect, useState } from "react";
import ChangePasswordLayout from "./ChangePasswordLayout";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

const ChangePassword = () => {
  const { user, setUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [currentPasswordMsg, setCurrentPasswordMsg] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [newPasswordMsg, setNewPasswordMsg] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    handleValidPassword();
  }, [newPassword, confirmPassword]);

  const handleCurrentPassword = (e) => {
    const inputPassword = e.target.value;
    setCurrentPassword(inputPassword);
  };

  const handleNewPassword = (e) => {
    const inputPassword = e.target.value;
    setNewPassword(inputPassword);
  };

  const handleConfirmPassword = (e) => {
    const inputPassword = e.target.value;
    setConfirmPassword(inputPassword);
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /**
   * The function `handleValidPassword` checks the strength of a new password and a confirm password
   * based on their length and the presence of at least one number.
   */
  const handleValidPassword = () => {
    const hasNumber = /\d/;

    // New Password
    if (newPassword.length >= 8 && hasNumber.test(newPassword)) {
      setNewPasswordMsg("Strong");
      setNewPasswordValid(true);
    } else if (newPassword.length >= 8 && !hasNumber.test(newPassword)) {
      setNewPasswordMsg("Password must contain atleast one number");
      setNewPasswordValid(false);
    } else {
      setNewPasswordMsg("Weak");
      setNewPasswordValid(false);
    }

    // Confirm Password
    if (confirmPassword.length >= 8 && hasNumber.test(confirmPassword)) {
      setConfirmPasswordMsg("Strong");
      setConfirmPasswordValid(true);
    } else if (
      confirmPassword.length >= 8 &&
      !hasNumber.test(confirmPassword)
    ) {
      setConfirmPasswordMsg("Password must contain atleast one number");
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordMsg("Weak");
      setConfirmPasswordValid(false);
    }
  };

  /**
   * The function `handleChangePassword` validates and updates a user's password in a React
   * application.
   */
  const handleChangePassword = () => {
    let isValid = true;
    // Current password validation
    if (currentPassword.length === 0) {
      setCurrentPasswordMsg("Current password cannot be empty.");
      setCurrentPasswordValid(false);
      isValid = false;
    }
    else {
      setCurrentPasswordMsg("");
      setCurrentPasswordValid(true);
    }

    // New password validation
    if (newPassword === currentPassword) {
      setNewPasswordMsg(
        "The new password cannot be the same as the current one."
      );
      setNewPasswordValid(false);
      isValid = false;
    } else if (!newPasswordValid) {
      isValid = false;
    }

    // Confirm password validation
    if (confirmPassword !== newPassword) {
      setConfirmPasswordMsg("Passwords do not match.");
      setConfirmPasswordValid(false);
      isValid = false;
    } else if (!confirmPasswordValid) {
      isValid = false;
    }

    if (isValid && newPasswordValid && confirmPasswordValid) {
      //setUser({ ...user, password: newPassword });
      console.log('making password change request');
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      const token = localStorage.getItem("token");
      const creds = {email : user["email"],password: newPassword};
      const config = {headers: {Authorization: `Bearer ${token}`,'Content-type': 'application/json'},method: 'POST',body: JSON.stringify(creds)};
      fetch(API_URL+"/changepassword",config).then(() => {    
        toast.success("Password changed successfully!");
        setNewPasswordValid(false);
        setConfirmPasswordValid(false);
        setFormSubmitted(false);
      }).catch( () => {
        toast.error("There was an error changing the password.");
      });
    } else {
      setFormSubmitted(true);
    }
  };

  return (
    <div>
      <ChangePasswordLayout
        showCurrentPassword={showCurrentPassword}
        handleShowCurrentPassword={handleShowCurrentPassword}
        showConfirmPassword={showConfirmPassword}
        handleShowConfirmPassword={handleShowConfirmPassword}
        showNewPassword={showNewPassword}
        handleShowNewPassword={handleShowNewPassword}
        currentPassword={currentPassword}
        handleCurrentPassword={handleCurrentPassword}
        newPassword={newPassword}
        handleNewPassword={handleNewPassword}
        confirmPassword={confirmPassword}
        handleConfirmPassword={handleConfirmPassword}
        newPasswordValid={newPasswordValid}
        newPasswordMsg={newPasswordMsg}
        confirmPasswordValid={confirmPasswordValid}
        confirmPasswordMsg={confirmPasswordMsg}
        currentPasswordMsg={currentPasswordMsg}
        currentPasswordValid={currentPasswordValid}
        handleChangePassword={handleChangePassword}
        formSubmitted={formSubmitted}
      />
    </div>
  );
};

export default ChangePassword;
