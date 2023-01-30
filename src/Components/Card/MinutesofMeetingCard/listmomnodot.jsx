import React from "react";

const ListMOMNoDot = (props) => {
    const { description } = props;
    return (
        <div className="">
            <p className="text-base font-semibold">{description}</p>
        </div>
    );
};

export default ListMOMNoDot;

