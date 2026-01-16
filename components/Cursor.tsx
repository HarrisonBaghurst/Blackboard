export default function Cursor({ x, y, color }: { x: number; y: number; color: string }) {
    return (
        <svg
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${x}px) translateY(${y}px)`,
                transition: "transform 0.1s transform-timing-function: linear",
                pointerEvents: "none",
            }}
            width="24"
            height="36"
            viewBox="0 0 24 36"
            fill="none"
        >
            <path
                fill={color}
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            />
        </svg>
    );
}