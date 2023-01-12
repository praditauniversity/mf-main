import React from 'react';
import FetchProjectByUserId from '../../../Middleware/Fetchers/FetchProjectByUserId';

const ListboxProject = () => {
    const projectData = FetchProjectByUserId();
    function printListProjectName() {
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
    }
    return (
        <div className="flex flex-col items-center">
            <select className="select select-ghost select-sm w-full max-w-xs">
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