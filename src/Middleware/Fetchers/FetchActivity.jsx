import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_DATA, GET_ACTIVITY_GANTT_ID } from "../../Components/GraphQL/Queries";

const FetchActivity = () => {
    const { data, loading, error } = useQuery(GET_ACTIVITY_DATA, {
        pollInterval: 1000,
    });
    const [activityData, setActivity] = useState([]);

    useEffect(() => {
        if (data) {
        console.log("ActivityData's Ready to Fetch");
        setActivity(data.activity.data);
        // console.log(data.activityGetGanttID.data);
        } else {
        console.log("No data Activity");
        }
    }, [data]);

    return activityData;
}

export default FetchActivity;