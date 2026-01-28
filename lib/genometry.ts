import { Point, Stroke } from "@/types/strokeTypes";

export function StrokeIntersectPoints(
    stroke: Stroke,
    point: Point,
    radius: number,
) {
    return stroke.points.some(p => {
        const dx = p.x - point.x;
        const dy = p.y - point.y;
        return dx * dx + dy * dy <= radius * radius;
    })
}