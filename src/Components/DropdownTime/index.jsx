import React from "react";
import Dropdown from "../Dropdown";
import DropdownButton from "./Dropdown";

const list = [
    {
        id: 1,
        name: 'Today',
        value: 'day',
        link: '/belomada',
    },
    {
        id: 2,
        name: 'Last Month',
        value: 'month',
        link: '/belomada',
    },
    {
        id: 3,
        name: 'Last Year',
        value: 'year',
        link: '/belomada',
    },
];

const DropdownTime = () => {
    return (
        <div className="flex flex-col items-center">
            <div>
                <Dropdown options={list} label="Time Settings" />
            </div>
        </div>
    );
}
export default DropdownTime;