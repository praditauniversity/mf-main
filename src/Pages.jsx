import React from "react";
import {Routes, Route} from "react-router-dom";
import Auth from "./components/Auth";
import Project from "./components/Project/ProjectPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import Responses from "./Responses";
import LoginPage from "./pages/LoginPage";

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/project" element={<Project />} />
            <Route path="/activity" element={
                <div> {Responses(503)} </div>
            } />
            <Route path="/about" element={
                <div> {Responses(503)} </div>
            } />
            <Route path="/contact" element={
                <div> {Responses(503)} </div>
            } />
            <Route path="/login" element={<Auth /> } />
            <Route path="/login/page" element={<LoginPage /> } />
            <Route path="/dashboard" element={<DashboardPage /> } />
        </Routes>
    );
}