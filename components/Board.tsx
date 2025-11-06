'use client'

import drawToCanvas from '@/lib/canvasDrawing';
import { handleMouseDown, handleMouseMove, handleMouseUp } from '@/lib/canvasInputs';
import { Point, Stroke } from '@/types/strokeTypes';
import React, { useEffect, useRef, useState } from 'react'

const Board = () => {
    // reference to canvas - applies to html component
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // tool information 
    const [isToolDown, setIsToolDown] = useState(false);

    // strokes information 
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [currentColour, setCurrentColour] = useState('#ffffff')

    // panning informtaion 
    const [panOffset, setPanOffset] = useState<Point>({ x: 0, y: 0 });
    const [panStartPoint, setPanStartPoint] = useState<Point | null>(null);
    const [lastPanOffset, setLastPanOffset] = useState<Point>({ x: 0, y: 0 });

    useEffect(() => {
        drawToCanvas({ strokes, currentStroke, canvasRef, panOffset });
    }, [strokes, currentStroke, panOffset]);

    return (
        <canvas 
        ref={canvasRef}
        className='w-screen h-screen graph-paper'
        style={{ backgroundPosition: `${panOffset.x}px ${panOffset.y}px` }}
        onMouseDown={(e) => handleMouseDown({ e, currentColour, setCurrentStroke, setIsToolDown, setPanStartPoint, lastPanOffset })}
        onMouseMove={(e) => handleMouseMove({ e, setCurrentStroke, isToolDown, panStartPoint, setPanOffset, lastPanOffset, panOffset })}
        onMouseUp={(e) => handleMouseUp({ e, isToolDown, setIsToolDown, currentStroke, setCurrentStroke, setStrokes, setPanStartPoint, setLastPanOffset, panOffset })}
        onContextMenu={(e) => e.preventDefault()}
        />
    )
}

export default Board