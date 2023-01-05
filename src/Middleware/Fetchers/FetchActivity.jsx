import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID } from "../../Components/GraphQL/Queries";

const FetchActivity = () => {
    const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

    const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
        variables: { gantt_id: ganttID, sort: "start_time asc" }
    });
    const [activityData, setActivity] = useState([]);

    useEffect(() => {
        if (data) {
        console.log("ActivityData's Ready to Fetch");
        setActivity(data.activityGetGanttID.data);
        // console.log(data.activityGetGanttID.data);
        } else {
        console.log("No data Activity");
        }
        // console.log("USE EFFECT ACTIVITY");
    }, [data]);

    return activityData;
}

export default FetchActivity;