---
paths:
  - "src/modules/**"
  - "src/shared/**"
  - "src/container.ts"
---

# Architecture (business code)

- Business code lives in `src/modules/<context>/{domain,application,infrastructure}`.
- `domain/` never imports Next.js, React, `node:fs` or `infrastructure/`.
- Use cases (`application/`) depend on ports (interfaces) defined in `domain/`, injected through the constructor.
- In production code, only `src/container.ts` instantiates concrete implementations (tests wire their own adapters).
- Business rules throw a `DomainError` subclass with a stable `code`; `src/app/actions.ts` maps codes to localized messages.
- Every new business rule comes with its test.
