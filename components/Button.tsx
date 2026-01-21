import { easeInOut, motion } from "framer-motion";

type ButtonProps = {
    text: string;
    handleClick: () => void;
    variant: 'primary' | 'secondary';
}

const Button = ({ text, handleClick, variant }: ButtonProps) => {
    return (
        <motion.button
            className={variant === 'primary' ?
                'button-style-primary px-5 py-3 cursor-pointer text-lg w-fit' :
                'px-5 py-3 cursor-pointer text-lg w-fit border-2 border-foreground-second rounded-[10px]'
            }
            onClick={handleClick}
            whileHover={{ translateY: -2, scale: 1.02 }}
            transition={{ duration: 0.15, ease: easeInOut }}
        >
            {text}
        </motion.button>
    )
}

export default Button