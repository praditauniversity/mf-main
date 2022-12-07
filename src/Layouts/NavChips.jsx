import React, { useState } from "react";
import user from "../Assets/Icons/svg/User_bw.svg";
import subtask from "../Assets/Icons/svg/Subtask_bw.svg";
import { Link } from "react-router-dom";

const Chevron = () => {
    return (<svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd">
        </path> </svg>)
}

const UserChips = () => {
    return (
        <div className="flex bg-white shadow-sm py-2 px-4 rounded-lg text-dark text-sm items-center">
            <img src={user} alt="user" className="mr-2" />
            <span className="mr-1">Welcome</span> <span className="font-bold">Arcadia!</span>
        </div>
    );
}

const BreadcrumbsChips = () => {
    return (
        <div className="flex bg-white shadow-sm py-2 px-4 rounded-lg text-dark text-sm items-center">
            <img src={subtask} alt="subtask" className="mr-2" />
            <span className="mr-1 truncate">Dashboard</span>
            <Chevron />
            <span className="font-bold truncate">Project General</span>
        </div>
    );
}

const DateChips = () => {
    const todayDate = new Date();
    const date = todayDate.getDate();
    const month = todayDate.getMonth();
    const year = todayDate.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dates = date + " " + months[month] + " " + year;
    const zeroMinutes = todayDate.getMinutes() < 10 ? "0" : "";
    const time = todayDate.getHours() + ":" + zeroMinutes + todayDate.getMinutes();

    return (
        <div className="flex bg-white shadow-sm py-2 px-4 rounded-lg text-dark text-sm items-center">
            <span className="mr-1 font-bold">{dates}<span className="ml-2 mr-1 text-gray-600">|</span> {time} </span>
        </div>
    );
}

const DashboardChips = () => {
    // highlight the active link
    const [active, setActive] = useState("dashboard");
    const handleClick = (e) => {
        setActive(e.target.id);
    }

    return (
        <div className="flex-1 flex bg-white shadow-sm py-2 px-4 rounded-lg text-dark text-sm items-center justify-end truncate">
            <Link to="/dashboard" id="dashboard" onClick={handleClick} className={active === "dashboard" ? "mr-2 font-bold truncate" : "mr-2"}>Dashboard</Link>
            <span className="ml-2 mr-2 text-gray-400 font-bold">|</span>
            <Link to="/project" id="project" onClick={handleClick} className={active === "project" ? "mr-2 font-bold truncate" : "mr-2"}>Project</Link>
        </div>
    );
}

const NavChip = (type) => {
    const user = <UserChips />;
    const breadcrumbs = <BreadcrumbsChips />;
    const dashboard = <DashboardChips />;
    const date = <DateChips />;
    const chips = {
        user: user,
        breadcrumbs: breadcrumbs,
        dashboard: dashboard,
        date: date
    }
    return chips[type.type];
}

const NavChips = () => {
    return (
        <nav className="items-center justify-between rounded-md mt-2 border-gray-100 hidden lg:flex">
            <div className="flex-1 space-x-2 pb-1 flex justify-between">
                <NavChip type="user" />
                <NavChip type="breadcrumbs" />
                <NavChip type="dashboard" />
                <NavChip type="date" />
            </div>
        </nav>
    );
}

export default NavChips;