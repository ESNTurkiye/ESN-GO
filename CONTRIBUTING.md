# ESN GO - GitHub Çalışma ve Katkı Rehberi

Hoş geldiniz! Bu proje **ESN Türkiye** bünyesinde geliştirilen **ESN GO** projesidir. Kaosu önlemek ve kaliteli bir ürün çıkarmak için aşağıdaki kurallara uymamız hayati önem taşır.

Lütfen rolünüze uygun başlığı okuyunuz.

---

## Product & Growth Team (Kod Yazmayanlar)
*(Tasarımcılar, İçerik Editörleri, QA ve WPA Koordinatörleri)*

Sizin göreviniz **ne yapılacağını belirlemek** ve **yapılanı kontrol etmektir.** Kod yazmanıza gerek yok, süreci yöneteceksiniz.

### 1. Yeni Bir İş veya Hata Bildirmek
Projeye yeni bir özellik eklenecekse veya bir hata (bug) bulduysanız:
1.  **Issues** sekmesine gidin.
2.  **New Issue** butonuna basın.
3.  Karşınıza çıkan şablonlardan uygun olanı seçin:
    * **Hata Bildirimi:** Sistemde çalışmayan bir şey varsa.
    * **Yeni Özellik:** Tasarım veya fikir önerisi varsa.
4.  Şablondaki soruları doldurun (Ekran görüntüsü eklemeyi unutmayın!) ve **Submit** diyerek gönderin.

### 2. İş Takibi (Project Board)
Hangi işin ne durumda olduğunu görmek için **Projects** sekmesine -> **ESN GO Development** panosuna gidin.
* Burada kartları sürükleyip bırakabilirsiniz.
* **Backlog:** Henüz sırası gelmemiş fikirler.
* **Todo:** Yapılması gereken onaylanmış işler.
* **In Review:** Yazılımcı işi bitirdi, kontrol etmenizi bekliyor! (Buradaki linke tıklayıp demoyu inceleyin).

---

## Developers (Yazılım Ekibi)
*(Frontend, Backend ve Mobil Geliştiriciler)*

Sizin göreviniz **temiz kod yazmak** ve **ana yapıyı (main branch) bozmamaktır.**

### Altın Kural: `main` Branch Kutsaldır!
Asla, hiçbir koşulda `main` branch'ine direkt kod göndermeyin (Pushlamayın). Sistem zaten buna izin vermeyecektir.

### 1. İş Akışı (Workflow)
1.  **İş Seçimi:** **Projects** panosundan `Todo` sütunundaki bir kartı seçin ve kendinize **Assign** edin. Kartı `In Progress` sütununa çekin.
2.  **Branch Açma:** Kendi bilgisayarınızda güncel `main`'den yeni bir dal (branch) açın.
    * İsimlendirme Standardı:
        * Yeni Özellik: `feature/login-sayfasi`
        * Hata Düzeltme: `fix/navbar-rengi`
        * Döküman: `docs/readme-duzenleme`
3.  **Kodlama:** Kodunuzu yazın ve commit'leyin.
    * *Örnek Commit Mesajı:* `feat: Login tasarımı eklendi` veya `fix: Buton hizalaması düzeltildi`

### 2. Pull Request (PR) Açma
İşiniz bittiğinde kodunuzu GitHub'a gönderin (push) ve bir **Pull Request** oluşturun.
* **Başlık:** Açıklayıcı olsun (Örn: "Login Sayfası Entegrasyonu").
* **Açıklama:** Neyi değiştirdiğinizi kısaca yazın.
* **Reviewers:** Takımdan birini (veya Tech Lead'i) incelemesi için etiketleyin.
* **Link Issue:** Sağ menüden ilgili Issue'yu seçin ki o da otomatik kapansın.

### 3. Onay Süreci (Code Review)
PR açtığınızda kodunuz **In Review** sütununa düşer.
* Tech Lead veya bir arkadaşınız kodunuzu inceler.
* Hata varsa düzeltmenizi ister (Changes requested).
* Her şey tamamsa onaylar (Approve) ve kodunuz `main` ile birleşir (Merge).

---

## Hızlı Özet
| Durum | Kim Yapar? | Eylem |
| :--- | :--- | :--- |
| **Fikir / Hata** | Product Team | **Issue** açar. |
| **Kodlama** | Developer | **Branch** açar -> Kodlar -> **PR** açar. |
| **Kontrol** | Tech Lead / QA | PR'ı inceler -> **Onaylar (Approve)**. |
| **Bitiş** | Sistem | Kod Merge edilir -> İş **Done** olur. |

---
*İyi kodlamalar! ESN GO Team*