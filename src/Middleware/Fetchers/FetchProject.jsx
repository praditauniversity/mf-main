import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_PROJECT } from '../GraphQL/mutations';


const FetchProject = () => {
    const { data } = useQuery(GET_PROJECT);
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        }
    }, [data]);

    return project;
}

export default FetchProject;