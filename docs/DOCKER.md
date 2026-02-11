# ESN-GO – Docker Özeti

Takımla paylaşım için Docker kurulumunun özet akışı.

---

## Yapı

| Bileşen | Konum | Port | Açıklama |
|--------|--------|------|----------|
| **Backend** | `apps/backend/` | 8000 | FastAPI, uvicorn |
| **Frontend** | `apps/frontend/` | 3000 | Next.js (standalone) |
| **Compose** | `docker-compose.yaml` (root) | - | İki servisi birlikte çalıştırır |

- Backend: `apps/backend/Dockerfile` + `apps/backend/.dockerignore`
- Frontend: `apps/frontend/Dockerfile` + `apps/frontend/.dockerignore`
- Backend env: `apps/backend/.env.local` (compose bu dosyayı kullanır; DB zorunlu değil)

---

## Çalıştırma

**Her iki servis Docker’da (varsayılan):**

```bash
# Proje root’unda
docker compose up --build -d
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:8000 (docs: http://localhost:8000/docs)

**Log / durum:**

```bash
docker compose ps
docker compose logs -f
docker compose down
```