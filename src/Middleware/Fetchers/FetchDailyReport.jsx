import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_DAILY_REPORT_DATA } from '../../Components/GraphQL/Queries';

const FetchDailyReport = () => {
    const { data } = useQuery(GET_DAILY_REPORT_DATA, {
        pollInterval: 1000,
    });
    const [dailyReport, setDailyReport] = useState([]);

    useEffect(() => {
        if (data) {
            setDailyReport(data.dailyReport.data);
        } else {
            
        }
    }, [data]);

    return dailyReport;
}

export default FetchDailyReport;