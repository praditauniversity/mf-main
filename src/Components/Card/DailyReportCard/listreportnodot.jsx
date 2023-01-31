import React from "react";

const ListReportNoDot = (props) => {
    const { description } = props;
    return (
        <div className="">
            <p className="text-base font-semibold">{description}</p>
        </div>
    );
};

export default ListReportNoDot;

