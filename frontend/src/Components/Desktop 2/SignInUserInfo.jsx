import React, { useContext, useState, useEffect } from "react";
import validator from "validator";
import UserInfoLayout from "./SignInUserInfoLayout";
import { AuthContext} from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

var tmp = 0;
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated,setTmp } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async () => {
    if (!isValid) {
      setErrorMessage("Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });  
      const { access_token} = response.data; // Get only the access token
      if('otp' in response.data) {
        //OTP signin required
//        alert(JSON.stringify(response.data));
        setTmp(response.data);
        navigate("/otp");
      }else {
        // Store the token and authenticate the user
        login(access_token,{'name': response.data.name,'email': response.data.email,'id': response.data.id,'active_sessions': response.data['active_sessions']}); 
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Invalid Email or password, please try again.");
    }
  };
  
  

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValid(validator.isEmail(inputEmail));
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <UserInfoLayout
      handleEmail={handleEmailChange}
      handlePassword={handlePasswordChange}
      showPassword={showPassword}
      isValid={isValid}
      showVisibility={togglePasswordVisibility}
      email={email}
      password={password}
      handleSignIn={handleSignIn}
      errorMessage={errorMessage}
    />
  );
};

export default SignIn;
