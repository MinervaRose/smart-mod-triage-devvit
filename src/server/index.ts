import { createServer, context, reddit } from "@devvit/web/server";
import type { MenuItemRequest, UiResponse } from "@devvit/web/shared";
import { classifyReportedItem } from "../shared/moderation";
import type { ReportedItem } from "../shared/types";

const app = createServer();

app.post("/internal/menu/smart-triage", async (c) => {
  const _input = await c.req.json<MenuItemRequest>();

  const contentId = context.commentId ?? context.postId ?? "unknown";
  let content = "No content preview available.";
  let author = "unknown";
  let type: "post" | "comment" = context.commentId ? "comment" : "post";

  try {
    if (context.commentId) {
      const comment = await reddit.getCommentById(context.commentId);
      content = comment.body ?? content;
      author = comment.authorName ?? author;
    } else if (context.postId) {
      const post = await reddit.getPostById(context.postId);
      content = [post.title, post.body].filter(Boolean).join("\n\n") || content;
      author = post.authorName ?? author;
    }
  } catch (error) {
    console.error("Could not fetch Reddit content for triage", error);
  }

  const item: ReportedItem = {
    id: contentId,
    author,
    subreddit: context.subredditName ? `r/${context.subredditName}` : "unknown",
    type,
    content,
    reportReason: "Manual moderator triage",
    createdAt: new Date().toISOString()
  };

  const result = classifyReportedItem(item);

  return c.json<UiResponse>({
    showForm: {
      name: "triageForm",
      form: {
        title: "Smart Mod Triage",
        acceptLabel: "Close",
        cancelLabel: "Cancel",
        fields: [
          {
            name: "summary",
            label: "Triage summary",
            type: "paragraph",
            defaultValue:
              `Category: ${result.category}\n` +
              `Severity: ${Math.round(result.severity * 100)}%\n` +
              `Confidence: ${Math.round(result.confidence * 100)}%\n` +
              `Suggested action: ${result.recommendedAction}\n` +
              `Human review required: ${result.requiresHumanReview ? "yes" : "no"}\n\n` +
              `Rationale: ${result.rationale}`
          }
        ]
      }
    }
  });
});

app.post("/internal/form/triage-submit", async (c) => {
  return c.json<UiResponse>({
    showToast: "Smart triage closed."
  });
});

export default app;
