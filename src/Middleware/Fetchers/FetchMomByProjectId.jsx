import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID } from '../../Components/GraphQL/Queries';

const FetchMomByProjectId = () => {
    const { data } = useQuery(GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID, {
        variables: { projectId: String(localStorage.getItem('momProjectID')), sort: "ID asc" },
        // variables: { projectId: localStorage.getItem('momProjectID') == null ? localStorage.setItem('momProjectID', data.dailyReportGetProjectID.data[0].ID) : localStorage.getItem('reportProjectID') },
    });
    const [minutesOfMeeting, setMinutesOfMeeting] = useState([]);

    useEffect(() => {
        if (data) {
            setMinutesOfMeeting(data. minuteOfMeetingGetProjectID.data);
            // reportProjectID === 0 ? localStorage.setItem('reportProjectID', data.minutesOfMeetingGetProjectID.data[0].ID) : localStorage.setItem('reportProjectID', reportProjectID);
            console.log("Minutes of Meeting data with project id " + localStorage.getItem('momProjectID') + " found");
        } else {
            console.log("No data found for Minutes of Meeting with project id " + localStorage.getItem('momProjectID'));
        }
    }, [data]);

    return minutesOfMeeting;
}

export default FetchMomByProjectId;