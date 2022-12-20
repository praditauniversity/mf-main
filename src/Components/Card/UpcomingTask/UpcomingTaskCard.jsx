import React from "react";

const useStyles = () => ({
    gridHeight: {
        height: '1000px'
    }
})

const UpcomingTaskCard = () => {
    const classes = useStyles();

    return (
        <div className="rounded-xl shadow-sm bg-white">
            <div>
                <div className="pt-8 pb-8 pl-12 pr-12 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-lg font-semibold ">Upcoming Task</p>
                    </div>
                </div>
            </div>
            <div className="h-96 border-t-2 border-b-2">
                <div className="pt-10 pb-6 pl-12 pr-12">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-base font-semibold ">[BE] CRUD Untuk Activity</p>
                        </div>
                        <div className="flex justify-end">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn m-1">:</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <p className="text-xs opacity-70 align-text-bottom">Oct 18</p>
                    </div>
                </div>
            </div>
            <div className="pt-8 pb-8 pl-12 pr-12 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    Detail Project Overview
                </button>
            </div>
        </div>
    )

}

export default UpcomingTaskCard;