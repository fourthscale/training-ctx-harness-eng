---
paths:
  - "**/*.test.ts"
---

# Tests

- A test file sits next to the tested file, with a `.test.ts` suffix (`Email.ts` → `Email.test.ts`).
- No framework mocks (`jest.mock`, `jest.fn` spies on ports…): wire real in-memory adapters
  (`InMemorySubscriberRepository`) and a fixed `Clock` through the use case constructor.
- Tests that write files use a temporary directory (`mkdtemp`), never `content/` or `data/`.
- Use fake email addresses (`@example.com`), never real subscriber data.
