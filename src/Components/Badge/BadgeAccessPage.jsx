import React from 'react';

const BadgeAccessPage = (props) => {
    const { text, icon } = props;
    return (
        <div className="flex items-center justify-center bg-tag-bg rounded-md px-5 py-3">
            <div className="icon">
                <img src={icon} alt=""/>
            </div>
            <div className="text-md font-bold leading-none px-2">{text}</div>
        </div>
    );
}

export default BadgeAccessPage;