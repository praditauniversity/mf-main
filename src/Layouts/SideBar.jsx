import React, { useState } from "react";
import logo from "../Assets/Icons/png/Logo.png";
import chat from "../Assets/Icons/svg/Chat.svg";
import addproject from "../Assets/Icons/svg/AddProject.svg";
import maindashboard from "../Assets/Icons/svg/MainDashboard.svg";
import profile from "../Assets/Icons/svg/Profile.svg";
import chart from "../Assets/Icons/svg/Progress.svg";
import LogoutButton from "../Components/Auth/LogoutDialog";
import Stat from "../Assets/Icons/svg/Stat.svg";
import Key from "../Assets/Icons/svg/Key.svg";
import MOM from "../Assets/Icons/svg/MOM.svg"
import DR from "../Assets/Icons/svg/DailyReport.svg"

export const SideBar = () => {
    const [sideList, setSideList] = useState([
        { id: 0, name: "MainDashboard", link: "/#/maindashboard", icon: maindashboard, tooltip: "Main" },
        { id: 5, name: "ProjectCharter", link: "/#/projectcharter", icon: addproject, tooltip: "Project Charter" },
        { id: 6, name: "DailyReport", link: "/#/dailyreport", icon: DR, tooltip: "Daily Report" },
        { id: 7, name: "MinuteofMeeting", link: "/#/minutesofmeeting", icon: MOM, tooltip: "Minute of Meeting" },
        { id: 8, name: "UserAccount", link: "/#/useraccount", icon: profile, tooltip: "User Account" },
        { id: 12, name: "MasterPageSuperAdmin", link: "/#/masterpage/superadmin", icon: Key, tooltip: "Master Page Super Admin" },
        { id: 13, name: "MasterPageAdmin", link: "/#/masterpage/admin", icon: Stat, tooltip: "Master Page Admin" },
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
                                <div className="tooltip tooltip-right z-40" data-tip={item.tooltip}>
                                    <img src={item.icon} alt={item.name} className="w-6 h-6" />
                                </div>
                            </a>
                        ))}
                    </ul>
                }
                {expanded ?
                    <ul className="space-y-8">
                        {sideList.map((item) => (
                            <a key={item.id} href={item.link} className="flex flex-col text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                {/* text should be on the right side of the icon */}
                                <div className="flex items-center" >
                                    <img src={item.icon} alt={item.name} className="w-6 h-6" />
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white ml-2">{item.name}</p>
                                </div>
                            </a>
                        ))}
                    </ul>
                    : null
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
        <div className="w-15 p-3 flex-1 bg-white shadow-lg rounded-xl h-full grid grid-cols-1 grid-rows-2 ">
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
