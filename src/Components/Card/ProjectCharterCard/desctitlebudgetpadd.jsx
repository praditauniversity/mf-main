import React from "react";

const DescTitleBudgetPadding = (props) => {
    const { title, description, symbol } = props;
    return (
        <div>
            <div className="pb-2 pr-20">
                <p className="text-sm font-semibold opacity-70">{title}</p>
            </div>
            <div className="flex justify-start">
                <p className="text-base font-semibold pr-1">{symbol}</p>
                <p className="text-base font-semibold">{description}</p>
            </div>
        </div>
    );
};

export default DescTitleBudgetPadding;
