import React,{useContext} from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContext} from "../Context/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";
const GoogleButton = () => {
  const { login} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId="367333986160-1np49tp20395u5e58pep7vuuf7mt2u2q.apps.googleusercontent.com">
    <div className="mt-10 md:w-[324px] w-72  transition-all border-blue-400 text-blue-400 p-2 rounded-md h-12 flex justify-center items-center">
      <GoogleLogin 
  onSuccess={credentialResponse => {
    const token = credentialResponse.credential;
    const config = {params: {'google_token': token}};
    axios.get(API_URL+"/googlesignin",config).then((response) => {
        const { access_token} = response.data; // Get only the access token
        // Store the token and authenticate the user
        login(access_token,{'name': response.data.name,'email': response.data.email,'id': response.data.id,'active_sessions': response.data['active_sessions']}); 
        navigate("/dashboard");
    });
    /*const decoded = jwtDecode(token);
    console.log(decoded);
    const email = decoded.email;
    const name = decoded.name;
    const payload = {
      name: name,
      email: email
    };
    fetch()*/

  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
