import React from "react";
import UserCard from "../../Components/Card/UserCard";
import BlankCard from "../../Components/Card/Blank";
import BudgetCard from "../../Components/Card/BudgetCard";
import { SumActual, SumCost, ProjectHealth, SumBudget, SumDanger, Variance } from "../../Components/GraphQL/ProjectQueries";
import SplineChart from "../../Components/Charts/SplineChart";
import ColumnChart from "../../Components/Charts/ColumnChart";
import LineChart from "../../Components/Charts/LineChart";
import DonutChartV2 from "../../Components/Charts/PieChartProjectBy";
import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import TaskOverviewCard from "../../Components/ApexCharts/TaskOverview";
import ProjectByCard from "../../Components/ApexCharts/ProjectBy";
import ManpowerCard from "../../Components/ApexCharts/Manpower";
import SCurveCard from "../../Components/ApexCharts/SCurve";
import TPECard from "../../Components/ApexCharts/TPE";
import ProjectListCard from "../../Components/Card/ProjectList/ProjectListCard";
import ActiveProjectCard from "../../Components/Card/ActiveProject/ActiveProjectCard";
import AppGantt from "../../Components/Gantt-Component/AppGantt";
import TestQuery from "../../Components/Gantt-Component/TestQuery";


const PMODashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            {/* Main Activities */}
            <div className="col-span-15">
                <div className="grid grid-cols-15 gap-2">
                    {/* Top row */}
                    <div className="col-span-3"> <BudgetCard title="Budget" description={<SumBudget />} colorIcon="text-secondary-800" /> </div>
                    <div className="col-span-3"> <BudgetCard title="Actual" description={<SumActual />} colorIcon="text-primary-800" /> </div>
                    <div className="col-span-3"> <BudgetCard title="Cost" description={<SumCost />} colorIcon="text-orange-dark" /> </div>
                    <div className="col-span-3"> <BudgetCard title="Danger" description={<SumDanger />} colorIcon="text-error-dark" /> </div>
                    <div className="col-span-3"> <BudgetCard title="Variance" description={<Variance />} colorIcon="text-tertiary-800" /> </div>

                    {/* Main row */}
                    {/* Chart */}
                    <div className="col-span-15 grid grid-cols-16 gap-2">
                        <div className="col-span-8"> <SCurveCard /> </div>
                        <div className="col-span-8"> <TPECard /> </div>
                        <div className="col-span-8"> <ManpowerCard /> </div>
                        <div className="col-span-8"> <ProjectByCard /> </div>
                    </div>

                    {/* Project List */}
                    {/* <div className="col-span-full"> <ProjectListCard /> </div>
                    <div className="col-span-full"> <ProjectProgressOverviewCard /> </div> */}
                </div>
            </div>

            {/* Side Activities */}
            <div className="col-span-3 row-span-1">
                <div className="grid gap-2">
                    <div>
                        <UserCard />
                    </div>
                    <div>
                        <ActiveProjectCard />
                    </div>
                </div>
            </div>
            <div className="col-span-full"> <ProjectListCard /> </div>


            {/* can be delete later - testing for gantt */}
            {/* <div className="col-span-7 row-span-1"> <TestQuery /> </div> */}
        </div>
    );
}
export default PMODashboardPage;