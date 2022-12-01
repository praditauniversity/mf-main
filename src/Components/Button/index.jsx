import React from 'react';

const Button = (props, buttontype, label) => {
    return (
        <button type={buttontype} className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" {...props}>
            {props.label}
        </button>
    )
}

export const SubmitButton = (props) => {
    return (
        <Button {...props} buttontype="submit" />
    )
}

export default Button;