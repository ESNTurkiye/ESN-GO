# ESN GO

City guides for Erasmus and international students in Türkiye, built by [ESN Türkiye](https://esnturkiye.org).
ESNers add places to their city's page; visitors browse city pages, a map / list of places and the Erasmus Hacks guides.

> **Status:** early development, MVP launch planned for 4 November 2026.

## Stack

| Part | Tech |
| --- | --- |
| Web | Next.js (App Router) + TypeScript, deployed on Vercel |
| API | AWS API Gateway (HTTP API) + Lambda, in [`backend/`](backend/) |
| Data | DynamoDB, S3 + CloudFront, Amazon Location Service (`eu-central-1`) |
| Tooling | pnpm, Biome (lint + format), GitHub Actions |

## Getting started

Requirements: Node.js 22 (`.nvmrc`), pnpm (`corepack enable`).

```bash
pnpm install
cp .env.example .env.local
pnpm dev            # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `pnpm lint` | Biome lint + format check |
| `pnpm lint:fix` | Fix what Biome can fix |
| `pnpm typecheck` | TypeScript check |
| `pnpm build` | Production build |

## Repository layout

```
src/app/        Next.js app
backend/        AWS SAM backend (task 1.5)
legacy/         old mock frontend, visual reference only — not built, not linted, not deployed
```

## Workflow

Trunk-based: short-lived branches off `main`, small PRs, merge quickly. Every PR runs CI (lint, typecheck, build) and needs it green to merge. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
