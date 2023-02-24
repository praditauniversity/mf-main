import React from 'react';

const ListGanttByProject = (props) => {
    const {ganttID, ganttName} = props;

    function printListGanttName() {

        if(ganttName.length>0){

            return ganttName.map(({ ID, name }) => (
                <>
                    <option value={ID}>{name}</option>
                </>
            ));
        }

    }

    const handleChange = (event) => {
        setGanttID(event.target.value);
        localStorage.setItem('ganttID', event.target.value);
        window.location.reload();
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