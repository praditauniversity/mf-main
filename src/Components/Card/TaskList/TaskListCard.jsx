import React from "react";

const TaskListCard = () => {
    const data = [
        { taskname: "Initiation", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "Done", priority: "Urgent", assignee: "Rendha Vateria", progress: "100%" },
        { taskname: "Planning", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "Done", priority: "Normal", assignee: "Rendha Vateria", progress: "100%" },
        { taskname: "Research", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "100%" },
        { taskname: "Execution", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "80%" },
        { taskname: "Testing", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "60%" },
        { taskname: "Evaluation", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "40%" },
        { taskname: "Closing", startdate: "11/10/2021", enddate: "11/10/2021", duration: "100 Days", status: "In Progress", priority: "Normal", assignee: "Rendha Vateria", progress: "20%" },
    ]
    return (
        <div className="rounded-xl shadow-sm bg-white pt-6">
            <div className="flex justify-start pl-8 pb-6">
                <p className="text-lg font-semibold">Task List</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover">
                    <thead>
                        <tr>
                            <th align="center">Task Name</th>
                            <th align="center">Start Date</th>
                            <th align="center">End Date</th>
                            <th align="center">Duration</th>
                            <th align="center">Status</th>
                            <th align="center">Priority</th>
                            <th align="center">Assignee</th>
                            <th align="center">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <td align="center">{item.taskname}</td>
                                    <td align="center">{item.startdate}</td>
                                    <td align="center">{item.enddate}</td>
                                    <td align="center">{item.duration}</td>
                                    <td align="center">{item.status}</td>
                                    <td align="center">{item.priority}</td>
                                    <td align="center">{item.assignee}</td>
                                    <td align="center">{item.progress}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TaskListCard;