import React from "react";

const TitleMilestone = (props) => {
    const { title } = props;
    return (
        <div className="pt-6 pb-3">
            <p className="text-sm font-semibold opacity-70">{title}</p>
        </div>
    );
};

export default TitleMilestone;
