---
paths:
  - "src/app/**"
  - "src/i18n/**"
  - "src/proxy.ts"
---

# Inbound adapters

- `src/app`, `src/i18n` and `src/proxy.ts` are inbound adapters: they may use shared kernel types
  (`Locale`, `DomainError`) to turn HTTP input into domain values, but never entities or aggregates.
- They reach use cases only through `container` (`src/container.ts`), never by instantiating them.
- `src/app/actions.ts` maps each `DomainError` `code` to a localized message from the dictionaries;
  a new error code needs its message in every locale.
- Input validation and error exposure: see `security.md`.
