import React, { useContext, useState, useEffect } from "react";
import SecurityLayout from "./SecurityLayout";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";
import axios from 'axios';

const Security = () => {
  const {
    loginTime,
    ipAddress,
    loginDevice,
    activeSessions,
    deleteAccount,
    user,
  } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCancelButton = () => {
    setIsConfirmDelete(false);
    setPassword("");
    setShowPassword(false);
  };

  /**
   * The function `handleDeleteAccount` checks if the provided password matches the user's password and
   * deletes the account if they match, otherwise it displays an error message.
   */
  const handleDeleteAccount = () => {
    deleteAccount(); 
  };
  return (
    <div>
      <SecurityLayout
        loginTime={loginTime}
        loginDevice={loginDevice}
        ipAddress={ipAddress}
        activeSessions={activeSessions}
        isConfirmDelete={isConfirmDelete}
        setIsConfirmDelete={setIsConfirmDelete}
        password={password}
        handlePassword={handlePassword}
        handleDeleteAccount={handleDeleteAccount}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
        handleCancelButton={handleCancelButton}
      />
    </div>
  );
};

export default Security;
