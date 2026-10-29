# AGENTS.md

## About this repository

Training repository for the **Context & Harness Engineering** course,
for client development teams that already use a coding agent.

The app is a fake landing page of Acme, a fictional training company, presenting that course (fictional content, no real sign-ups).
Its real purpose is to be a playground: participants practice delegating tasks to an agent
on a small, cleanly structured codebase.

What this means when working here:

- Readability beats cleverness: the code is read and discussed in workshops.
- Keep the architecture exemplary; it is what the course teaches. Follow the rules below strictly.
- Do not add dependencies or abstractions without a clear need: the repo must stay small.

## Stack

Next.js 16 landing page (App Router, React 19, strict TypeScript) organized with DDD.
No database: page content lives in `content/landing-page.<locale>.json` (versioned),
subscribers are written to `data/subscribers.json` at runtime (git-ignored).

## Commands

- `npm test`: Jest unit tests (fast, run them after every change)
- `npm run typecheck`: TypeScript check
- `npm run build`: production build
- `docker compose up -d`: dev environment in Docker, with hot reload
- `docker compose up --build prod`: production image (tests run during the image build)

## Architecture rules

- Business code lives in `src/modules/<context>/{domain,application,infrastructure}`.
- `domain/` never imports Next.js, React, `node:fs` or `infrastructure/`.
- Use cases (`application/`) depend on ports (interfaces) defined in `domain/`, injected through the constructor.
- In production code, only `src/container.ts` instantiates concrete implementations (tests wire their own adapters).
- Business rules throw a `DomainError` subclass with a stable `code`; `src/app/actions.ts` maps codes to localized messages.
- `src/ui/components` are presentational: they receive plain data through props and never import
  from `domain/` or `shared/domain` (type-only imports of application DTOs are fine).
- `src/app`, `src/i18n` and `src/proxy.ts` are inbound adapters: they may use shared kernel types
  (`Locale`, `DomainError`) to turn HTTP input into domain values, but never entities or aggregates.

## Internationalization

- Supported locales are declared once in `src/shared/domain/Locale.ts` (`fr` is the default).
- Page content: one file per locale in `content/`. Every locale must keep the same structure (a test checks it).
- UI copy (section titles, form, errors): `src/i18n/messages/<locale>.ts`. `fr.ts` is the reference;
  other dictionaries are typed as `Messages`, so a missing key fails the typecheck.
- Routes are `/<locale>`; `src/proxy.ts` redirects `/` based on `Accept-Language`.

## Language

- Code, identifiers, comments, tests, commit messages and docs are in English.
- Only user-facing copy is translated (content files and UI dictionaries).

## Naming conventions

| Element | Convention | Examples |
| --- | --- | --- |
| Folders | lowercase, kebab-case if needed | `modules/landing`, `ui/components`, `[locale]` |
| File whose main export is a class, type or React component | PascalCase, same name as the export | `Email.ts`, `Locale.ts`, `Hero.tsx` |
| File exporting functions or values | camelCase | `negotiateLocale.ts`, `container.ts`, `actions.ts` |
| Next.js special files | framework names | `page.tsx`, `layout.tsx`, `route.ts`, `proxy.ts` |
| Test file | next to the tested file, `.test.ts` suffix | `Email.test.ts` |
| Content / data files | kebab-case, locale as suffix | `landing-page.en.json`, `subscribers.json` |
| Classes, interfaces, types | PascalCase, no `I` prefix | `Subscriber`, `SubscriberRepository`, `Locale` |
| Port implementations | technology prefix + port name | `JsonFileSubscriberRepository`, `InMemorySubscriberRepository`, `SystemClock` |
| Use cases | verb + noun, single `execute()` method | `GetLandingPage`, `JoinWaitlist` |
| Use case input / output (write) | `<UseCase>Command` in, `<UseCase>Result` out | `JoinWaitlistCommand`, `JoinWaitlistResult` |
| Use case input / output (read) | plain parameters in (a `<UseCase>Query` object beyond two), `<Name>View` out | `GetLandingPage.execute(locale)` → `LandingPageView` |
| Props of a domain object | `<Name>Props` | `FeatureProps`, `LandingPageProps` |
| React component props | `<Component>Props` | `ProgramProps`, `WaitlistFormProps` |
| Domain errors | `<Reason>Error`, with an UPPER_SNAKE_CASE `code` | `InvalidEmailError` / `INVALID_EMAIL` |
| Functions, methods, variables, parameters | camelCase | `existsByEmail`, `subscribedAt` |
| Booleans and predicates | `is` / `has` / `exists` prefix | `isLocale`, `existsByEmail` |
| Static factories | `create` (new, validated), `register` (business event), `restore` (from storage) | `Email.create`, `Subscriber.restore` |
| Server actions | camelCase + `Action` suffix | `joinWaitlistAction` |
| Module-level constants holding fixed configuration values (literals, lists, patterns) | UPPER_SNAKE_CASE | `MAX_FEATURES`, `LOCALES`, `EMAIL_PATTERN` |
| Other module-level bindings (objects, instances, computed values) | camelCase | `container`, `dataDir`, `initialWaitlistFormState` |
| Dictionary keys | camelCase | `contact.emailPlaceholder` |
| CSS classes | kebab-case | `feature-grid`, `locale-switcher` |

Exceptions: `errors.ts` groups the small error classes of a module; names imposed by Next.js
(`config`, `dynamic`, `generateMetadata`…) are kept as is.

## Other conventions

- One class per file.
- Tests use no framework mocks: prefer in-memory adapters and a fixed `Clock`.
- Every new business rule comes with its test.
