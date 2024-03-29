import React from "react";
import UserCard from "../../Components/Card/UserCard";

const MemberDashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-3"> <UserCard /> </div>
            <div className="col-span-3"> <UserCard /> </div>
        </div>
    );
}
export default MemberDashboardPage;