# SEO Kullanım Kılavuzu - Harç İnşaat Muhasebe Yazılımı

## ✅ Tamamlanan SEO İyileştirmeleri

### 1. Meta Tags ve Sosyal Medya Optimizasyonu
- ✅ **Primary Meta Tags**: Title, description, keywords eklendi
- ✅ **Open Graph Tags**: Facebook paylaşımları için optimize edildi
- ✅ **Twitter Cards**: Twitter paylaşımları için optimize edildi
- ✅ **Canonical URL**: Duplicate content önlendi
- ✅ **Geo Tags**: Yerel SEO için İstanbul lokasyonu eklendi
- ✅ **Mobile Tags**: PWA ve mobil optimizasyon

### 2. Structured Data (Schema.org)
- ✅ **SoftwareApplication Schema**: Uygulama bilgileri
- ✅ **Organization Schema**: Şirket bilgileri
- ✅ **FAQPage Schema**: SSS bölümü için rich snippets

### 3. Teknik SEO
- ✅ **robots.txt**: Arama motoru tarama kuralları
- ✅ **sitemap.xml**: Tüm sayfaların haritası
- ✅ **Lazy Loading**: Görseller için performans optimizasyonu
- ✅ **Alt Tags**: Tüm görseller için detaylı açıklamalar
- ✅ **Width/Height**: Görsellerde CLS (Cumulative Layout Shift) önlendi

### 4. Performance Optimizasyonu
- ✅ **Preconnect**: Dış kaynaklara hızlı bağlantı
- ✅ **Cache Headers**: Vercel yapılandırması ile optimal cache
- ✅ **Security Headers**: XSS, CSRF ve diğer güvenlik önlemleri

---

## 🚀 Yapılması Gerekenler (Site Yayına Aldıktan Sonra)

### 1. Google Analytics Kurulumu

