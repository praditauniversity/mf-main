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

export default function Routing() {
    const islogin = sessionStorage.getItem('token') !== null;
    if (!islogin) {
        return (
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project" element={<Project />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/pmodashboard" element={<PMODashboardPage />} />
                <Route path="/projectdashboard" element={<ProjectDashboardPage />} />
                <Route path="/memberdashboard" element={<MemberDashboardPage />} />
                <Route path="/componentlist" element={<ComponentListPage />} />
                <Route path="/about" element={
                    <div> {Responses(503)} </div>
                } />
                <Route path="/contact" element={
                    <div> {Responses(503)} </div>
                } />
            </Routes>
        );
    }
}