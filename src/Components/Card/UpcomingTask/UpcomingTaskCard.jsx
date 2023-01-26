import React from "react";

//ini gabisa
const useStyles = () => ({
    gridHeight: {
        height: '1000px'
    }
})


const UpcomingTaskCard = (props) => {
    const classes = useStyles();
    const { dataTask } = props;

    function MappingData() {

        return (
            <>
                {dataTask.map((task) => {
                    const todayDate = new Date();
                    const date = new Date(task.start_time);
                    const status = task.phase.name;
                    if (date > todayDate && status === "Todo") {
                        const dateMonth = date.toLocaleDateString('en-US', {month: 'long'});
                        const dateDay = date.toLocaleDateString('en-US', {day: 'numeric'});

                        const subStringMonth = dateMonth.substring(0, 3);

                        return (
                            <div className="pt-4">
                                <div className="flex justify-between">
                                    <div className="flex justify-start">
                                        <p className="text-base font-semibold {">{task.name}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="dropdown dropdown-button dropdown-end">
                                            {/* <button tabIndex={0} className="btn btn-outline text-xs">:</button> */}
                                            <button tabIndex={task.ID} className="text-base font-black">:</button>
                                            <ul tabIndex={task.ID} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                                <li><a>Edit</a></li>
                                                <li><a>Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <p className="text-xs opacity-70 align-text-bottom">{subStringMonth}, {dateDay}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            // <p className="text-base font-semibold ">No Upcoming Task</p>
                            <></>
                        )
                    }
                })}
            </>
        );
    }

    return (
        <div className="rounded-xl shadow-lg bg-white">
            <div>
                <div className="pt-8 pb-8 pl-12 pr-12 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-lg font-semibold ">Upcoming Task</p>
                    </div>
                </div>
            </div>
            <div className="h-96 border-t-2 border-b-2">
                <div className="pt-6 pb-6 pl-12 pr-12">
                    {MappingData()}
                </div>
            </div>
            <div className="pt-8 pb-8 pl-12 pr-12 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    View All Tasks
                </button>
            </div>
        </div>
    )

}

export default UpcomingTaskCard;