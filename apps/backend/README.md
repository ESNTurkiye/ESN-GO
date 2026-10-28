# backend

Empty on purpose. The AWS SAM backend (API Gateway HTTP API + Lambda, Node.js / TypeScript) is set up here in task **1.5**.

Expected layout and the full `template.yaml` / `samconfig.toml` are in the internal AWS docs (`02 - SAM Proje İskeleti`).
AWS rules to keep in mind: region `eu-central-1` only, stack names start with `esngo-`.

CI picks this folder up automatically once `apps/backend/package.json` exists (`lint` and `typecheck` scripts).
