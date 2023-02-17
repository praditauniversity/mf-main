import React from "react";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";

const ProjectListCard = () => {
    const project = FetchProjectByUserId();
    const ifProjectEmpty = () => {
        if (project.length === 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Project</div>
                            <div className="text-xl">Please add a project</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }
    const sliced = 6;
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
                        project.map((item, i) => {
                            const startProject = new Date(item.start_project);
                            const endProject = new Date(item.end_project);
                            const durationInDays = item.project_duration;

                            const startProjectYear = startProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const startProjectMonth = startProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const startProjectDay = startProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const endProjectYear = endProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const endProjectMonth = endProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const endProjectDay = endProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const variance = item.budget - item.cost_actual;

                            return (
                                <tr key={i}>
                                    <td align="center">{item.name}</td>
                                    <td align="center">{item.project_manager ? item.project_manager : "N/A"}</td>
                                    <td align="center">{startProjectYear}/{startProjectMonth}/{startProjectDay} - {endProjectYear}/{endProjectMonth}/{endProjectDay}</td>
                                    <td align="center">{durationInDays} Days</td>
                                    <td align="center">{item.total_man_power}</td>
                                    <td align="center">{item.currency_symbol ? item.currency_symbol : "N/A"} {item.budget}</td>
                                    <td align="center">{item.currency_symbol ? item.currency_symbol : "N/A"} {item.cost_actual}</td> {/*Invoice */}
                                    <td align="center">{item.currency_symbol ? item.currency_symbol : "N/A"} {variance}</td> {/*Cash In */}
                                    <td align="center">{item.currency_symbol ? item.currency_symbol : "N/A"} {item.cost_plan}</td> {/*Outstanding Balance */}
                                    <td align="center">{item.progress_percentage}%</td>
                                </tr>
                            )
                        })
                            .slice(0, sliced)
                    }
                    {ifProjectEmpty()}
                </tbody>
            </table>
            { project.length > sliced ?
                <div className="flex justify-end pr-8 py-6">
                    <button className="font-semibold text-sm text-primary">
                        <a href="/#/projectcharter">View All Projects</a>
                    </button>
                </div>
              : null
            }
        </div>
    )
}

export default ProjectListCard;