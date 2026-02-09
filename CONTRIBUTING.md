# CONTRIBUTING.md

ESN-GO projesine hoş geldiniz! Bu döküman developer ve product team'in stabil ve takım halinde ürün geliştirebilmesi için gerekli kuralları içerir.

---

## 1. Geliştirme Modeli: Trunk-Based Development

Projemizde **Trunk-Based Development** modeli uygulanmaktadır.

### Temel Prensipler

* **main:** Her zaman "deploy" edilebilir ve stabil olmalıdır.
* **Short-lived Branches:** Feature branch'leri maksimum **2 gün** içinde `main`'e merge edilmelidir.
* **Küçük PR'lar:** Bir PR maksimum 400 satır kod değişikliği içermelidir.
* **Sık merge:** Günde birden fazla PR merge edilebilir.
* **Feature Flags:** Tamamlanmamış özellikler feature flag ile gizlenir.

### Branch Yapısı
```
main (production-ready, her zaman deploy edilebilir)
  ├── feat/m1-hero-animation (Team Hero - 1-2 gün)
  ├── feat/m2-carousel-logic (Team Destinations - 1-2 gün)
  ├── feat/m3-food-cards (Team Vibe-Food - 1-2 gün)
  └── feat/m4-faq-accordion (Team FAQ - 1-2 gün)
```

**Önemli:** `development` branch'i YOK! Her şey doğrudan `main`'e merge edilir.

---

## 2. Günlük Workflow

### Günlük rutin
```bash
# 1. main'i pull et
git checkout main
git pull origin main

# 2. Yeni feature branch aç VEYA mevcut branch'i güncelle
# Yeni feature için:
git checkout -b feat/m1-hero-animation

# Mevcut feature varsa:
git checkout feat/m1-hero-animation
git rebase main  # main'deki değişiklikleri branch'ine ekle
```

> **Önemli:** Her zaman `git rebase main` kullan `git merge main` kullanma.
> Rebase linear history oluşturur, merge karmaşık history yaratır.

> **💡 Conflict olursa:** `git rebase --continue` ile devam et (detaylar aşağıda)

### Çalışırken
```bash
# Kod yaz
git add .
git commit -m "feat(m1): add hero fade-in animation"
git push origin feat/m1-hero-animation

# Her 2-3 saatte bir main'den güncel değişiklikleri al
git checkout main
git pull origin main
git checkout feat/m1-hero-animation
git rebase main  # conflict varsa hemen çöz (bkz. Bölüm 5)
git push --force-with-lease origin feat/m1-hero-animation  # rebase sonrası force push gerekir
```

> **Not:** Rebase sonrası `git push --force-with-lease` kullanmalısın.  
> Normal `git push` çalışmaz çünkü history yeniden yazıldı.

### PR Açma (Aynı Gün veya Ertesi Gün)
```bash
# Son kez main'i pull et
git checkout main
git pull origin main
git checkout feat/m1-hero-animation
git rebase main
git push --force-with-lease origin feat/m1-hero-animation

# GitHub'da PR aç: feat/m1-hero-animation → main
```

---

## 3. Pull Request Kuralları

### PR Boyutu

