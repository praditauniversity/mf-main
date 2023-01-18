import React from 'react';

const Button = (props, buttontype, label) => {
    return (
        <button
            type={buttontype}
            className="btn"
            {...props}>
            {props.label}
        </button>
    )
}

export const LinkButton = (link, label, id) => {
    return (
        <a href={link} key={id || 0}>
            <button className='btn'>
                {label}
            </button>
        </a>
    )
}

export const SubmitButton = (props) => {
    return (
        <Button {...props} buttontype="submit" />
    )
}

export default Button;