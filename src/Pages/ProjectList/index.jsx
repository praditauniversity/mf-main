import React from "react";
import ProjectListPage from "../../Components/Project/List";

const ProjectList = () => {

    return (
        <div className="h-full">
            <div className="grid gap-2 h-full">
                <ProjectListPage />
            </div>
        </div>
    );
}
export default ProjectList;