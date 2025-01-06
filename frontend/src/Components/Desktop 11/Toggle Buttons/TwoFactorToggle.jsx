import React, { useContext,useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";
import axios from 'axios';

const API_URL = "http://localhost:8000";

const TwoFactorToggle = () => {
  const toggle2FA = () => {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/toggle2FA",config).then((response)=>{
      if(!twoFactor)
        toast.success("Two factor authentication enabled.");
      else
        toast.success("Two factor authentication disabled.");
      setTwoFactor(!twoFactor);
    }).catch((err) => {
      toast.error(err.message);
    });
  };
  const { twoFactor, setTwoFactor } = useContext(AuthContext);
  useEffect(()=> {
    const token = localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}};
    axios.get(API_URL+"/tfa",config).then((response)=>{
      const state = response.data.tfa;
      setTwoFactor(state);
    }).catch((err) => {
      toast.error(err.message);
    });
  },[]);
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={toggle2FA}
        className={`rounded-full w-[50px] h-6 transition-colors shadow-md duration-300 relative flex items-center ${
          twoFactor ? "bg-blue-600 dark:bg-blue-700" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 ml-[0.9px]  bg-white rounded-full transition-transform duration-300 ${
            twoFactor ? "transform translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default TwoFactorToggle;
