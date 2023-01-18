import React, { useEffect, useState } from "react";

import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import TaskOverviewCard from "../../Components/ApexCharts/TaskOverview";
import BudgetCard from "../../Components/Card/BudgetCard";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import HealthCard from "../../Components/Card/HealthCard";
import IssuesCard from "../../Components/Card/Issues/IssuesCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import { PrintGantt, PrintTask, PrintTaskList } from "../../Components/Gantt-Component/CustomActivityState";
import { Actual, Budget, Client, Cost, CostHealth, Danger, ProjectManager, ScheduleHealth, Variance } from "../../Components/GraphQL/ProjectByIdQueries";

const ProjectDashboardPage = () => {
    const [savedOption, setSavedOption] = React.useState(localStorage.getItem('projectID')/* ? localStorage.getItem('projectID') : "1"*/);

    useEffect(() => {
        savedOption !=0 ? setSavedOption(savedOption) : setSavedOption(0);
        console.log("savedOption", savedOption);
        // Update the savedOption value in local storage whenever it changes
        // localStorage.setItem('savedOption', savedOption);
    }, []);

    const [project, setProject] = useState([
        { id: 1, name: "Project Anomaly 1", description: "This is project anomaly 1, totally the first one.", link: "/#/projectdashboard/1" },
        { id: 2, name: "Project Anomaly 2", description: "This is project anomaly 2, totally the second one.", link: "/#/projectdashboard/2" },
        { id: 3, name: "Project Anomaly 3", description: "This is project anomaly 3, totally the third one.", link: "/#/projectdashboard/3" },
        { id: 4, name: "Project Anomaly 4", description: "This is project anomaly 4, totally the fourth one.", link: "/#/projectdashboard/4" },
        { id: 5, name: "Project Anomaly 5", description: "This is project anomaly 5, totally the fifth one.", link: "/#/projectdashboard/5" },
        { id: 6, name: "Project Anomaly 6", description: "This is project anomaly 6, totally the sixth one.", link: "/#/projectdashboard/6" },
    ]);

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4 no-scrollbar">
            {/* Main Activities */}
            <div className="col-span-15 row-span-1">
                <div className="grid grid-cols-15 gap-2">
                    {/* Top row */}
                    <div className="col-span-9">
                        <ProjectOverviewCard
                            title1="Project Name"
                            description1="Project Anomaly"
                            title2="Project Manager"
                            description2={savedOption != 0 ? <ProjectManager value={savedOption} /> : "N/A"}
                            title3="Client"
                            description3={savedOption != 0 ? <Client value={savedOption} /> : "N/A"}
                        />
                    </div>
                    <div className="col-span-3 row-span-1"> <HealthCard title="Health by Cost" description={<CostHealth value={savedOption} />} colorIcon="text-error-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <HealthCard title="Health by Schedule" description={<ScheduleHealth value={savedOption} />} colorIcon="text-tertiary-dark" /> </div>

                    <div className="col-span-3 row-span-1"> <BudgetCard title="Budget" description={<Budget value={savedOption} />} colorIcon="text-secondary-800" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Cost" description={<Cost value={savedOption} />} colorIcon="text-orange-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Actual" description={<Actual value={savedOption} />} colorIcon="text-primary-800" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Danger" description={<Danger value={savedOption} />} colorIcon="text-error-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Variance" description={<Variance value={savedOption} />} colorIcon="text-tertiary-800" /> </div>


                    {/* Main row */}
                    <div className="col-span-5 row-span-1"> <ProjectProgressCard /> </div>
                    <div className="col-span-10 row-span-3"> <PrintGantt title="Gantt Chart" /> </div>
                    <div className="col-span-5 row-span-1"> <TaskOverviewCard /> </div>
                    <div className="col-span-full">
                        {/* <TaskListCard />  */}
                        {<PrintTaskList />}
                    </div>
                </div>
            </div>

            {/* Side Activities */}
            <div className="col-span-3 row-span-1">
                <div className="grid gap-2">
                    <div>
                        <CalendarCard />
                    </div>
                    <div>
                        {/* <UpcomingTaskCard /> */}
                        <PrintTask />
                    </div>
                    <div>
                        <IssuesCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectDashboardPage;