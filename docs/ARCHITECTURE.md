## ESN GO Mimari Dokümanı

Bu doküman, **ESN GO** monorepo projesinin mimarisini, ana klasör yapısını ve frontend–backend bileşenlerinin birbirleriyle nasıl konuştuğunu yüksek seviyede anlatır.  
Amaç, yeni katkı sağlayanların projeyi hızlıca anlamasını ve doğru yere katkı yapmasını sağlamaktır.

---

## Genel Bakış

- **Monorepo**: Tek bir Git reposu içinde hem `frontend` hem `backend` uygulaması bulunur.
- **Frontend**:  
  - `apps/frontend` altında çalışır.  
  - **Next.js 16 (App Router)**, **React**, **TypeScript**, **Tailwind CSS 4** kullanır.  
  - Kullanıcıya görünen tüm sayfalar ve UI component’leri burada yer alır.
- **Backend**:  
  - `apps/backend` altında çalışır.  
  - **FastAPI** + **Uvicorn** ile yazılmış REST API sunar.  
  - Frontend’in ihtiyaç duyduğu destinasyon verisini ve diğer API’leri sağlar.
- **Ortak varlıklar**:  
  - `shared/` klasörü; ekran görüntüleri ve ortak görsel asset’ler için kullanılır.
- **Dokümantasyon**:  
  - `docs/` altında `SETUP.md`, `ARCHITECTURE.md`, `DOCKER.md` gibi rehberler bulunur.

---

## Klasör Yapısı (Üst Seviye)

```text
.
├── apps
│   ├── backend      # FastAPI backend
│   └── frontend     # Next.js frontend
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docker-compose.yaml
├── docs
│   ├── ARCHITECTURE.md
│   ├── DOCKER.md
│   └── SETUP.md
├── README.md
└── shared
    └── screenshots
```

- **`docker-compose.yaml`**: Frontend, backend ve (ileride) veritabanını tek komutla ayağa kaldırmak için kullanılır.
- **`CONTRIBUTING.md`**: Kod standartları ve katkı kuralları.
- **`CODE_OF_CONDUCT.md`**: ESN Türkiye Code of Conduct dokümanı.

---

## Backend Mimarisi (`apps/backend`)

```text
apps/backend
├── app
│   ├── api
│   │   ├── routes.py        # root ("/") ve "/health" endpoint'leri
│   │   └── v1
│   │       └── destinations.py  # "/api/destinations" router'ı
│   ├── core
│   │   └── exceptions.py    # Ortak exception tanımları (genel hata formatı vb.)
│   ├── main.py              # FastAPI app tanımı ve Uvicorn entrypoint
│   ├── models
│   │   └── schemas.py       # Pydantic şemalar (örn. APIResponse, Destination)
│   ├── services
│   │   └── esn_service.py   # İş mantığı (destinasyon verisi, ileride DB entegrasyonu)
│   └── utils
│       └── config.py        # .env / .env.local üzerinden config yönetimi
├── Dockerfile
├── README.md
├── reports/                 # (ileride) raporlar veya analiz çıktıları için
├── requirements.txt         # Python bağımlılıkları
└── tests/                   # Backend testleri
```

### Backend Akışı

1. **Uygulama başlatma**
   - `app/main.py` içindeki `FastAPI` instance’ı, `utils.config.settings` içinden `API_TITLE`, `API_DESCRIPTION`, `API_VERSION` gibi değerleri okur.
   - `CORSMiddleware`, `ALLOWED_ORIGINS` listesine göre ayarlanır.
2. **Routing**
   - `app/api/routes.py`:
     - `GET /` → temel API bilgisi
     - `GET /health` → health check endpoint’i
   - `app/api/v1/destinations.py`:
     - `GET /api/destinations` → destinasyon listesini döner.
3. **İş mantığı**
   - `app/services/esn_service.py`:
     - Şimdilik statik destinasyon verisini döner.
     - İleride buraya veritabanı sorguları, cache mekanizması vb. eklenecek.
4. **Modelleme**
   - `app/models/schemas.py`:
     - `APIResponse` gibi tip güvenli response tipleri.
     - Destinasyon vb. domain modelleri.
5. **Konfigürasyon**
   - `app/utils/config.py`:
     - `.env` ve `.env.local` dosyalarını yükler (`dotenv`).
     - `HOST`, `PORT`, `ALLOWED_ORIGINS`, `DATABASE_URL`, `ENABLE_CACHE` gibi ayarları merkezileştirir.

---

## Frontend Mimarisi (`apps/frontend`)

```text
apps/frontend
├── Dockerfile
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── data
│   ├── images
│   └── videos
├── src
│   └── app
│       ├── _components
│       ├── _hooks
│       ├── _lib
│       ├── (main)
│       ├── globals.css
│       └── layout.tsx
└── tsconfig.json
```

### App Router & Sayfa Yapısı

- **`src/app/(main)/page.tsx`**
  - Ana landing page bileşenidir.
  - Hero, Destinations, Events, FAQ vb. tüm ana bölümleri bir araya getirir.
