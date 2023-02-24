import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_PROJECT_DATA } from '../../Components/GraphQL/Queries';


const FetchProject = () => {
    const { data } = useQuery(GET_PROJECT_DATA, {
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        } else {
        }
    }, [data]);

    return project;
}

export default FetchProject;