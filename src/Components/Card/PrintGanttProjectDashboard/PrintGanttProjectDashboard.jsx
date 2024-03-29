import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID, GET_ACTIVITY_PHASE_DATA, GET_GANTT_PROJECT_ID, GET_LINK_DATA, GET_UNIT_OF_MEASUREMENT_DATA } from '../../GraphQL/Queries';
import AppGantt from '../../Gantt-Component/AppGantt';

const PrintGanttProjectDashboard = (props) => {
    const { projectID, title } = props;

    const [ganttName, setGanttName] = useState([]);
    const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));

    const { data: dataGanttProject, loading: loadingGanttProject, error: errorGanttProject } = useQuery(GET_GANTT_PROJECT_ID, {
        variables: { project_id: projectID },
        pollInterval: 1000,
    });

    useEffect(() => {
        if (dataGanttProject) {
            setGanttName(dataGanttProject.ganttGetProjectID.data);
            if (dataGanttProject.ganttGetProjectID.data.length !== 0 ) {
                localStorage.getItem('ganttID') === null ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is not null");
                localStorage.getItem('ganttID') === "null" ? localStorage.setItem('ganttID', dataGanttProject.ganttGetProjectID.data[0].ID) : console.log("ganttID is not string null");
                ganttID === "null" ? setGanttID(dataGanttProject.ganttGetProjectID.data[0].ID) : setGanttID(localStorage.getItem('ganttID'));
            }
        }

    }, [dataGanttProject, projectID]);

    console.log("PrintGantt projectID", projectID);
    console.log("PrintGantt ganttID", ganttID);

    const { data: dataActivityGanttID } = useQuery(GET_ACTIVITY_GANTT_ID, {
        variables: { gantt_id: String(ganttID), sort: "ID asc" },
        pollInterval: 1000,
    });

    const [activityData, setActivity] = useState([]);
    const [testData, settestData] = useState([]);

    useEffect(() => {
        console.log("USE EFFECT Activity");
        if (dataActivityGanttID) {
            console.log("Data Ready Activity");
            setActivity(dataActivityGanttID.activityGetGanttID.data);
            console.log(dataActivityGanttID.activityGetGanttID.data);
        } else {
            console.log("No data Activity");
        }
    }, [dataActivityGanttID]);

    const [linkData, setLink] = useState([]);

    const { data: dataGetLinkData } = useQuery(GET_LINK_DATA, {
        pollInterval: 1000,
    });

    useEffect(() => {
        if (dataGetLinkData) {
            console.log("Data Ready Link");
            setLink(dataGetLinkData.activityLink.data);
            console.log(dataGetLinkData.activityLink.data);
        } else {
            console.log("No data Link");
        }
        console.log("USE EFFECT LINK");
    }, [dataGetLinkData]);

    const { data: dataActivityPhase } = useQuery(GET_ACTIVITY_PHASE_DATA, {
        pollInterval: 1000,
    });
    const [activityPhaseData, setActivityPhaseData] = useState([]);

    useEffect(() => {
        if (dataActivityPhase) {
            setActivityPhaseData(dataActivityPhase.activityPhase.data);
        } else {
            console.log("No data Phase");
        }
        console.log("USE EFFECT Phase");
    }, [dataActivityPhase]);

    const { data: dataUnitMeasure, loading, error } = useQuery(GET_UNIT_OF_MEASUREMENT_DATA, {
        pollInterval: 1000,
    });
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

    return <>
        {console.log("PrintGantt activityData", activityData)}
        <AppGantt projectID={projectID} title={title} dataGantt={activityData} dataLink={linkData} dataPhase={activityPhaseData} dataUnitMeasure={unitMeasureData} ganttID={ganttID} isReadOnly={true} isShowAddColumn={false} isShowListGantt={true} />
    </>
}

export default PrintGanttProjectDashboard;
