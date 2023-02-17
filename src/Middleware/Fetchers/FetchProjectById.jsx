import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_ID } from '../../Components/GraphQL/Queries';

const FetchProjectById = (props) => {
    const profile = GetProfile();
    const {projectID } = props;
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: projectID},
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("Data Project by id found");
            setProject(data.project.Data);
        } else {
            console.log("No data found for project with user id : " + profile.id);
        }
        refetch();
    }, [data]);

    return project;
}

export default FetchProjectById;