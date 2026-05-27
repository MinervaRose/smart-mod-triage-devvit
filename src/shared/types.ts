export type ModerationCategory =
  | "spam"
  | "harassment"
  | "hate_or_abuse"
  | "self_promo"
  | "misinformation"
  | "off_topic"
  | "safe"
  | "ambiguous";

export type RecommendedAction =
  | "approve"
  | "remove"
  | "review"
  | "escalate"
  | "watch";

export interface ReportedItem {
  id: string;
  author: string;
  subreddit: string;
  type: "post" | "comment";
  content: string;
  reportReason: string;
  createdAt: string;
}

export interface TriageResult {
  itemId: string;
  category: ModerationCategory;
  severity: number;
  confidence: number;
  recommendedAction: RecommendedAction;
  requiresHumanReview: boolean;
  rationale: string;
}

export interface TriagedItem extends ReportedItem {
  triage: TriageResult;
}
