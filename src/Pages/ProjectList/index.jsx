import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GetProfile from "../../Components/Auth/GetProfile";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../Components/GraphQL/Queries";
import ProjectListPage from "../../Components/Project/List";
import FetchProjectByUserId from "../../Middleware/Fetchers/FetchProjectByUserId";

const ProjectList = () => {
    const profile = GetProfile();
    console.log("QUERY DIPANGGIL");
    const { data,refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: String(profile.id), sort: "ID asc" },
    });
    const [project, setProject] = useState([]);
    
    useEffect(() => {
        if (data){
            console.log("TAI", data.projectByUserId.Data);
            setProject(data.projectByUserId.Data);
        }
        refetch({ userId: String(profile.id), sort: "ID asc" });

    }, [data,project]);

    
    return (
        <div className="h-full">
            <div className="grid gap-2 h-full">
                {console.log("SEwIIKKKKKKKK", project)}
                {console.log("SEwIIKKKKKKKK DATA", project)}
                <ProjectListPage value={project} />
            </div>
        </div>
    );
}
export default ProjectList;