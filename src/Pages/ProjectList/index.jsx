import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GetProfile from "../../Components/Auth/GetProfile";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../Components/GraphQL/Queries";
import ProjectListPage from "../../Components/Project/List";
import FetchProjectByUserId from "../../Middleware/Fetchers/FetchProjectByUserId";

const ProjectList = () => {
    const profile = GetProfile();
    console.log("QUERY DIPANGGIL");
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: String(profile.id), sort: "ID asc" },
        // pollInterval: 5000, // refetch the result every 5 seconds
    });
    const [project, setProject] = useState([]);
    
    useEffect(() => {
        if (data && data.projectByUserId && data.projectByUserId.Data) {
            console.log("TAI", data.projectByUserId.Data);
            setProject(data.projectByUserId.Data);
        } else {
            console.log("Setting project to empty array");
            setProject([]);
        }

        if (data) {
            refetch({ userId: String(profile.id), sort: "ID asc" });
        }
    }, [data]);

    
    return (
        <div className="h-full">
            <div className="grid gap-2 h-full">
                {console.log("SEwIIKKKKKKKK DATA", data)}
                {console.log("SEwIIKKKKKKKK PROJECT", project)}
                {console.log("SEwIIKKKKKKKK PROJECT 0)", project.filter((item) => !item.DeletedAt))}
                <ProjectListPage value={project} />
            </div>
        </div>
    );
}
export default ProjectList;