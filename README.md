# Smart Mod Triage

![Devvit](https://img.shields.io/badge/Devvit-Reddit%20Developer%20Platform-FF4500?style=for-the-badge&logo=reddit)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Moderation Tool](https://img.shields.io/badge/Moderation-Workflow%20Utility-5C4B51?style=for-the-badge)
![Human in the Loop](https://img.shields.io/badge/Human--in--the--Loop-AI%20Assisted-6A5ACD?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Reddit-Mod%20Tools%20Hackathon-FF5700?style=for-the-badge&logo=reddit)
![Status](https://img.shields.io/badge/Status-MVP-success?style=for-the-badge)

AI-assisted moderation triage utility built with Reddit’s Developer Platform (Devvit).
Created for the Reddit Mod Tools Migration Hackathon.
Smart Mod Triage helps moderators prioritize reported content using lightweight uncertainty-aware moderation analysis.
The goal is not to automate moderation.
The goal is to reduce moderator cognitive load by helping moderators decide what to inspect first.

## Features

Smart Mod Triage provides:

* a Devvit moderator menu action called Smart triage
* lightweight moderation classification
* severity estimation
* confidence estimation
* suggested moderation action
* human-review escalation for ambiguous cases
* a small dashboard-style moderation queue demo UI

## Why This Exists

Moderation queues are not only about rule enforcement.

They are also about:

* attention allocation
* uncertainty management
* moderator fatigue
* queue prioritization

This project explores a simple human-in-the-loop moderation workflow where AI assists prioritization while preserving moderator authority.

## Built For Devvit

This project is structured as a Devvit-ready moderation utility using Reddit’s Developer Platform.

Current structure includes:

```
devvit.json              Devvit app configuration
src/server/index.ts      Devvit moderation endpoints
src/shared/moderation.ts Triage logic
src/client/index.html    Devvit Web entrypoint
src/client/main.tsx      React entrypoint
src/client/App.tsx       Moderator dashboard demo
```

## Local development

Requires Node.js 22.2+.
Devvit CLI

```bash
npm install
npm run dev
```

Devvit will create or use a test subreddit and provide a playtest URL.

## Moderator Workflow

Moderators can open the moderation menu on a Reddit post or comment and select:

```
Smart triage
```

The tool returns:

*moderation category
*severity score
*confidence score
*suggested action
rationale
*human review recommendation

## Current classifier

The current MVP uses transparent local heuristic classification.

This was intentionally chosen to:

* simplify installation
* avoid external API dependency
* keep the prototype lightweight for moderation tooling experimentation

The moderation schema is designed so the classifier can later be replaced by:

* LLM structured outputs
* subreddit-specific rules
* hybrid moderation pipelines

without changing the UI architecture.

## Design principle

> Prioritize attention, do not automate judgment.

Smart Mod Triage is uncertainty-aware:

* ambiguous content is escalated to human review
* low-confidence cases are surfaced carefully
* moderators remain the final decision-makers

## Potential Extensions

* real Reddit modqueue integration
* subreddit-specific moderation profiles
* moderator override learning
* disagreement analytics
* spam burst detection
* coordinated attack heuristics
* CSV moderation export
* structured LLM moderation backends

## Hackathon Context

Created for:

Reddit Mod Tools Migration Hackathon
https://mod-tools-migration.devpost.com/

Built using:

* Devvit
* React
* TypeScript
* lightweight moderation heuristics  
