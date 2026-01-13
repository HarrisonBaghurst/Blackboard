'use client'

import { useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";

const Sidebar = () => {
    const tools: string[] = [
        '/icons/pencil.svg',
        '',
        '',
        '',
        '',
        ''
    ];

    const [currentTool, setCurrentTool] = useState<number>(0);

    return (
        <div
            className='fixed right-[1%] top-1/2 -translate-y-1/2 card-style'
        >
            {tools.map((tool, index) => (
                <motion.div
                    key={index}
                    onClick={() => setCurrentTool(index)}
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
                    {tool !== '' ?
                        (
                            <Image
                                src={tool}
                                width={0}
                                height={0}
                                alt="this"
                                className="w-full h-full rotate-90 scale-250"
                            />
                        ) : (<></>)
                    }
                </motion.div>
            ))}
        </div>
    )
}

export default Sidebar