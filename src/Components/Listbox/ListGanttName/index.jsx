import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';

const ListGanttByProject = (props) => {
    const {ganttID, setGanttID, projectID, ganttName} = props;

    function printListGanttName() {

        var isData = false;

        if (ganttName.length > 0){
            isData = true;
        }else{
            isData = false;
        }

        return ganttName.map(({ ID, name }) => (
            <>
                {/* {console.log("ID VALUE TYPE", typeof ID)} */}
                {/* {console.log("ID VALUE TYPE", typeof ID.toString())} */}
                {isData ? <option value={ID}>{name}</option> : <option value="0">No Gantt</option> }
            </>
        ));
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
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val project id:", typeof projectID, projectID)}
            {console.log("OPTION val gantt id:", typeof projectID, projectID)}
        </div>
    );
}

export default ListGanttByProject;