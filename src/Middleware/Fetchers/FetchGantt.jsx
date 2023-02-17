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
            console.log("GanttData's Ready to Fetch");
            setGantt(data.gantt.data);
        } else {
            console.log("No data Gantt");
        }
    }, [data]);

    return ganttData;
}

export default FetchGantt;