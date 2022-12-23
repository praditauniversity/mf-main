import React from 'react';
import plus from "../../Assets/Icons/svg/Plus.svg";

const Tasks = () => {
    return (
        <div
        className="flex flex-row justify-between align-center rounded-lg bg-background-mainframe border-primary hover:bg-table-light hover:border-l-8 active:bg-table-dark focus:bg-table-light mb-2 p-5 transition ease-out duration-100"
        >
            <div className="flex flex-col">
                <h6 className="text-sm ">Project Anomaly</h6>
                <h4 className="text-lg font-bold">Make moodboard</h4>
                <h6 className="text-xs text-grey ">21 Sep</h6>
            </div>

            <a href="#" className="flex justify-center align-center">
                <img src={plus} className="w-8"></img>
            </a>
            
            
        </div>
    );};

export default Tasks;