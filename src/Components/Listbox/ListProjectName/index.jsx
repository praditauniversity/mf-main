import React, { useEffect, useState } from 'react';

const ListboxProjectName = (props) => {
    const { setGanttID, projectID, setProjectID, projectData } = props;

    function printListProjectName() {
        if (projectData.length > 0) {
            return projectData.map(({ ID, name }) => (
                <>
                    <option value={ID}>{name}</option>
                </>
            ));
        }
        //  else {
        //     return <option value="0">No Data Project</option>
        // }
    }

    const handleChange = (event) => {
        setProjectID(event.target.value);
        localStorage.setItem('projectID', event.target.value);
        localStorage.setItem('ganttID', null);
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center">
            <select value={projectID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {printListProjectName()}
            </select>
            {/* {console.log("OPTION val:", typeof projectID, projectID)} */}
        </div>
    );
}

export default ListboxProjectName;