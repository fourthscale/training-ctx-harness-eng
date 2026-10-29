---
paths:
  - "src/modules/**"
  - "src/shared/domain/**"
---

# Domain-Driven Design

Layering and dependencies are in `architecture.md`; this file is about modeling.

## Bounded contexts

- Each folder in `src/modules/` is a bounded context (`landing`, `waitlist`).
  A context never imports from another one.
- What several contexts truly share (`Locale`, `Clock`, `DomainError`) lives in the shared kernel,
  `src/shared/domain`. Keep it small: when in doubt, keep the type inside its context.

## Building blocks

- **Value object**: immutable, no identity, equal when its values are equal, always valid once built
  (`Email`, `Feature`). Add an `equals()` method when two instances are compared.
- **Entity**: has an identity that outlives its attribute values (`Subscriber`, identified by its email).
- **Aggregate root**: the only entry point to a consistency boundary; it enforces every invariant
  of the objects it holds (`LandingPage` checks feature count and duplicate titles).
- **Repository**: a port in `domain/`, one per aggregate, exposing business operations
  (`existsByEmail`, `save`), not generic CRUD.

## Modeling rules

- Constructors are `private`; objects are built through static factories (`create`, `register`,
  `restore`, see `naming.md`).
- Invariants are checked in the factory, so an invalid object can never exist. A violation throws
  a `DomainError` subclass.
- Fields are `readonly`, collections `readonly T[]`: change state by creating a new object
  or through an intention-revealing method, never by assigning fields from outside.
- Use the business vocabulary of the course page (waitlist, subscriber, chapter, step),
  not technical names (`DataItem`, `Manager`, `Helper`).
- Business logic belongs in the domain; use cases only orchestrate (load, call the domain, save).
