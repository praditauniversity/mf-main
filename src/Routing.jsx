import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Project from "./components/Project";
import Activity from "./components/Activity";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<Project />} />
            <Route path="/activity" element={<Activity />} />
        </Routes>
    );
}