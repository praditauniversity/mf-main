import React from "react";
import UserCard from "../../Components/Card/UserCard";
import BlankCard from "../../Components/Card/Blank";
import BudgetCard from "../../Components/Card/BudgetCard";
import { SumActual, SumCost } from "../../Components/GraphQl/ProjectQueries";

const PMODashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-3"> <BudgetCard title="Budget" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-secondary-dark" /> </div>
            <div className="col-span-3"> <BudgetCard title="Actual" description={<SumActual />} content="IDR 816.204.031" colorIcon="text-primary-dark" /> </div>
            <div className="col-span-3"> <BudgetCard title="Cost" description={<SumCost />}content="IDR 816.204.031" colorIcon="text-orange-dark" /> </div>
            <div className="col-span-3"> <BudgetCard title="Danger" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-error-dark" /> </div>
            <div className="col-span-3"> <BudgetCard title="Variance" description="IDR 42.562.347" content="IDR 816.204.031" colorIcon="text-tertiary-800" /> </div>
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-9"> <UserCard /> </div>
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
        </div>
    );
}
export default PMODashboardPage;