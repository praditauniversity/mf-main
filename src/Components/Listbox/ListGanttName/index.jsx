import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';

const ListGanttByProject = (props) => {
    const {ganttID, projectID, ganttName} = props;

    console.log("GANTTTTTTTTTTT ID", ganttID);
    console.log("GANTTTTTTTTTTT ganttData", ganttName);

    // TODO: Fix this
    function printListGanttName() {

        if(ganttName.length>0){

            return ganttName.map(({ ID, name }) => (
                <>
                    {/* {console.log("ID VALUE TYPE", typeof ID)} */}
                    {/* {console.log("ID VALUE TYPE", typeof ID.toString())} */}
                    <option value={ID}>{name}</option>
                </>
            ));
        }
        // else{
        //     return <option value="0">No Data Gantt</option>
        // }

    }

    const handleChange = (event) => {
        setGanttID(event.target.value);
        localStorage.setItem('ganttID', event.target.value);
        window.location.reload();
        // localStorage.setItem('selectedOption', selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <select value={ganttID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                {printListGanttName()}
            </select>
        </div>
    );
}

export default ListGanttByProject;