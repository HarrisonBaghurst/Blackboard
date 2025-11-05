import { Point, Stroke } from '@/types/strokeTypes';
import { simplifyRDP } from './strokeOptimisation';

// ----- Parameter type definitions ----- 

type handleMouseDownParameters = {
    e: React.MouseEvent;
    currentColour: string;
    setCurrentStroke: (object: Stroke) => void;
    setIsToolDown: (state: boolean) => void;
    setPanStartPoint: (point: Point) => void;
    lastPanOffset: Point;
}

type handleMouseMoveParameters = {
    e: React.MouseEvent;
    setCurrentStroke: React.Dispatch<React.SetStateAction<Stroke | null>>;
    isToolDown: boolean;
    panStartPoint: Point | null;
    setPanOffset: (point: Point) => void;
    lastPanOffset: Point;
    panOffset: Point;
}

type handleMouseUpParameters = {
    e: React.MouseEvent;
    isToolDown: boolean;
    setIsToolDown: (state: boolean) => void;
    currentStroke: Stroke | null;
    setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
    setCurrentStroke: (object: Stroke | null) => void;
    setPanStartPoint: (point: Point | null) => void;
    setLastPanOffset: (point: Point) => void;
    panOffset: Point;
}

// ----- Function definitions ----- 

const getMouseClickPos = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};


const handleMouseDown = ({ e, currentColour, setCurrentStroke, setIsToolDown, setPanStartPoint, lastPanOffset }: handleMouseDownParameters) => {
    e.preventDefault(); // stop triggering of context menu

    if (e.buttons === 1) { // if left click 
        setIsToolDown(true);
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const point = { x: e.clientX - rect.left - lastPanOffset.x, y: e.clientY - rect.top - lastPanOffset.y };
        setCurrentStroke({ points: [point], colour: currentColour });
        return;
    } 
    if (e.buttons === 2) { // if right click 
        const point = getMouseClickPos(e);
        setPanStartPoint(point);
        return;
    }
}

const handleMouseMove = ({ e, setCurrentStroke, isToolDown, panStartPoint, setPanOffset, lastPanOffset }: handleMouseMoveParameters) => {
    e.preventDefault();

    // Drawing (left mouse)
    if (e.buttons === 1 && isToolDown) {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const point = { x: e.clientX - rect.left - lastPanOffset.x, y: e.clientY - rect.top - lastPanOffset.y };
        setCurrentStroke(prev => prev ? { ...prev, points: [...prev.points, point] } : null);
        return;
    }

    // Panning (right mouse)
    if (e.buttons === 2 && panStartPoint) {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const offset = {
            x: lastPanOffset.x + (point.x - panStartPoint.x),
            y: lastPanOffset.y + (point.y - panStartPoint.y),
        };
        setPanOffset(offset);
        return;
    }
};

const handleMouseUp = ({ e, isToolDown, setIsToolDown, currentStroke, setStrokes, setCurrentStroke, setPanStartPoint, setLastPanOffset, panOffset }: handleMouseUpParameters) => {
    if (e.button === 0 && isToolDown) {
        setIsToolDown(false);
        if (currentStroke) {
            const updatedPoints = simplifyRDP(currentStroke.points, 1.5);
            console.log(`Before: ${currentStroke.points.length}, After: ${updatedPoints.length}`)
            setStrokes((prev) => [...prev, {points: updatedPoints, colour: currentStroke.colour}]);
        }
        setCurrentStroke(null);
        return;
    }

    if (e.button === 2) {
        setLastPanOffset(panOffset);
        setPanStartPoint(null);
        return;
    }
}

// ----- function exports ----- 

export { handleMouseDown, handleMouseMove, handleMouseUp };