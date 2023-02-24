import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';


const FetchProjectCharterID = (props) => {
    const {projectID} = props
    const { data } = useQuery(GET_CHARTER_DATA,{
        variables: { ID : projectID },
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        } else {
            
        }
    }, [data]);

    return project;
}

export default FetchProjectCharterID;