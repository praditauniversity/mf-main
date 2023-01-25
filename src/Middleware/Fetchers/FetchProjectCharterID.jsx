import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_CHARTER_DATA, GET_CHARTER_DATA_BY_ID, GET_PROJECT_DATA, GET_PROJECT_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';
import { GET_PROJECT } from '../GraphQL/mutations';


const FetchProjectCharterID = (props) => {
    const {projectID} = props
    // const { data } = useQuery(GET_PROJECT);
    const { data } = useQuery(GET_CHARTER_DATA,{
        variables: { ID : projectID }
    });
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

export default FetchProjectCharterID;