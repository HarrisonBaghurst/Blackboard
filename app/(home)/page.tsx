'use client'

import Button from '@/components/Button';
import gsap from 'gsap';
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

const WORDS = ['Teaching', 'Learning'];

const page = () => {
    const router = useRouter();

    const createBoard = () => {
        const id = uuidv4();
        router.push(`/board/${id}`)
    }

    const lettersRef = useRef<HTMLSpanElement[]>([]);
    const [wordIndex, setWordIndex] = useState(0);

    const currentWord = WORDS[wordIndex]

    useEffect(() => {
        lettersRef.current = lettersRef.current.slice(0, currentWord.length);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(lettersRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)' },
            )
                .to({}, { duration: 2 })
                .to(lettersRef.current, {
                    y: -50,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: 'power2.in',
                    onComplete: () => {
                        setWordIndex((prev) => (prev + 1) % WORDS.length);
                    }
                });
        });

        return () => ctx.revert();
    }, [wordIndex])

    return (
        <>
            <div className='bg-card-background rounded-b-xl mx-[12%] h-12 text-lg flex items-center px-4 justify-between'>
                Chalkie Chalkie
            </div>
            <div className='mt-[20dvh] flex justify-center'>
                <div className='flex flex-col items-center justify-center gap-12'>
                    <h1 className='font-mont-bold text-5xl'>
                        Your collaborative
                        <span className='inline-flex overflow-hidden py-3 bg-yellow-400 m-3 w-66 justify-center rounded-full text-background'>
                            {currentWord.split('').map((char, i) => (
                                <span
                                    key={`${char}-${i}`}
                                    ref={(el) => {
                                        if (el) lettersRef.current[i] = el;
                                    }}
                                    className='inline-block'
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                        tool
                    </h1>
                </div>
            </div>
        </>
    )

}

export default page