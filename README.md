# Smart Mod Triage

A small Devvit-ready moderation tool that helps Reddit moderators prioritize reported content by severity, confidence, and uncertainty.

The project is intentionally short, practical, and portfolio-friendly.

It does **not** replace moderators. It helps moderators decide what to inspect first.

## What it does

Smart Mod Triage provides two things:

1. A Reddit/Devvit moderator menu action called **Smart triage**
2. A small dashboard-style custom post showing how triage results are presented

For each item, the system estimates:

- moderation category
- severity
- confidence
- suggested action
- whether human review is required
- short rationale

## Why this fits the hackathon

This is aligned with the Mod Tools Migration Hackathon because it is:

- a mod-facing utility
- built around Reddit's Developer Platform / Devvit structure
- focused on practical moderator workflow improvement
- designed for installability and simplicity
- useful even without heavy AI infrastructure

## Local development

Requires Node.js 22.2+.

```bash
npm install
npm run dev
```

Devvit will create or use a test subreddit and provide a playtest URL.

## Devvit structure

```text
devvit.json              Devvit app configuration
src/server/index.ts      Mod menu action + form endpoint
src/shared/moderation.ts Triage logic
src/client/index.html    Devvit Web entrypoint
src/client/main.tsx      React dashboard
src/client/App.tsx       Dashboard UI
```

## How moderators use it

On a post or comment, moderators can open the Reddit mod menu and choose:

```text
Smart triage
```

The tool returns a small form with:

- category
- severity
- confidence
- suggested action
- rationale

## Current classifier

The current version uses transparent local heuristics so the app can run without API keys.

This is deliberate for the MVP.

A future version can replace the classifier with an LLM call while preserving the same output schema.

## Design principle

> Prioritize attention, do not automate judgment.

Smart Mod Triage is uncertainty-aware: ambiguous cases are routed to human review rather than being treated as confident automated decisions.

## Future extensions

- connect to real modqueue data
- add community-specific rules
- add LLM structured output on the Devvit server side
- store moderator overrides
- generate disagreement analytics
- add CSV export
- add brigading/spam burst detection
