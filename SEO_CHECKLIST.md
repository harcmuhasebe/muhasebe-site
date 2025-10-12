# 🎯 SEO Checklist - Harç Muhasebe

## ✅ Tamamlanan SEO İyileştirmeleri

### 1. **Structured Data (Schema.org)** ✅
- [x] WebSite Schema
- [x] SoftwareApplication Schema
- [x] Organization Schema  
- [x] LocalBusiness Schema
- [x] FAQPage Schema (4 soru)
- [x] BreadcrumbList Schema
- [x] VideoObject Schema (Demo video)
- [x] Service Schema (6 hizmet)
- [x] HowTo Schema (OCR kullanımı)
- [x] Product Schema with Reviews (3 yorum)

### 2. **Technical SEO** ✅
- [x] Sitemap.xml oluşturuldu (16 görsel + 1 video + 3 sayfa)
- [x] robots.txt optimize edildi
- [x] Sitemap link tüm sayfalarda (`<link rel="sitemap">`)
- [x] Canonical URLs
- [x] Meta robots tags
- [x] Google Search Console verification
- [x] Google Analytics entegrasyonu

### 3. **Meta Tags** ✅
- [x] Title tags (her sayfa için unique)
- [x] Meta descriptions (155-160 karakter)
- [x] Open Graph tags (Facebook/LinkedIn)
- [x] Twitter Cards
- [x] Geo tags (İstanbul)

### 4. **Performance Optimization** ✅
- [x] WebP görseller (95% küçültme)
- [x] Responsive images (`<picture>` element)
- [x] Lazy loading
- [x] Critical CSS inline
- [x] Defer JavaScript
- [x] Font-display: swap
- [x] Image optimization (mobil + desktop)

### 5. **Mobile SEO** ✅
- [x] Mobile-friendly design
- [x] Viewport meta tag
- [x] Touch-friendly buttons
- [x] Mobile-optimized images
- [x] Apple touch icons

---

## 📋 Yapılacak SEO İyileştirmeleri

### 1. **Content SEO** 🔴 ÖNCELİKLİ

#### A. Blog Bölümü Ekle
```
/blog/
├── insaat-muhasebe-ipuclari/
├── ocr-teknolojisi-nedir/
├── hakedis-takibi-nasil-yapilir/
└── e-fatura-entegrasyonu/
```

**Anahtar Kelimeler:**
- inşaat muhasebe yazılımı
- ocr fatura okuma
- hakediş takibi
- inşaat maliyet takibi
- şantiye yönetimi
- e-fatura entegrasyonu
- inşaat muhasebe programı

**Hedef:** Her ay 2-4 blog yazısı (800-1500 kelime)

---

#### B. SSS Sayfası Genişlet
Şu anda: 4 soru  
**Hedef:** 15-20 soru

**Eklenecek Sorular:**
1. Harç'ın fiyatı ne kadar?
2. Ücretsiz deneme süresi var mı?
3. Kaç kullanıcı ekleyebilirim?
4. E-Fatura entegrasyonu nasıl çalışır?
5. Verileri nasıl yedeklerim?
6. Mobil uygulamayı nereden indirebilirim?
7. API entegrasyonu mümkün mü?
8. BIM yazılımları ile uyumlu mu?
9. Destek hizmeti nasıl alınır?
10. Veri geçişi nasıl yapılır?

---

#### C. Alt Sayfalar Oluştur

**Önerilen Sayfalar:**
```
/ozellikler/
├── ocr-fatura-okuma.html
├── hakedis-takibi.html
├── akilli-raporlama.html
├── mobil-uygulama.html
├── ai-chatbot.html
└── e-fatura.html

/sektorler/
├── insaat-firmalari.html
├── mutaahhitler.html
├── taseronlar.html
└── mimarlik-buroları.html

/fiyatlandirma.html
/iletisim.html
/hakkimizda.html
/demo-talep.html
```

---

### 2. **Internal Linking** 🔴 ÖNCELİKLİ

