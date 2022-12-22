import React from "react";
import DropdownButton from "./Dropdown";

const DropdownTime = () => {
    return (
        <div className="flex flex-col items-center">
            <div>
                <DropdownButton options={list} label="Time Option" />
            </div>
        </div>
    );
}
export default DropdownTime;