import React from "react";

const ProjectListCard = () => {
    const data = [
        { projectname: "Solar Panel Smart Lab", projectmanager: "Rendha Vateria", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "50%" },
        { projectname: "Project After Math", projectmanager: "Valeriy Hardin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "50%" },
        { projectname: "Winter Wonderland Singapore", projectmanager: "John Heraldin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "80%" },
        { projectname: "Reverie Product Management Application", projectmanager: "Gerald Revalin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "20%" },
    ]
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th align="center">Project Name</th>
                        <th align="center">Project Manager</th>
                        <th align="center">Planned Interval</th>
                        <th align="center">Duration</th>
                        <th align="center">Manpower</th>
                        <th align="center">Project Budget</th>
                        <th align="center">Invoice</th>
                        <th align="center">Cash In</th>
                        <th align="center">Oustanding Balance</th>
                        <th align="center">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, i) =>
                            <tr key={i}>
                                <td align="center">{item.projectname}</td>
                                <td align="center">{item.projectmanager}</td>
                                <td align="center">{item.plannedinterval}</td>
                                <td align="center">{item.duration}</td>
                                <td align="center">{item.manpower}</td>
                                <td align="center">{item.projectbudget}</td>
                                <td align="center">{item.invoice}</td>
                                <td align="center">{item.cashin}</td>
                                <td align="center">{item.outstandingbalance}</td>
                                <td align="center">{item.progress}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProjectListCard;