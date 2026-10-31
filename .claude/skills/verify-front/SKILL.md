---
name: verify-front
description: Have front-end changes reviewed in a browser by the independent front-reviewer agent. Run it when the Stop hook asks for it at the end of the turn, not before, or the review runs twice.
---

# Front-end verification

You do not review your own change: the front-reviewer agent does, in a fresh context.
It only knows what you send it, so prepare the message carefully.

1. Write the acceptance criteria of the user's request: one line per thing to see or do on the page.
2. Copy the user's request word for word (not your summary).
3. List the changed files (`git status --short`).
4. Run the front-reviewer agent with this message:

   ```
   Acceptance criteria:
   - …

   User's request (word for word):
   > …

   Changed files:
   - …
   ```

5. Show the user the screenshots listed in the verdict (send the files if your tools can,
   otherwise give their paths). They are the visual proof: the agent's own context is gone.
6. Read the verdict:
   - `PASS`: report it to the user, criterion by criterion.
   - `FAIL`: fix what failed, then finish your turn; the Stop hook will ask for a new review.
   - Missing context: send the message again, complete.
