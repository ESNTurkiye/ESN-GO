# GitHub Actions deploy setup

GitHub Actions deploys the backend with short-lived credentials (GitHub OIDC), so nobody
needs AWS keys in GitHub or `sam deploy` on a laptop.

| Workflow | When | Where | GitHub environment |
| --- | --- | --- | --- |
| `backend-preview.yml` | PR that touches `apps/backend` | dev account, stack `esngo-api-pr-<number>` | `backend-preview` |
| `backend-preview.yml` | PR closed or merged | deletes that stack, its bucket and JWT secret | `backend-preview` |
| `backend-deploy.yml` | push to `development` | dev account, stack `esngo-api-dev` | `dev` |
| `backend-deploy.yml` | push to `main` | prod account, stack `esngo-api-prod`, after approval | `backend-production` |

The PR preview posts one comment on the PR (status, API address, logs) and updates it on every push.

## 1. Deploy role in each AWS account (once, admin)

`github-deploy-role.yaml` creates the GitHub OIDC provider and the `esngo-github-deploy` role
(PowerUser + IAM only for `esngo-api-*` roles). The role trusts only the listed GitHub environments.

Dev account:

```bash
aws cloudformation deploy \
  --stack-name esngo-github-deploy \
  --template-file apps/backend/infra/github-deploy-role.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides 'AllowedSubjects=repo:ESNTurkiye/ESN-GO:environment:backend-preview,repo:ESNTurkiye/ESN-GO:environment:dev' \
  --region eu-central-1 --profile <dev-admin-profile>
```

Prod account (only the `backend-production` environment):

```bash
aws cloudformation deploy \
  --stack-name esngo-github-deploy \
  --template-file apps/backend/infra/github-deploy-role.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides 'AllowedSubjects=repo:ESNTurkiye/ESN-GO:environment:backend-production' \
  --region eu-central-1 --profile esngo-prod-admin
```

If the account already has the `token.actions.githubusercontent.com` provider, add
`CreateOidcProvider=false` to the parameter overrides.

Get the role ARN:

```bash
aws cloudformation describe-stacks --stack-name esngo-github-deploy \
  --query "Stacks[0].Outputs[?OutputKey=='RoleArn'].OutputValue" --output text --profile <profile>
```

## 2. GitHub environments (once, repo admin)

Repo → Settings → Environments. Each environment gets its own variables (not secrets; the
role ARN is not secret).

| Environment | Deployment branches | Variables |
| --- | --- | --- |
| `backend-preview` | All branches | `AWS_ROLE_ARN` = dev role ARN. Optional: `ALLOWED_ORIGINS`, `MAP_REFERERS` (default `http://localhost:3000`) |
| `dev` | `development` only | `AWS_ROLE_ARN` = dev role ARN, `ALLOWED_ORIGINS`, `MAP_REFERERS` |
| `backend-production` | `main` only, **required reviewers** | `AWS_ROLE_ARN` = prod role ARN, `ALLOWED_ORIGINS`, `MAP_REFERERS` |

`ALLOWED_ORIGINS` is a comma-separated list, for example
`http://localhost:3000,https://esn-go.vercel.app`. `MAP_REFERERS` is the same list with `/*` after each address.
These values replace the ones in `samconfig.toml` for CI deploys.

The JWT secret of `dev` and `prod` (`/esngo/<stage>/jwt-secret`) must already exist in SSM.
Preview stacks create and delete their own.

## Notes

- PRs from forks never deploy: GitHub gives them no OIDC token, and the workflow skips them.
- Preview stacks start with empty tables. A first deploy takes a few minutes (CloudFront).
- Once `backend-deploy.yml` deploys `esngo-api-dev`, don't `sam sync` to the shared dev stack;
  the next merge overwrites it. Use a personal stack (`dev-<name>`) for `sam sync`.
