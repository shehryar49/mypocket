import React, { useContext, useState } from "react";
import SecurityLayout from "./SecurityLayout";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";

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
    if (password === user.password) {
      deleteAccount();
      toast.success("Account deleted successfully.");
    } else if (password.length === 0) {
      toast.error("Please enter your password to confirm account deletion.");
    } else {
      toast.error(
        "Oops! That password doesn't seem right. Please check and try again."
      );
      setIsConfirmDelete(false);
      setPassword("");
      setShowPassword(false);
    }
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
