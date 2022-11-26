import React, { useState }from "react";
import {Link} from "react-router-dom";

const Navigation = () => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden);
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-700 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/" className="font-semibold text-xl tracking-tight">OS</Link>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleHidden} className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={`${hidden ? 'hidden' : ''} w-full block flex-grow lg:flex lg:items-center lg:w-auto`} >
                <div className="text-sm lg:flex-grow">
                    <Link onClick={toggleHidden} to="/" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
                        Home
                    </Link>
                    <Link onClick={toggleHidden} to="/activity" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
                        Activity
                    </Link>
                    <Link onClick={toggleHidden} to="/project" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
                        Project
                    </Link>
                    <Link onClick={toggleHidden} to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
                        About
                    </Link>
                    <Link onClick={toggleHidden} to="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white">
                        Contact
                    </Link>
                </div>
                <div>
                    <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white mt-4 lg:mt-0">Login</Link>
                </div>
            </div>
        </nav>
    );
}


function NavBarLink(){
    return (
        <div className="flex w-full">
            <Link to="/" className="no-underline black">
                <div className="pr-2">HOME</div>
            </Link>
            <Link to="/project" className="no-underline black">
                <div className="pr-2">PROJECT</div>
            </Link>
            <Link to="/activity" className="no-underline black">
                <div className="pr-2">ACTIVITY</div>
            </Link>
        </div>
    );
}


export default function NavBar() {
    return (
        <>
            {Navigation()}
        </>
    );
}