- **`src/app/layout.tsx`**
  - Global layout; `<html>`, `<body>`, ortak `<Header>` / `<Footer>` ve global stiller (`globals.css`) burada tanımlanır.

### Component Katmanları (`_components`)

```text
src/app/_components
├── layout
│   ├── footer
│   └── header
├── logos
└── sections
    ├── destinations
    ├── faq
    └── ...
```

- **`layout/`**
  - `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx` gibi sayfa genelinde kullanılan layout bileşenleri.
  - `header/` ve `footer/` alt klasörleri; navigation, logo, sosyal medya barı, newsletter bölümü gibi alt component’leri içerir.
- **`logos/ESNTurkiyeLogo.tsx`**
  - ESN Türkiye logosunu vektörel/React component olarak merkezi şekilde sağlar.
- **`sections/`**
  - Sayfadaki büyük bölümler:
    - `HeroSection.tsx`
    - `DestinationsSection.tsx` (ve içindeki `destinations/` alt component’leri)
    - `EventsSection.tsx`
    - `FoodSection.tsx`
    - `FAQSection.tsx`
    - `InstagramSection.tsx`
    - `StudentTipsSection.tsx`
    - `VibeSelectorSection.tsx`

#### Örnek: Destinations Modülü

```text
sections/destinations
├── DesktopCarousel.tsx
├── MobileCarousel.tsx
├── DestinationCard.tsx
├── NavigationButton.tsx
├── StepIndicator.tsx
├── hooks
│   ├── useCarouselNavigation.ts
│   └── useTouchGesture.ts
├── types.ts
└── utils.ts
```

- Desktop ve mobile için ayrı carousel component’leri.
- `hooks/` altında carousel navigasyonu ve touch gesture yönetimi.
- `types.ts` ile tipler, `utils.ts` ile yardımcı fonksiyonlar merkezileştirilir.

### Yardımcı Katmanlar (`_hooks`, `_lib`, `ui`)

- **`_hooks/`**
  - `useFocusTrap.ts`: Modal / mobile menu gibi bileşenlerde focus trap davranışı sağlar.
- **`_lib/`**
  - `api-types.ts`: Backend API tipleri.
  - `dateHelpers.ts`: Tarih formatlama vb.
  - `destinations.ts`: Backend’ten destinasyon verisi çeken yardımcı fonksiyonlar.
  - `env.ts`: `NEXT_PUBLIC_...` environment variable okuma ve doğrulama.
  - `utils.tsx`: Genel yardımcı React fonksiyon ve component’leri.
- **`ui/`**
  - `Button.tsx`, `ArrowIcon.tsx`, `WaveTransition.tsx` gibi tekrar kullanılabilir küçük UI bileşenleri.
  - Tasarımın tutarlı kalmasını sağlar.

---

## Frontend ↔ Backend Veri Akışı

- Frontend, `.env.local` içinde tanımlanan:

  ```text
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
  ```

  adresini kullanır.

- Destinasyon verisi şu endpoint’ten çekilir:

  ```text
  GET {NEXT_PUBLIC_BACKEND_URL}/api/destinations
  ```

- Bu çağrı genellikle `src/app/_lib/destinations.ts` içindeki helper fonksiyonlar üzerinden yapılır ve sonuç, ilgili section component’lerine prop olarak aktarılır.

---

## Docker ve Deployment (Özet)

- **Backend container**:
  - `apps/backend/Dockerfile` üzerinden build edilir.
  - FastAPI + Uvicorn çalıştırır.
- **Frontend container**:
  - `apps/frontend/Dockerfile` üzerinden build edilir.
  - Production için `next build` + `next start` akışı.
- **Orkestrasyon**:
  - Root düzeyindeki `docker-compose.yaml`, frontend, backend ve veritabanını (örn. `postgres`) tek komutla ayağa kaldırmak için kullanılır.
  - Ayrıntılı komutlar ve senaryolar için `docs/DOCKER.md` dosyasına bakılmalıdır.

---

## Genişleme Noktaları

- **Yeni API endpoint’leri**:
  - `apps/backend/app/api/v1/` altına yeni router dosyaları eklenebilir.
  - İlgili iş mantığı `services/`, şemalar ise `models/schemas.py` altında tanımlanmalıdır.
- **Yeni frontend bölümleri**:
  - `src/app/_components/sections/` altına yeni section klasörleri eklenebilir.
  - Ortak UI için `ui/`, veri erişimi için `_lib/`, özel hook’lar için `_hooks/` kullanılmalıdır.
- **Veritabanı entegrasyonu**:
  - `Settings.DATABASE_URL` alanı ve `ENABLE_CACHE` gibi flag’ler üzerinden, ileride gerçek DB ve cache katmanları entegre edilebilir.

Bu mimari doküman, `README.md` ve `SETUP.md` ile birlikte okunmalıdır; birlikte hem **ne inşa edildiğini** hem de **nasıl çalıştırılacağını** anlatırlar.
