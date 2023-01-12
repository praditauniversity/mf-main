import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';

const FetchCharter = () => {
    const { data } = useQuery(GET_CHARTER_DATA);
    const [charter, setCharter] = useState([]);

    useEffect(() => {
        if (data) {
            setCharter(data.projectCharter.Data);
            console.log("Charter data found");
        } else {
            console.log("No data found for charter");
        }
    }, [data]);

    return charter;
}

export default FetchCharter;