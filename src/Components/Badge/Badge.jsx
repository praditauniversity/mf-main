import React from 'react';

const Badge = (props) => {
    const { color, text } = props;
    return (
        <div className="flex items-center justify-center">
            <div className={`px-5 py-3 text-sm font-bold leading-none text-white bg-${color} rounded-3xl`}>{text}</div>
        </div>
    );
}

export default Badge;