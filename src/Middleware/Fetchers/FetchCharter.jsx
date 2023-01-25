import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA } from '../../Components/GraphQL/Queries';

const FetchCharter = (props) => {
    // const profile = GetProfile();
    // const {projectID} = props
    const { data } = useQuery(GET_CHARTER_DATA, {
    });

    const [charter, setCharter] = useState([]);

    useEffect(() => {
        if (data) {
            // setCharter(data.projectCharter.Data);
            setCharter(data.project.Data);
            console.log("Charter data found");
        } else {
            console.log("No data found for charter");
        }
        // console.log("UseEffect Charterrrrrrrrrrrr")
    }, [data]);

    return charter;
}

export default FetchCharter;