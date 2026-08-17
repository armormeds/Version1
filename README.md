# Telehealth platform

Security-first pnpm monorepo for separate marketing, patient, provider, admin, API,
and background-worker surfaces. Local development uses synthetic data only.

## Commands

```sh
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Copy `.env.example` to an ignored `.env` and replace its local-only placeholder.
Production secrets must be supplied from Google Secret Manager.
