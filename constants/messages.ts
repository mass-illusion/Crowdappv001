// Shared message constants for consistent messaging across the app

export const CUSTOM_MESSAGES = {
  UNIVERSAL_INTRO: "Hey! I saw we have some shared interest. Would love to connect 🙂",
  LOCALS_MAP_INTRO: "Hey! I saw we have some shared interest. Would love to connect 🙂",
  LIVE_EVENT_INTRO: "Hey! I saw we have some shared interest. Would love to connect 🙂",
} as const;

export type CustomMessageType = keyof typeof CUSTOM_MESSAGES;