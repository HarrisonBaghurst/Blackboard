import { Point, Stroke } from '@/types/strokeTypes';
import { simplifyRDP } from './strokeOptimisation';
import { RefObject } from 'react';
import { Tools } from '@/types/toolTypes';
import { StrokeIntersectPoints } from './genometry';

// --- type definitions ---

type handleMouseDownParameters = {
    e: React.MouseEvent;
    currentColourRef: RefObject<string>;
    currentStrokeRef: RefObject<Stroke | null>;
    isDrawingRef: RefObject<boolean>;
    panStartRef: RefObject<Point | null>;
    lastPanOffsetRef: RefObject<Point>;
    currentToolRef: RefObject<Tools>;
};

type handleMouseMoveParameters = {
    e: React.MouseEvent;
    currentStrokeRef: RefObject<Stroke | null>;
    isDrawingRef: RefObject<boolean>;
    panStartRef: RefObject<Point | null>;
    panOffsetRef: RefObject<Point>;
    lastPanOffsetRef: RefObject<Point>;
    currentToolRef: RefObject<Tools>;
    strokes: readonly Stroke[] | null;
    onErase: (strokeIds: string[]) => void;
};

type handleMouseUpParameters = {
    e: React.MouseEvent;
    isDrawingRef: RefObject<boolean>;
    currentStrokeRef: RefObject<Stroke | null>;
    panStartRef: RefObject<Point | null>;
    lastPanOffsetRef: RefObject<Point>;
    panOffsetRef: RefObject<Point>;
    currentToolRef: RefObject<Tools>;
    onStrokeFinished: (stroke: Stroke) => void;
};

// --- helpers ---

const getMousePos = (e: React.MouseEvent): Point => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

// --- input handlers ---

export const handleMouseDown = ({
    e,
    currentColourRef,
    currentStrokeRef,
    isDrawingRef,
    panStartRef,
    lastPanOffsetRef,
    currentToolRef,
}: handleMouseDownParameters) => {
    e.preventDefault();

    if (e.buttons === 1 && currentToolRef.current === 'pen') {
        // left click: start drawing
        isDrawingRef.current = true;
        const { x, y } = getMousePos(e);
        currentStrokeRef.current = {
            id: crypto.randomUUID(),
            points: [{ x: x - lastPanOffsetRef.current.x, y: y - lastPanOffsetRef.current.y }],
            colour: currentColourRef.current,
        };
    }

    if (e.buttons === 2) {
        // right click: start panning
        panStartRef.current = getMousePos(e);
    }
};

export const handleMouseMove = (() => {
    let lastTime = 0;
    const THROTTLE_MS = 16; // ~60 FPS
    const ERASER_RADIUS = 10;

    return ({
        e,
        currentStrokeRef,
        isDrawingRef,
        panStartRef,
        panOffsetRef,
        lastPanOffsetRef,
        currentToolRef,
        strokes,
        onErase,
    }: handleMouseMoveParameters) => {
        const now = performance.now();
        if (now - lastTime < THROTTLE_MS) return;
        lastTime = now;

        const { x, y } = getMousePos(e);
        const worldPoint = {
            x: x - lastPanOffsetRef.current.x,
            y: y - lastPanOffsetRef.current.y,
        }

        // drawing with pen 
        if (currentToolRef.current === 'pen' && e.buttons === 1 && isDrawingRef.current && currentStrokeRef.current) {
            currentStrokeRef.current.points.push(worldPoint);
            return;
        }

        // removing with eraser 
        if (currentToolRef.current === 'eraser' && e.buttons === 1 && strokes) {
            const hitStrokeIds = strokes
                .filter(strokes => StrokeIntersectPoints(strokes, worldPoint, ERASER_RADIUS))
                .map(stroke => stroke.id);

            if (hitStrokeIds.length >= 1) {
                onErase(hitStrokeIds);
            }
            return;
        }

        // panning 
        if (e.buttons === 2 && panStartRef.current) {
            panOffsetRef.current = {
                x: lastPanOffsetRef.current.x + (x - panStartRef.current.x),
                y: lastPanOffsetRef.current.y + (y - panStartRef.current.y),
            }
        }
    }
})();

export const handleMouseUp = ({
    e,
    isDrawingRef,
    currentStrokeRef,
    panStartRef,
    lastPanOffsetRef,
    panOffsetRef,
    currentToolRef,
    onStrokeFinished,
}: handleMouseUpParameters) => {
    if (e.button === 0 && isDrawingRef.current && currentToolRef.current === 'pen') {
        isDrawingRef.current = false;
        if (currentStrokeRef.current) {
            const simplified = simplifyRDP(currentStrokeRef.current.points, 1);
            const newStroke = ({
                id: crypto.randomUUID(),
                points: simplified,
                colour: currentStrokeRef.current.colour,
            })
            onStrokeFinished(newStroke);
            currentStrokeRef.current = null;
        }
    }

    else if (e.button === 2) {
        panStartRef.current = null;
        lastPanOffsetRef.current = { ...panOffsetRef.current };
    }
};
