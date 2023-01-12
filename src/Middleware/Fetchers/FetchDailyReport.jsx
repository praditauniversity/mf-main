import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_DAILY_REPORT_DATA } from '../../Components/GraphQL/Queries';

const FetchDailyReport = () => {
    const { data } = useQuery(GET_DAILY_REPORT_DATA);
    const [dailyReport, setDailyReport] = useState([]);

    useEffect(() => {
        if (data) {
            setDailyReport(data.dailyReport.data);
            console.log("Daily Report data found");
        } else {
            console.log("No data found for daily report");
        }
    }, [data]);

    return dailyReport;
}

export default FetchDailyReport;