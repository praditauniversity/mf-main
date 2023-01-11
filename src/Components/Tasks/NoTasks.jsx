import React from 'react';
import Order from "../../Assets/Icons/svg/Order.svg";

const NoTasks = ( props ) => {
    const { height } = props
    return (
        <div
        tabIndex={0}
        className={"flex flex-col justify-center align-center text-center rounded-lg bg-table-dark mb-2 p-8 border-none h-" + height}
        >
            <div className="flex justify-center align-center mb-3">
                <img src={Order} className="w-50 text-center opacity-70"></img>
            </div>

            <div className="flex flex-col text-center">
                <h4 className="text-lg font-bold">No tasks for now.</h4>
                <h6 className="text-lg">Take your time.</h6>
            </div>

            
            
        </div>
    );};

export default NoTasks;