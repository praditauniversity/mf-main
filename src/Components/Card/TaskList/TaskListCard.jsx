import React from "react";

const TaskListCard = (props) => {
    const { dataTask } = props;
    // const data = [
    //     { taskname: "Initiation", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "Done", priority: "Urgent", assignee: "Rendha Vateria", progress: "100%" },
    //     { taskname: "Planning", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "Done", priority: "Normal", assignee: "Rendha Vateria", progress: "100%" },
    //     { taskname: "Research", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "100%" },
    //     { taskname: "Execution", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "80%" },
    //     { taskname: "Testing", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "60%" },
    //     { taskname: "Evaluation", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "40%" },
    //     { taskname: "Closing", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "20%" },
    // ]

    const filler = () => {
        if (dataTask.length > 0) {
            // fill the table with white space
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
            // fill the table with white space
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
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6 h-[575px]">
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
                            {/* <th align="center">Assignee</th> */}
                            <th align="center">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataTask.map((task) => {
                                const startDate = new Date(task.start_time);
                                const endDate = new Date(task.end_time);
                                const durationInDays = task.activity_duration;
                                // const duration = endDate - startDate;
                                // const durationInDays = Math.round(duration / (1000 * 3600 * 24));

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
                                        {/* <td align="center">Rendha Vateria</td> */}
                                        <td align="center">{task.progress_percentage % 1 === 0 ? task.progress_percentage + "%" : task.progress_percentage.toFixed(2) + "%"}</td>
                                    </tr>  
                                )
                            })
                        }
                        {ifTaskDataEmpty()}
                        {filler()}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TaskListCard;