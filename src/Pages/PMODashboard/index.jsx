import React from "react";
import UserCard from "../../Components/Card/UserCard";
import BlankCard from "../../Components/Card/Blank";
import BudgetCard from "../../Components/Card/BudgetCard";
import { SumActual, SumCost } from "../../Components/GraphQl/ProjectQueries";
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


const PMODashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-3 row-span-1"> <BudgetCard title="Budget" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-secondary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Actual" description={<SumActual />} content="IDR 816.204.031" colorIcon="text-primary-800" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Cost" description={<SumCost />} content="IDR 816.204.031" colorIcon="text-orange-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Danger" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-error-dark" /> </div>
            <div className="col-span-3 row-span-1"> <BudgetCard title="Variance" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-tertiary-800" /> </div>
            <div className="col-span-3 row-span-3"> <UserCard /> </div>
            {/* <div className="col-span-7 row-span-1"> <SplineChart /> </div>
            <div className="col-span-7 row-span-1"> <ColumnChart /> </div>
            <div className="col-span-7 row-span-1"> <LineChart /> </div>
            <div className="col-span-7 row-span-1"> <DonutChartV2 /> </div> */}
            <div className="col-span-7 row-span-1"> <SCurveCard /> </div>
            <div className="col-span-7 row-span-1"> <TPECard /> </div>
            <div className="col-span-7 row-span-1"> <ManpowerCard /> </div>
            <div className="col-span-7 row-span-1"> <ProjectByCard /> </div>
        </div>
    );
}
export default PMODashboardPage;