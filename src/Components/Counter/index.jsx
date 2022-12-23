import React from "react";

const Counter = (props) => {
    const { value, textColor, bgColor } = props;
    return (
        <div className={"border border-none rounded-full bg-base-100 bg-" + bgColor + " ml-[20px] flex items-center justify-center p-[5px] pr-[14px] pl-[14px] w-10 h-10"}>
            <h6 className={"text-bold text-lg text-" + textColor}>
                {value}
            </h6>
        </div>
    );
}

export default Counter;