# Context & Harness Engineering — training repo

A small Next.js landing page for Acme, a fictional training company. It presents the
**Context & Harness Engineering** training and serves as a playground during the workshops.
The code is deliberately simple but cleanly structured (DDD, SOLID), so that a coding agent
can work on it efficiently: isolated modules, explicit ports, fast tests.

No database: the content is read from `content/landing-page.<locale>.json` (versioned, shipped
in the image) and sign-ups are written to `data/subscribers.json` (git-ignored, Docker volume).

## Training cases

Each case lives on its own branch. The application code is identical everywhere;
only the instructions given to the coding agent change.

| Branch | Agent instructions (`AGENTS.md`) |
| --- | --- |
| `case-1-minimal-agents-md` | Minimal: stack and commands only. |
| `case-2-full-agents-md` | Complete: purpose of the repo, architecture rules, i18n, naming conventions. |
| `case-3-claude-rules` | Split: a short `AGENTS.md` plus one file per topic in `.claude/rules/`, path-scoped when a rule only applies to part of the code. |
| `case-4-stop-hook` | The front-end verification rule becomes a `Stop` hook (`.claude/hooks/verify-front.sh`) that prints the procedure (`verify-front.md`), and a `PreToolUse` hook (`protect-env.mjs`) that blocks access to env files: a rule can be skipped, a hook always runs. |
| `case-5-stop-hook-limited` | Case 4, plus one sentence in `verify-front.md` telling the agent to wait for the hook, to limit double verification. |

`main` matches case 1. To see exactly what the richer context adds:

```bash
git diff case-1-minimal-agents-md case-2-full-agents-md
```

### Agent instructions

Instructions live in `AGENTS.md`, which most coding agents read. `CLAUDE.md` only contains
`@AGENTS.md`, so Claude Code always loads it: Claude Code ignores `AGENTS.md` as soon as a
`CLAUDE.md` or `CLAUDE.local.md` exists, and older versions do not read `AGENTS.md` at all.

## Getting started

```bash
git clone https://github.com/fourthscale/training-ctx-harness-eng.git
cd training-ctx-harness-eng
cp .env.example .env   # local secrets (git-ignored)
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (Jest)
npm run typecheck  # TypeScript check
npm run build      # production build
```

With Docker:

```bash
docker compose up -d             # dev, hot reload: http://localhost:3000
docker compose up --build prod   # production image
```

The dev service mounts the source, so changes show up without a rebuild.
The production image runs the tests during the build: if a test fails, the image is not built.

## Architecture

```
content/                      # Page content, one JSON file per locale
src/
├── app/                      # Next.js (App Router): inbound HTTP adapters
│   ├── [locale]/             #   localized layout and home page (/fr, /en)
│   ├── actions.ts            #   server action of the contact form
│   └── api/health/route.ts   #   health probe for Docker
├── proxy.ts                  # Redirects "/" to the best locale (Accept-Language)
├── container.ts              # Composition root: wires the implementations
├── i18n/                     # UI dictionaries and locale negotiation
├── modules/                  # Bounded contexts
│   ├── landing/              #   page content
│   │   ├── domain/           #     LandingPage (aggregate), Feature, Chapter, Step, port
│   │   ├── application/      #     GetLandingPage use case + DTO
│   │   └── infrastructure/   #     JSON file reader
│   └── waitlist/             #   contact sign-ups
│       ├── domain/           #     Email (value object), Subscriber (entity), errors, port
│       ├── application/      #     JoinWaitlist use case
│       └── infrastructure/   #     JSON file and in-memory repositories
├── shared/                   # Shared kernel: DomainError, Clock, Locale
└── ui/components/            # Presentational React components
```

Dependencies always point towards the domain:
`app → application → domain ← infrastructure`. The domain imports neither Next.js, React nor `fs`.

### Where to find the SOLID principles

| Principle | Example in the code |
| --- | --- |
| **S**ingle responsibility | `JoinWaitlist` orchestrates, `Email` validates, `JsonFileSubscriberRepository` persists. |
| **O**pen/closed | A new storage is a new class implementing `SubscriberRepository`, with no change to the use case. |
| **L**iskov substitution | `InMemorySubscriberRepository` and `JsonFileSubscriberRepository` are interchangeable (tests vs prod). |
| **I**nterface segregation | Ports only expose what the use case needs (`existsByEmail`, `save`). |
| **D**ependency inversion | Use cases receive interfaces (`SubscriberRepository`, `Clock`); only `container.ts` knows the concrete classes. |

## Internationalization

- Locales are declared in `src/shared/domain/Locale.ts` (`fr` by default, `en`).
- **Page content**: `content/landing-page.fr.json` and `content/landing-page.en.json`.
  A test checks that every locale has the same structure.
- **UI copy** (section titles, form, error messages): `src/i18n/messages/fr.ts` and `en.ts`.
  `fr.ts` is the reference; a missing key in another locale fails the typecheck.
- URLs are `/fr` and `/en`; `/` redirects according to the browser language.
  The FR/EN switcher sits in the top bar.

To add a locale: add it to `LOCALES`, then create `content/landing-page.<locale>.json`
and `src/i18n/messages/<locale>.ts`.

## Exercise ideas with an agent

1. **Add an FAQ section** to the content: new value object, business rule, test, component, both locales.
2. **Count sign-ups** and display "already 42 teams": new use case and port method.
3. **Reject disposable emails** (`@yopmail.com`…): a domain rule, driven by a test.
4. **Replace the JSON storage** with another adapter without touching the domain.
5. **Send a notification** on sign-up: a `ContactNotifier` port and an adapter.
6. **Add a third locale** (e.g. Spanish) and let the typecheck guide the missing keys.
7. **Fix a planted bug**: break a rule, then ask the agent to find it through the tests.

## License

[PolyForm Noncommercial 1.0.0](LICENSE.md): free for noncommercial use, including teaching
and learning. For commercial use, contact Ludovic Raymond (ludovic.raymond@fourthscale.com).
