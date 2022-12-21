import { useEffect, useState } from "react";
import { useQuery, gql } from '@apollo/client';

const GET_PROJECT_BY_ID = gql`
query project ($id: String!) {
    project(id: $id) {
        Data {
            ID
            name
            description
            user_id
        }
    }
}
`;

export const FetchSingleProject = (id) => {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
        variables: { id: id },
    });
    const [project, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        }
    }, [data]);
    return project;
}