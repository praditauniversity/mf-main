import React, { useEffect, useState } from "react";

import ProjectDashboard from "./ProjectDashboard";

const ProjectDashboardPage = () => {
    const[ProjectID, setProjectID] = React.useState(localStorage.getItem('projectID'));

    useEffect(() => {
        setProjectID(localStorage.getItem('projectID'));
    }, [ProjectID]);

    return (
        <>
            <ProjectDashboard value = {ProjectID}/>

        </>
    );
}
export default ProjectDashboardPage;