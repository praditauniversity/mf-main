import React from "react";

const DescTitle = (props) => {
    const { title, description } = props;
    return (
        <div>
            <div className="pb-2">
                <p className="text-sm font-semibold opacity-70">{title}</p>
            </div>
            <div>
                <p className="text-base font-semibold">{description}</p>
            </div>
        </div>
    );
};

export default DescTitle;
