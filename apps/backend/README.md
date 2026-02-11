ESN GO Backend (FastAPI)
=========================

Bu klasör, ESN GO uygulamasının **backend** servisidir. FastAPI + Uvicorn kullanır ve frontend için JSON API sağlar.

## Başlangıç

```bash
cd apps/backend
python app/main.py
```

Varsayılan olarak `.env.local` dosyasındaki ayarlarla çalışır:

- `HOST` (varsayılan: `0.0.0.0`)
- `PORT` (varsayılan: `8000`)
- `ALLOWED_ORIGINS`
- `API_TITLE`, `API_DESCRIPTION`, `API_VERSION`

## Önemli endpointler (simdilik)

- `GET /health` – health check
- `GET /` – temel API bilgisi
- `GET /api/destinations` – frontend destinasyon verisi (statik şimdilik)

## Yapı

- `app/main.py` – FastAPI app tanımı ve Uvicorn entrypoint
- `app/api/` – router’lar (`/`, `/health`, `/api/v1/...`)
- `app/services/` – iş mantığı (örn. `ESNService`)
- `app/models/` – Pydantic şemalar
- `app/utils/config.py` – environment/config yönetimi