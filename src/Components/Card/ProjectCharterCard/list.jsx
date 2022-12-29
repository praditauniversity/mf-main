import React from "react";
import { IconList } from "../../Icons/icon";

const List = (props) => {
    const { description } = props;
    return (
        <div className="flex justify-start">
            <div className="pr-1 pt-1"><IconList /></div>
            <p className="text-base font-semibold">{description}</p>
        </div>
    );
};

export default List;

