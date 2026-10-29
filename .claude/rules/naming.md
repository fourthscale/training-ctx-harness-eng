# Naming conventions

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

- One class per file.
- Exceptions: `errors.ts` groups the small error classes of a module; names imposed by Next.js
  (`config`, `dynamic`, `generateMetadata`…) are kept as is.
