'use client'

import { createContext, RefObject, useContext, useRef } from "react";

type ToolContextType = {
    currentColourRef: RefObject<string>;
}

const ToolContext = createContext<ToolContextType | null>(null);

export function CurrentColourProvider({ children }: { children: React.ReactNode }) {
    const currentColourRef = useRef<string>('#ffffff');

    return (
        <ToolContext.Provider value={{ currentColourRef }}>
            {children}
        </ToolContext.Provider>
    );
}

export function useCurrentColourRef(): RefObject<string> {
    const ctx = useContext(ToolContext);
    if (!ctx) {
        throw new Error('useCurrentColourRef must be used within CurrentColourProvider');
    }
    return ctx.currentColourRef;
}