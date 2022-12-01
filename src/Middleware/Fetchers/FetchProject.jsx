import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;

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