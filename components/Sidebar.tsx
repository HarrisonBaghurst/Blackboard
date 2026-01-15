'use client'

import { useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import { useCurrentColourRef } from "@/contexts/ToolContext";

const Sidebar = () => {
    const tools: ([string, number, string])[] = [
        ['/icons/pencil.svg', 90, '#ffffff'],
        ['/icons/crayon.svg', 270, '#edd973']
    ];

    const [currentTool, setCurrentTool] = useState<number>(0);

    const currentColourRef = useCurrentColourRef();

    return (
        <div
            className='fixed right-[1%] top-1/2 -translate-y-1/2 card-style'
        >
            {tools.map((tool, index) => (
                <motion.div
                    key={index}
                    onClick={() => {
                        setCurrentTool(index);
                        currentColourRef.current = tool[2];
                    }}
                    className="h-15 w-35 cursor-pointer origin-right overflow-hidden"
                    animate={{
                        scaleX: currentTool === index ? 1.25 : 1
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                    }}
                >
                    {tool[0] !== '' ?
                        (
                            <Image
                                src={tool[0]}
                                width={0}
                                height={0}
                                alt="tool"
                                style={{ transform: `rotate(${tool[1]}deg)` }}
                                className='w-full h-full scale-270'
                            />
                        ) : (<></>)
                    }
                </motion.div>
            ))}
        </div>
    )
}

export default Sidebar