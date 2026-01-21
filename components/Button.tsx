import { cn } from "@/lib/utils";
import { easeInOut, motion } from "framer-motion";

type ButtonProps = {
    text: string;
    handleClick: () => void;
    variant: 'primary' | 'secondary';
}

const Button = ({ text, handleClick, variant }: ButtonProps) => {
    return (
        <motion.button
            className={cn('relative px-5 py-3 cursor-pointer text-2xl w-fit rounded-[5px]', variant === 'primary' ?
                'bg-linear-to-b from-yellow-400 to-orange-400 text-background border shadow-[0_0_12px_rgba(255,190,0,0.35)] font-mont-bold' :
                'bg-linear-to-t from-card-background to-[hsl(0,0,18%)] text-foreground'
            )}
            onClick={handleClick}
            whileHover={{}}
            transition={{}}
        >
            {text}
            <div className={cn("absolute bottom-0 right-0 w-6 h-6 bg-white/10 backdrop-blur-md border border-white/25 rounded-full translate-x-1/4 translate-y-1/4",
                variant === 'primary' ?
                    'block' :
                    'hidden'
            )} />
        </motion.button>
    )
}

export default Button