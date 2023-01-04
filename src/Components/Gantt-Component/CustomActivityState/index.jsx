import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID } from "../../GraphQL/Queries";
import {
  ADD_GANTT,
  UPDATE_GANTT,
  DELETE_GANTT,
} from "../../../Middleware/GraphQL/mutations";
import AppGantt from "../AppGantt";
import UpcomingTaskCard from "../../Card/UpcomingTask/UpcomingTaskCard";
import TestFormGantt from "../TestFormGantt";

function useActivity() {
  const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID, sort: "start_time asc" }
  });
  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready Activity");
      setActivity(data.activityGetGanttID.data);
      console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data Activity");
    }
    console.log("USE EFFECT ACTIVITY");
  }, [data]);

  return [activityData, setActivity];
}

export const PrintTask = () => {
  const [activityData, setActivity] = useActivity();

  return <>
    <UpcomingTaskCard dataTask={activityData} />
  </>
}
export const PrintGantt = (props) => {
  const {title} = props;
  const [activityData, setActivity] = useActivity();

  return <>
   <AppGantt title={title} dataGantt={activityData} />
  </>
}

export const TEST_TestFormGantt = (props) => {
  const {title} = props;
  const [activityData, setActivity] = useActivity();

  return <>
   <TestFormGantt title={title} dataGantt={activityData} />
  </>
}
