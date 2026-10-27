# Contributing

Thanks for helping build ESN GO. Full contributor docs come later (task 8.8); these are the rules that apply from day one.

## Trunk-based development

- `main` is always deployable. Nobody pushes to it directly.
- Branch off `main`, keep the branch short-lived (1–2 days), open a PR, merge, delete the branch.
- Keep PRs small (aim for < 400 changed lines). Split big work into several PRs.
- Unfinished features can be merged behind a flag or simply not linked from the UI yet.

Branch names: `feat/…`, `fix/…`, `chore/…`, `docs/…` — e.g. `feat/3.3-place-form`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `ci:`.
Mention the action plan task ID when there is one: `feat(places): add contribution form (3.3)`.

## Pull requests

1. Rebase on `main` before opening.
2. Fill in the PR template.
3. CI (lint, typecheck, build) must be green.
4. At least one approving review, then squash-merge.

Before pushing:

```bash
pnpm lint
pnpm typecheck
```

## Code style

Biome handles formatting and linting (`pnpm lint:fix`). Don't add ESLint or Prettier.

## Secrets

Never commit secrets, keys or `.env.local`. Add new variables to `.env.example` with an empty value.
