import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AddUser from "./pages/AddUser/AddUser";
import LandingRoutes from "./routes/LandingRoutes";

import Settings from "./pages/Settings/Settings";
import EditProfile from "./pages/Profile/EditProfile";
import NotifyStudents from "./pages/NotifyStudents/NotifyStudents";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifyStudents" element={<NotifyStudents />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {LandingRoutes()}
      </Routes>
    </Router>
  );
};

export default App;
