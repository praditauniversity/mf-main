import React, { useState } from 'react';
import FetchProjectByUserId from '../../../Middleware/Fetchers/FetchProjectByUserId';

const ListboxProject = () => {
    
    const [TPEID, setTPEID] = useState(localStorage.getItem('TPEID'));
    const projectData = FetchProjectByUserId();
    function printListProjectName() {
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
    }
    const handleChange=(event)=>{
        setTPEID(event.target.value);
        localStorage.setItem('TPEID',event.target.value);
        window.location.reload();
    }
    return (
        <div className="flex flex-col items-center">
            <select value={TPEID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                {/* <option>Solar Panel Smart Lab</option>
                <option>Winter Wonderland</option>
                <option>Reverie Product</option>
                <option>Meraki Development</option> */}
                {printListProjectName()}
            </select>
        </div>
    );
}
export default ListboxProject;