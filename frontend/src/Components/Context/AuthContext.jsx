import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// The AuthContext to manage authentication and user data
export const AuthContext = createContext();

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
  const [activeSessions, setActiveSessions] = useState([]);

  // Logout function to clear state and localStorage
  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser({});
      setActiveSessions([]);
      setLoginTime(null);
      setIpAddress("");
      setLoginDevice("");
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const login = async (token,user) => {
    try {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(user);
      console.log(user);
      toast.success("You’re now signed in.");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };
  

  // Sign-up function with API call to FastAPI server
  const signup = async (newUser) => {
    try {
      // API call to FastAPI to create a new user
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,  // Assuming password is included in the newUser object
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully created the user
        setUser(newUser);  // Store the new user data
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser)); // Persist user data
        toast.success("Account created successfully!");
      } else {
        // Handle server-side errors (e.g., email already exists)
        toast.error(data.detail || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      toast.error("Sign-up failed. Please try again.");
    }
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
        loginTime,
        ipAddress,
        loginDevice,
        activeSessions,
        isAuthenticated,
        login,
        logout,
        signup,  // Expose signUp to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
