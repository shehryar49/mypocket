import React, { useState } from "react";
import validator from "validator";
import UserInfoLayout from "./UserInfoLayout";
import axios from 'axios';
import {toast} from 'sonner';

const API_URL = "http://localhost:8000";

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
      const config = {params: {'email': email}};

      axios.get(API_URL+"/forgotpassword",config).then((response) => {
        if('msg' in response.data)
          throw new Error(response.data.msg);
        toast.success("An email was to your account!");

      }).catch((error) => {
        toast.error(error.message);
      })
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
