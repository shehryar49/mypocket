import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    extraEmails: [],
    contact: "",
    dateOfBirth: "",
  });
  const [loginTime, setLoginTime] = useState(null);
  const [ipAddress, setIpAddress] = useState("192.168.1.1");
  const [loginDevice, setLoginDevice] = useState("Desktop");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const savedMode = localStorage.getItem("emailNotifications");
    return savedMode === "true";
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const [twoFactor, setTwoFactor] = useState(() => {
    const saveMode = localStorage.getItem("2FA");
    return saveMode === "true";
  });

  /* The `useEffect` hook in the provided code snippet is responsible for updating the local storage
  whenever the `emailNotifications` state variable changes. */
  useEffect(() => {
    localStorage.setItem("emailNotifications", emailNotifications);
  }, [emailNotifications]);

  /* The `useEffect` hook in the provided code snippet is responsible for updating the local storage
  and toggling a CSS class on the body element based on the `isDarkMode` state variable. */
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("2FA", twoFactor);
  }, [twoFactor]);

  /**
   * The login function sets user data and authenticates the user.
   */
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const currentTime = new Date().toLocaleTimeString([], options);
    setLoginTime(currentTime);

    const newSession = {
      user: userData,
      loginTime: currentTime,
      ipAddress: "ipAddress",
      loginDevice: "Desktop",
    };
    setActiveSessions((prevSessions) => [...prevSessions, newSession]);
  };

  /**
   * The `logout` function resets user data and sets authentication status to false.
   */
  const logout = () => {
    setUser({
      name: "",
      email: "",
      image: "",
      extraEmails: [],
      contact: "",
      dateOfBirth: "",
    });
    setIsAuthenticated(false);
    setLoginTime(null);
    setLoginDevice("Desktop");
    setIpAddress("192.168.1.1");
    setActiveSessions([]);
    toast.success("You have successfully logged out.");
  };

  const deleteAccount = () => {
    setUser({
      name: "",
      email: "",
      image: "",
      extraEmails: [],
      contact: "",
      dateOfBirth: "",
    });
    setIsAuthenticated(false);
    setLoginTime(null);
    setLoginDevice("");
    setIpAddress("");
    setActiveSessions([]);
    localStorage.removeItem("darkMode");
    localStorage.removeItem("2FA");
    localStorage.removeItem("emailNotifications");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        emailNotifications,
        setEmailNotifications,
        isDarkMode,
        setIsDarkMode,
        twoFactor,
        setTwoFactor,
        loginTime,
        setLoginTime,
        loginDevice,
        setLoginDevice,
        ipAddress,
        setIpAddress,
        activeSessions,
        setActiveSessions,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
