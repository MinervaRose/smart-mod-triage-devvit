import type { ReportedItem } from "./types";

export const mockReportedItems: ReportedItem[] = [
  {
    id: "item_001",
    author: "throwaway_crypto_928",
    subreddit: "r/examplecommunity",
    type: "post",
    content: "Guaranteed 20x returns. Join my private crypto group now: bit.ly/not-real",
    reportReason: "Possible spam or scam",
    createdAt: "2026-05-27T17:12:00Z"
  },
  {
    id: "item_002",
    author: "grumpy_penguin",
    subreddit: "r/examplecommunity",
    type: "comment",
    content: "You're an idiot. Please stop posting this nonsense.",
    reportReason: "Harassment",
    createdAt: "2026-05-27T17:20:00Z"
  },
  {
    id: "item_003",
    author: "dry_humour_42",
    subreddit: "r/examplecommunity",
    type: "comment",
    content: "Wow, what a genius take. Truly Nobel Prize material.",
    reportReason: "Civility concern",
    createdAt: "2026-05-27T17:25:00Z"
  },
  {
    id: "item_004",
    author: "curious_student",
    subreddit: "r/examplecommunity",
    type: "post",
    content: "Can someone explain why my post was removed? I read the rules but I am still confused.",
    reportReason: "Off-topic",
    createdAt: "2026-05-27T17:30:00Z"
  }
];
