import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_GANTT_PROJECT_ID, GET_PROJECT_DATA_BY_USER_ID } from '../../Components/GraphQL/Queries';

const FetchGanttByProjectId = (props) => {
    const {projectID} = props
    const { data, loading, error } = useQuery(GET_GANTT_PROJECT_ID, {
        variables: { project_id: projectID }
      });
    const [ganttData, setGanttData] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("data: " + data.ganttGetProjectID.data);
            setGanttData(data.ganttGetProjectID.data);
        } else {
            console.log("No data found for gantt with project id : " + projectID);
        }
    }, [data]);

    return ganttData;
}

export default FetchGanttByProjectId;