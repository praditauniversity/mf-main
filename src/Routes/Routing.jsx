import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../Components/Auth";
import DashboardPage from "../Pages/Dashboard";
import MemberDashboardPage from "../Pages/MemberDashboard";
import PMODashboardPage from "../Pages/PMODashboard";
import Project from "../Pages/Project";
import ProjectDashboardPage from "../Pages/ProjectDashboard";
import Responses from "../Pages/Responses";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/project" element={<Project />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pmodashboard" element={<PMODashboardPage />} />
            <Route path="/projectdashboard" element={<ProjectDashboardPage />} />
            <Route path="/memberdashboard" element={<MemberDashboardPage />} />
            <Route path="/about" element={
                <div> {Responses(503)} </div>
            } />
            <Route path="/contact" element={
                <div> {Responses(503)} </div>
            } />
        </Routes>
    );
}