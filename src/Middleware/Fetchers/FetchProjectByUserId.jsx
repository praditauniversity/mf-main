import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';

const FetchProjectByUserId = () => {
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id},
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
        } else {
            console.log("No data found for project with user id : " + profile.id);
        }
    }, [data]);

    return project;
}

export default FetchProjectByUserId;