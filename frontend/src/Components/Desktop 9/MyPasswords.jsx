import React, { useState,useEffect } from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import SaveYourPasswords from "./Save Your Passwords/SaveYourPasswords";
import SavedPasswordsLayout from "./SavedPasswordsLayout";
import SearchResults from "./Search Bar/SearchResults";
import axios from 'axios';
import { toast } from "sonner";


const MyPasswords = () => {
  const api_url = "http://localhost:8000";
  const [savedPasswords, setSavedPasswords] = useState([
    // DummyData
    {
      serialNumber: 1,
      date: "01/05/2024",
      note: "My personal account",
      email: "example@xyz.com",
      password: "password1234",
      maskedPassword: "*********",
    },
    {
      serialNumber: 2,
      date: "01/05/2024",
      note: "My personal account",
      email: "example@xyz.com",
      password: "password1234",
      maskedPassword: "*********",
    },
    {
      serialNumber: 3,
      date: "01/05/2024",
      note: "My personal account",
      email: "example@xyz.com",
      password: "password1234",
      maskedPassword: "*********",
    },
    {
      serialNumber: 4,
      date: "01/05/2024",
      note: "My personal account",
      email: "example@xyz.com",
      password: "password1234",
      maskedPassword: "*********",
    },
    {
      serialNumber: 5,
      date: "01/05/2024",
      note: "My personal account",
      email: "example@xyz.com",
      password: "password1234",
      maskedPassword: "*********",
    },
  ]);
  useEffect(() => {
    const response = axios.get('http://localhost:8000/passwords');
    const json = response.data;
    console.log(json);
    //setSavedPasswords(json.data);//[{serialNumber: 1,date: "08/12/2024",note: "Suhaib is gay",email: "suhaib@gaymail.com",password: "gay",maskedPassword: "***"}]);
  });
  const [filteredSearch, setFilteredSearch] = useState(savedPasswords);
  /**
   * The handleRemove function filters out a saved password based on its serial number and updates the
   * serial numbers of the remaining passwords.
   */
  const handleRemove = (savedPasswordTodelete) => {
    const filteredPassword = savedPasswords.filter(
      (password) => password.serialNumber !== savedPasswordTodelete
    );
    const updatedPassword = filteredPassword.map((password, index) => ({
      ...password,
      serialNumber: index + 1,
    }));
    setSavedPasswords(updatedPassword);
    toast.success("Your password has been removed successfully.");
  };
  return (
    <>
      <style>
        {`
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    `}
      </style>

      <div
        className="flex flex-col md:flex-row dark:bg-gray-900"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col w-full md:ml-64">
          {/* Heading */}
          <DashboardHeader Heading={"My Passwords"} display={"opacity-0"} />

          {/* SearchBar */}
          <SearchResults
            setFilteredSearch={setFilteredSearch}
            savedPasswords={savedPasswords}
            filteredSearch={filteredSearch}
          />

          {/* Save your passowrds */}
          <SaveYourPasswords
            savedPasswords={savedPasswords}
            setSavedPasswords={setSavedPasswords}
          />

          {/* Saved Passwords */}
          <div>
            <SavedPasswordsLayout
              savedPasswords={savedPasswords}
              handleRemove={handleRemove}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPasswords;
