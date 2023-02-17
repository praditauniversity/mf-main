import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID } from '../../Components/GraphQL/Queries';

const FetchMomByProjectId = () => {
    const { data } = useQuery(GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID, {
        variables: { projectId: String(localStorage.getItem('momProjectID')), sort: "ID asc" },
        pollInterval: 1000,
    });
    const [minutesOfMeeting, setMinutesOfMeeting] = useState([]);

    useEffect(() => {
        if (data) {
            setMinutesOfMeeting(data. minuteOfMeetingGetProjectID.data);
            console.log("Minutes of Meeting data with project id " + localStorage.getItem('momProjectID') + " found");
        } else {
            console.log("No data found for Minutes of Meeting with project id " + localStorage.getItem('momProjectID'));
        }
    }, [data]);

    return minutesOfMeeting;
}

export default FetchMomByProjectId;