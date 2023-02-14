import React from "react";

const UpcomingTaskCard = (props) => {
    const { dataTask } = props;

    const upcomingTaskFilter = dataTask.filter((item) => {
        const todayDate = new Date();
        const startDate = new Date(item.start_time);
        const endDate = new Date(item.end_time);
        const status = item.phase.name;
        return startDate > todayDate && endDate > todayDate/* && status === "Todo"*/;
    });

    const upcomingTaskLength = upcomingTaskFilter.length;

    const ifUpcomingTaskEmpty = () => {
        if (upcomingTaskLength === 0) {
            // fill the table with white space
            return (
                <div className="h-full" >
                    <div colSpan="7" className="text-center py-24">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Upcoming Task</div>
                            <div className="text-xl">Please take your time</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function MappingData() {
        const filteredTasks = upcomingTaskFilter
            .sort((a, b) => {
                return new Date(a.start_time) - new Date(b.start_time);
            })
            .slice(0, 6);

        return (
            <>
                {filteredTasks.map((task) => {
                    const todayDate = new Date();
                    const date = new Date(task.start_time);
                    const status = task.phase.name;
                    const dateMonth = date.toLocaleDateString('en-US', { month: 'long' });
                    const dateDay = date.toLocaleDateString('en-US', { day: 'numeric' });

                    const subStringMonth = dateMonth.substring(0, 3);

                    return (
                        <div className="pt-4">
                            <div className="flex justify-between">
                                <div className="flex justify-start">
                                    <p className="text-base font-semibold {">{task.name}</p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="dropdown dropdown-button dropdown-end">
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
                })
                    // .slice(0, 4)
                }
                {ifUpcomingTaskEmpty()}
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
                    {localStorage.getItem('projectID') !== null && localStorage.getItem('ganttID') !== null ?
                        (
                            <a href={`/#/project-list/${localStorage.getItem('projectID')}/gantt/${localStorage.getItem('ganttID')}/gantt-chart`}>View All Tasks</a>
                        ) : (
                            <a onClick={() => { window.alert("There is no task to be shown") }}>View All Tasks</a>
                        )
                    }
                </button>
            </div>
        </div>
    )

}

export default UpcomingTaskCard;