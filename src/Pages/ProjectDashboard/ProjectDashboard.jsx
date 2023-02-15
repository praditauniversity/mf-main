import React, { useEffect, useState } from "react";
import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import DonutTaskOverviewProject from "../../Components/ApexCharts/TaskOverviewProject/chart";
import BudgetCard from "../../Components/Card/BudgetCard";
import CalendarTailwind from "../../Components/Card/CalendarTailwind/Calendar";
import HealthCard from "../../Components/Card/HealthCard";
import IssuesCard from "../../Components/Card/Issues/IssuesCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import ListboxGanttProjectDashboard from "../../Components/Card/PrintGanttProjectDashboard/ListboxGanttProjectDashboard";
import { PrintGantt, PrintListGanttName, PrintTask, PrintTaskList, useProject } from "../../Components/Gantt-Component/CustomActivityState";
import { Actual, Budget, Client, Cost, CostHealth, Danger, ProjectManager, ScheduleHealth, Variance } from "../../Components/GraphQL/ProjectByIdQueries";
import PrintGanttProjectDashboard from "../../Components/Card/PrintGanttProjectDashboard/PrintGanttProjectDashboard";

const ProjectDashboard = (props) => {
    const { value } = props;

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4 no-scrollbar">
            <div className="2xl:col-span-15 col-span-12 row-span-1">
                <div className="grid grid-cols-15 gap-2">
                    {/* Top row */}
                    <div className="md:col-span-9 col-span-15">
                        <ProjectOverviewCard
                            title1="Project Name"
                            description1="Project Anomaly"
                            title2="Project Manager"
                            description2={value != 0 ? <ProjectManager value={value} /> : "N/A"}
                            title3="Client"
                            description3={value != 0 ? <Client value={value} /> : "N/A"}
                        />
                    </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <HealthCard title="Health by Cost" description={<CostHealth value={value} />} colorIcon="text-error-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <HealthCard title="Health by Schedule" description={<ScheduleHealth value={value} />} colorIcon="text-tertiary-dark" /> </div>

                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Budget" description={<Budget value={value} />} colorIcon="text-secondary-800" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Cost" description={<Cost value={value} />} colorIcon="text-orange-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Actual" description={<Actual value={value} />} colorIcon="text-primary-800" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Danger" description={<Danger value={value} />} colorIcon="text-error-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Variance" description={<Variance value={value} />} colorIcon="text-tertiary-800" /> </div>


                    {/* Main row */}
                    <div className="md:col-span-5 col-span-15 row-span-1"> <ProjectProgressCard /> </div>
                    <div className="md:col-span-10 col-span-15 row-span-3"> <PrintGanttProjectDashboard projectID={value} title="Gantt Chart" /></div>
                    <div className="md:col-span-5 col-span-15 row-span-1"> <DonutTaskOverviewProject value={value} /> </div>
                    <div className="col-span-15">
                        {<PrintTaskList />}
                    </div>
                </div>
            </div>

            {/* Side Activities */}
            <div className="2xl:col-span-3 col-span-12">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                        <CalendarTailwind />
                    </div>
                    <div className="col-span-12">
                        <PrintTask />
                    </div>
                    <div className="col-span-12">
                        <IssuesCard />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default ProjectDashboard;