import React from 'react';
import subtask from "../../Assets/Icons/svg/Subtask.svg";

const NoTasks = ( ) => {
    return (
        <div
        tabIndex={0}
        className="flex flex-col justify-center align-center text-center rounded-lg bg-table-dark mb-2 p-8 border-none h-100"
        >
            <div className="flex justify-center align-center mb-8">
                <img src={subtask} className="w-20 text-center opacity-70"></img>
            </div>

            <div className="flex flex-col text-center">
                <h4 className="text-lg font-bold">No tasks in here!</h4>
                <h6 className="text-lg">While it’s empty, please take a rest :D</h6>
            </div>

            
            
        </div>
    );};

export default NoTasks;