# ESN GO — Frontend

ESN GO'nun frontend uygulaması Next.js App Router, React ve TypeScript kullanır.

## Gereksinimler

- Node.js 22 veya üzeri
- pnpm 11.1.2 (projenin kullandığı paket yöneticisi)

Proje kök dizinindeki `.nvmrc` Node.js sürümünü belirtir. `nvm` kullanıyorsanız depo kökünde `nvm use` komutuyla bu sürüme geçebilirsiniz. Corepack destekli Node.js kurulumlarında pnpm'i etkinleştirmek için `corepack enable` komutunu kullanın.

## Kurulum ve geliştirme

Terminalde frontend dizinine geçin ve kilit dosyasındaki sürümlerle paketleri kurun:

```bash
cd apps/frontend
pnpm install --frozen-lockfile
```

Yerel ortam değişkenleri gerekiyorsa örnek dosyayı kopyalayın:

```bash
cp .env.example .env.local
```

`.env.local` içindeki değerleri kullandığınız API ve servis ayarlarına göre doldurun. Bu dosyayı Git'e eklemeyin.

Geliştirme sunucusunu başlatın:

```bash
pnpm dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde açılır. Sunucuyu durdurmak için terminalde `Ctrl+C` tuşlarına basın.

## Kullanışlı komutlar

Komutları `/apps/frontend` dizinindeyken çalıştırın:

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusunu başlatır. |
| `pnpm typecheck` | Next.js route tiplerini oluşturur ve TypeScript kontrolünü çalıştırır. |
| `pnpm lint` | Biome ile lint ve format kontrolü yapar. |
| `pnpm lint:fix` | Biome'in düzeltebildiği lint ve format sorunlarını düzeltir. |
| `pnpm format` | Biome ile dosyaları biçimlendirir. |
| `pnpm build` | Üretim derlemesini oluşturur. |
| `pnpm start` | Önceden oluşturulmuş üretim derlemesini başlatır. |

## Notlar

- Paket yöneticisi olarak `npm install` yerine pnpm kullanın; frontend'in `pnpm-lock.yaml` kilit dosyası vardır.
- İlk kurulumdan sonra `LayoutProps` gibi Next.js route tipleri editörde bulunamazsa `pnpm typecheck` çalıştırın. Bu komut gerekli tipleri üretir.
- Depo yapısı ve genel geliştirme akışı için kök dizindeki [`README.md`](../../README.md) dosyasına bakın.
