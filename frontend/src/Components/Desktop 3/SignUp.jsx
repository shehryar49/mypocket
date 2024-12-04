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
  const { login, signup } = useContext(AuthContext);
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
    } else if (!/[A-Z]/.test(inputPassword)) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!/\d/.test(inputPassword)) {
      setPasswordError("Password must contain at least one numeric digit.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword)) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");
    }
  };

  const showVisibility = () => {
    setShowPassword(!showPassword);
  };

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

    // Call the server-side signup API (instead of dummy users)
    const newUser = { name, email, password };
    // Example API call
    // fetch('/signup', { method: 'POST', body: JSON.stringify(newUser) })
    signup(newUser);
    login(newUser);  // Mock login to simulate success
    navigate("/dashboard");
    toast.success("Your account has been successfully created. Welcome to My Pocket!");

    // Reset form after success
    setName("");
    setEmail("");
    setPassword("");
    setIsChecked(false);
  };

  return (
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
  );
};

export default SignUp;
