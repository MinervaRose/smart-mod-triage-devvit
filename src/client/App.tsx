import { useMemo, useState } from "react";
import { mockReportedItems } from "../shared/mockData";
import { triageQueue } from "../shared/moderation";
import type { TriagedItem } from "../shared/types";

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function actionLabel(item: TriagedItem): string {
  if (item.triage.requiresHumanReview) return "Human review";
  return item.triage.recommendedAction;
}

export default function App() {
  const [selected, setSelected] = useState<TriagedItem | null>(null);
  const triagedItems = useMemo(() => triageQueue(mockReportedItems), []);

  const humanReviewCount = triagedItems.filter(
    (item) => item.triage.requiresHumanReview
  ).length;

  const avgSeverity =
    triagedItems.reduce((sum, item) => sum + item.triage.severity, 0) /
    triagedItems.length;

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Devvit-ready moderation utility</p>
          <h1>Smart Mod Triage</h1>
          <p className="subtitle">
            Prioritize reported Reddit items by severity, confidence, and uncertainty.
          </p>
        </div>

        <div className="metrics">
          <article>
            <span>{triagedItems.length}</span>
            <p>items</p>
          </article>
          <article>
            <span>{humanReviewCount}</span>
            <p>need review</p>
          </article>
          <article>
            <span>{pct(avgSeverity)}</span>
            <p>avg severity</p>
          </article>
        </div>
      </section>

      <section className="layout">
        <div className="queue">
          <h2>Prioritized queue demo</h2>

          {triagedItems.map((item) => (
            <button
              key={item.id}
              className={`queue-card ${selected?.id === item.id ? "queue-card-selected" : ""}`}
              onClick={() => setSelected(item)}
            >
              <div className="card-topline">
                <strong>{item.triage.category.replaceAll("_", " ")}</strong>
                <span>{actionLabel(item)}</span>
              </div>

              <p className="content-preview">{item.content}</p>

              <div className="bars">
                <label>
                  Severity
                  <progress value={item.triage.severity} max={1} />
                  {pct(item.triage.severity)}
                </label>
                <label>
                  Confidence
                  <progress value={item.triage.confidence} max={1} />
                  {pct(item.triage.confidence)}
                </label>
              </div>
            </button>
          ))}
        </div>

        <aside className="details">
          <h2>Moderator view</h2>

          {selected ? (
            <div className="details-card">
              <p className="eyebrow">{selected.type} · {selected.subreddit}</p>
              <h3>{selected.author}</h3>
              <p className="quoted">“{selected.content}”</p>

              <dl>
                <dt>Report reason</dt>
                <dd>{selected.reportReason}</dd>

                <dt>Suggested action</dt>
                <dd>{selected.triage.recommendedAction}</dd>

                <dt>Human review?</dt>
                <dd>{selected.triage.requiresHumanReview ? "Yes" : "No"}</dd>

                <dt>Rationale</dt>
                <dd>{selected.triage.rationale}</dd>
              </dl>

              <div className="moderator-actions">
                <button>Approve</button>
                <button>Remove</button>
                <button>Escalate</button>
              </div>
            </div>
          ) : (
            <p className="empty-state">Select a queue item to inspect the triage rationale.</p>
          )}
        </aside>
      </section>
    </main>
  );
}
