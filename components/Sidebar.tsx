'use client'

import { useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import { useCurrentColourRef } from "@/contexts/ToolContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const tools: ([string, number, string])[] = [
        ['/icons/pencil.svg', 90, '#ffffff'],
        ['/icons/crayon.svg', 270, '#edd973']
    ];

    const [currentTool, setCurrentTool] = useState<number>(0);

    const currentColourRef = useCurrentColourRef();

    return (
        <div
            className={cn(
                'fixed right-[1%] top-1/2 -translate-y-1/2 card-style flex flex-col gap-(--padding) p-(--padding) items-end',
                'w-[calc(110px+var(--padding)*2)]'
            )}
        >
            {tools.map((tool, index) => (
                <motion.div
                    key={index}
                    onClick={() => {
                        setCurrentTool(index);
                        currentColourRef.current = tool[2];
                    }}
                    className="h-15 w-[110px] relative cursor-pointer overflow-hidden p-(--padding)"
                    animate={{
                        width: currentTool === index ? 145 : 110
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                    }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[145px] h-15">
                        <Image
                            src={tool[0]}
                            alt="tool"
                            width={0}
                            height={0}
                            className="w-full h-full scale-220"
                            style={{
                                rotate: `${tool[1]}deg`
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Sidebar