import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';


const FetchProjectCharter = () => {
    const { data } = useQuery(GET_CHARTER_DATA, {
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

export default FetchProjectCharter;