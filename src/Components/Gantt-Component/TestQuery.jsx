// // GANTT BY PROJECT ID
// import React, { Component, useEffect, useState } from "react";
// import { useQuery, gql, useMutation } from "@apollo/client";
// import { GET_GANTT_PROJECT_ID } from "../GraphQL/Queries";
// import {
//   ADD_GANTT,
//   UPDATE_GANTT,
//   DELETE_GANTT,
// } from "../../Middleware/GraphQL/mutations";

// export default function TestQuery() {
//   const [projectID, setProjectID] = React.useState(localStorage.getItem('projectID') ? localStorage.getItem('projectID') : "1");

//   const { data, loading, error } = useQuery(GET_GANTT_PROJECT_ID, {
//     variables: { project_id: projectID }
//   });
//   const [ganttdata, setGantt] = useState([]);

//   useEffect(() => {
//     if (data) {
//       console.log("Data Ready TEST QUERY");
//       setGantt(data.ganttGetProjectID.data);
//       console.log(data.ganttGetProjectID.data);
//     } else {
//       console.log("No data TEST QUERY");
//     }
//     console.log("USE EFFECT TEST QUERY");
//   }, [data]);
//   return <div>testquery hehe
//     {ganttdata.map((gantt) => {
//       return (
//         <div>
//           <p>{gantt.name}</p>
//           <p>{gantt.description}</p>
//           <p>{gantt.user_id}</p>
//           <p>{gantt.start_time}</p>
//           <p>{gantt.end_time}</p>
//         </div>
//       );
//     })
//   }
//   </div>;
// }

import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID } from "../GraphQL/Queries";
import {
  ADD_GANTT,
  UPDATE_GANTT,
  DELETE_GANTT,
} from "../../Middleware/GraphQL/mutations";

export default function TestQuery() {
  const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID }
  });
  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready TEST QUERY");
      setActivity(data.activityGetGanttID.data);
      console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data TEST QUERY");
    }
    console.log("USE EFFECT TEST QUERY");
  }, [data]);
  return <div>testquery hehe
    {activityData.map((activity) => {
      return (
        <div>
          <p>{activity.name}</p>
          <p>{activity.description}</p>
          <p>{activity.user_id}</p>
          <p>{activity.start_time}</p>
          <p>{activity.end_time}</p>
        </div>
      );
    })
  }
  </div>;
}
