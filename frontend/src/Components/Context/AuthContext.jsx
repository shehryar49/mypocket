import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';

// The AuthContext to manage authentication and user data
export const AuthContext = createContext();
const API_URL = "http://localhost:8000";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: 0
  });
  const [loginTime, setLoginTime] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [loginDevice, setLoginDevice] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSessions, setActiveSessions] = useState(0);
  const [twoFactor, setTwoFactor] = useState(false);
  const [imageUrl,setImageUrl] = useState(""); //to indicate profile picture changed state
  const [tmp,setTmp] = useState();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // Logout function to clear state and localStorage
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {headers: {Authorization: `Bearer ${token}`}};
      const response = await axios.get(API_URL+"/logout",config);
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser({});
      setActiveSessions(0);
      setLoginTime(null);
      setIpAddress("");
      setLoginDevice("");
      toast.success("Logged out successfully.");
    } catch (error) {
      alert(error.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  const login = async (token,user) => {
    try {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(user);
      console.log(user);
      setActiveSessions(user['active_sessions']);
      console.log(user['active_sessions']);
      setImageUrl(API_URL+`/profile_pic?id=${user.id}&r=1234`);
      toast.success("You're now signed in.");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };
  

  // Sign-up function with API call to FastAPI server
  const signup = (newUser) => {
      const config = {method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({name: newUser.name,email: newUser.email,password: newUser.password})};
      fetch(API_URL+"/signup",config).then((response) => {
        if(!response.ok)
          throw new Error("");
        return response.json();
      }).then((json) => {
        toast.success("You can login to your new account now!");
        return json;
      }).catch(() => {
        toast.error("An error occurred");
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setLoginTime(parsedUser.loginTime);
      setIpAddress("192.168.1.2");
      setLoginDevice("Mobile");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        imageUrl,
        setUser,
        setImageUrl,
        twoFactor,
        setTwoFactor,
        loginTime,
        ipAddress,
        loginDevice,
        activeSessions,
        isAuthenticated,
        tmp,
        setTmp,
        login,
        logout,
        signup,  // Expose signUp to the context
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
