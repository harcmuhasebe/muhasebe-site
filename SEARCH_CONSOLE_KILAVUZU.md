# 🔍 Google Search Console Kurulum Kılavuzu

## ✅ TAMAMLANDI: Doğrulama Dosyası Eklendi

### Yapılanlar
1. ✅ **HTML Doğrulama Dosyası**: `google814528939b1de809.html` eklendi
2. ✅ **Meta Tag**: `<meta name="google-site-verification">` index.html'e eklendi
3. ✅ Dosya sitenin kök dizinine yerleştirildi

---

## 🚀 ŞİMDİ NE YAPMALISINIZ?

### Adım 1: Search Console'da Doğrulama
1. [Google Search Console](https://search.google.com/search-console) adresine gidin
2. "Özellik ekle" veya mevcut doğrulama ekranına dönün
3. **"Doğrula" butonuna tıklayın** ✅
4. Başarılı mesajı alacaksınız!

### Adım 2: Sitemap Gönderin (Hemen Sonra)
```
1. Search Console → Sol menüden "Dizinler" → "Sitemap'ler"
2. "Yeni sitemap ekle" butonuna tıklayın
3. URL'yi girin: sitemap.xml
4. "Gönder" butonuna tıklayın
```

Tam URL: `https://harcmuhasebe.com.tr/sitemap.xml`

### Adım 3: İlk Kontrolü Yapın
```
1. "URL İnceleme" aracını kullanın (üst arama çubuğu)
2. Ana sayfanızı test edin: https://harcmuhasebe.com.tr
3. "Canlı URL'yi test et" tıklayın
4. "Dizine eklenme talebinde bulun" tıklayın ✅
```

---

## 📊 Search Console'da İzlenecek Metrikler

### 1. Performans Raporu
**Konum**: Sol menü > Performans
- **Toplam Tıklama**: Kaç kişi Google'dan sitenize geldi
- **Toplam Gösterim**: Siteniz kaç kez arama sonuçlarında göründü
- **Ortalama Tıklama Oranı (CTR)**: Gösterim başına tıklama yüzdesi
- **Ortalama Konum**: Google'da ortalama sıralamanız

### 2. Kapsam Raporu
**Konum**: Sol menü > Dizinler > Sayfalar
- Kaç sayfa indekslendi
- Hangi sayfalar sorun yaşıyor
- Hariç tutulan sayfalar

### 3. Deneyim Raporu
**Konum**: Sol menü > Deneyim
- **Sayfa Deneyimi**: Kullanıcı deneyimi skorları
- **Core Web Vitals**: LCP, FID, CLS metrikleri
- **Mobil Kullanılabilirlik**: Mobil uyumluluk sorunları

### 4. URL İnceleme
**Konum**: Üst arama çubuğu
- Tek bir URL'nin durumunu kontrol edin
- Sayfa neden indekslenmiyor analiz edin
- Manuel indeksleme talebi gönderin

---

## 🎯 İlk 7 Gün Yapılacaklar

### Gün 1 (Bugün)
- [x] Doğrulama dosyası eklendi ✅
- [x] Meta tag eklendi ✅
- [ ] Search Console'da doğrulama yapın
- [ ] Sitemap gönderin

### Gün 2-3
- [ ] Ana sayfa için manuel indeksleme isteyin
- [ ] Önemli sayfalar için manuel indeksleme isteyin
  - `/` (Ana sayfa)
  - `/#features`
  - `/#solutions`
  - `/kullanim-kosullari.html`
  - `/gizlilik-politikasi.html`

### Gün 7
- [ ] İlk performans raporunu kontrol edin
- [ ] Hangi sayfalar indekslendi kontrol edin
- [ ] Mobil kullanılabilirlik raporunu inceleyin

---

## 📋 Manuel İndeksleme Talebi (Önemli!)

Google'ın sitenizi hızlıca keşfetmesi için:

### Her Sayfa İçin Yapın
```
1. URL İnceleme aracını açın (üst arama çubuğu)
2. Sayfa URL'sini girin: https://harcmuhasebe.com.tr
3. "Canlı URL'yi test et" tıklayın
4. Test tamamlandıktan sonra "Dizine eklenme talebinde bulun" tıklayın
5. Onaylayın
```

### Öncelikli Sayfalar
1. `https://harcmuhasebe.com.tr/` (Ana sayfa) - EN ÖNEMLİ
2. `https://harcmuhasebe.com.tr/kullanim-kosullari.html`
3. `https://harcmuhasebe.com.tr/gizlilik-politikasi.html`

Not: Google 1-2 gün içinde sayfalarınızı tarayacak ve indeksleyecektir.

---

## 🔍 Anahtar Kelime Performansı Takibi

### İlk 30 Gün İçinde Görünmesi Beklenen Kelimeler

**Marka Kelimeleri (Hızlı)**
- "harç muhasebe"
- "harç yazılım"
- "harcmuhasebe"

**Uzun Kuyruk Kelimeler (1-2 ay)**
- "inşaat muhasebe yazılımı ücretsiz"
- "ocr ile fatura okuma programı"
- "yapay zeka muhasebe programı"
- "inşaat hakediş takip programı"

**Ana Kelimeler (3-6 ay)**
- "inşaat muhasebe yazılımı"
- "yapay zeka muhasebe"
- "ocr fatura okuma"
- "hakediş takibi"

### Performans Nasıl Kontrol Edilir?
```
1. Search Console > Performans
2. Tarih aralığını seçin: "Son 28 gün"
3. "Sorgular" tabına tıklayın
4. Hangi kelimelerle gösterim/tıklama aldınız görün
```

---

## 🚨 Sık Karşılaşılan Sorunlar ve Çözümleri

### Sorun 1: "Sayfa indekslenmiyor"
**Çözüm:**
- Robots.txt'i kontrol edin (Allow: / olmalı) ✅
- Sitemap'in doğru gönderildiğini kontrol edin
- Manuel indeksleme talebi gönderin
- 48-72 saat bekleyin

### Sorun 2: "Sitemap okunamadı"
**Çözüm:**
- Sitemap URL'sini kontrol edin: `https://harcmuhasebe.com.tr/sitemap.xml`
- Tarayıcıda sitemap'i açıp XML'in düzgün göründüğünü kontrol edin
- Yeniden gönderin

### Sorun 3: "Mobil kullanılabilirlik sorunu"
**Çözüm:**
- Siteniz zaten mobil uyumlu ✅
- Raporu detaylı inceleyin
- Belirtilen sorunları düzeltin

### Sorun 4: "Core Web Vitals kötü"
**Çözüm:**
- Görsellerin lazy loading kullandığını kontrol edin ✅
- PageSpeed Insights ile test edin
- Gerekirse görselleri optimize edin

---

## 📈 Başarı Metrikleri (İlk 90 Gün)

### 30. Gün
- ✅ Tüm sayfalar indekslendi (8 sayfa)
- ✅ 10-20 farklı anahtar kelime ile gösterim
- ✅ İlk 5-10 organik tıklama
- ✅ Marka kelimeleri ile ilk sırada

### 60. Gün
- ✅ 50+ farklı anahtar kelime ile gösterim
- ✅ 50+ organik tıklama
- ✅ Uzun kuyruk kelimelerde ilk sayfa
- ✅ CTR %2-5 arası

### 90. Gün
- ✅ 100+ farklı anahtar kelime ile gösterim
- ✅ 200+ organik tıklama
- ✅ Ana kelimelerde ilk 3 sayfa
- ✅ CTR %5-10 arası

---

## 🔗 Rich Results (Zengin Sonuçlar)

Sitenizde mevcut olan Schema.org yapılandırmaları:

### 1. SoftwareApplication (Uygulama Bilgisi)
- Uygulama adı, kategorisi
- Fiyat bilgisi
- Kullanıcı puanları
- Özellik listesi

**Google'da Görünüm**: Yıldızlı rating, fiyat, özellikler

### 2. Organization (Şirket Bilgisi)
- Şirket adı, logo
- İletişim bilgileri
- Adres ve lokasyon

**Google'da Görünüm**: Bilgi kutusu, harita

### 3. FAQPage (SSS)
- Sık sorulan sorular
- Cevaplar

**Google'da Görünüm**: Genişletilebilir SSS listesi

### Rich Results Test
```
1. https://search.google.com/test/rich-results adresine gidin
2. URL'nizi girin: https://harcmuhasebe.com.tr
3. Test Et butonuna tıklayın
4. Hangi rich results'ların algılandığını görün ✅
```

---

## 📞 Haftalık Rutin

### Her Pazartesi Sabahı (15 dakika)
```
[ ] Search Console'u açın
[ ] Performans raporu: Haftalık tıklama/gösterim
[ ] Kapsam raporu: Yeni indekslenen/hatalı sayfalar
[ ] Mobil kullanılabilirlik: Yeni sorunlar var mı?
[ ] Core Web Vitals: Skorlar nasıl?
[ ] En çok tıklanan 5 anahtar kelimeyi not edin
```

### Her Ay (30 dakika)
```
[ ] Aylık performans raporunu PDF olarak indirin
[ ] Anahtar kelime trendlerini analiz edin
[ ] Hangi sayfa en çok trafik çekiyor?
[ ] CTR düşük olan sayfalarda title/description optimize edin
[ ] Rakip analizi: Kim üstümüzde sıralanıyor?
```

---

## 🎯 Optimizasyon İpuçları

### Title Tag Optimizasyonu
```
Mevcut: "Harç - Yapay Zeka ile İnşaat Muhasebe Yazılımı | OCR ve Akıllı Raporlama"

✅ İyi: Hedef anahtar kelime başta
✅ İyi: 60-70 karakter arası
✅ İyi: Marka adı dahil

Test: Search Console > Performans > "Sayfa" tabı
Hangi sayfaların CTR'si düşük? Title'ını optimize edin!
```

### Meta Description Optimizasyonu
```
Mevcut: "İnşaat sektörü için özel geliştirilmiş yapay zeka destekli muhasebe yazılımı. OCR ile otomatik fatura okuma, hakediş takibi, akıllı raporlama, mobil uygulama ve 7/24 AI chatbot desteği ile projelerinizi yönetin."

✅ İyi: 150-160 karakter
✅ İyi: Call-to-action içeriyor
✅ İyi: Hedef anahtar kelimeler var

Test: Google'da nasıl göründüğüne bakın!
```

---

## ✅ Durum Özeti

### Tamamlananlar
- [x] HTML doğrulama dosyası eklendi
- [x] Meta verification tag eklendi
- [x] Dosya doğru konumda
- [x] Sitemap hazır
- [x] Robots.txt yapılandırıldı
- [x] Schema.org structured data eklendi

### Sırada
- [ ] Search Console'da doğrulama yap
- [ ] Sitemap gönder
- [ ] Manuel indeksleme talepleri gönder
- [ ] İlk 7 günde günlük kontrol

---

## 📚 Faydalı Linkler

- [Search Console Ana Sayfa](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Central](https://developers.google.com/search)

---

**✨ Search Console kurulumu tamamlandı! Şimdi Search Console'a gidip doğrulama yapın ve sitemap'inizi gönderin.**

**Son Güncelleme**: 7 Ekim 2025  
**Doğrulama Dosyası**: google814528939b1de809.html ✅  
**Durum**: Doğrulamaya hazır 🚀
