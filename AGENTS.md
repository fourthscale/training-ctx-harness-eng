# AGENTS.md

## About this repository

Training repository for the **Context & Harness Engineering** course,
for client development teams that already use a coding agent.

The app is a fake landing page of Acme, a fictional training company, presenting that course (fictional content, no real sign-ups).
Its real purpose is to be a playground: participants practice delegating tasks to an agent
on a small, cleanly structured codebase.

What this means when working here:

- Readability beats cleverness: the code is read and discussed in workshops.
- Keep the architecture exemplary; it is what the course teaches. Follow the rules strictly.
- Do not add dependencies or abstractions without a clear need: the repo must stay small.

## Stack

Next.js 16 landing page (App Router, React 19, strict TypeScript) organized with DDD.
No database: page content lives in `content/landing-page.<locale>.json` (versioned),
subscribers are written to `data/subscribers.json` at runtime (git-ignored).

## Commands

- `npm test`: Jest unit tests (fast, run them after every change)
- `npm run typecheck`: TypeScript check
- `npm run build`: production build
- `docker compose up -d`: dev environment in Docker, with hot reload
- `docker compose up --build prod`: production image (tests run during the image build)

## Language

- Code, identifiers, comments, tests, commit messages and docs are in English.
- Only user-facing copy is translated (content files and UI dictionaries).

## Rules

Detailed rules live in `.claude/rules/`, one file per topic. Claude Code loads them automatically;
other agents should read the files whose `paths` frontmatter matches the code they touch.
