import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, Register } from "../Components/Auth";
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
import ProjectCharter from "../Pages/ProjectCharter";
import DailyReport from "../Pages/DailyReport";
import MinutesofMeeting from "../Pages/MinuteOfMeeting";
import Profile from "../Pages/Account";
import UserAccount from "../Pages/Account";
import ProjectCharterView from "../Pages/ProjectCharter/projectcharterview";

const MainRoute = async () => {
  try {
      window.location.href = '/#/maindashboard';
      window.location.reload();
      setError('');
  } catch (err) {
      setError(err.message);
  }
}

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
        <Route path="/" element={<MainRoute />} />
        <Route path="/project" element={<Project />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pmodashboard" element={<PMODashboardPage />} />
        <Route path="/projectdashboard" element={<ProjectDashboardPage />} />
        <Route path="/memberdashboard" element={<MemberDashboardPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<UserProfile />} />
        <Route path="/home" element={<UserProfile />} />
        <Route path="/useraccount" element={<UserAccount />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/maindashboard" element={<MainDashboard />} />
        <Route path="/projectcharter" element={<ProjectCharter />}></Route>
        <Route path="/charterview" element={<ProjectCharterView />}></Route>
        <Route path="/dailyreport" element={<DailyReport />}></Route>
        <Route path="/minutesofmeeting" element={<MinutesofMeeting />}></Route>
      </Routes>
    );
  }
}
