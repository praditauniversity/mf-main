import React from "react";

const TaskListCard = (props) => {
    const { dataTask } = props;

    const filler = () => {
        if (dataTask.length > 0) {
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400 opacity-10 hover:opacity-40 hover:cursor-pointer">
                            <div className="text-4xl font-bold">Other Task</div>
                            <div className="text-md">Add another task?</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    const ifTaskDataEmpty = () => {
        if (dataTask.length === 0) {
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Task</div>
                            <div className="text-xl">Please add a task</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }
    const sliced = 10;
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <div className="flex justify-start pl-8 pb-6">
                <p className="text-lg font-semibold">Task List</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover h-1/3">
                    <thead>
                        <tr>
                            <th align="center">Task Name</th>
                            <th align="center">Start Date</th>
                            <th align="center">End Date</th>
                            <th align="center">Duration</th>
                            <th align="center">Status</th>
                            <th align="center">Priority</th>
                            <th align="center">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataTask.map((task) => {
                                const startDate = new Date(task.start_time);
                                const endDate = new Date(task.end_time);
                                const durationInDays = task.activity_duration;

                                const startDateYear = startDate.toLocaleDateString('en-US', {year: 'numeric'});
                                const startDateMonth = startDate.toLocaleDateString('en-US', {month: '2-digit'});
                                const startDateDay = startDate.toLocaleDateString('en-US', {day: '2-digit'});
                                
                                const endDateYear = endDate.toLocaleDateString('en-US', {year: 'numeric'});
                                const endDateMonth = endDate.toLocaleDateString('en-US', {month: '2-digit'});
                                const endDateDay = endDate.toLocaleDateString('en-US', {day: '2-digit'});

                                //capitalizeFirstLetter
                                const priority = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
                                
                                return (
                                    <tr key={task.ID}>
                                        <td align="center">{task.name}</td>
                                        <td align="center">{startDateYear}/{startDateMonth}/{startDateDay}</td>
                                        <td align="center">{endDateYear}/{endDateMonth}/{endDateDay}</td>
                                        <td align="center">{durationInDays} Days</td>
                                        <td align="center">{task.phase.name ? task.phase.name : "N/A"}</td>
                                        <td align="center">{priority ? priority : "N/A"}</td>
                                        <td align="center">{task.progress_percentage % 1 === 0 ? task.progress_percentage + "%" : task.progress_percentage.toFixed(2) + "%"}</td>
                                    </tr>  
                                )
                            })
                                .slice(0, sliced)
                        }
                        {ifTaskDataEmpty()}
                    </tbody>
                </table>
                { dataTask.length > sliced ?
                    <div className="flex justify-end pr-8 py-6">
                        <button className="font-semibold text-sm text-primary">
                            <a href={`/#/project-list/${localStorage.getItem('projectID')}/gantt/${localStorage.getItem('ganttID')}/gantt-chart`}>View All Tasks</a>
                        </button>
                    </div>
                : filler()
                }
            </div>

        </div>
    )
}

export default TaskListCard;