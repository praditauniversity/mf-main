import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../GraphQL/mutations";

export const FetchSingleProject = (id) => {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
        variables: { id: id },
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        }
    }, [data]);
    return project;
}