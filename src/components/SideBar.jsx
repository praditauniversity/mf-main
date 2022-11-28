import React, {useState} from "react";
import logo from "/public/image/svg/Logo.svg";
import chat from "/public/image/svg/Chat.svg";
// import user from "/public/image/svg/User.svg";
import key from "/public/image/svg/Key.svg";
import chart from "/public/image/svg/Progress.svg";
import compass from "/public/image/svg/Compass.svg"
import dashboard from "/public/image/svg/Dashboard.svg"

export const SideBar = () => {
    const [sideList, setSideList] = useState([
        {
            id: 1,
            name: "Dashboard",
            link: "/#/project",
            icon: chat
        },
        {
            id: 2,
            name: "Project",
            link: "/#/project",
            icon: chart
        },
        {
            id: 3,
            name: "Dashboard",
            link: "/#/dashboard",
            icon: dashboard
        },
        {
            id: 4,
            name: "About",
            link: "/#/about",
            icon: compass
        },
        {
            id: 5,
            name: "Contact",
            link: "/#/contact",
            icon: compass
        },
        {
            id: 6,
            name: "Login",
            link: "/#/login",
            icon: key
        },
    ]);
    const [expanded, setExpanded] = useState(false);

    const Logo = () => {
        return (
            <>
                <a href="/#/project" className="flex flex-row items-center"> <img src={logo} alt="logo" className="w-8 h-8" /> </a>
                <p className="font-bold text-gray-500 dark:text-gray-200" style={{ fontSize: "7px" }}>CORE</p>
            </>
        );
    }

    const IconList = () => {
        return(
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


                    {/* <ul className="space-y-2">
                       {sideList.map((item) => (
                        <a key={item.id} href={item.link} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FontAwesomeIcon icon={item.icon} color="#888" />
                            <span className="ml-3">{item.name}</span>
                        </a>
                       ))}
                </ul> */}
            </>
        )
    }

    const Divider = () => {
        return(
            <div className="my-4 flex w-full border border-gray-200" />
        )
    }

    return (
        <div className="w-15 p-3 flex-1 bg-white shadow-sm rounded-xl h-full grid grid-cols-1 grid-rows-2">
                <div className="row-span-1">
                    <div className="flex flex-col w-full items-center mt-0.5">
                        <Logo />
                        <Divider />
                        <IconList />
                        <Divider />
                    </div>
                </div>
                <div className="row-span-1 flex items-end">
                    <a href="/#/login" className="flex flex-col items-center font-normal text-gray-900 rounded-lg">
                        <img src={compass} alt="Logout" className="w-6 h-6" />
                    </a>
                </div>
        </div>

    );
}