**Mevcut Durum:** Sadece anchor linkler (#features, #contact)  
**Hedef:** Her sayfadan 3-5 internal link

**Strateji:**
```html
<!-- index.html içinde -->
<a href="/ozellikler/ocr-fatura-okuma.html">OCR Fatura Okuma hakkında detaylı bilgi</a>
<a href="/fiyatlandirma.html">Fiyatlandırma planlarımızı inceleyin</a>
<a href="/blog/insaat-muhasebe-ipuclari/">İnşaat muhasebe ipuçları</a>

<!-- Footer'da -->
<div class="footer-links">
  <h4>Özellikler</h4>
  <a href="/ozellikler/ocr-fatura-okuma.html">OCR Fatura Okuma</a>
  <a href="/ozellikler/hakedis-takibi.html">Hakediş Takibi</a>
  ...
</div>
```

---

### 3. **External Backlinks** 🟡 ORTA

**Strateji:**
1. **Sektör Forumları:**
   - İnşaatçı.com
   - Yapı Forumu
   - İnşaat Mühendisleri Odası

2. **Guest Blogging:**
   - İnşaat blog'larında konuk yazı
   - Muhasebe blog'larında yazı paylaşımı

3. **Sosyal Medya:**
   - LinkedIn şirket sayfası
   - YouTube demo videoları
   - Twitter güncellemeleri

4. **Dizinler:**
   - Google My Business
   - Yandex Business
   - GetApp
   - Capterra
   - Software Advice

---

### 4. **Local SEO** 🟡 ORTA

#### Google My Business Profili Oluştur
```
İşletme Adı: HARÇ MUHASEBE (Yapay Zeka Destekli İnşaat Muhasebe Sistemi)
Kategori: Yazılım Şirketi
Alt Kategori: Muhasebe Yazılımı
Adres: İstanbul, Türkiye
Telefon: [Telefon numarası]
Website: https://harcmuhasebe.com.tr
Saatler: 09:00 - 18:00 (Hafta içi)
```

**Eklenecekler:**
- Logo görseli
- Ofis fotoğrafları
- Ürün ekran görüntüleri
- Müşteri yorumları (Google Reviews)
- SSS bölümü
- Hizmetler listesi

---

### 5. **Rich Snippets Test & İzleme** 🟢 DÜŞÜK

**Test Araçları:**
```bash
# Rich Results Test
https://search.google.com/test/rich-results

# Schema Markup Validator
https://validator.schema.org/

# Google Search Console
https://search.google.com/search-console
```

**Test Edilecek Schema'lar:**
- [ ] SoftwareApplication → Rating stars görünüyor mu?
- [ ] VideoObject → Video thumbnail çıkıyor mu?
- [ ] HowTo → Adımlar görünüyor mu?
- [ ] Product → Fiyat ve rating var mı?
- [ ] FAQPage → Sorular accordion olarak görünüyor mu?

---

### 6. **Keywords Research & Optimization** 🟡 ORTA

#### Primary Keywords (Ana Hedef)
```
1. inşaat muhasebe yazılımı (Zorluk: Orta, Hacim: 1.2K/ay)
2. inşaat muhasebe programı (Zorluk: Orta, Hacim: 890/ay)
3. hakediş takip programı (Zorluk: Düşük, Hacim: 320/ay)
4. şantiye yönetim sistemi (Zorluk: Orta, Hacim: 480/ay)
5. inşaat maliyet takibi (Zorluk: Düşük, Hacim: 410/ay)
```

#### Long-tail Keywords
```
- ocr ile fatura okuma
- yapay zeka muhasebe yazılımı
- mobil inşaat muhasebe
- e-fatura entegrasyonu inşaat
- hakediş hesaplama programı
- şantiye puantaj sistemi
- taşeron yönetim yazılımı
```

#### Keyword Placement Stratejisi
```html
<!-- Title Tag -->
<title>Harç - Yapay Zeka ile İnşaat Muhasebe Yazılımı | OCR Fatura Okuma</title>
                   ↑ Primary Keyword

<!-- H1 -->
<h1>İnşaat Muhasebe Yazılımı - Yapay Zeka Destekli</h1>
     ↑ Primary Keyword (başta)

<!-- First 100 words -->
"İnşaat muhasebe yazılımı Harç, OCR fatura okuma ve hakediş takibi..."
  ↑ Primary keyword ilk 100 kelime içinde

<!-- Meta Description -->
"İnşaat muhasebe yazılımı Harç ile OCR fatura okuma, hakediş takibi..."
  ↑ Primary + secondary keywords
```

---

### 7. **Heading Structure Optimization** 🟢 DÜŞÜK

**Mevcut Durumu Kontrol Et:**
```bash
# H1 kontrolü (sayfa başına 1 tane olmalı)
grep -o "<h1[^>]*>.*</h1>" index.html

# H2-H6 hiyerarşisini kontrol et
```

**İdeal Yapı:**
```html
<h1>İnşaat Muhasebe Yazılımı</h1> (1 tane)
  <h2>Yapay Zeka Özellikleri</h2>
    <h3>OCR Fatura Okuma</h3>
    <h3>Akıllı Raporlama</h3>
  <h2>Neden Harç?</h2>
    <h3>Zaman Tasarrufu</h3>
    <h3>Maliyet Azaltma</h3>
```

---

### 8. **Image SEO** 🟢 DÜŞÜK

**Yapılacaklar:**
- [ ] Tüm görsellere descriptive alt text
- [ ] Dosya isimlerini SEO-friendly yap
- [ ] Image sitemap güncel mi?
- [ ] WebP fallback var mı?

**Örnek:**
```html
<!-- ❌ Kötü -->
<img src="img1.png" alt="image">

<!-- ✅ İyi -->
<img src="insaat-muhasebe-dashboard.webp" 
     alt="Harç inşaat muhasebe yazılımı ana panel - hakediş takibi ve KPI göstergeleri"
     title="İnşaat Muhasebe Dashboard">
```

---

### 9. **Social Media Integration** 🟡 ORTA

**Yapılacaklar:**
1. **LinkedIn Company Page** oluştur
   - Düzenli içerik paylaşımı
   - Çalışan profilleri bağla
   - Showcase pages (Özellikler için)

2. **YouTube Channel**
   - Demo videoları
   - Tutorial serisi
   - Müşteri testimonial'ları
   - Webinar kayıtları

3. **Twitter/X**
   - Güncellemeler
   - İpuçları
   - Sektör haberleri

4. **Instagram**
   - Ekran görüntüleri
   - Özellik tanıtımları
   - Kullanıcı hikayeleri

---

### 10. **Analytics & Monitoring** 🔴 ÖNCELİKLİ

**Kurulacak Araçlar:**
- [ ] Google Search Console (✅ Kurulu - Submit sitemap)
- [ ] Google Analytics 4 (✅ Kurulu)
- [ ] Bing Webmaster Tools
- [ ] Hotjar (Heatmap)
- [ ] SEMrush / Ahrefs (Keyword tracking)

**Takip Edilecek Metrikler:**
```
Organic Traffic:
- Aylık ziyaretçi sayısı
- Bounce rate (hedef: <40%)
- Session duration (hedef: >2 dk)

Keywords:
- Ranking positions (top 10 hedefi)
- Impressions (gösterim sayısı)
- CTR (tıklama oranı, hedef: >3%)

Conversions:
- Form doldurma oranı
- Demo talep sayısı
- Email kayıt
- Video izlenme
```

---

## 🎯 3 Aylık Eylem Planı

### **Ay 1: Temel İçerik** 🔴
- [ ] 5 alt sayfa oluştur (özellikler)
- [ ] 4 blog yazısı yaz
- [ ] SSS'yi 15 soruya çıkar
- [ ] Google My Business profili oluştur
- [ ] Rich snippets test et

### **Ay 2: Link Building** 🟡
- [ ] 10 backlink edin
- [ ] LinkedIn page oluştur
- [ ] 5 guest blog yaz
- [ ] Sektör forumlarına katıl
- [ ] Dizinlere kayıt ol

### **Ay 3: Optimizasyon** 🟢
- [ ] Keyword performance analiz et
- [ ] A/B testing başlat
- [ ] İçerikleri güncelle
- [ ] Internal linking güçlendir
- [ ] Conversion rate optimize et

---

## 📊 Beklenen Sonuçlar

### **3 Ay Sonra:**
- Organic traffic: **+150-200%**
- Keyword rankings: **15-20 kelime top 10'da**
- Backlinks: **30-50 kaliteli link**
- Domain Authority: **20-25**

### **6 Ay Sonra:**
- Organic traffic: **+300-400%**
- Keyword rankings: **40-50 kelime top 10'da**
- Monthly leads: **50-100 demo talebi**
- Brand searches: **Artış**

---

## 🔗 Faydalı Kaynaklar

**SEO Araçları:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev
- Schema Validator: https://validator.schema.org

**Keyword Research:**
- Google Keyword Planner
- Ubersuggest
- AnswerThePublic
- Google Trends

**Backlink Analysis:**
- Ahrefs
- SEMrush
- Moz

---

**Not:** Bu checklist dinamik bir döküman. Her hafta güncellenmeli ve yeni SEO trendlerine göre adapte edilmeli.

**Son Güncelleme:** 2024-10-12

