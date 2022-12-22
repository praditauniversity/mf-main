import React from 'react';

const ListboxBy = () => {
    return (
        <div className="flex flex-col items-center">
            <select className="select select-ghost select-sm w-full max-w-xs">
                <option>By Duration</option>
                <option>By Financial</option>
            </select>
        </div>
    );
}
export default ListboxBy;