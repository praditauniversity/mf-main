import React, { useEffect } from "react";
import UserCard from "../../Components/Card/UserCard";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import AppGantt from "../../Components/Gantt-Component/AppGantt";
import ActiveProjectCard from "../../Components/Card/ActiveProject/ActiveProjectCard";
import ProjectProgressOverviewCard from "../../Components/ApexCharts/ProjectProgressOverview";
import TaskOverviewCard from "../../Components/ApexCharts/TaskOverview";
import MemberTaskCard from "../../Components/Card/MemberTask/MemberTaskCard";
import { PrintGantt } from "../../Components/Gantt-Component/CustomActivityState";
import { TestingModal } from "../../Components/Gantt-Component/TestingModal";
import CalendarTailwind from "../../Components/Card/CalendarTailwind/Calendar";
import PrintGanttProjectDashboard from "../../Components/Card/PrintGanttProjectDashboard/PrintGanttProjectDashboard";

const DashboardPage = () => {
    const[ProjectID, setProjectID] = React.useState(localStorage.getItem('projectID'));

    useEffect(() => {
        setProjectID(localStorage.getItem('projectID'));
        // savedOption !=0 ? setSavedOption(savedOption) : setSavedOption(0);
        // console.log("savedOption", savedOption);
        // Update the savedOption value in local storage whenever it changes
        // localStorage.setItem('savedOption', savedOption);
    }, [ProjectID]);

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2">
            <div className="col-span-14">
                <div className="grid grid-cols-14 gap-2">
                    <div className="col-span-4 row-span-1"> <CalendarTailwind /> </div>
                    {/* <div className="col-span-10 row-span-2"> <PrintGantt title="Gantt Chart" /> </div> */}
                    <div className="col-span-10 row-span-2"> <PrintGanttProjectDashboard projectID={ProjectID} title="Gantt Chart" /> </div>
                    <div className="col-span-4 row-span-1"> <TaskOverviewCard />  </div>


                    <div className="col-span-full"> <MemberTaskCard /> </div>
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
            
            <div className="col-span-full"> <ProjectProgressOverviewCard /> </div>
        </div>
    );
}
export default DashboardPage;