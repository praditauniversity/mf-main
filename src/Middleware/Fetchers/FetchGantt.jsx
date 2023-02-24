import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_GANTT_DATA } from "../../Components/GraphQL/Queries";

const FetchGantt = () => {
    const {data, loading, error} = useQuery(GET_GANTT_DATA, {
        pollInterval: 1000,
    });
    const [ganttData, setGantt] = useState([]);

    useEffect(() => {
        if (data) {
            setGantt(data.gantt.data);
        } else {
            
        }
    }, [data]);

    return ganttData;
}

export default FetchGantt;