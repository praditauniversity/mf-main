import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID, GET_ACTIVITY_PHASE_DATA, GET_GANTT_PROJECT_ID, GET_LINK_DATA, GET_PROJECT_DATA_BY_USER_ID, GET_UNIT_OF_MEASUREMENT_DATA } from "../../GraphQL/Queries";
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
  const { ganttID } = useGantt();
  const [ganttIDUSEGANTT, setGanttID] = useState(localStorage.getItem('ganttID'));

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: String(ganttID), sort: "ID asc" }
  });

  const [activityData, setActivity] = useState([]);
  const [testData, settestData] = useState([]);

  useEffect(() => {
    console.log("USE EFFECT ACTIVITY");
    if (data) {
      console.log("Data Ready Activity");
      setActivity(data.activityGetGanttID.data);
      console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data Activity");
    }
  }, [data]);

  return [activityData, setActivity, testData, settestData];
}

function useLink() {
  const [linkData, setLink] = useState([]);

  const { data, loading, error } = useQuery(GET_LINK_DATA);

  useEffect(() => {
    if (data) {
      console.log("Data Ready Link");
      setLink(data.activityLink.data);
      console.log(data.activityLink.data);
    } else {
      console.log("No data Link");
    }
    console.log("USE EFFECT LINK");
  }, [data]);

  return [linkData, setLink];
}

function useProject() {
  const profile = GetProfile();
  const [projectData, setProjectData] = useState([]);
  const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));

  const { loading: loadingProjectUser, error: errorProjectUser, data: dataProjectUser } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    variables: { userId: profile.id },
  });

  useEffect(() => {

    if (dataProjectUser) {
      console.log("Data Ready list gantt");
      console.log("Data Ready project by userid", dataProjectUser.projectByUserId.Data);
      setProjectData(dataProjectUser.projectByUserId.Data);
      console.log("Data Ready projectData", projectData);
      localStorage.getItem('projectID') === null ? localStorage.setItem('projectID', dataProjectUser.projectByUserId.Data[0].ID) : console.log("projectID is not null");
      projectID === null ? setProjectID(dataProjectUser.projectByUserId.Data[0].ID) : setProjectID(localStorage.getItem('projectID'));
      console.log("projectID =? ", projectID);
      // ganttID == 0 ? console.log("gantt id !==0 true: ", ganttID) : console.log("gantt id !==0 false: ", ganttID);

    }
    console.log("USE EFFECT PROJECT");
  }, [dataProjectUser]);

  return { projectData, projectID, setProjectID, dataProjectUser };

}

function useGantt() {

  const [ganttName, setGanttName] = useState([]);
  const {projectID} = useProject();
  const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));

  const { data: dataGanttProject, loading: loadingGanttProject, error: errorGanttProject } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: projectID }
  });


  useEffect(() => {
    if (dataGanttProject) {
      setGanttName(dataGanttProject.ganttGetProjectID.data);
      localStorage.getItem('ganttID') === null ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is real not null");
      localStorage.getItem('ganttID') === "null" ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is not null");
      ganttID === "null" ? setGanttID(dataGanttProject.ganttGetProjectID.data[0].ID) : setGanttID(localStorage.getItem('ganttID'));
    }

  }, [dataGanttProject, projectID]);

  return { ganttID, setGanttID, projectID, ganttName, setGanttName, dataGanttProject };
}

function useActivityPhase() {
  const { data: dataActivityPhase, loading, error } = useQuery(GET_ACTIVITY_PHASE_DATA);
  const [activityPhaseData, setActivityPhaseData] = useState([]);

  useEffect(() => {
    if (dataActivityPhase) {
      setActivityPhaseData(dataActivityPhase.activityPhase.data);
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

export const useUnitMeasure = () => {
  const { data: dataUnitMeasure, loading, error } = useQuery(GET_UNIT_OF_MEASUREMENT_DATA);
  const [unitMeasureData, setUnitMeasureData] = useState([]);

  useEffect(() => {
    if (dataUnitMeasure) {
      console.log("Data Ready Unit Measure");
      setUnitMeasureData(dataUnitMeasure.activityUnitOfMeasurement.data);
      console.log(dataUnitMeasure.activityUnitOfMeasurement.data);
    } else {
      console.log("No data Unit Measure");
    }
    console.log("USE EFFECT Unit Measure");
  }, [dataUnitMeasure]);

  return [unitMeasureData, setUnitMeasureData];
}

export const PrintGantt = (props) => {
  const { title } = props;
  const { projectID } = useProject();
  const { ganttID } = useGantt();
  console.log("PrintGantt projectID", projectID);
  console.log("PrintGantt ganttID", ganttID);
  const [activityData, setActivity] = useActivity();
  const [linkData, setLink] = useLink();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();
  const [unitMeasureData, setUnitMeasureData] = useUnitMeasure();

  return <>
    {console.log("PrintGantt activityData", activityData)}
    <AppGantt title={title} dataGantt={activityData} dataLink={linkData} dataPhase={activityPhaseData} dataUnitMeasure={unitMeasureData} ganttID={ganttID} isReadOnly={true} isShowAddColumn={false} isShowListGantt={true} />
  </>
}

export const PrintGanttPage = (props) => {
  const { title, ganttID, projectID } = props;
  localStorage.setItem('ganttID', ganttID);
  localStorage.setItem('projectID', projectID);
  const [activityData, setActivity] = useActivity();
  const [linkData, setLink] = useLink();
  const [activityPhaseData, setActivityPhaseData] = useActivityPhase();
  const [unitMeasureData, setUnitMeasureData] = useUnitMeasure();

  return <>
    {/* <TestFormGantt title={title} dataGantt={activityData} dataLink={linkData} dataPhase={activityPhaseData} dataUnitMeasure={unitMeasureData} ganttID={ganttID} isReadOnly={false} isShowAddColumn={true} isShowListGantt={false} /> */}
    <AppGantt title={title} dataGantt={activityData} dataLink={linkData} dataPhase={activityPhaseData} dataUnitMeasure={unitMeasureData} ganttID={ganttID} isReadOnly={false} isShowAddColumn={true} isShowListGantt={false} />
    {console.log("activityData", activityData)}
  </>
}

export const PrintListGanttName = () => {
  const { ganttID, setGanttID, ganttName } = useGantt();
  console.log("this is custom activity. ganttname is ", ganttName);
  console.log("CUSTOMMM ID", ganttID);
  console.log("CUSTOMMM ganttData", ganttName);

  return <>
    <ListGanttByProject ganttID={ganttID} setGanttID={setGanttID} ganttName={ganttName} />
  </>
}

// TODO : ERROR
export const PrintListProjetcName = () => {
  const { projectID, setProjectID, projectData } = useProject();
  const { ganttID, setGanttID, ganttName } = useGantt();
  console.log("PrintListProjetcName ganttt ID ", ganttID);
  console.log("PrintListProjetcName ProjectID", projectID);
  console.log("PrintListProjetcName ganttname", ganttName);
  console.log("PrintListProjetcName projectdata", projectData);

  return <>
    <ListboxProjectName setGanttID={setGanttID} projectID={projectID} setProjectID={setProjectID} projectData={projectData} />
  </>
}
