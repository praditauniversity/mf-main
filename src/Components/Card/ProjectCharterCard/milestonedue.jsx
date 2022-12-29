import React from "react";

const MilestoneDue = (props) => {
    const { title, description } = props;
    return (
        <div>
            <div className="">
                <p className="text-sm font-semibold">{title}</p>
            </div>
            <div className="flex justify-start">
                <p className="text-base font-semibold pr-1">Due :</p>
                <p className="text-base font-semibold">{description}</p>
            </div>
        </div>
    );
};

export default MilestoneDue;
