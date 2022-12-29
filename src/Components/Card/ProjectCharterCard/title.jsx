import React from "react";

const Title = (props) => {
    const { title} = props;
    return (
            <div className="pb-2">
                <p className="text-sm font-semibold opacity-70">{title}</p>
            </div>
    );
};

export default Title;
