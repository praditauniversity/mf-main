import React from "react";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";

const MemberTaskCard = () => {
    const projectData = FetchProjectByUserId();
    const ganttData = FetchGantt();
    const activityData = FetchActivity();
    const dataLength = activityData.filter((activity) => {
        return ganttData.filter((gantt) => {
            return gantt.ID === activity.gantt_id
        }).filter((gantt) => {
            return projectData.filter((project) => {
                return project.ID === gantt.project_id
            }).length > 0
        }).length > 0
    }).length

    const ifMemberTaskEmpty = () => {
        if (dataLength === 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Task Assigned</div>
                            <div className="text-xl">Please take your time</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <div className="flex justify-start pl-8 pb-6">
                <p className="text-lg font-semibold">Member Task List</p>
                {console.log("Data Length in Member Task :", dataLength)}
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover">
                    <thead>
                        <tr>
                            <th align="center">Task Name</th>
                            <th align="center">Project Name</th>
                            <th align="center">Project Manager</th>
                            <th align="center">Deadline</th>
                            <th align="center">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projectData.map((project) => {
                                return ganttData.map((gantt) => {
                                    return activityData.map((activity, index) => {
                                        if (project.ID === gantt.project_id && gantt.ID === activity.gantt_id) {
                                            const deadline = new Date(activity.end_time);
                                            const deadlineYear = deadline.toLocaleDateString('en-US', { year: 'numeric' });
                                            const deadlineMonth = deadline.toLocaleDateString('en-US', { month: '2-digit' });
                                            const deadlineDay = deadline.toLocaleDateString('en-US', { day: '2-digit' });
                                            return (
                                                <tr key={index}>
                                                    <td align="center">{activity.name}</td>
                                                    <td align="center">{project.name}</td>
                                                    <td align="center">{project.project_manager}</td>
                                                    <td align="center">{deadlineYear}/{deadlineMonth}/{deadlineDay}</td>
                                                    <td align="center">{activity.progress_percentage}%</td>
                                                </tr>
                                            )
                                        }
                                    })
                                })
                            })
                        }
                        {ifMemberTaskEmpty()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MemberTaskCard;