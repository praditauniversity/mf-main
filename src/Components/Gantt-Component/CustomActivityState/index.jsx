import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID, GET_ACTIVITY_PHASE_DATA, GET_GANTT_PROJECT_ID, GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";
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
import ListboxProjectName from "../../Listbox/ListProjectName";
import GetProfile from "../../Auth/GetProfile";

function useActivity() {
  // const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
  const [ganttID] = useGantt();
  // const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID, sort: "ID asc" }
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

  const [projectData, setProjectData] = useState([]);
  const [ganttName, setGanttName] = useState([]);
  const profile = GetProfile();

  const { loading: loadingProjectUser, error: errorProjectUser, data: dataProjectUser } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    variables: { userId: profile.id },
  });

  const { data: dataGanttProject, loading: loadingGanttProject, error: errorGanttProject } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: projectID }
  });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", dataProjectUser);
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBB", dataGanttProject);

  useEffect(() => {
    console.log("INSIDE USEEFFECT USE GANTT");
    if (dataGanttProject) {
      console.log("Data Ready list gantt");
      console.log("Data Ready gantt get project", dataGanttProject.ganttGetProjectID.data);
      setGanttName(dataGanttProject.ganttGetProjectID.data);
      console.log("Data Ready", dataGanttProject.ganttGetProjectID.data);
      ganttID === 0 ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : localStorage.setItem('ganttID', ganttID);
      setGanttID(localStorage.getItem('ganttID'));
      console.log("gant id =? ", ganttID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);

    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      localStorage.setItem("ganttID", 0);
    }

    if (dataProjectUser) {
      console.log("Data Ready list gantt");
      console.log("Data Ready gantt get project", dataProjectUser.projectByUserId.Data);
      setProjectData(dataProjectUser.projectByUserId.Data);
      console.log("Data Ready", dataProjectUser.projectByUserId.Data);
      projectID === 0 ? localStorage.setItem('projectID', dataProjectUser.projectByUserId.Data[0].ID) : localStorage.setItem('projectID', projectID);
      setProjectID(localStorage.getItem('projectID'));
      console.log("projectID =? ", projectID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);

    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      localStorage.setItem("projectID", 0);
    }
  }, [dataGanttProject, dataProjectUser]);

  return [ganttID, setGanttID, projectID, setProjectID, ganttName, setGanttName, projectData, setProjectData, dataGanttProject, dataProjectUser];
}

function useActivityPhase() {
  const { data: dataActivityPhase, loading, error } = useQuery(GET_ACTIVITY_PHASE_DATA);
  const [activityPhaseData, setActivityPhaseData] = useState([]);

  useEffect(() => {
    if (dataActivityPhase) {
      console.log("Data Ready Phase");
      setActivityPhaseData(dataActivityPhase.activityPhase.data);
      console.log(dataActivityPhase.activityPhase.data);
    } else {
      console.log("No data Phase");
    }
    console.log("USE EFFECT Phase");
  }, [dataActivityPhase]);

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



function useGanttTest() {
  const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
  const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));
  
  const [projectData, setProjectData] = useState([]);
  const [ganttName, setGanttName] = useState([]);
  const profile = GetProfile();
  
  const { loading: loadingProjectUser, error: errorProjectUser, data: dataProjectUser } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    variables: { userId: profile.id },
  });

  const { data: dataGanttProject, loading: loadingGanttProject, error: errorGanttProject } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: projectID }
  });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", dataProjectUser);
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBB", dataGanttProject);

  useEffect(() => {
    console.log("INSIDE USEEFFECT USE GANTT");
    if (dataGanttProject) {
      console.log("Data Ready list gantt");
      console.log("Data Ready gantt get project", dataGanttProject.ganttGetProjectID.data);
      setGanttName(dataGanttProject.ganttGetProjectID.data);
      console.log("Data Ready", dataGanttProject.ganttGetProjectID.data);
      ganttID === 0 ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : localStorage.setItem('ganttID', ganttID);
      setGanttID(localStorage.getItem('ganttID'));
      console.log("gantt id =? ", ganttID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);
      
    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      localStorage.setItem("ganttID", 0);
    }

    if (dataProjectUser) {
      console.log("Data Ready list gantt");
      console.log("Data Ready gantt get project", dataProjectUser.projectByUserId.Data);
      setProjectData(dataProjectUser.projectByUserId.Data);
      console.log("Data Ready", dataProjectUser.projectByUserId.Data);
      projectID === 0 ? localStorage.setItem('projectID', dataProjectUser.projectByUserId.Data[0].ID) : localStorage.setItem('projectID', projectID);
      setProjectID(localStorage.getItem('projectID'));
      console.log("projectID =? ", projectID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);
      
    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      localStorage.setItem("projectID", 0);
    }
  }, [dataGanttProject, dataProjectUser]);

  return [setGanttID, setProjectID, ganttName, setGanttName, projectData, setProjectData, dataGanttProject, dataProjectUser];
}

