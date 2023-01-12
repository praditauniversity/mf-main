import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA, GET_PROJECT_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';
import { GET_PROJECT } from '../GraphQL/mutations';


const FetchProject = () => {
    // const { data } = useQuery(GET_PROJECT);
    const { data } = useQuery(GET_PROJECT_DATA);
    // const profile = GetProfile();
    // // const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    // //     variables: { userId: profile.id},
    // // });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
            // setProject(data.projectByUserId.Data);
            console.log("Project data found");
        } else {
            console.log("No data found for project");
        }
    }, [data]);

    return project;
}

export default FetchProject;