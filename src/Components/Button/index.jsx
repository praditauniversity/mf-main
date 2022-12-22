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

export const LinkButton = (link, label) => {
    return (
        <a href={link}>
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