export const PrintGantt = (props) => {
  const { title } = props;
  const [activityData, setActivity] = useActivity();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();
  // const [activityUnitMeasureData, setActivityUnitMeasureData] = useActivityUnitMeasure();
  
  const [ganttID, setGanttID, projectID, setProjectID, ganttName, setGanttName, projectData, setProjectData , dataGanttProject, dataProjectUser] = useGantt();

  const addButtonColumns = { name: "add", width: 44 }

  return <>
    {/* <AppGantt title={title} dataGantt={activityData} dataPhase={activityPhaseData} ganttID={ganttID} /> */}
    <AppGantt title={title} dataGantt={activityData} dataPhase={activityPhaseData} ganttID={ganttID} isReadOnly={true} isShowAddColumn={false} isShowListGantt={true} />
    {console.log("activityData", activityData)}
  </>
}

export const PrintGanttPage = (props) => {
  const { title, ganttID, projectID } = props;
  localStorage.setItem('ganttID', ganttID);
  localStorage.setItem('projectID', projectID);
  const [activityData, setActivity] = useActivity();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();
  const [setGanttID, setProjectID, ganttName, setGanttName, projectData, setProjectData , dataGanttProject, dataProjectUser] = useGanttTest();
  // const addButtonColumns = { };

  return <>
    <AppGantt title={title} dataGantt={activityData} dataPhase={activityPhaseData} ganttID={ganttID} isReadOnly={false} isShowAddColumn={true} isShowListGantt={false} />
    {console.log("activityData", activityData)}
  </>
}

export const PrintListGanttName = () => {
  const [ganttID, setGanttID, projectID, setProjectID, ganttName, setGanttName, projectData, setProjectData, dataGanttProject, dataProjectUser] = useGantt();
  console.log("this is custom activity. ganttname is ", ganttName);
  console.log("CUSTOMMM ID", ganttID);
  console.log("CUSTOMMM PRoject ID", projectID);
  console.log("CUSTOMMM ganttData", ganttName);
  
  return <>
    <ListGanttByProject ganttID={ganttID} setGanttID={setGanttID} projectID={projectID} ganttName={ganttName} />
  </>
}

// TODO : ERROR
export const PrintListProjetcName = () => {
  const [ganttID, setGanttID, projectID, setProjectID, ganttName, setGanttName, projectData, setProjectData, dataGanttProject, dataProjectUser] = useGantt();
  console.log("PrintListProjetcName ganttt ID ", ganttID);
  console.log("PrintListProjetcName ProjectID", projectID);
  console.log("PrintListProjetcName ganttname", ganttName);
  console.log("PrintListProjetcName projectdata", projectData);

  return <>
    <ListboxProjectName setGanttID={setGanttID} projectID={projectID} setProjectID={setProjectID} projectData={projectData} />
  </>
}

