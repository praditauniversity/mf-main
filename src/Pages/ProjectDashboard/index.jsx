import React, { useEffect, useState } from "react";

import HealthCard from "../../Components/Card/HealthCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import UserCard from "../../Components/Card/UserCard";
import ApexRedialBarChart from "../../Components/Charts/RadialChart";
import BudgetCard from "../../Components/Card/BudgetCard";
import RadialBarChart from "../../Components/Charts/RadialChart";
import TestCard from "../../Components/Card/TestCard";
import DonutChart from "../../Components/Charts/PieChart";
import ColumnChart from "../../Components/Charts/ColumnChart";
import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import TaskOverviewCard from "../../Components/ApexCharts/TaskOverview";
import TPECard from "../../Components/ApexCharts/TPE";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import TaskListCard from "../../Components/Card/TaskList/TaskListCard";
import UpcomingTaskCard from "../../Components/Card/UpcomingTask/UpcomingTaskCard";
import IssuesCard from "../../Components/Card/Issues/IssuesCard";
import AppGantt from "../../Components/Gantt-Component/AppGantt";
import TestQuery from "../../Components/Gantt-Component/TestQuery";
import { Actual, Cost, Budget, Danger, Variance, CostHealth } from "../../Components/GraphQL/ProjectByIdQueries";

const ProjectDashboardPage = () => {
    const [savedOption, setSavedOption] = React.useState(localStorage.getItem('projectID') ? localStorage.getItem('projectID') : "1");

    useEffect(() => {
        if (savedOption) {
            setSavedOption(savedOption);
        }
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
                            description2="Jhon Doe"
                            title3="Customer"
                            description3="Jaya Gedung Group"
                        />
                    </div>
                    <div className="col-span-3 row-span-1"> <HealthCard title="Health by Cost" description={<CostHealth value={savedOption} />} colorIcon="text-error-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <HealthCard title="Health by Schedule" description="Early Schedule" colorIcon="text-tertiary-dark" /> </div>

                    <div className="col-span-3 row-span-1"> <BudgetCard title="Budget" description={<Budget value={savedOption} />} colorIcon="text-secondary-800" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Cost" description={<Cost value={savedOption} />} colorIcon="text-orange-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Actual" description={<Actual value={savedOption} />} colorIcon="text-primary-800" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Danger" description={<Danger value={savedOption} />} colorIcon="text-error-dark" /> </div>
                    <div className="col-span-3 row-span-1"> <BudgetCard title="Variance" description={<Variance value={savedOption} />} colorIcon="text-tertiary-800" /> </div>


                    {/* Main row */}
                    <div className="col-span-5 row-span-1"> <ProjectProgressCard /> </div>
                    <div className="col-span-10 row-span-2"> <AppGantt title="Gantt Chart" /> </div>
                    {/* <div className="col-span-10 row-span-2"> <TestQuery /> </div> */}
                    <div className="col-span-5 row-span-1"> <TaskOverviewCard /> </div>
                    <div className="col-span-full"> <TaskListCard /> </div>
                </div>
            </div>

            {/* Side Activities */}
            <div className="col-span-3 row-span-1">
                <div className="grid gap-2">
                    <div>
                        <CalendarCard />
                    </div>
                    <div>
                        <UpcomingTaskCard />
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