import React from "react";
import { Route, Routes } from "react-router-dom";
import LetsGetStarted from "../Desktop 1/LetsGetStarted";
import SignIn from "../Desktop 2/SignIn";
import SignUp from "../Desktop 3/SignUp";
import ForgotPassword from "../Desktop 4/ForgotPassword";
import Dashboard from "../Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import MyProfile from "../Desktop 6/MyProfile";
import MyStorage from "../Desktop 7/MyStorage";
import MyFiles from "../Desktop 8/MyFiles";
import MyPasswords from "../Desktop 9/MyPasswords";
import SharedFiles from "../Desktop 10/SharedFiles";
import Settings from "../Desktop 11/Settings";
import Upload from "../Desktop 12/Upload";
import ErrorPage from "./ErrorPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<LetsGetStarted />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/dashboard/mystorage" element={<ProtectedRoute><MyStorage /></ProtectedRoute>} />
      <Route path="/dashboard/myfiles" element={<ProtectedRoute><MyFiles /></ProtectedRoute>} />
      <Route path="/dashboard/mypasswords" element={<ProtectedRoute><MyPasswords /></ProtectedRoute>} />
      <Route path="/dashboard/sharedfiles" element={<ProtectedRoute><SharedFiles /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/dashboard/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
    </Routes>
  );
};

export default Routing;
