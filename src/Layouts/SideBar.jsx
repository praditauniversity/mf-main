import React, { useState } from "react";









// import logo from "../Assets/Icons/svg/Logo.svg";
import logo from "../Assets/Icons/png/Logo.png";
import chat from "../Assets/Icons/svg/Chat.svg";
// import user from "../../Assets/Icons/svg/User.svg";
import key from "../Assets/Icons/svg/Key.svg";
import chart from "../Assets/Icons/svg/Progress.svg";
import compass from "../Assets/Icons/svg/Compass.svg"
import plus from "../Assets/Icons/svg/Plus.svg"
import dashboard from "../Assets/Icons/svg/Dashboard.svg"
import maindashboard from "../Assets/Icons/svg/MainDashboard.svg"
import addproject from "../Assets/Icons/svg/AddProject.svg"
import projectcharter from "../Assets/Icons/svg/ProjectCharter.svg"
import profile from "../Assets/Icons/svg/Profile.svg"
import { Dialog } from "@headlessui/react";
import LogoutButton from "../Components/Auth/LogoutDialog";

export const SideBar = () => {
    const [sideList, setSideList] = useState([
        { id: 11, name: "MainDashboard", link: "/#/maindashboard", icon: maindashboard },
        // { id: 1, name: "Dashboard", link: "/#/dashboard", icon: chat },
        { id: 2, name: "Project", link: "/#/project", icon: addproject },
        // { id: 3, name: "PMODashboard", link: "/#/pmodashboard", icon: dashboard },
        // { id: 4, name: "ProjectDashboard", link: "/#/projectdashboard", icon: dashboard },
        // { id: 5, name: "MemberDashboard", link: "/#/memberdashboard", icon: dashboard },
        { id: 5, name: "Component", link: "/#/projectcharter", icon: projectcharter },
        { id: 6, name: "Component", link: "/#/dailyreport", icon: chart },
        { id: 6, name: "Component", link: "/#/minutesofmeeting", icon: chat },
        { id: 7, name: "UserAccount", link: "/#/useraccount", icon: profile },
        // { id: 8, name: "About", link: "/#/about", icon: compass },
        // { id: 9, name: "Contact", link: "/#/contact", icon: compass },
        // { id: 10, name: "ProjectDashboard", link: "/#/projectdashboard", icon: key },
    ]);
    const [expanded, setExpanded] = useState(false);

    const Logo = () => {
        return (
            <>
                <a href="/#/maindashboard" className="flex flex-row items-center"> <img src={logo} alt="logo" className="w-8 h-8" /> </a>
                <p className="font-bold text-gray-500 dark:text-gray-200" style={{ fontSize: "7px" }}>CORE</p>
            </>
        );
    }

    const IconList = () => {
        return (
            <>
                {expanded ? null :
                    <ul className="space-y-8">
                        {sideList.map((item) => (
                            <a key={item.id} href={item.link} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                            </a>
                        ))}
                    </ul>
                }
            </>
        )
    }

    const Divider = () => {
        return (
            <div className="my-4 flex w-full border border-gray-200" />
        )
    }


    return (
        <div className="w-15 p-3 flex-1 bg-white shadow-lg rounded-xl h-full grid grid-cols-1 grid-rows-2">
            <div className="row-span-2">
                <div className="flex flex-col w-full items-center mt-0.5">
                    <Logo />
                    <Divider />
                    <IconList />
                    <Divider />
                </div>
            </div>
            <div>
                <LogoutButton />
            </div>
        </div>

    );
}
