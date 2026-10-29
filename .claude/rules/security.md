# Security

## Personal data and secrets

- Subscriber emails are personal data. `data/subscribers.json` stays git-ignored; never copy
  its content into a test, a log line, a commit or a reply.
- No secrets in the repository: configuration goes in `.env*.local` (git-ignored).

## Input and errors

- Never trust HTTP input: inbound adapters pass raw strings to the use case and domain value
  objects (`Email.create`) validate them; browser-side checks are only a convenience.
- Users only see localized messages mapped from `DomainError` codes. Unexpected errors are logged
  server-side and shown as the generic `UNEXPECTED` message: never leak stack traces or file paths.

## Server and client boundary

- `src/container.ts` imports `server-only`: keep it, so file paths and adapters never reach
  the browser bundle. Client components get plain data through props.

## Dependencies

- Do not install a new package without asking first: every dependency is code that runs
  with access to subscriber data.
