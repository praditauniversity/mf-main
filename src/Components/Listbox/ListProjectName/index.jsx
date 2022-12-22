import React from 'react';

const ListboxProjectName = () => {
    return (
        <div className="flex flex-col items-center">
            <select className="select select-ghost select-sm w-full max-w-lg">
                <option>Project Anomaly</option>
                <option>Project Alpha</option>
                <option>Project Beta</option>
                <option>Project Gamma</option>
            </select>
        </div>
    );
}
export default ListboxProjectName;