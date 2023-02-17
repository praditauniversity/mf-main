import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GetProfile from '../../Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from '../../GraphQL/Queries';

const ListboxProject = () => {
    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
        pollInterval: 1000,
    });
    const [projectData, setProjectData] = useState([]);
    const [TPEID, setTPEID] = useState(localStorage.getItem('TPEID'));
    useEffect(() => {
        if (data) {
            setProjectData(data.projectByUserId.Data);
            if (data.projectByUserId.Data.length !== 0) {

                //if local storage is empty, set to first project id
                localStorage.getItem('TPEID') === null ? localStorage.setItem('TPEID', data.projectByUserId.Data[0].ID) : console.log("TpeID is not null");
                TPEID === null ? setTPEID(data.projectByUserId.Data[0].ID) : setTPEID(localStorage.getItem('TPEID'));
            }
            if (data.projectByUserId.Data.length === 0){
                localStorage.removeItem('TPEID');
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
        setTPEID(event.target.value);
        localStorage.setItem('TPEID', event.target.value);
        window.location.reload();
    }
    return (
        <div className="flex flex-col items-center">
            <select value={TPEID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                {printListProjectName()}
            </select>
        </div>
    );
}
export default ListboxProject;