import React from "react";
import UserCard from "../../Components/Card/UserCard";
import BudgetCard from "../../Components/Card/BudgetCard";
import { SumActual, SumCost, ProjectHealth, SumBudget, SumDanger, SumVariance } from "../../Components/GraphQL/ProjectQueries";
import ProjectByCard from "../../Components/ApexCharts/ProjectBy";
import ManpowerCard from "../../Components/ApexCharts/Manpower";
import SCurveCard from "../../Components/ApexCharts/SCurve";
import TPECard from "../../Components/ApexCharts/TPE";
import ProjectListCard from "../../Components/Card/ProjectList/ProjectListCard";
import ActiveProjectCard from "../../Components/Card/ActiveProject/ActiveProjectCard";


const PMODashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            {/* Main Activities */}
            {console.log("RENDER PMODASHBOARD")}
            <div className="2xl:col-span-15 col-span-12">
                <div className="grid grid-cols-15 gap-2">
                    {/* Top row */}
                    <div className="md:col-span-3 col-span-15"> <BudgetCard title="Budget" description={<SumBudget />} colorIcon="text-secondary-800" /> </div>
                    <div className="md:col-span-3 col-span-15"> <BudgetCard title="Actual" description={<SumActual />} colorIcon="text-primary-800" /> </div>
                    <div className="md:col-span-3 col-span-15"> <BudgetCard title="Cost" description={<SumCost />} colorIcon="text-orange-dark" /> </div>
                    <div className="md:col-span-3 col-span-15"> <BudgetCard title="Danger" description={<SumDanger />} colorIcon="text-error-dark" /> </div>
                    <div className="md:col-span-3 col-span-15"> <BudgetCard title="Variance" description={<SumVariance />} colorIcon="text-tertiary-800" /> </div>

                    {/* Main row */}
                    {/* Chart */}
                    <div className="col-span-15 grid grid-cols-12 gap-2">
                        <div className="md:col-span-6 col-span-12"> <SCurveCard /> </div>
                        <div className="md:col-span-6 col-span-12"> <TPECard /> </div>
                        <div className="md:col-span-6 col-span-12"> <ManpowerCard /> </div>
                        <div className="md:col-span-6 col-span-12"> <ProjectByCard /> </div>
                    </div>

                    {/* Project List */}
                    {/* <div className="col-span-full"> <ProjectListCard /> </div>
                    <div className="col-span-full"> <ProjectProgressOverviewCard /> </div> */}
                </div>
            </div>

            {/* Side Activities */}
            <div className="2xl:col-span-3 col-span-12">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                        <UserCard />
                    </div>
                    <div className="col-span-12">
                        <ActiveProjectCard />
                    </div>
                </div>
            </div>

            <div className="2xl:col-span-18 col-span-12"> 
                <ProjectListCard /> 
            </div>


            {/* can be delete later - testing for gantt */}
            {/* <div className="col-span-7 row-span-1"> <TestQuery /> </div> */}
        </div>
    );
}
export default PMODashboardPage;