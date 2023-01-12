import React from "react";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import ProjectCharterCard from "../../Components/Card/ProjectCharterCard";
import ProjectCharterPage from "../../Components/Card/ProjectCharterCard/indexProjectCharter";
import UserCard from "../../Components/Card/UserCard";

const ProjectCharterView = () => {

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-14">
                <div className="grid gap-2">
                    <ProjectCharterCard />
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
export default ProjectCharterView;