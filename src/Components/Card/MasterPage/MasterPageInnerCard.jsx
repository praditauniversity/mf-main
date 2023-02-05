import React from 'react';

const MasterPageInnerCard = (props) => {
    const { title, total, status, icon } = props;
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <p className="text-grey font-semibold text-md">{title}</p>
                <h6 className="text-3xl font-bold">{total}</h6>
                <p className="text-grey-light font-normal text-sm">{status}</p>
            </div>

            <div className="icon">
                <img src={icon} alt="" className="w-20 opacity-50"/>
            </div>
        </div>
    );
}

export default MasterPageInnerCard;