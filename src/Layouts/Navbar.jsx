import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Icons/svg/Logo.svg";

const LoginOrLogoutButton = () => {
    const [islogin, setIslogin] = useState(sessionStorage.getItem('token') !== null);
    const Logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href("/#/login");
        setIslogin(false);
    }
    if (islogin) {
        return (
            <div>
                <Link to="/" onClick={Logout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white mt-4 lg:mt-0">Logout</Link>
            </div>
        );
    }
    return (
        <div>
            <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white mt-4 lg:mt-0">Login</Link>
        </div>
    );
}


const Navigation = () => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden);
    const items = [
        {
            name: "Home",
            link: "/project",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Contact",
            link: "/contact",
        },
        {
            name: "Dashboard",
            link: "/dashboard",
        },
        {
            name: "Login",
            link: "/login",
        },
    ];

    const Hamburger = () => {
        return (
            <div className="block lg:hidden">
                <button onClick={toggleHidden} className="flex items-center px-3 py-2  text-indigo-700 border-indigo-400 hover:text-indigo-900">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
        );
    }

    const Logo = () => {
        return (
            <>
                <div className="flex items-center flex-shrink-0 text-indigo-800 mr-6 lg:h-full lg:hidden lg:invisible ">
                    <img src={logo} alt="logo" className="w-12 h-12" />
                    <div className="flex-1 ml-2 m-2">
                        <a className="font-bold uppercase tracking-widest">CORE</a>
                        <p className="text-xs opacity-70 uppercase tracking-wide"> General </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <nav className="flex items-center justify-between flex-wrap rounded-md bg-white lg:bg-white p-2 lg:p-3 border-gray-100 shadow-sm lg:mt-2 lg:mr-2 lg:hidden">

            <Logo />
            <Hamburger />

            <div className={`${hidden ? 'hidden' : ''} w-full block flex-grow lg:flex lg:items-center lg:w-auto`} >
                <div className="text-md lg:flex-grow">
                    {items.map((item) => (
                        <Link onClick={toggleHidden} to={item.link} key={item.name} className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-indigo-800 ml-4">
                            {item.name}
                        </Link>
                    ))}
                </div>

            </div>
        </nav>
    );
}


export default function NavBar() {
    return (
        <>
            <Navigation />
        </>
    );
}