import React from "react";

const MemberTaskCard = () => {
    const data = [
        { taskname: "UI for Desktop", projectname: "Solar Panel Smart Lab", projectmanager: "Alicia", deadline: "09/03/2022", progress: "50%" },
        { taskname: "UI for Mobile", projectname: "Project After Math", projectmanager: "Daniel", deadline: " 09/03/2022", progress: "50%" },
        { taskname: "Review the Project", projectname: "John Winter Wonderland Singapore", projectmanager: "Richard", deadline: " 09/03/2022", progress: "80%" },
        { taskname: "Create moodboard", projectname: "Reverie Product Management Application", projectmanager: "Linda", deadline: " 09/03/2022", progress: "20%" },
    ]
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <div className="flex justify-start pl-8 pb-6">
                {/* <p className="text-lg font-semibold">Task List</p> */}
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
                            data.map((item, index) =>
                                <tr key={index}>
                                    <td align="center">{item.taskname}</td>
                                    <td align="center">{item.projectname}</td>
                                    <td align="center">{item.projectmanager}</td>
                                    <td align="center">{item.deadline}</td>
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

export default MemberTaskCard;