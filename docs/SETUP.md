# Setup Rehberi

## Gereksinimler

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- Git

## İlk Kurulum

### 1. Repository klonlama

```bash
git clone https://github.com/ESNTurkiye/ESN-GO.git
cd ESN-GO
```

### 2. Environment variable dosyaları

Frontend ve backend için `.env` dosyalarını örnek dosyalardan çoğaltman gerekiyor.

```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local

# Backend
cp apps/backend/.env.example apps/backend/.env.local
```

- Frontend `NEXT_PUBLIC_BACKEND_URL` değişkenini, backend adresine göre ayarlamalısın.  
  Örnek: `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`
- Backend `.env.local` içindeki `HOST`, `PORT`, `ALLOWED_ORIGINS` ve API meta (`API_TITLE`, `API_DESCRIPTION`, `API_VERSION`) değerlerini ihtiyacına göre güncelleyebilirsin.

### 3. Kurulum yöntemini seç

Proje hem tamamen **Docker** ile hem de **lokal development** şeklinde çalıştırılabilir.

#### Seçenek A: Docker (Önerilen)

Tek komutla backend, frontend ve veritabanını ayağa kaldırmak için:

```bash
docker-compose up
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Backend Swagger UI: `http://localhost:8000/docs`

> Not: Root dizinde `docker-compose.yaml` dosyası bulunuyor; `docker compose up` komutunu da kullanabilirsin.

#### Seçenek B: Lokal development

Bu seçenekte servisleri ayrı ayrı çalıştırırsın. Veritabanı yine Docker üzerinden ayağa kaldırılır.

**1) Frontend (Next.js)**

```bash
cd apps/frontend
npm install
npm run dev
```

- Uygulama: `http://localhost:3000`
- Frontend, destinasyon verisini `NEXT_PUBLIC_BACKEND_URL/api/destinations` üzerinden backend’den çeker.

**2) Backend (FastAPI)**

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

Bu komut, `app/main.py` içindeki `if __name__ == "__main__":` bloğunu kullanarak **Uvicorn** ile `app.main:app` uygulamasını başlatır ve `.env.local` içindeki `HOST` / `PORT` değerlerini kullanır.

Alternatif olarak doğrudan `uvicorn` komutuyla da çalıştırabilirsin:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**3) Database (Postgres) – Docker ile**

Veritabanı için yine root dizindeki `docker-compose.yaml` dosyası kullanılır:

```bash
docker-compose up postgres
```

## Kurulumu Doğrulama

Aşağıdaki adreslere giderek her şeyin doğru çalıştığını kontrol edebilirsin:

- Frontend: `http://localhost:3000` (ana sayfa görünmeli)
- Backend Swagger: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Sorun Giderme (Troubleshooting)

### Port kullanımda (port already in use)

```bash
# Frontend (3000)
lsof -ti:3000 | xargs kill -9

# Backend (8000)
lsof -ti:8000 | xargs kill -9
```

### Docker ile ilgili sorunlar

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### npm install hataları

```bash
rm -rf node_modules package-lock.json
npm install
```

## IDE Kurulumu (Opsiyonel)

**VS Code Extensions:**

- ESLint
- Prettier
- Python
- Docker

**Önerilen ayarlar (`settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
