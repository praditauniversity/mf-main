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
    variables: { gantt_id: ganttID }
  });
  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready TEST get activity");
      setActivity(data.activityGetGanttID.data);
      console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data TEST QUERY");
    }
    console.log("USE EFFECT TEST QUERY");
  }, [data]);

  return [activityData, setActivity];
}

export const PrintGantt = () => {

}

// export const PrintGantt = () => {

//   const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

//   const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
//     variables: { gantt_id: ganttID }
//   });
//   const [activityData, setActivity] = useState([]);

//   useEffect(() => {
//     if (data) {
//       console.log("Data Ready TEST get activity");
//       setActivity(data.activityGetGanttID.data);
//       console.log(data.activityGetGanttID.data);
//     } else {
//       console.log("No data TEST QUERY");
//     }
//     console.log("USE EFFECT TEST QUERY");
//   }, [data]);

//   return { activityData };
//   // return <>
//   //   {/* <AppGantt title="Gantt Chart" dataGantt={activityData} /> */}
//   //   {/* <TestFormGantt title="Gantt Chart" dataGantt={activityData} /> */}
//   // </>
// }

export const PrintTask = () => {

  const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID }
  });
  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready TEST AAAAA");
      setActivity(data.activityGetGanttID.data);
      console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data TEST QUERY");
    }
    console.log("USE EFFECT TEST QUERY");
  }, [data]);
  return <>
    <UpcomingTaskCard dataTask={activityData} />
  </>
}