## ESN GO

**ESN GO**, Türkiye’deki Erasmus ve diğer uluslararası öğrencilerin şehir keşfi, etkinlikler ve “öğrenci hayatı” için kullandığı web uygulamasıdır. ESN Türkiye tarafından, öğrenciler için geliştirilir.

<p align="center">
  <img src="shared/screenshots/Screenshot%202026-02-06%20at%2014.30.31.png" alt="HeroSection mobile görünümü" width="30%" />
  <img src="shared/screenshots/Screenshot%202026-02-06%20at%2014.30.47.png" alt="DestinationsSection mobile görünümü" width="30%" />
  <img src="shared/screenshots/Screenshot%202026-02-06%20at%2014.30.58.png" alt="FAQSection mobile görünümü" width="30%" />
</p>

### Ne?

- **Web uygulaması**:
  - Ana sayfa (hero, destinasyonlar, etkinlikler, ipuçları, footer)
  - Destinasyon verisi FastAPI backend’inden dinamik olarak alınır (`/api/destinations`).

### Neden?

- Yeni gelen öğrencilerin:
  - Türkiye’yi ve şehirleri daha hızlı tanıması  
  - ESN etkinliklerine ve fırsatlarına kolay erişmesi  
  - Güvenilir, ESN Türkiye tarafından hazırlanmış içeriklere ulaşması için.

### Kimler için?

- **Erasmus / exchange öğrencileri**
- **ESN Türkiye gönüllüleri** (içerik, organizasyon ve geliştirme)
- Üniversite uluslararası ofisleri ve partner kurumlar

### Mimari (Nerede / ne var?)

- **Monorepo**:
  - `apps/frontend` – Next.js 16 (App Router) + React + TypeScript + Tailwind CSS 4  
    - `src/app/(main)/page.tsx` – ana sayfa  
    - `src/app/_components/` – layout, sections, UI bileşenleri  
    - `src/app/_lib/destinations.ts` – backend’ten destinasyon fetch eden yardımcı
  - `apps/backend` – FastAPI + Uvicorn  
    - `app/main.py` – FastAPI app + Uvicorn entrypoint  
    - `app/api/routes.py` – root (`/`, `/health`)  
    - `app/api/v1/destinations.py` – `/api/destinations` router’ı  
    - `app/services/esn_service.py` – destinasyon iş mantığı (şimdilik statik veri)  
    - `app/models/schemas.py` – `APIResponse` ve diğer şemalar  
    - `app/utils/config.py` – `.env.local` yapılandırması
  - `shared/` – ekran görüntüleri ve ortak asset’ler

### Nasıl çalıştırılır?

#### 1. Ortam değişkenleri

- **Frontend (`apps/frontend/.env.local`)**
  - **`NEXT_PUBLIC_BACKEND_URL`** – backend base URL’i  
    Örnek: `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`

- **Backend (`apps/backend/.env.local`)**
  - **Server**: `HOST`, `PORT`  
  - **CORS**: `ALLOWED_ORIGINS`  
  - **API meta**: `API_TITLE`, `API_DESCRIPTION`, `API_VERSION`

#### 2. Backend (FastAPI)

```bash
cd apps/backend
python -m app.main
```

Bu komut Uvicorn ile `app.main:app`’i başlatır ve `.env.local` içindeki `HOST` / `PORT` değerlerini kullanır.

Önemli endpointler:

- `GET /health` – health check  
- `GET /` – temel API bilgisi  
- `GET /api/destinations` – destinasyon listesi (frontend burayı kullanıyor)

#### 3. Frontend (Next.js)

```bash
cd apps/frontend
npm install
npm run dev
```

Uygulama: `http://localhost:3000`  
Destinasyonlar: `NEXT_PUBLIC_BACKEND_URL/api/destinations` üzerinden gelir.

### Teknoloji Özeti

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS 4  
- **Backend**: FastAPI, Uvicorn  
- **Ortak**: .env tabanlı config, tip güvenli API cevapları (`APIResponse`)

### Katkıda bulunma

- Ayrıntılı kurallar ve kod standartları için `CONTRIBUTING.md` dosyasına bakabilirsin.
- Yeni özellik veya büyük değişiklikler için önce issue açman önerilir.

Bu proje **ESN Türkiye** tarafından, Türkiye’deki Erasmus ve uluslararası öğrenciler için geliştirilmektedir.
