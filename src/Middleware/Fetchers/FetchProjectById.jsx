import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_ID } from '../../Components/GraphQL/Queries';

const FetchProjectById = (props) => {
    const profile = GetProfile();
    const {projectID } = props;
    console.log("id: " + projectID);
    const { data } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: projectID},
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("data: " + data);
            console.log ("data.project.Data: " + data.project.Data)
            setProject(data.project.Data);
        } else {
            console.log("data empty :" + data);
            console.log("No data found for project with user id : " + profile.id);
        }
    }, [data]);

    return project;
}

export default FetchProjectById;