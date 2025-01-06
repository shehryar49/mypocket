import React, { useContext,useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';

const API_URL = "http://localhost:8000";

const EmailNotifiToggle = () => {
  const { emailNotifications, setEmailNotifications } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};

    axios.get(API_URL+"/email_notifications",config).then((response) => {
      const state = response.data.email_notifications;
      setEmailNotifications(state);
    });
  },[]);
  const setEmailNotif = (state) => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`},params: {notif: state},method: "GET"};

    axios.get(API_URL+"/set_email_notifications",config).then((response) => {
      setEmailNotifications(state);
    });
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => setEmailNotif(!emailNotifications)}
        className={`rounded-full w-[50px] h-6 transition-colors shadow-md duration-300 relative flex items-center ${
          emailNotifications ? "bg-blue-600 dark:bg-blue-700" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 ml-[0.9px]  bg-white rounded-full transition-transform duration-300 ${
            emailNotifications ? "transform translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default EmailNotifiToggle;
