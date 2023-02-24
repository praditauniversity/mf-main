import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';

const FetchCharter = (props) => {
    const { data } = useQuery(GET_CHARTER_DATA, {
        pollInterval: 1000,
    });

    const [charter, setCharter] = useState([]);

    useEffect(() => {
        if (data) {
            setCharter(data.project.Data);
        } else {
           
        }
    }, [data]);

    return charter;
}

export default FetchCharter;