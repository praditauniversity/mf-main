import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID, GET_ACTIVITY_PHASE_DATA, GET_GANTT_PROJECT_ID } from "../../GraphQL/Queries";
import {
  ADD_GANTT,
  UPDATE_GANTT,
  DELETE_GANTT,
} from "../../../Middleware/GraphQL/mutations";
import AppGantt from "../AppGantt";
import UpcomingTaskCard from "../../Card/UpcomingTask/UpcomingTaskCard";
import TestFormGantt from "../TestFormGantt";
import TaskListCard from "../../Card/TaskList/TaskListCard";
import VerticalTabs from "../../Tabs/verticalTabs";
import ListGanttByProject from "../../Listbox/ListGanttName";

function useActivity() {
  // const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
  const [ganttID] = useGantt();
  // const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID, sort: "start_time asc" }
  });
  const [activityData, setActivity] = useState([]);
  const [testData, settestData] = useState([]);

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

  return [activityData, setActivity, testData, settestData];
}

function useGantt() {
  const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
  const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));

  const { data, loading, error } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: projectID }
  });
  const [ganttName, setGanttName] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready list gantt");
      setGanttName(data.ganttGetProjectID.data);
      console.log("Data Ready", data.ganttGetProjectID.data);
      ganttID == 0 ? localStorage.setItem('ganttID', data.ganttGetProjectID.data[0].ID) : localStorage.setItem('ganttID', ganttID);
      setGanttID(localStorage.getItem('ganttID'));
      console.log("gant id =? ", ganttID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);

    } else {
      console.log("No data list gantt");
      localStorage.setItem("ganttID", 0);
    }
    console.log("USE EFFECT list gantt");
  }, [data]);

  return [ganttID, setGanttID, projectID, ganttName ]
}

function useActivityPhase() {
  const { data, loading, error } = useQuery(GET_ACTIVITY_PHASE_DATA);
  const [activityPhaseData, setActivityPhaseData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready Phase");
      setActivityPhaseData(data.activityPhase.data);
      console.log(data.activityPhase.data);
    } else {
      console.log("No data Phase");
    }
    console.log("USE EFFECT Phase");
  }, [data]);

  return [activityPhaseData, setActivityPhaseData];
}

export const PrintTask = () => {
  const [activityData, setActivity] = useActivity();

  return <>
    <UpcomingTaskCard dataTask={activityData} />
  </>
}

export const PrintTaskList = () => {
  const [activityData, setActivity] = useActivity();

  return <>
    <TaskListCard dataTask={activityData} />
  </>
}

export const PrintGantt = (props) => {
  const { title } = props;
  const [activityData, setActivity] = useActivity();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();
  const [ganttID] = useGantt();

  return <>
    <AppGantt title={title} dataGantt={activityData} dataPhase={activityPhaseData} ganttID={ganttID}/>
  </>
}

export const TEST_TestFormGantt = (props) => {
  const { title } = props;
  const [activityData, setActivity] = useActivity();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();

  return <>
    <TestFormGantt title={title} dataGantt={activityData} dataPhase={activityPhaseData} />
  </>
}

export const PrintListGanttName = () => {
  const [ganttID, setGanttID, projectID, ganttName ] = useGantt();

  return <>
    <ListGanttByProject ganttID={ganttID} setGanttID={setGanttID} projectID={projectID} ganttName={ganttName} />
  </>
}
