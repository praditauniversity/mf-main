import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';

const FetchProjectByUserId = (props) => {
    const profile = GetProfile();
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: String(profile.id), sort: "ID asc" },
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

export default FetchProjectByUserId;