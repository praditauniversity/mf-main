import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_DAILY_REPORT_DATA_BY_PROJECT_ID } from '../../Components/GraphQL/Queries';

const FetchDailyReportByProjectId = () => {
    const { data } = useQuery(GET_DAILY_REPORT_DATA_BY_PROJECT_ID, {
        variables: { projectId: localStorage.getItem('reportProjectID')}
        // variables: { projectId: localStorage.getItem('reportProjectID') == null ? localStorage.setItem('reportProjectID', data.dailyReportGetProjectID.data[0].ID) : localStorage.getItem('reportProjectID') },
    });
    const [dailyReport, setDailyReport] = useState([]);
    // const [projectID, setProjectID] = useState(localStorage.getItem('reportProjectID'));

    useEffect(() => {
        if (data) {
            setDailyReport(data.dailyReportGetProjectID.data);
            // projectID === 0 ? localStorage.setItem('reportProjectID', data.dailyReportGetProjectID.data[0].ID) : localStorage.setItem('reportProjectID', projectID);
            console.log("Daily Report data with project id " + localStorage.getItem('reportProjectID') + " found");
        } else {
            console.log("No data found for daily report with project id " + localStorage.getItem('reportProjectID'));
        }
    }, [data]);

    return dailyReport;
}

export default FetchDailyReportByProjectId;