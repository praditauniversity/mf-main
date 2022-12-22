import React from 'react';

const ListboxTime = () => {
    return (
        <div className="flex flex-col items-center">
            <select className="select select-ghost select-sm w-full max-w-xs">
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last Year</option>
            </select>
        </div>
    );
}
export default ListboxTime;