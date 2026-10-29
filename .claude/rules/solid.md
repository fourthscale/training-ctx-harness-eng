---
paths:
  - "src/**"
---

# SOLID principles

Apply them with the repo's size in mind: they justify the existing structure, not new layers.

- **Single responsibility**: one reason to change per class or component. A use case does one
  thing (`JoinWaitlist`); a component renders one section (`Hero`, `Steps`); reading files,
  validating and rendering never sit in the same unit.
- **Open/closed**: extend through a new implementation of a port, not by editing callers.
  Switching storage means a new `<Technology>SubscriberRepository` and one line in `container.ts`.
- **Liskov substitution**: every implementation of a port honors the same contract.
  `InMemorySubscriberRepository` and `JsonFileSubscriberRepository` must be interchangeable
  in tests and production (`existsByEmail` compares with `Email.equals` in both).
- **Interface segregation**: ports expose only what their use cases call
  (`SubscriberRepository` has `existsByEmail` and `save`, nothing else). Do not add methods
  "for later".
- **Dependency inversion**: use cases depend on interfaces from `domain/` (`SubscriberRepository`,
  `Clock`), received through the constructor; only `src/container.ts` picks the concrete classes.
  Never call `new Date()` or `node:fs` from a use case.
