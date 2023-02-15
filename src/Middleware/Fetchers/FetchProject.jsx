import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_PROJECT_DATA } from '../../Components/GraphQL/Queries';


const FetchProject = () => {
    const { data } = useQuery(GET_PROJECT_DATA);
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
            console.log("Project data found");
        } else {
            console.log("No data found for project");
        }
    }, [data]);

    return project;
}

export default FetchProject;