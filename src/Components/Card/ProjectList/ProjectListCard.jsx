import React from "react";
import FetchProject from "../../../Middleware/Fetchers/FetchProject";

const ProjectListCard = () => {
    // const data = [
    //     { projectname: "Solar Panel Smart Lab", projectmanager: "Rendha Vateria", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "50%" },
    //     { projectname: "Project After Math", projectmanager: "Valeriy Hardin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "50%" },
    //     { projectname: "Winter Wonderland Singapore", projectmanager: "John Heraldin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "80%" },
    //     { projectname: "Reverie Product Management Application", projectmanager: "Gerald Revalin", plannedinterval: "11/10/2021 - 09/03/2022", duration: "365 Days", manpower: "2/5", projectbudget:"IDR 84.000.000.000", invoice:"IDR 40.000.000.000", cashin:"IDR 44.000.000.000", outstandingbalance:"IDR 40.000.000", progress: "20%" },
    // ]
    const project = FetchProject();
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6 overflow-x-auto">
            <div className="flex justify-start pl-8 pb-6">
                <p className="text-lg font-semibold">Project List</p>
            </div>
            <table className="table table-zebra table-hover w-full">
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
                        // data.map((item, i) =>
                        //     <tr key={i}>
                        //         <td align="center">{item.projectname}</td>
                        //         <td align="center">{item.projectmanager}</td>
                        //         <td align="center">{item.plannedinterval}</td>
                        //         <td align="center">{item.duration}</td>
                        //         <td align="center">{item.manpower}</td>
                        //         <td align="center">{item.projectbudget}</td>
                        //         <td align="center">{item.invoice}</td>
                        //         <td align="center">{item.cashin}</td>
                        //         <td align="center">{item.outstandingbalance}</td>
                        //         <td align="center">{item.progress}</td>
                        //     </tr>
                        // )
                        project.map((item, i) => {
                            const startProject = new Date(item.start_project);
                            const endProject = new Date(item.end_project);
                            // const duration = endProject - startProject;
                            // const durationInDays = Math.round(duration / (1000 * 3600 * 24));
                            const durationInDays = item.project_duration;

                            const startProjectYear = startProject.toLocaleDateString('en-US', {year: 'numeric'});
                            const startProjectMonth = startProject.toLocaleDateString('en-US', {month: '2-digit'});
                            const startProjectDay = startProject.toLocaleDateString('en-US', {day: '2-digit'});
                            
                            const endProjectYear = endProject.toLocaleDateString('en-US', {year: 'numeric'});
                            const endProjectMonth = endProject.toLocaleDateString('en-US', {month: '2-digit'});
                            const endProjectDay = endProject.toLocaleDateString('en-US', {day: '2-digit'});

                            const variance = item.budget - item.cost_actual;

                            return (
                                <tr key={i}>
                                    <td align="center">{item.name}</td>
                                    <td align="center">{item.project_manager}</td>
                                    <td align="center">{startProjectYear}/{startProjectMonth}/{startProjectDay} - {endProjectYear}/{endProjectMonth}/{endProjectDay}</td>
                                    <td align="center">{durationInDays} Days</td>
                                    <td align="center">{item.total_man_power}</td>
                                    <td align="center">{item.currency_symbol} {item.budget}</td>
                                    <td align="center">{item.currency_symbol} {item.cost_actual}</td> {/*Invoice */}
                                    <td align="center">{item.currency_symbol} {variance}</td> {/*Cash In */}
                                    <td align="center">{item.currency_symbol} {item.cost_plan}</td> {/*Outstanding Balance */}
                                    <td align="center">{item.progress_percentage}%</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProjectListCard;