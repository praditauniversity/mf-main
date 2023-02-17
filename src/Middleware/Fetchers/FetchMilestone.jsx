import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_MILESTONE_DATA } from '../../Components/GraphQL/Queries';

const FetchMilestone = () => {
    const { data } = useQuery(GET_MILESTONE_DATA, {
        pollInterval: 1000,
    });
    const [milestone, setMilestone] = useState([]);

    useEffect(() => {
        if (data) {
            setMilestone(data.projectMilestone.Data);
            console.log("Milestone data found");
        } else {
            console.log("No data found for milestone");
        }
    }, [data]);

    return milestone;
}

export default FetchMilestone;