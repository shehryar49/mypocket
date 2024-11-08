import React, { useState } from "react";
import validator from "validator";
import UserInfoLayout from "./UserInfoLayout";

const UserInfo = ({ handleShowOtp }) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

 /**
  * The handleEmail function updates the email state and checks if the input email is valid using a
  * validator function.
  */
  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValid(validator.isEmail(inputEmail));
  };

/**
 * The `handleOtp` function checks if a condition is valid and then calls another function to show the
 * OTP.
 */
  const handleOtp = () => {
    if (isValid) {
      handleShowOtp();
    }
  };

  return (
    <div>
      <UserInfoLayout
        email={email}
        handleEmail={handleEmail}
        isValid={isValid}
        handleOtp={handleOtp}
      />
    </div>
  );
};

export default UserInfo;
