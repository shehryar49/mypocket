import React, { useContext, useState } from "react";

import { AuthContext } from "../Context/AuthContext";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import SignUpLayout from "./SignUpLayout";
import { toast } from "sonner";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckBoxError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (validator.isEmail(inputEmail)) {
      setIsValid(true);
      setEmailError("");
    } else {
      setIsValid(false);
      setEmailError("Please enter a valid email.");
    }
  };

  const handleName = (e) => {
    const inputName = e.target.value;
    setName(inputName);
    if (inputName.trim() === "") {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };

  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!/\d/.test(inputPassword)) {
      setPasswordError("Password must contain at least one numeric digit.");
    } else {
      setPasswordError("");
    }
  };

  const showVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dummyUsers = [
    {
      name: "John Doe",
      email: "emailxyz@gmail.com",
      password: "password123456",
    },
  ];

  const handleSignUp = () => {
    if (!isChecked) {
      setCheckBoxError("You must agree to the terms and privacy policy.");
      return;
    } else {
      setCheckBoxError("");
    }

    if (!name || nameError) {
      setNameError("Name is required.");
      return;
    }

    if (!email || emailError) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!password || passwordError) {
      setPasswordError("Please enter a valid password.");
      return;
    }

    // Checking if user already exists
    const existingUser = dummyUsers.find((user) => user.email === email);
    if (existingUser) {
      setEmailError("User already exists with this email.");
      return;
    }

    // Adding new user
    const newUser = { name, email, password };
    dummyUsers.push(newUser);
    login(newUser);
    navigate("/dashboard");
    toast.success("Your account has been successfully created. Welcome to My Pocket.")
  };

  return (
    <div>
      <SignUpLayout
        name={name}
        email={email}
        password={password}
        handleEmail={handleEmail}
        handleName={handleName}
        handlePassword={handlePassword}
        showVisibility={showVisibility}
        showPassword={showPassword}
        isChecked={isChecked}
        isValid={isValid}
        nameError={nameError}
        emailError={emailError}
        passwordError={passwordError}
        checkboxError={checkboxError}
        setIsChecked={setIsChecked}
        handleSignUp={handleSignUp}
      />
    </div>
  );
};

export default SignUp;
