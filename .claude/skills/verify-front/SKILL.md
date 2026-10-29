---
name: verify-front
description: Check front-end changes in a browser against what was asked (both locales, mobile width, console, screenshot). Run it when the Stop hook asks for it at the end of the turn, not before, or the check runs twice.
---

# Front-end verification

Unit tests do not prove a page renders. Check the interface in a browser before saying
the work is done:

- Check against the Docker dev environment (hot reload, no rebuild needed). If it is running
  (`docker compose ps`), use the URL of its published port; otherwise start it with
  `docker compose up -d` first. Open both locales, `/fr` and `/en`.
- List what the user asked for (acceptance criteria) and confirm each point on the page.
- See every changed element on screen (scroll to it), in each state the change affects
  (hover, focus, disabled…). A computed CSS value is not a visual check.
- Nothing else on the page moved or broke (check a narrow mobile width too).
- If the change affects behavior (a form, a link, an interaction), exercise it; a purely visual
  change only needs the visual checks.
- The browser console shows no errors or warnings caused by the change.
- Attach a screenshot of the changed section to your report.

If no browser tool is available in this session (e.g. a terminal-only agent), say so explicitly
and list what the user should check manually; never report the interface as verified.
