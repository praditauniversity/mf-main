import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import FetchProjectByUserId from '../../../Middleware/Fetchers/FetchProjectByUserId';
import GetProfile from '../../Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from '../../GraphQL/Queries';

const PrintListProjectDashboardWithData = () => {
    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
        pollInterval: 1000,
        // fetchPolicy: "cache-and-network",
    });
    const [projectData, setProjectData] = useState([]);
    const [PROJECTID, setPROJECTID] = useState(localStorage.getItem('projectID'));
    useEffect(() => {
        if (data) {
            setProjectData(data.projectByUserId.Data);

            if (data.projectByUserId.Data.length !== 0) {
                //if local storage is empty, set to first project id
                // console.log("BRIANNNN", data.projectByUserId.Data);
                localStorage.getItem('projectID') === null ? localStorage.setItem('projectID', data.projectByUserId.Data[0].ID) : console.log("projectID is not null");
                PROJECTID === null ? setPROJECTID(data.projectByUserId.Data[0].ID) : setPROJECTID(localStorage.getItem('projectID'));
            }
            if (data.projectByUserId.Data.length === 0){
                localStorage.removeItem('projectID');
            }
        }
        refetch({ userId: String(profile.id), sort: "ID asc" });
    }, [data]);

    function printListProjectName() {
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>
            </>
        ));
    }
    const handleChange = (event) => {
        setPROJECTID(event.target.value);
        localStorage.setItem('projectID', event.target.value);
        localStorage.setItem('ganttID', null);
        window.location.reload();
    }
    return (
        <div className="flex flex-col items-center">
            <select value={PROJECTID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                {printListProjectName()}
            </select>
        </div>
    );
}
export default PrintListProjectDashboardWithData;