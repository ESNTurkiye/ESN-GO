# CONTRIBUTING.md

ESN-GO projesine hoş geldiniz! Bu döküman developer ve product team in stabil ve takım halinde ürün geliştirebilmesi için gerekli kuralları içerir.

## 1. Geliştirme Modeli: Scaled Trunk-Based

Projemizde **Trunk-Based Development** modeli uygulanmaktadır.

* **Main Branch:** Her zaman "deploy" edilebilir ve stabil olmalıdır.
* **Short-lived Branches:** Özellik (feature) branchleri maksimum **2 gün** içinde `main` dalına merge edilmelidir. Uzun ömürlü branchlerden kaçınılmalıdır.

## 2. Git ve Commit Kuralları

Kod geçmişimizin okunabilir kalması için **Conventional Commits** standartlarını kullanıyoruz.

* **Format:** `<tip>(<scope>): <açıklama>`
* **Örnekler:**
* `feat(m1): add hero section animation`
* `fix(m4): resolve faq mobile toggle bug`
* `chore(deps): add lucide-react for icons`


* **Merge Stratejisi:** GitHub üzerinde PR'lar kapatılırken mutlaka **"Squash and Merge"** seçilmelidir. Bu küçük commit yığınlarını tek bir temiz commit olarak ana dala işler.

## 3. Docker ve Çalışma Ortamı (Risk P3 - High)

* Proje tamamen Dockerize edilmiştir. "Benim makinemde çalışıyordu" argümanı geçersizdir.
* Yeni bir paket eklediğinizde mutlaka `docker-compose build` yaparak imajları güncelleyin.
* RAM sorunu yaşayanlar için `docker-compose.yaml` içinden sadece veritabanı servislerini ayağa kaldırıp app katmanlarını yerelde (`npm run dev` / `uvicorn`) çalıştırma opsiyonu mevcuttur.

## 4. API ve Monorepo Disiplini (Risk P4 - High)

* **API Sözleşmesi:** Backend tarafında bir endpoint şeması (Pydantic model) değiştirilmeden önce ilgili modülün frontend tarafıyla uygun kalınmalıdır.
* **FastAPI Docs:** Her zaman `/docs` (Swagger) üzerinden endpoint'lerin güncelliğini kontrol edin.
* **Klasörleme:** Her takım sadece kendine atanan `apps/frontend/src/app/sections/[modul-adi]` ve ilgili backend modülü içerisinde çalışmalıdır.

## 5. Product & Growth Review (Risk P5 - High)

* Her PR (pull request) code review geçtikten sonra **Product & Growth** ekibinden en az bir kişinin "Design/Product Approve" onayını almalıdır.
* Ürün ekibi arayüzün beklentileri karşılayıp karşılamadığını ve içeriklerin doğruluğunu kontrol eder.

## 6. Ortak UI Bileşenleri (Risk P2 - Medium)

* `apps/frontend/src/app/_components/ui` altındaki atomik bileşenlerde (Button, Input vb.) değişiklik yapmak tüm projeyi etkiler.
* Bu klasörde değişiklik yapmadan önce diğer takımlara bilgi verilmesi önemlidir.

## 7. Bağımlılık Yönetimi (Risk P7 - Medium)

* Yeni bir kütüphane (npm/pip) eklemeden önce mutlaka proje yöneticisine danışılmalıdır. Gereksiz paket şişkinliğinden (bundle bloat) kaçınılmalıdır.

---

### Nasıl Katkıda Bulunurum?

1. Bir **Issue** seçin veya atanın.
2. `feat/m[no]-[kisa-isim]` formatında bir branch açın.
3. Kodunuzu yazın ve lokalde Docker ile test edin.
4. **Pull Request** açın (Açıklama kısmına "Closes #IssueNo" yazmayı unutmayın).
5. Code Review ve Product Review süreçlerini tamamlayıp **Squash & Merge** yapın.