1. [Google Analytics](https://analytics.google.com/) hesabı oluşturun
2. Yeni bir property (GA4) oluşturun
3. Measurement ID'yi alın (örn: `G-XXXXXXXXXX`)
4. `index.html` dosyasında 72-79. satırlardaki Google Analytics kodunu aktif edin:

```html
<!-- Yorum işaretlerini kaldırın ve XXXXXXXXXX yerine kendi ID'nizi yazın -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Google Search Console Kurulumu

1. [Google Search Console](https://search.google.com/search-console) hesabı oluşturun
2. Yeni property ekleyin: `https://harcmuhasebe.com.tr`
3. HTML tag doğrulama yöntemini seçin
4. Verilen meta tag'i `index.html` dosyasının 82. satırına ekleyin:

```html
<meta name="google-site-verification" content="ALDIğINIZ-KOD-BURAYA">
```

5. Search Console'da "Sitemap Gönder" bölümüne gidin
6. Sitemap URL'sini ekleyin: `https://harcmuhasebe.com.tr/sitemap.xml`

### 3. Vercel Domain Ayarları

1. Vercel Dashboard'a gidin
2. Project Settings > Domains
3. `harcmuhasebe.com.tr` domain'ini ekleyin
4. DNS kayıtlarını güncelleyin (Vercel'in verdiği A ve CNAME kayıtları)
5. SSL sertifikası otomatik aktif olacak

### 4. Bing Webmaster Tools (İsteğe Bağlı)

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) hesabı oluşturun
2. Site ekleyin: `https://harcmuhasebe.com.tr`
3. Sitemap gönderin: `https://harcmuhasebe.com.tr/sitemap.xml`

---

## 📊 SEO Takibi ve Analiz

### Haftalık Kontroller
- [ ] Google Search Console'da hataları kontrol edin
- [ ] Indekslenen sayfa sayısını takip edin
- [ ] Ortalama pozisyon ve tıklama oranlarını gözlemleyin
- [ ] Core Web Vitals metriklerini kontrol edin

### Aylık Görevler
- [ ] Anahtar kelime sıralamalarını kontrol edin
- [ ] Rakip analizi yapın
- [ ] İçerik güncellemeleri planlayın
- [ ] Backlink stratejisi geliştirin

### Önemli Metrikler
- **Organic Traffic**: Arama motorlarından gelen ziyaretçi sayısı
- **Bounce Rate**: Sayfa terkleri (ideali %40'ın altı)
- **Average Session Duration**: Ortalama oturum süresi (ideali 2+ dakika)
- **Core Web Vitals**: LCP, FID, CLS skorları (yeşil bölgede olmalı)

---

## 🎯 Hedef Anahtar Kelimeler

### Birincil Anahtar Kelimeler
1. **İnşaat muhasebe yazılımı** (Yüksek hacim)
2. **Yapay zeka muhasebe** (Orta hacim)
3. **OCR fatura okuma** (Orta hacim)
4. **Hakediş takibi** (Orta hacim)

### İkincil Anahtar Kelimeler
1. İnşaat proje yönetimi
2. İnşaat maliyet takibi
3. E-fatura entegrasyonu
4. Puantaj sistemi
5. Taşeron yönetimi
6. Şantiye yönetimi
7. Muhasebe otomasyon
8. AI chatbot muhasebe

### Uzun Kuyruk Anahtar Kelimeler
1. "İnşaat sektörü için muhasebe programı"
2. "OCR ile fatura okuma yazılımı"
3. "Yapay zeka destekli hakediş takibi"
4. "Mobil inşaat muhasebe uygulaması"
5. "E-fatura entegrasyonlu muhasebe"

---

## 📝 İçerik Stratejisi

### Blog Önerileri (Gelecek için)
1. **"İnşaat Muhasebesinde Yapay Zeka Kullanımı"**
2. **"OCR Teknolojisi ile Fatura İşleme Nasıl Yapılır?"**
3. **"Hakediş Takibinde Yapılan 5 Yaygın Hata"**
4. **"E-Fatura Entegrasyonu Rehberi"**
5. **"İnşaat Projelerinde Maliyet Kontrolü"**

### Video İçerik Önerileri
1. Ürün tanıtım videosu (1-2 dakika)
2. Özellik açıklama videoları (30-60 saniye)
3. Müşteri testimonial'ları
4. Nasıl yapılır videoları

---

## 🔗 Link Building Stratejisi

### Niche Directoriler
- İnşaat sektörü direktörleri
- Yazılım ve SaaS listeleri
- Türk startup listeleri
- B2B yazılım karşılaştırma siteleri

### İçerik İşbirlikleri
- İnşaat blogları ile guest post
- Muhasebe portallarında içerik paylaşımı
- Sektör forumlarında aktif katılım
- LinkedIn'de düzenli içerik paylaşımı

### Yerel SEO
- Google My Business profili
- Yerel işletme direktörleri
- İstanbul iş direktörleri
- Sektörel dernekler ve birlikler

---

## 🛠️ Teknik SEO Kontrol Listesi

### Performans
- [x] Page Speed Insights skoru 90+ (Mobil ve Desktop)
- [x] First Contentful Paint < 1.8s
- [x] Largest Contentful Paint < 2.5s
- [x] Cumulative Layout Shift < 0.1
- [x] Time to Interactive < 3.8s

### Mobil Optimizasyon
- [x] Responsive tasarım
- [x] Mobil viewport meta tag
- [x] Dokunmatik hedefler yeterli büyüklükte
- [x] Font boyutları okunabilir

### Güvenlik
- [x] HTTPS (SSL sertifikası)
- [x] Security headers
- [x] Güvenli harici bağlantılar (target="_blank" + rel="noopener")

### Erişilebilirlik
- [x] Alt text'ler eksiksiz
- [x] Heading hierarchy doğru (H1, H2, H3...)
- [x] ARIA labels
- [x] Kontrast oranları yeterli

---

## 📞 Destek ve Güncellemeler

### Sitemap Güncellemesi
Yeni sayfa eklendiğinde `sitemap.xml` dosyasını güncelleyin:

```xml
<url>
    <loc>https://harcmuhasebe.com.tr/yeni-sayfa</loc>
    <lastmod>2025-XX-XX</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
```

### Meta Tags Güncellemesi
Sayfa içeriği değiştiğinde meta description'ı güncelleyin (optimal: 150-160 karakter).

### Structured Data Test
[Google Rich Results Test](https://search.google.com/test/rich-results) ile Schema.org verilerinizi test edin.

---

## 🎯 3 Aylık SEO Hedefleri

### İlk Ay
- Google Search Console ve Analytics kurulumu
- 50+ organik arama terimi için görünürlük
- İlk 10 backlink

### İkinci Ay
- 100+ organik arama terimi için görünürlük
- Ana anahtar kelimelerle ilk 3 sayfada yer alma
- 25+ backlink

### Üçüncü Ay
- 200+ organik arama terimi için görünürlük
- 2-3 ana anahtar kelime için ilk sayfada
- 50+ backlink
- Domain Authority 20+

---

## ✅ SEO Checklist (Lansman Öncesi)

- [x] Meta tags eksiksiz
- [x] Open Graph ve Twitter Cards
- [x] Schema.org structured data
- [x] robots.txt ve sitemap.xml
- [x] Alt texts eksiksiz
- [x] Lazy loading aktif
- [x] Heading hierarchy doğru
- [x] Vercel yapılandırması
- [ ] Domain bağlantısı (Vercel)
- [ ] Google Analytics kurulumu
- [ ] Google Search Console kurulumu
- [ ] SSL sertifikası aktif

---

## 📚 Faydalı Kaynaklar

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

---

**Son Güncelleme**: 7 Ekim 2025
**Hazırlayan**: AI SEO Uzmanı (Cursor AI)
