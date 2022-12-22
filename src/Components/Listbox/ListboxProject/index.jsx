import React from 'react';

const ListboxProject = () => {
    return (
        <div className="flex flex-col items-center">
            <select className="select select-ghost select-sm w-full max-w-xs">
                <option>Solar Panel Smart Lab</option>
                <option>Winter Wonderland</option>
                <option>Reverie Product</option>
                <option>Meraki Development</option>
            </select>
        </div>
    );
}
export default ListboxProject;