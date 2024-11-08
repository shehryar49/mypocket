import React, { useContext, useState } from "react";
import validator from "validator";
import UserInfoLayout from "./SignInUserInfoLayout";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserInfo = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  // Dummy user
  const dummyUser={
    name:'John Doe',
    email:'example@xyz.com',
    image:'/assets/dummy-user.png',
    password:'password123456'
  };

const handleSignIn =()=>{
  if(email=== dummyUser.email && password === dummyUser.password){
    login(dummyUser);
    navigate('/dashboard');
    toast.success("You’re now signed in.");
  }else{
    setErrorMessage("Invalid Email or password please try again")
  }
}
  /**
   * The function `handleEmail` updates the email state and checks if the input email is valid using a
   * validator function.
   */
  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    setIsValid(validator.isEmail(inputEmail));
    setErrorMessage('');
  };

  /**
   * The function `handlePassword` updates the password state based on the input value.
   */
  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setErrorMessage('');
  };

  /**
   * The function `showVisibility` toggles the visibility of a password input field.
   */
  const showVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <UserInfoLayout
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        showPassword={showPassword}
        isValid={isValid}
        showVisibility={showVisibility}
        email={email}
        password={password}
        handleSignIn={handleSignIn}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default UserInfo;