* **Küçük:** < 200 satır (ideal)
* **Orta:** 200-400 satır (kabul edilebilir)
* **Büyük:** > 400 satır (böl daha küçük PR'lara)

**Büyük özelliği nasıl bölerim?**
```
Tek PR:
feat/m1-hero-complete (800 satır - 1 hafta)

Birden fazla küçük PR:
1. feat/m1-hero-layout (150 satır - 1 gün) → MERGE
2. feat/m1-hero-animation (100 satır - 1 gün) → MERGE  
3. feat/m1-hero-responsive (120 satır - 1 gün) → MERGE
```

### PR Review Süreci

**Hızlı Review Hedefi**

1. PR aç (title: `[M1] Add hero fade-in animation`)
2. **Code Review:** 2 developer approval (2 saat içinde)
3. **Product Review:** Product/Growth'dan 1 approval (4 saat içinde)
4. **CI/CD:** Tests + linting geçmeli
5. **Merge:** "Squash and Merge" kullan
6. **Branch sil:** Merge sonrası otomatik silinir

### Merge Sonrası
```bash
# Merge edildi! Diğer teamler hemen pull etmeli:
git checkout main
git pull origin main

# Kendi branch'inde çalışıyorsan:
git checkout feat/m2-carousel
git rebase main  # Az önce merge edilen değişiklikleri al
```

---

## 4. Feature Flags (Tamamlanmamış Özellikler)

Trunk-based'de özellik tamamlanmadan da `main`'e merge edilir. Kullanıcılardan gizlemek için **feature flags** kullanırız.

### Feature Flag Sistemi
```typescript
// apps/frontend/src/app/_lib/features.ts
export const features = {
  heroSection: process.env.NEXT_PUBLIC_FEATURE_HERO === 'true',
  heroAnimation: process.env.NEXT_PUBLIC_FEATURE_HERO_ANIMATION === 'true',
  destinations: process.env.NEXT_PUBLIC_FEATURE_DESTINATIONS === 'true',
  destinationsCarousel: process.env.NEXT_PUBLIC_FEATURE_CAROUSEL === 'true',
  vibeFood: process.env.NEXT_PUBLIC_FEATURE_VIBE_FOOD === 'true',
  faq: process.env.NEXT_PUBLIC_FEATURE_FAQ === 'true',
}
```

### Kullanımı
```tsx
// apps/frontend/src/app/(main)/page.tsx
import { features } from '@/app/_lib/features'

export default function Home() {
  return (
    <>
      {features.heroSection && <HeroSection />}
      {features.destinations && <DestinationsSection />}
      {features.vibeFood && (
        <>
          <VibeSelectorSection />
          <FoodSection />
        </>
      )}
      {features.faq && <FAQSection />}
    </>
  )
}
```

### Örnek: Yarım Kalmış Özellik
```bash
# Day 1: Hero layout tamamlandı ama animasyon yok
# PR aç: feat/m1-hero-layout
# Feature flag: NEXT_PUBLIC_FEATURE_HERO=false (kapalı)
# Merge to main ✅

# Day 2: Animasyon eklendi
# PR aç: feat/m1-hero-animation  
# Feature flag: NEXT_PUBLIC_FEATURE_HERO=true (açık)
# Merge to main ✅
```

Production'da feature kapalı kalır, hazır olunca açılır!

---

## 5. Merge Conflict Yönetimi

### Conflict Önleme (Proaktif)

**Her 2-3 saatte bir `main`'i pull et:**
```bash
# Öğlen:
git checkout main && git pull
git checkout feat/m1-hero && git rebase main

# Akşam:
git checkout main && git pull
git checkout feat/m1-hero && git rebase main
```

Sık pull = küçük conflict'ler = kolay çözüm

### Conflict Olduğunda
```bash
git rebase main
# CONFLICT in package.json

# 1. Dosyayı aç, conflict çöz
# 2. İki team'in de değişikliklerini koru
# 3. Test et
npm install
npm run dev

# 4. Continue
git add package.json
git rebase --continue
git push --force-with-lease origin feat/m1-hero
```

### Conflict Risk Azaltma

**Paylaşılan dosyalarda çalışıyorsan, haber ver:**
```
"[M1] package.json'a framer-motion ekliyorum, 
conflict olmasın diye 30dk içinde merge edeceğim."
```

---

## 6. Paylaşılan Dosyalar Protokolü

### 6.1. package.json / package-lock.json

**Strateji 1: İlk Gelen Alır**
```
10:00 - Team Hero: "package.json'a framer-motion ekliyorum" (whatsapp / github community)
10:05 - Team Hero: PR merge ✅

10:10 - Team FAQ: package.json'a react-query eklemek istiyor
         → main'i pull et, rebase et, conflict çöz, merge et ✅
```

**Strateji 2: Batch Updates (Haftalık)**
```
Her Pazartesi: Tüm paket istekleri toplanır
Bir kişi toplu PR açar, herkes review eder, merge edilir
```

### 6.2. layout.tsx, page.tsx, globals.css

**Alfabetik sıra + minimal değişiklik:**
```tsx
//DOĞRU: Sadece kendi import'unu ekle, alfabetik sırada
import { DestinationsSection } from '@/app/_components/sections/DestinationsSection'
import { FAQSection } from '@/app/_components/sections/FAQSection'
import { FoodSection } from '@/app/_components/sections/FoodSection'
import { HeroSection } from '@/app/_components/sections/HeroSection' // Team Hero ekledi
import { VibeSelectorSection } from '@/app/_components/sections/VibeSelectorSection'

//YANLIŞ: Random sıra, gereksiz boşluk değişiklikleri
```

### 6.3. Shared UI Components

`apps/frontend/src/app/_components/ui/` değişiklikleri için:

**Önce sor:**
```
Whatsapp: "Button.tsx'e yeni 'variant' prop eklemem gerekiyor.
Kimsenin kodunu bozmaz, sadece optional prop. Objection var mı?"

24 saat bekle (veya hızlı approval al)
```

**Contract test ekle:**
```typescript
// Button.test.tsx
it('should accept new variant prop', () => {
  render(<Button variant="outline">Test</Button>)
  // Ensures backward compatibility
})
```

---

## 7. Git Commit Kuralları

**Conventional Commits** formatı:
```
<tip>(m<no>): <açıklama>

Örnekler:
feat(m1): add hero fade-in animation
fix(m4): resolve faq accordion mobile bug
refactor(m2): optimize carousel render performance
style(m3): update food card spacing
test(m1): add hero section unit tests
chore(deps): upgrade next.js to 15.1.0
docs(m2): add destinations API documentation
```

### Merge Stratejisi

GitHub'da **"Squash and Merge"** zorunlu:
```
Önce (10 commit):
* wip
* fix typo
* add animation
* fix lint
* update test
* fix test
* final fix
* really final
* ok now final
* merge

✅ Sonra (1 clean commit):
* feat(m1): add hero fade-in animation (#123)
```

---

## 8. CI/CD ve Otomasyonlar

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
```

### Branch Protection Rules (GitHub Settings)

`main` branch için:

- Require pull request reviews (minimum 2 approval)
- Require status checks to pass (CI must pass)
- Require linear history (squash merge only)
- Require conversation resolution
- Do not allow bypassing (even admins)

---

## 9. Deployment Strategy

### Continuous Deployment
```
main branch → Auto-deploy to production (Vercel/etc.)

Her merge = Otomatik deployment
```

**Feature flag kapalıysa:** Kullanıcı görmez, risk yok  
**Feature flag açıksa:** Kullanıcı görür, özellik live

### Preview Deployments

Her PR için otomatik preview:
```
PR #45: feat/m1-hero-animation
→ https://esn-go-pr-45.vercel.app

Product team bu URL'den review yapar
```

---

## 10. Modül Sahipliği

| Modül | Team | Klasör | Feature Flag |
|-------|------|--------|--------------|
| M1 - Hero | Team Hero | `sections/HeroSection` | `FEATURE_HERO` |
| M2 - Destinations | Team Destinations | `sections/destinations/`, `sections/DestinationsSection` | `FEATURE_DESTINATIONS` |
| M3 - Vibe + Food | Team Vibe-Food | `sections/VibeSelectorSection`, `sections/FoodSection` | `FEATURE_VIBE_FOOD` |
| M4 - FAQ | Team FAQ | `sections/faq/`, `sections/FAQSection` | `FEATURE_FAQ` |

### Kurallar

- Kendi modülünde özgürsün (review sonrası merge)
- Shared components'e dikkatli dokun (önce sor)
- Başkasının modülünü değiştirme (o team'e PR aç)

---

## 11. İletişim ve Koordinasyon

### Daily Standup (Opsiyonel ama Önerilen)

Her sabah 10:00, 5 dakika:
```
Team Hero: "Hero animasyonu üzerinde çalışıyorum, bugün merge edeceğim"
Team Destinations: "Carousel bug fix PR'ım review bekliyor"
Team Vibe-Food: "package.json'a paket ekleyeceğim öğleden sonra"
Team FAQ: "FAQ search feature'ı başlıyorum, 2 günde bitecek"
```

Herkes ne yaptığını bilir = daha az conflict

---

## 12. Sık Sorulan Sorular

### Q: Özelliğim 1 haftada bitmez, nasıl bölerim?

**A:** İnkremental PR'lar:
```
Week 1:
- Day 1-2: Layout PR → merge (flag kapalı)
- Day 3-4: Logic PR → merge (flag kapalı)  
- Day 5: Styling PR → merge (flag kapalı)

Week 2:
- Day 1-2: Testing + bug fixes → merge
- Day 3: Feature flag aç → LIVE!
```

### Q: main'e merge ettik ama bug var, ne yapmalıyız?

**A:** Hızlı hotfix:
```bash
git checkout main
git pull origin main
git checkout -b hotfix/hero-animation-bug

# Fix bug
git add .
git commit -m "fix(m1): resolve hero animation flicker"
git push origin hotfix/hero-animation-bug

# Fast-track PR (30 dakika içinde review + merge)
```

Veya feature flag'i kapat:
```bash
# .env.production
NEXT_PUBLIC_FEATURE_HERO=false  # Özelliği kapat
```

### Q: 2 günde bitiremedim, ne yapmalıyım?

**A:** İki seçenek:

1. **Böl:** Tamamlanan kısmı merge et, kalanı yeni PR
2. **Devam et ama sık pull et:** Her 2-3 saatte main'i pull et

Ama **max 3-4 gün**. Daha uzun sürerse özellik çok büyük demektir.

### Q: Conflict korkunç, nasıl çözeyim?

**A:** 
```bash
# 1. Branch'ini yedekle
git branch backup-feat-m1-hero

# 2. main'den yeniden başla
git checkout main
git pull origin main
git checkout -b feat/m1-hero-v2

# 3. Eski branch'indeki değişiklikleri tek tek cherry-pick et
git cherry-pick <commit-hash>

# 4. Eski branch'i sil
git branch -D feat/m1-hero
git branch -D backup-feat-m1-hero
```

---

## 13. Checklist: PR Açmadan Önce

- [ ] main'den son pull'u yaptım (son 1 saat içinde)
- [ ] Rebase ettim, conflict yok
- [ ] Lokal test geçti (`npm run dev`)
- [ ] Build başarılı (`npm run build`)
- [ ] Lint temiz (`npm run lint`)
- [ ] Tests geçti (`npm run test`)
- [ ] Conventional commit formatı kullandım
- [ ] PR < 400 satır (değilse böldüm)
- [ ] Screenshot/video ekledim
- [ ] Feature flag ekledim (gerekiyorsa)
- [ ] Paylaşılan dosyayı değiştirdiysen team'i bilgilendirdim

---

## 14. Trunk-Based Development vs Git Flow

| Özellik | Trunk-Based (Bizim) | Git Flow |
|---------|---------------------|----------|
| Branch sayısı | Az (sadece main + feature) | Çok (main + dev + feature + release) |
| Merge sıklığı | Günde birden fazla | Haftada bir |
| PR yaşam süresi | 1-2 gün | 1-2 hafta |
| Conflict riski | Düşük (sık merge) | Yüksek (nadir merge) |
| Deployment hızı | Çok hızlı | Yavaş |
| Öğrenme eğrisi | Kolay | Orta |

---

**Acil durumlar için:** @tech-lead

ESN Türkiye - Made with ❤️ for everyone