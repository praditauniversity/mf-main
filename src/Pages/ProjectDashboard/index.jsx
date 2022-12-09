import React from "react";

import HealthCard from "../../Components/Card/HealthCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import UserCard from "../../Components/Card/UserCard";
import ApexRedialBarChart from "../../Components/Charts/RadialChart";
import BudgetCard from "../../Components/Card/BudgetCard";
import RadialBarChart from "../../Components/Charts/RadialChart";
import TestCard from "../../Components/Card/TestCard";

const ProjectDashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
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
            <div className="col-span-3 row-span-3"> <UserCard /> </div>
            {/* should be row kedua col pertama */}
            <div className="col-span-3 row-span-1"> <BudgetCard title="Budget" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-secondary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Actual" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-primary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Cost" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-orange-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Danger" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-error-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Variance" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-tertiary-800" /> </div>
            <div className="col-span-9 row-span-1"> <RadialBarChart /> </div>
        </div>
    );
}
export default ProjectDashboardPage;