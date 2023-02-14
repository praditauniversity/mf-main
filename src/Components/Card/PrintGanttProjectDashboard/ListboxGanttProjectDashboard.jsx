import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GetProfile from '../../Auth/GetProfile';
import { GET_GANTT_PROJECT_ID } from "../../GraphQL/Queries";

const ListboxGanttProjectDashboard = (props) => {
    const profile = GetProfile();
    const {projectID} = props;
    const {data} = useQuery(GET_GANTT_PROJECT_ID, {
        variables: { project_id: projectID, sort: "ID asc" },
    });
    const [ganttData, setganttData] = useState([]);
    const [GANTTID,setGanttID] = useState(localStorage.getItem('ganttID'));
    useEffect(() => {
    if(data){
        setganttData(data.ganttGetProjectID.data);
        //if local storage is empty, set to first project id
        localStorage.getItem('ganttID') === null ? localStorage.setItem('ganttID', data.ganttGetProjectID.data[0].ID) : console.log("ganttID is not null");
        GANTTID === null ? setGanttID(data.ganttGetProjectID.data[0].ID) : setGanttID(localStorage.getItem('ganttID'));
    }
    }, [data]);
    
    function printListGanttName() {
        return ganttData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
    }
    const handleChange=(event)=>{
        setGanttID(event.target.value);
        localStorage.setItem('ganttID',event.target.value);
        window.location.reload();
    }
    return (
        <div className="flex flex-col items-center">
            <select value={GANTTID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                {printListGanttName()}
            </select>
        </div>
    );
}
export default ListboxGanttProjectDashboard;