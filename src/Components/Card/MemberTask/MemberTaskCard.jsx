import React from "react";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchProject from "../../../Middleware/Fetchers/FetchProject";

const MemberTaskCard = () => {
    const projectData = FetchProject();
    const ganttData = FetchGantt();
    const activityData = FetchActivity();
    // const data = [
    //     { taskname: "UI for Desktop", projectname: "Solar Panel Smart Lab", projectmanager: "Alicia", deadline: "09/03/2022", progress: "50%" },
    //     { taskname: "UI for Mobile", projectname: "Project After Math", projectmanager: "Daniel", deadline: " 09/03/2022", progress: "50%" },
    //     { taskname: "Review the Project", projectname: "John Winter Wonderland Singapore", projectmanager: "Richard", deadline: " 09/03/2022", progress: "80%" },
    //     { taskname: "Create moodboard", projectname: "Reverie Product Management Application", projectmanager: "Linda", deadline: " 09/03/2022", progress: "20%" },
    // ]

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
            return (
                <div className="flex justify-center items-center h-full">
                    <p className="text-lg font-semibold">No task assigned</p>
                </div>
            )
        }
    }

    return (
        <div className="rounded-xl shadow-lg bg-white pt-6 h-[300px]">
            <div className="flex justify-start pl-8 pb-6">
                {/* <p className="text-lg font-semibold">Task List</p> */}
                {console.log("DATAAA LENGTHHHHH DASHBOARDDDDDD TABLEEE", dataLength)}
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
                            // data.map((item, index) =>
                            //     <tr key={index}>
                            //         <td align="center">{item.taskname}</td>
                            //         <td align="center">{item.projectname}</td>
                            //         <td align="center">{item.projectmanager}</td>
                            //         <td align="center">{item.deadline}</td>
                            //         <td align="center">{item.progress}</td>
                            //     </tr>
                            // )
                            projectData.map((project) => {
                                return ganttData.map((gantt) => {
                                    return activityData.map((activity, index) => {
                                        if (project.ID === gantt.project_id && gantt.ID === activity.gantt_id) {
                                            const deadline = new Date(activity.end_time);
                                            const deadlineYear = deadline.toLocaleDateString('en-US', {year: 'numeric'});
                                            const deadlineMonth = deadline.toLocaleDateString('en-US', {month: '2-digit'});
                                            const deadlineDay = deadline.toLocaleDateString('en-US', {day: '2-digit'});
                                            return (
                                                <tr key ={index}>
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