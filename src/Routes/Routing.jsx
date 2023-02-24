import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, Register } from "../Components/Auth";
import Logout from "../Components/Auth/Logout";
import AboutPage from "../Pages/About";
import { default as Profile, default as UserAccount } from "../Pages/Account";
import DailyReport from "../Pages/DailyReport";
import DailyReportView from "../Pages/DailyReport/dailyreportview";
import DashboardPage from "../Pages/Dashboard";
import GanttChartPage from "../Pages/Gantt/GanttChartPage";
import GanttPage from "../Pages/Gantt/GanttPage";
import MainDashboard from "../Pages/MainDashboard";
import MasterPageAdmin from "../Pages/MasterPageAdmin";
import MasterPageSuperAdmin from "../Pages/MasterPageSuperAdmin";
import MemberDashboardPage from "../Pages/MemberDashboard";
import MinutesofMeeting from "../Pages/MinuteOfMeeting";
import MinutesofMeetingView from "../Pages/MinuteOfMeeting/momview";
import PMODashboardPage from "../Pages/PMODashboard";
import Project from "../Pages/Project";
import ProjectCharter from "../Pages/ProjectCharter";
import ProjectCharterView from "../Pages/ProjectCharterView/projectcharterview";
import ProjectDashboardPage from "../Pages/ProjectDashboard";
import ProjectList from "../Pages/ProjectList";
import UserProfile from "../Pages/UserProfile";

const MainRoute = async () => {
  try {
      window.location.href = '/#/maindashboard';
      window.location.reload();
      setError('');
  } catch (err) {
      setError(err.message);
  }
}
const LoginRoute = async () => {
  try {
      window.location.href = '/#/login';
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
        <Route path="/maindashboard" element={<LoginRoute />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<MainRoute />} />
        <Route path="/login" element={<MainRoute />} />
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
        <Route path="/dailyreportview" element={<DailyReportView />}></Route>
        <Route path="/project-list" element={<ProjectList />}></Route>
        <Route path="/minutesofmeeting" element={<MinutesofMeeting />}></Route>
        <Route path="/minutesofmeetingview" element={<MinutesofMeetingView />}></Route>
        <Route path={`/project-list/:projectID/charter`} element={<ProjectCharterView />}></Route>
        <Route path={`/project-list/:projectID/gantt`} element={<GanttPage />}></Route>
        <Route path={`/project-list/:projectID/gantt/:ganttID/gantt-chart`} element={<GanttChartPage />}></Route>
        <Route path="/masterpage/superadmin" element={<MasterPageSuperAdmin />}></Route>
        <Route path="/masterpage/admin" element={<MasterPageAdmin />}></Route>
      </Routes>
    );
  }
}
