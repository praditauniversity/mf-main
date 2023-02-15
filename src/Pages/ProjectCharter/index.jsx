import React from "react";
import CalendarTailwind from "../../Components/Card/CalendarTailwind/Calendar";
import ProjectCharterPage from "../../Components/Card/ProjectCharterCard/indexProjectCharter";
import UserCard from "../../Components/Card/UserCard";

const ProjectCharter = () => {

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="2xl:col-span-14 col-span-12">
                <div className="grid gap-2">
                    <ProjectCharterPage />
                    
                </div>

            </div>
            <div className="2xl:col-span-4 col-span-12">
                <div className="grid gap-2">
                    <UserCard />
                    <CalendarTailwind />
                </div>

            </div>
        </div>
    );
}
export default ProjectCharter;