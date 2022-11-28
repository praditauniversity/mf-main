import React from "react";
import UserCard from "../components/User/UserCard";
import BlankCard from "../components/User/Blank";

const DashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
            <div className="col-span-3"> <BlankCard /> </div>
        </div>
    );
}
export default DashboardPage;