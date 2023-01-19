import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_CHARTER_DATA, GET_CHARTER_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';

const FetchCharter = () => {
    // const { data } = useQuery(GET_CHARTER_DATA);

    const profile = GetProfile();
    const { data } = useQuery(GET_CHARTER_DATA_BY_USER_ID, {
        variables: { userId: profile.id }
    });

    const [charter, setCharter] = useState([]);

    useEffect(() => {
        if (data) {
            // setCharter(data.projectCharter.Data);
            setCharter(data.projectCharterByUserId.Data);
            console.log("Charter data found");
        } else {
            console.log("No data found for charter");
        }
        console.log("UseEffect Charterrrrrrrrrrrr")
    }, [data]);

    return charter;
}

export default FetchCharter;