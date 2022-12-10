import React from "react";
import UserCard from "../../Components/Card/UserCard";
import Dropdown from "../../Components/Dropdown";
import { SelectorField } from "../../Components/Input/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
    const list = [
        {
            id: 1,
            name: 'Member Dashboard',
            link: '/memberdashboard',
        },
        {
            id: 2,
            name: 'PMO Dashboard',
            link: '/pmodashboard',
        },
        {
            id: 3,
            name: 'Project Dashboard',
            link: '/projectdashboard',
        },
    ];

    const gender = [
        { id: 1, name: 'male', unavailable: false },
        { id: 2, name: 'female', unavailable: false },
    ]

    return (
        <div className="flex flex-col items-center">
            <div>
                <Dropdown options={list} label="Dropdown" />
            </div>
        </div>
    );
}
export default AboutPage;