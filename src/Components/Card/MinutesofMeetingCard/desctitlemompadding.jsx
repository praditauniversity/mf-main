import React from "react";

const DescTitleTimeMOM = (props) => {
    const { title, start, end } = props;
    return (
        <div>
            <div className="pb-2">
                <p className="text-sm font-semibold opacity-70">{title}</p>
            </div>
            <div className="flex justify-start">
                <p className="text-base font-semibold">{start}</p>
                <p className="text-base font-semibold">-</p>
                <p className="text-base font-semibold">{end}</p>
            </div>
        </div>
    );
};

export default DescTitleTimeMOM;
