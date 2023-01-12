import React, { useState } from "react";
import { Link } from "react-router-dom";
import subtask from "../Assets/Icons/svg/Subtask_bw.svg";
import user from "../Assets/Icons/svg/User_bw.svg";
import GetProfile from "../Components/Auth/GetProfile";

const Chevron = () => {
    return (<svg className="w-6 h-6 text-typo-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd">
        </path> </svg>)
}

const UserChips = () => {
    const profile = GetProfile();
    const firstName = profile.first_name;

    return (
        <div className="flex bg-white shadow-lg py-2 px-4 rounded-lg text-typo-dark text-sm items-center">
            <img src={user} alt="user" className="mr-2" />
            <span className="mr-1">Welcome</span>
            <Link to="/profile" className="font-bold">{firstName}!</Link>
        </div>
    );
}

const BreadcrumbsChips = () => {
    const root = window.location.pathname === "/" ? "Root" : null;
    const current = window.location.hash.split("/")[1];
    const capCurrent = current.charAt(0).toUpperCase() + current.slice(1);

    return (
        <div className="flex bg-white shadow-lg py-2 px-4 rounded-lg text-typo-dark text-sm items-center">
            <img src={subtask} alt="subtask" className="mr-2" />
            <span className="mr-1 truncate">{root}</span>
            <Chevron />
            <span className="font-bold truncate">{capCurrent}</span>
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
        <div className="flex bg-white shadow-lg py-2 px-4 rounded-lg text-typo-dark text-sm items-center">
            <span className="mr-1 font-bold">{dates}<span className="ml-2 mr-1 text-typo-dark">|</span> {time} </span>
        </div>
    );
}

const DashboardChips = () => {
    // highlight the active link

    const root = window.location.pathname === "/" ? "Root" : null;
    const current = window.location.hash.split("/")[1];
    const capCurrent = current.charAt(0).toLowerCase() + current.slice(1);
    const [active, setActive] = useState(capCurrent);
    const handleClick = (e) => {
        setActive(e.target.id);
    }

    // TODO: this list should be dynamic
    const list = [
        { id: 1, link: "dashboard", name: "Dashboard" },
        { id: 2, link: "projectdashboard", name: "Project Dashboard" },
        { id: 3, link: "pmodashboard", name: "PMO Dashboard" },
        { id: 4, link: "project-list", name: "Project List" },
    ];

    const separator = <span className="mx-2 text-typo-dark ">|</span>;

    return (
        <div className="flex-1 flex bg-white shadow-lg py-2 px-4 rounded-lg text-typo-dark text-sm items-center justify-end truncate">
            {list.map((item) => (
                <div key={item.id}>
                    <Link to={`/${item.link}`} key={item.id} id={item.link} onClick={handleClick} className={`mr-2 ${active === item.link ? "font-bold" : ""}`}>{item.name}</Link>
                    {item.id !== list.length ? <span className="mr-2">|</span> : null}
                </div>
            ))}
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