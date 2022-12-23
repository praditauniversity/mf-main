import React from "react";

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

const ProjectDashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4 no-scrollbar">
            {/* row pertama col pertama */}
            <div className="col-span-9 row-span-1"> 
            <ProjectOverviewCard 
            title1="Project Name" 
            description1="Project Anomaly" 
            title2="Project Manager" 
            description2="Jhon Doe" 
            title3="Customer" 
            description3="Jaya Gedung Group" 
            /></div>
            <div className="col-span-3 row-span-1"> <HealthCard title="Health by Cost" description="Cost Overrun" colorIcon="text-error-dark" /> </div>
            <div className="col-span-3 row-span-1"> <HealthCard title="Health by Schedule" description="Early Schedule" colorIcon="text-tertiary-dark" /> </div>
            {/* should be calendar | row pertama col kedua */}
            <div className="col-span-3 row-span-3"> <CalendarCard /> </div>
            {/* should be row kedua col pertama */}
            <div className="col-span-3 row-span-1"> <BudgetCard title="Budget" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-secondary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Actual" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-primary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Cost" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-orange-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Danger" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-error-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Variance" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-tertiary-800" /> </div>
            {/* <div className="col-span-9 row-span-1"> <RadialBarChart /> </div>
            <div className="col-span-6 row-span-1"> <DonutChart /> </div>
            <div className="col-span-6 row-span-1"> <ColumnChart /> </div> */}
            <div className="col-span-5 row-span-1"> <ProjectProgressCard /> </div>
            {/* this should be gannt */}
            <div className="col-span-10 row-span-3"> <AppGantt title="Gantt Chart" /> </div>
            {/* can be delete later - testing for gantt */}
            {/* <div className="col-span-10 row-span-2"> <TestQuery /> </div> */}

            <div className="col-span-5 row-span-1"> <TaskOverviewCard /> </div>
            <div className="col-span-full row-span-1"> <TaskListCard /> </div>

            <div className="col-span-3 row-span-1"> <UpcomingTaskCard /> </div>
            <div className="col-span-3 row-span-1"> <IssuesCard /> </div>
            
        </div>
    );
}
export default ProjectDashboardPage;