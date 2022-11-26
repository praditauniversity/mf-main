import React from 'react';

const Button = (props, buttonType, label) => {
    return (
        <button type={buttonType} className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
            {props.label}
        </button>
    )
}
export default Button;