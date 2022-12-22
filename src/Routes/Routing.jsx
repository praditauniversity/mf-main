import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, Register } from "../Components/Auth";
import ComponentListPage from "../Pages/ComponentList";
import DashboardPage from "../Pages/Dashboard";
import MemberDashboardPage from "../Pages/MemberDashboard";
import PMODashboardPage from "../Pages/PMODashboard";
import Project from "../Pages/Project";
import ProjectDashboardPage from "../Pages/ProjectDashboard";
import Responses from "../Pages/Responses";
import Cases from "../Pages/Cases";
import AboutPage from "../Pages/About";
import UserProfile from "../Pages/UserProfile";
import Logout from "../Components/Auth/Logout";
import MainDashboard from "../Pages/MainDashboard";

const defaultLogin = <ProjectDashboardPage />;

export default function Routing() {
  const islogin = localStorage.getItem("token") !== null;
  if (!islogin) {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={defaultLogin} />
        <Route path="/login" element={defaultLogin} />
        <Route path="/register" element={defaultLogin} />
        <Route path="/project" element={<Project />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pmodashboard" element={<PMODashboardPage />} />
        <Route path="/projectdashboard" element={<ProjectDashboardPage />} />
        <Route path="/memberdashboard" element={<MemberDashboardPage />} />
        <Route path="/componentlist" element={<ComponentListPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<UserProfile />} />
        <Route path="/home" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/maindashboard" element={<MainDashboard />} />
      </Routes>
    );
  }
}
