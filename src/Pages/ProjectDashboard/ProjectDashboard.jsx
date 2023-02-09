import React, { useEffect, useState } from "react";
import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import DonutTaskOverviewProject from "../../Components/ApexCharts/TaskOverviewProject/chart";
import BudgetCard from "../../Components/Card/BudgetCard";
import CalendarTailwind from "../../Components/Card/CalendarTailwind/Calendar";
import HealthCard from "../../Components/Card/HealthCard";
import IssuesCard from "../../Components/Card/Issues/IssuesCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import { PrintGantt, PrintTask, PrintTaskList } from "../../Components/Gantt-Component/CustomActivityState";
import { Actual, Budget, Client, Cost, CostHealth, Danger, ProjectManager, ScheduleHealth, Variance } from "../../Components/GraphQL/ProjectByIdQueries";

const ProjectDashboard = (props) => {

    const { data } = props;
    const [datadata, setDatadata] = React.useState(data);
    useEffect(() => {
        setDatadata(data);
    }, [data]);
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
                            description2={datadata != 0 ? <ProjectManager value={datadata} /> : "N/A"}
                            title3="Client"
                            description3={datadata != 0 ? <Client value={datadata} /> : "N/A"}
                        />
                    </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <HealthCard title="Health by Cost" description={<CostHealth value={datadata} />} colorIcon="text-error-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <HealthCard title="Health by Schedule" description={<ScheduleHealth value={datadata} />} colorIcon="text-tertiary-dark" /> </div>

                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Budget" description={<Budget value={datadata} />} colorIcon="text-secondary-800" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Cost" description={<Cost value={datadata} />} colorIcon="text-orange-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Actual" description={<Actual value={datadata} />} colorIcon="text-primary-800" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Danger" description={<Danger value={datadata} />} colorIcon="text-error-dark" /> </div>
                    <div className="md:col-span-3 col-span-15 row-span-1"> <BudgetCard title="Variance" description={<Variance value={datadata} />} colorIcon="text-tertiary-800" /> </div>


                    {/* Main row */}
                    <div className="md:col-span-5 col-span-15 row-span-1"> <ProjectProgressCard /> </div>
                    <div className="md:col-span-10 col-span-15 row-span-3"> <PrintGantt title="Gantt Chart" /> </div>
                    {/* <div className="md:col-span-5 col-span-15 row-span-1"> <TaskOverviewCardProject /> </div> */}
                    <div className="md:col-span-5 col-span-15 row-span-1"> <DonutTaskOverviewProject value={datadata} /> </div>
                    <div className="col-span-15">
                        {/* <TaskListCard />  */}
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
                        {/* <UpcomingTaskCard /> */}
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