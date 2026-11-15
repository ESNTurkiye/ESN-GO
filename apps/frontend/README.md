# ESN GO — Frontend

Next.js (App Router), React, TypeScript.

## Gereksinimler

- Node.js 22+ (depo kökündeki `.nvmrc`)
- pnpm (`corepack enable`; doğru sürüm `package.json` içindeki `packageManager` alanından gelir)

npm kullanmayın: kilit dosyası `pnpm-lock.yaml`.

## Çalıştırma

```bash
cd apps/frontend
pnpm install
cp .env.example .env.local   # ilk seferde; değerleri doldurun
pnpm dev
```

Uygulama: <http://localhost:3000>

Biri yeni paket eklediyse (ör. `Can't resolve 'maplibre-gl'` hatası) tekrar `pnpm install` çalıştırın.

## Komutlar

| Komut | Ne yapar |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusu |
| `pnpm lint` | Biome lint + format kontrolü |
| `pnpm lint:fix` | Düzeltilebilenleri düzeltir |
| `pnpm typecheck` | Route tiplerini üretir + TypeScript kontrolü |
| `pnpm build` | Üretim derlemesi |

CI de aynı sırayla çalışır: `pnpm install --frozen-lockfile`, `lint`, `typecheck`, `build`.
