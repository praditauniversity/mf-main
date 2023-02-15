import React from "react";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import DailyReportCard from "../../Components/Card/DailyReportCard";
import UserCard from "../../Components/Card/UserCard";

const DailyReportView = () => {

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-14">
                <div className="grid gap-2">
                    <DailyReportCard />
                </div>
            </div>
            <div className="col-span-4">
                <div className="grid gap-2">
                    <UserCard />
                    <CalendarCard />
                </div>
            </div>
        </div>
    );
}
export default DailyReportView;