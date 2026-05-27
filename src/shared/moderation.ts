import type {
  ModerationCategory,
  RecommendedAction,
  ReportedItem,
  TriageResult,
  TriagedItem
} from "./types";

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function containsAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

export function classifyReportedItem(item: ReportedItem): TriageResult {
  const text = `${item.content} ${item.reportReason}`.toLowerCase();

  let category: ModerationCategory = "ambiguous";
  let severity = 0.35;
  let confidence = 0.45;
  let recommendedAction: RecommendedAction = "review";
  let rationale = "The item has mixed or limited signals and should be reviewed by a moderator.";

  if (containsAny(text, ["bit.ly", "guaranteed", "20x", "crypto", "private group", "scam"])) {
    category = "spam";
    severity = 0.9;
    confidence = 0.92;
    recommendedAction = "remove";
    rationale = "High-confidence spam or scam indicators are present.";
  } else if (containsAny(text, ["idiot", "trash", "stupid", "shut up"])) {
    category = "harassment";
    severity = 0.72;
    confidence = 0.84;
    recommendedAction = "remove";
    rationale = "The item contains a direct targeted insult.";
  } else if (containsAny(text, ["subscribe", "buy my", "my course", "check my channel"])) {
    category = "self_promo";
    severity = 0.62;
    confidence = 0.86;
    recommendedAction = "review";
    rationale = "The item appears promotional and may violate community rules.";
  } else if (containsAny(text, ["nobel prize material", "genius take", "wow what a"])) {
    category = "ambiguous";
    severity = 0.38;
    confidence = 0.39;
    recommendedAction = "review";
    rationale = "The item may be sarcastic or uncivil, but intent is ambiguous.";
  } else if (containsAny(text, ["explain", "confused", "read the rules"])) {
    category = "safe";
    severity = 0.12;
    confidence = 0.76;
    recommendedAction = "approve";
    rationale = "The item appears to be a good-faith clarification request.";
  }

  severity = clamp01(severity);
  confidence = clamp01(confidence);

  const requiresHumanReview =
    confidence < 0.65 ||
    recommendedAction === "review" ||
    recommendedAction === "escalate" ||
    category === "ambiguous";

  return {
    itemId: item.id,
    category,
    severity,
    confidence,
    recommendedAction,
    requiresHumanReview,
    rationale
  };
}

export function triageQueue(items: ReportedItem[]): TriagedItem[] {
  return items
    .map((item) => ({
      ...item,
      triage: classifyReportedItem(item)
    }))
    .sort((a, b) => {
      const humanReviewDelta =
        Number(b.triage.requiresHumanReview) - Number(a.triage.requiresHumanReview);

      if (humanReviewDelta !== 0) return humanReviewDelta;

      const severityDelta = b.triage.severity - a.triage.severity;
      if (severityDelta !== 0) return severityDelta;

      return b.triage.confidence - a.triage.confidence;
    });
}
