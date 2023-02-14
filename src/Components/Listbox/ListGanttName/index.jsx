import React, { useEffect, useState } from 'react';

const ListGanttByProject = (props) => {
    const {ganttID, projectID, ganttName} = props;

    // TODO: Fix this
    function printListGanttName() {

        if(ganttName.length>0){

            return ganttName.map(({ ID, name }) => (
                <>
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
                {printListGanttName()}
            </select>
        </div>
    );
}

export default ListGanttByProject;