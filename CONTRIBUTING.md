# ESN GO - GitHub Çalışma ve Katkı Rehberi

Hoş geldiniz! Bu proje **ESN Türkiye** bünyesinde geliştirilen **ESN GO** projesidir. Karmaşıklığı önlemek, kaliteli bir ürün çıkarmak ve takım senkronizasyonunu sağlamak için aşağıdaki akışa uymamız gerekmektedir.

Lütfen rolünüze uygun başlığı inceleyiniz.

---

## Product & Growth Team (Ürün, Tasarım ve İçerik Ekibi)
*(Tasarımcılar, İçerik Editörleri, QA ve WPA Koordinatörleri)*

Sizler projenin **vizyonunu belirleyen**, **tasarlayan** ve **kalitesini denetleyen** ekipsiniz. Teknik kodlama süreçlerine dahil olmadan proje yönetim araçlarını kullanarak ekibe yön vereceksiniz.

### 1. Yeni Bir İş veya Hata Bildirmek
Projeye yeni bir özellik eklenecekse veya bir hata (bug) fark ettiyseniz:
1.  **Issues** sekmesine gidin.
2.  **New Issue** butonuna basın.
3.  Karşınıza çıkan şablonlardan uygun olanı seçin:
    * **Hata Bildirimi:** Sistemde çalışmayan veya hatalı görünen bir yer varsa.
    * **Yeni Özellik:** Tasarım, içerik veya yeni bir fikir önerisi varsa.
4.  Şablondaki soruları doldurun (Görsel veya ekran görüntüsü eklemek işimizi çok hızlandırır!) ve **Submit** diyerek gönderin.

### 2. İş Takibi (Project Board)
Hangi işin ne durumda olduğunu görmek ve süreci takip etmek için **Projects** sekmesine -> **ESN GO Development** panosuna gidin.
* Burada kartları sürükleyip bırakarak statülerini güncelleyebilirsiniz.
* **Backlog:** Henüz sırası gelmemiş, havuzdaki fikirler.
* **Todo:** Yapılması onaylanmış ve geliştirici bekleyen işler.
* **In Review:** Yazılımcı işi bitirdi, kontrol etmenizi bekliyor! (Buradaki linke tıklayıp demoyu inceleyip onay verebilirsiniz).

---

## Developers (Yazılım Ekibi)
*(Frontend, Backend Geliştiriciler)*

Sizin göreviniz **temiz, sürdürülebilir kod yazmak** ve **ana yapıyı (main branch) daima çalışır durumda tutmaktır.**

### Altın Kural: `main` Branch Kutsaldır!
Hiçbir koşulda `main` branch'ine direkt kod pushlamayın. Sistem zaten buna izin vermeyecektir tüm geliştirmeler PR (Pull Request) üzerinden ilerler.

### 1. İş Akışı (Workflow)
1.  **İş Seçimi:** **Projects** panosundan `Todo` sütunundaki bir kartı seçin ve kendinize **Assign** edin. Kartı `In Progress` sütununa çekin.
2.  **Branch Açma:** Kendi bilgisayarınızda güncel `main`'den yeni bir dal (branch) açın.
    * İsimlendirme Standardı:
        * Yeni Özellik: `feature/login-sayfasi`
        * Hata Düzeltme: `fix/navbar-rengi`
        * Döküman/Ayar: `docs/readme-duzenleme`
3.  **Kodlama:** Kodunuzu yazın ve commit'leyin.
    * *Örnek Commit Mesajı:* `feat: Login tasarımı eklendi` veya `fix: Buton hizalaması düzeltildi`

### 2. Pull Request (PR) Açma
İşiniz bittiğinde kodunuzu GitHub'a pushlayın ve bir **Pull Request** oluşturun.
* **Başlık:** Açıklayıcı olsun (Örn: "Login Sayfası Entegrasyonu").
* **Açıklama:** Neyi değiştirdiğinizi kısaca özetleyin.
* **Reviewers:** Takımdan birini (veya Tech Lead'i) incelemesi için etiketleyin.
* **Link Issue:** Sağ menüden ilgili Issue'yu seçin (Linked Issues) ki PR birleşince o kart da otomatik kapansın.

### 3. Onay Süreci (Code Review)
PR açtığınızda kodunuz **In Review** sütununa düşer.
* Tech Lead veya bir arkadaşınız kodunuzu inceler.
* Hata varsa düzeltmenizi ister (Changes requested).
* Her şey tamamsa onaylar (Approve) ve kodunuz `main` ile birleşir (Merge).

---

## Hızlı Özet
| Durum | Kim Yapar? | Eylem |
| :--- | :--- | :--- |
| **Fikir / Hata** | Product Team | **Issue** açar (Gereksinimleri belirler). |
| **Kodlama** | Developer | **Branch** açar -> Kodlar -> **PR** açar. |
| **Kontrol** | Tech Lead / QA | PR'ı inceler -> **Onaylar (Approve)**. |
| **Bitiş** | Sistem | Kod Merge edilir -> İş **Done** olur. |

---
*İyi kodlamalar! ESN GO Team 🚀*
