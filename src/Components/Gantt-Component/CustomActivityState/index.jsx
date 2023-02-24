import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID, GET_ACTIVITY_PHASE_DATA, GET_GANTT_PROJECT_ID, GET_LINK_DATA, GET_PROJECT_DATA_BY_USER_ID, GET_UNIT_OF_MEASUREMENT_DATA } from "../../GraphQL/Queries";
import AppGantt from "../AppGantt";
import UpcomingTaskCard from "../../Card/UpcomingTask/UpcomingTaskCard";
import TaskListCard from "../../Card/TaskList/TaskListCard";
import GetProfile from "../../Auth/GetProfile";

function useActivity() {
  const { ganttID } = useGantt();
  const [setGanttID] = useState(localStorage.getItem('ganttID'));

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: String(ganttID), sort: "ID asc" },
    pollInterval: 1000,
  });

  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      setActivity(data.activityGetGanttID.data);
    }
    else {
      console.log("No data Activity");
    }
  }, [data]);

  return [activityData, setActivity];
}

function useUpcomingActivity() {
  const { ganttID } = useGantt();

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: String(ganttID), limit: "6", sort: "start_time asc" },
    pollInterval: 1000,
  });

  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {
    if (data) {
      setUpcomingData(data.activityGetGanttID.data);
    } else {
      console.log("No data Upcoming Activity");
    }
  }, [data]);

  return [upcomingData, setUpcomingData];
}

function useLink() {
  const [linkData, setLink] = useState([]);

  const { data, loading, error } = useQuery(GET_LINK_DATA, {
    pollInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setLink(data.activityLink.data);
      console.log(data.activityLink.data);
    } else {
      console.log("No data Link");
    }
  }, [data]);

  return [linkData, setLink];
}

export function useProject() {
  const profile = GetProfile();
  const [projectData, setProjectData] = useState([]);
  const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));

  const { loading: loadingProjectUser, error: errorProjectUser, data: dataProjectUser } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    variables: { userId: profile.id },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (dataProjectUser) {
      setProjectData(dataProjectUser.projectByUserId.Data);
      if (dataProjectUser.projectByUserId.Data.length !== 0) {

        console.log("Data Ready list gantt and project by userid : ", dataProjectUser.projectByUserId.Data);
        // localStorage.getItem('projectID') === null ? localStorage.setItem('projectID', dataProjectUser.projectByUserId.Data[0].ID) : console.log("projectID is not null");
        // projectID === null ? setProjectID(dataProjectUser.projectByUserId.Data[0].ID) : setProjectID(localStorage.getItem('projectID'));
      }
    }
  }, [dataProjectUser]);

  return { projectData, projectID, setProjectID, dataProjectUser };

}

function useGantt() {

  const [ganttName, setGanttName] = useState([]);
  const { projectID } = useProject();
  const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));

  const { data: dataGanttProject, loading: loadingGanttProject, error: errorGanttProject } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: projectID },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (dataGanttProject) {
      setGanttName(dataGanttProject.ganttGetProjectID.data);
      if (dataGanttProject.ganttGetProjectID.data.length !== 0) {
        localStorage.getItem('ganttID') === null ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is real not null");
        localStorage.getItem('ganttID') === "null" ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is not null");
        ganttID === "null" ? setGanttID(dataGanttProject.ganttGetProjectID.data[0].ID) : setGanttID(localStorage.getItem('ganttID'));
      }
    }

  }, [dataGanttProject, projectID]);

  return { ganttID, setGanttID, projectID, ganttName, setGanttName, dataGanttProject };
}

function useActivityPhase() {
  const { data: dataActivityPhase, loading, error } = useQuery(GET_ACTIVITY_PHASE_DATA, {
    pollInterval: 1000,
  });
  const [activityPhaseData, setActivityPhaseData] = useState([]);

  useEffect(() => {
    if (dataActivityPhase) {
      setActivityPhaseData(dataActivityPhase.activityPhase.data);
    } else {
      console.log("No data ActivityPhase");
    }
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
  const { data: dataUnitMeasure, loading, error } = useQuery(GET_UNIT_OF_MEASUREMENT_DATA, {
    pollInterval: 1000,
  });
  const [unitMeasureData, setUnitMeasureData] = useState([]);

  useEffect(() => {
    if (dataUnitMeasure) {
      setUnitMeasureData(dataUnitMeasure.activityUnitOfMeasurement.data);
    } else {
      console.log("No data Unit Measure");
    }
  }, [dataUnitMeasure]);

  return [unitMeasureData, setUnitMeasureData];
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
    <AppGantt title={title} dataGantt={activityData} dataLink={linkData} dataPhase={activityPhaseData} dataUnitMeasure={unitMeasureData} ganttID={ganttID} isReadOnly={false} isShowAddColumn={true} isShowListGantt={false} />
  </>
}

/* No Use Because the error need to change the way to get data
// Print List Project Name Data for Dropdown in ListboxProjectName
export const PrintListProjetcName = () => {
  const { projectID, setProjectID, projectData } = useProject();
  const { ganttID, setGanttID, ganttName } = useGantt();

  return <>
    <ListboxProjectName setGanttID={setGanttID} projectID={projectID} setProjectID={setProjectID} projectData={projectData} />
  </>
}

// Print List ProjectDashboard with projectData as passing value
export const PrintProjectDashboard = () => {
  const [projectData,setProjectData]= useState(localStorage.getItem('projectID'));
  console.log("PrintProjectDashboard projectData : ", projectData);
  useEffect(() => {
    if (projectData === null) {
      setProjectData(String(localStorage.getItem('projectID')));
    } else {
      setProjectData(String(localStorage.getItem('projectID')));
    }
  }, [projectData]);

  const setProjectID = (projectData) => {
    setProjectData(projectData);
  }

  return <>
    <ProjectDashboard projectData={projectData} setProjectID={setProjectID} />
  </>
}
*/
