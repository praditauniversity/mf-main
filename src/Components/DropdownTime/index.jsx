import React, {} from "react";
import Dropdown from "../Dropdown";

const DropdownTime = () => {
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

    // const gender = [
    //     { id: 1, name: 'male', unavailable: false },
    //     { id: 2, name: 'female', unavailable: false },
    // ]

    const [value1, setValueStatus] = React.useState('month');
    return (
        <div className="flex flex-col items-center">
            <div>
                <Dropdown options={list} label="Time Option" />
            </div>
        </div>
    );
}
export default DropdownTime;