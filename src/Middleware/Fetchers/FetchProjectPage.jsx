import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from "../../Components/GraphQL/Queries";

const FetchProjectPage = () => {
    const profile = GetProfile();
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, limit: "7", sort: "start_project ASC" },
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
        } else {
            
        }
    }, [data]);

    return project;
}

export default FetchProjectPage;