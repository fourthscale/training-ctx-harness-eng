# Git

- Commit messages are in English, with a short imperative subject line
  (`Add waitlist confirmation`, not `added stuff`).
- One topic per commit: do not mix a refactoring with a behavior change.
- Never commit runtime data (`data/subscribers.json`) or local env files (`.env*.local`);
  both are git-ignored, keep it that way.
- Run `npm test` and `npm run typecheck` before proposing a commit.
