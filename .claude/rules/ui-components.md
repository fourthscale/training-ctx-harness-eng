---
paths:
  - "src/ui/**"
---

# UI components

- `src/ui/components` are presentational: they receive plain data through props and never import
  from `domain/` or `shared/domain` (type-only imports of application DTOs are fine).
- No hard-coded user-facing text: copy comes through props, from the page content or the UI dictionaries.
