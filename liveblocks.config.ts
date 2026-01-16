// Define Liveblocks types for your application

import { LiveList } from "@liveblocks/client";
import { Stroke } from "./types/strokeTypes";

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: { x: number; y: number } | null;
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      canvasStrokes: LiveList<Stroke>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {};
    };

    RoomEvent: {};
    ThreadMetadata: {};
    RoomInfo: {};
  }
}
