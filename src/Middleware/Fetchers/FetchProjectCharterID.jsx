import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';


const FetchProjectCharterID = (props) => {
    const {projectID} = props
    const { data } = useQuery(GET_CHARTER_DATA,{
        variables: { ID : projectID }
    });
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