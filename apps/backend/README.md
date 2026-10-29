# backend

The ESN GO API: an API Gateway (HTTP API) in front of five TypeScript Lambdas (Node.js 22), defined with AWS SAM in `eu-central-1`. The frontend (`apps/frontend`) gets all its data from here.

## What's here

| Part | What it does |
| --- | --- |
| **HTTP API** | Entry point. Handles CORS, rate limiting and access logs |
| **authorizer** | Checks every protected request. Rejects everyone until login is built |
| **content** | Cities, places, guides, image uploads, place search |
| **auth** | Login with ESN Accounts |
| **admin** | Admin-only actions (hide / delete places) |
| **profile** | Public ESNer profiles |

Only `GET /cities` returns data today (hello world). Other routes answer `501 Not Implemented` until they are built.

## API

dev: `https://9ils2dmpz0.execute-api.eu-central-1.amazonaws.com` · prod: not deployed yet

```bash
curl https://9ils2dmpz0.execute-api.eu-central-1.amazonaws.com/cities
# {"message":"Hello from ESN GO","stage":"dev"}
```


## Files

- `template.yaml`: all AWS resources (API, Lambdas, routes, logs)
- `samconfig.toml`: deploy settings for `dev` and `prod`
- `src/lib/http.ts`: shared response and error helpers
- `src/functions/<name>/handler.ts`: code of each Lambda

## Run

Needs Node.js 22, AWS CLI, AWS SAM CLI and the `esngo-dev` profile.

```bash
npm install
aws sso login --sso-session esn-turkiye
npm run lint && npm run typecheck
npm run deploy:dev
```

## Rules

- Region `eu-central-1` only. Stack names start with `esngo-`.
- `sam sync` on dev only. Prod is deployed from `main` with `sam deploy --config-env prod`.
- No secrets in the repo; they live in SSM Parameter Store (`/esngo/<stage>/`).
- Each Lambda gets only the permissions it needs.