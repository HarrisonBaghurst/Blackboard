"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

const apiKey = process.env.NEXT_PUBLIC_LIVE_BLOCKS_API_KEY!;

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider publicApiKey={apiKey}>
            <RoomProvider
                id="my-room"
                initialPresence={{ cursor: null }}
            >
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}