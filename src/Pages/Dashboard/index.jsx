import React from "react";
import UserCard from "../../Components/Card/UserCard";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import AppGantt from "../../Components/Gantt-Component/AppGantt";
import ActiveProjectCard from "../../Components/Card/ActiveProject/ActiveProjectCard";

const DashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2">
            <div className="col-span-14">
                <div className="grid grid-cols-14 gap-2">
                    <div className="col-span-4"> <CalendarCard /> </div>
                    <div className="col-span-10"> <AppGantt className="h-1/2" title="Gantt Chart" />  </div>


                </div>
            </div>

            <div className="col-span-4 row-span-1">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-4">
                        <UserCard />
                    </div>
                    <div className="col-span-4">
                        <ActiveProjectCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;