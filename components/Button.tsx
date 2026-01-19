import React from 'react'

type ButtonProps = {
    text: string;
    handleClick: () => void;
    variant: 'primary' | 'secondary';
}

const Button = ({ text, handleClick, variant }: ButtonProps) => {
    return (
        <button
            className={variant === 'primary' ?
                'button-style-primary px-4 py-3 cursor-pointer text-xl w-fit' :
                'button-style-secondary px-4 py-3 cursor-pointer text-xl w-fit'
            }
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

export default Button