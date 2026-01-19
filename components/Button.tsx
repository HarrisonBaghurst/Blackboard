type ButtonProps = {
    text: string;
    handleClick: () => void;
    variant: 'primary' | 'secondary';
}

const Button = ({ text, handleClick, variant }: ButtonProps) => {
    return (
        <button
            className={variant === 'primary' ?
                'button-style-primary px-3 py-2 cursor-pointer text-sm w-fit' :
                'button-style-secondary px-3 py-2 cursor-pointer text-sm w-fit'
            }
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

export default Button