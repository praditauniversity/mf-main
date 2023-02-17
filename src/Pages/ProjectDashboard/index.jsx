import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GetProfile from "../../Components/Auth/GetProfile";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../Components/GraphQL/Queries";

import ProjectDashboard from "./ProjectDashboard";

const ProjectDashboardPage = () => {
    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
        // fetchPolicy: "network-only",
        pollInterval: 1000,
    });
    const[ProjectID, setProjectID] = React.useState(localStorage.getItem('projectID'));

    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        if (data)   {
        setProjectData(data.projectByUserId.Data);
        setProjectID(localStorage.getItem('projectID'));
        if (data.projectByUserId.Data.length !== 0) {
            //if local storage is empty, set to first project id
            // console.log("BRIANNNN", data.projectByUserId.Data);
            localStorage.getItem('projectID') === null ? localStorage.setItem('projectID', data.projectByUserId.Data[0].ID) : console.log("projectID is not null");
            ProjectID === null ? setProjectID(data.projectByUserId.Data[0].ID) : setProjectID(localStorage.getItem('projectID'));
        }
        if (data.projectByUserId.Data.length === 0){
            localStorage.removeItem('projectID');
        }
    }
    // refetch({ userId: String(profile.id), sort: "ID asc" });
}, [data, ProjectID]);



    return (
        <>
            <ProjectDashboard value = {ProjectID} projectData = {projectData}/>

        </>
    );
}
export default ProjectDashboardPage;