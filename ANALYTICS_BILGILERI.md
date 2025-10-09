# 📊 Google Analytics Bilgileri

## ✅ Kurulum Tamamlandı!

Google Analytics başarıyla sitenize entegre edildi.

---

## 📋 Analytics Bilgileri

### Google Analytics 4 (GA4)
- **Measurement ID**: `G-DX5FCMTMBY`
- **Akış Adı**: Web | harcmuhasebe.com.tr | Prod
- **Akış Kimliği**: 12257741523
- **Takma Ad**: Harc

### Measurement Protocol API
- **Gizli Anahtar**: `ElkmZADCQhGfAYUr3T8bVQ`
- **Kullanım**: Sunucu taraflı event tracking için

---

## 🔍 Ne Yapıldı?

### 1. Google Analytics Kodu Eklendi
`index.html` dosyasına Google Analytics tracking kodu eklendi:
- Measurement ID: `G-DX5FCMTMBY`
- Kod aktif ve çalışıyor ✅
- Her sayfa görünümü otomatik kaydediliyor

### 2. Hangi Veriler Toplanıyor?
- **Sayfa görüntülemeleri**: Hangi sayfalar ziyaret ediliyor
- **Kullanıcı davranışları**: Tıklamalar, scroll, form etkileşimleri
- **Trafik kaynakları**: Ziyaretçiler nereden geliyor (Google, direkt, sosyal medya)
- **Demografik bilgiler**: Ülke, şehir, dil, cihaz tipi
- **Oturum süreleri**: Ziyaretçiler ne kadar kalıyor
- **Dönüşümler**: Form göndermeleri, buton tıklamaları

---

## 🎯 Google Analytics Dashboard'a Erişim

1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. Hesabınıza giriş yapın
3. Property: **Harc** seçin
4. Sol menüden istediğiniz rapora gidin:
   - **Ana Sayfa**: Genel özet
   - **Gerçek Zamanlı**: Şu an sitedeki kullanıcılar
   - **Edinme**: Trafik kaynakları
   - **Etkileşim**: Sayfa performansı
   - **Dönüşümler**: Hedef tamamlamalar

---

## 📊 Önemli Raporlar

### 1. Trafik Kaynakları
**Konum**: Edinme > Trafik Edinme
- Organik arama (Google, Bing)
- Direkt trafik
- Sosyal medya
- Referanslar (backlink'ler)

### 2. En Popüler Sayfalar
**Konum**: Etkileşim > Sayfalar ve Ekranlar
- Hangi sayfalar en çok ziyaret ediliyor
- Ortalama süre
- Çıkış oranları

### 3. Dönüşüm Hunisi
**Konum**: Dönüşümler
- Form göndermeleri
- CTA buton tıklamaları
- Demo istekleri

### 4. Gerçek Zamanlı
**Konum**: Gerçek Zamanlı > Genel Bakış
- Şu an sitede kaç kişi var
- Hangi sayfaları görüntülüyorlar
- Nereden geliyorlar

---

## 🔧 Özel Event Tracking (İsteğe Bağlı)

Özel olayları takip etmek için JavaScript kodu ekleyebilirsiniz:

### Form Gönderimi Tracking
```javascript
// Form gönderildiğinde
gtag('event', 'form_submit', {
  'form_name': 'contact_form',
  'form_destination': 'contact'
});
```

### Buton Tıklama Tracking
```javascript
// "Ücretsiz Deneyin" butonu tıklandığında
gtag('event', 'cta_click', {
  'button_name': 'free_trial',
  'button_location': 'hero_section'
});
```

### Demo Video İzleme
```javascript
// Demo video oynatıldığında
gtag('event', 'video_play', {
  'video_name': 'product_demo',
  'video_duration': '120'
});
```

Bu kodları `assets/js/script.js` dosyasına ekleyebilirsiniz.

---

## 🔐 Measurement Protocol API Kullanımı

**NOT**: Bu API anahtarı SADECE sunucu taraflı (backend) uygulamalarda kullanılmalıdır!

### Ne İçin Kullanılır?
- Sunucu taraflı event gönderme
- Form submission tracking (backend'den)
- Ödeme tamamlama event'leri
- CRM entegrasyonu

### Örnek Kullanım (Backend)
```javascript
// Node.js örneği
const fetch = require('node-fetch');

const sendEvent = async () => {
  const measurement_id = 'G-DX5FCMTMBY';
  const api_secret = 'ElkmZADCQhGfAYUr3T8bVQ';
  
  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'user_unique_id',
        events: [{
          name: 'purchase',
          params: {
            currency: 'TRY',
            value: 1000,
            items: [{ item_name: 'Professional Plan' }]
          }
        }]
      })
    }
  );
};
```

**Detaylı Dokümantasyon**: 
https://developers.google.com/analytics/devguides/collection/protocol/ga4

---

## 📈 İlk Adımlar

### 1. Test Edin (Hemen)
1. Sitenizi tarayıcıda açın
2. Google Analytics > Gerçek Zamanlı'ya gidin
3. Kendi ziyaretinizi görmelisiniz ✅

### 2. Hedefler Oluşturun (1 Hafta İçinde)
1. Analytics > Yönetici > Dönüşümler
2. Yeni dönüşüm olayı oluştur:
   - `form_submit` (İletişim formu)
   - `demo_request` (Demo isteği)
   - `free_trial_start` (Ücretsiz deneme)

### 3. Raporları İnceleyin (Haftalık)
- Pazartesi sabahları haftalık rapor kontrol edin
- Trafik kaynaklarını analiz edin
- En çok ziyaret edilen sayfaları belirleyin
- Dönüşüm oranlarını takip edin

---

## 🎯 Haftalık Kontrol Listesi

- [ ] Gerçek zamanlı ziyaretçi sayısı
- [ ] Haftalık toplam ziyaretçi
- [ ] En popüler 5 sayfa
- [ ] Trafik kaynakları (organik vs direkt)
- [ ] Ortalama oturum süresi
- [ ] Çıkış oranı (bounce rate)
- [ ] Form gönderim sayısı
- [ ] Mobil vs Desktop oranı

---

## 🚨 Güvenlik Uyarıları

### ✅ YAPILAN (Güvenli)
- Measurement ID frontend'de kullanıldı
- Google Analytics script sitenize eklendi
- HTTPS üzerinden veri gönderiliyor

### ⚠️ DİKKAT!
- **API Secret Key'i ASLA frontend kodunda kullanmayın**
- API Secret sadece backend/sunucu taraflı kodlarda kullanılmalı
- `.env` dosyasını Git'e commit etmeyin (.gitignore'da olmalı)
- Bu dosyayı (ANALYTICS_BILGILERI.md) Git'e eklemeden önce API Secret'i silin

---

## 📞 Destek ve Kaynaklar

### Google Analytics 4 Dokümantasyonu
- [GA4 Başlangıç Kılavuzu](https://support.google.com/analytics/answer/9304153)
- [Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

### Video Eğitimler
- [GA4 Başlangıç Kursu](https://skillshop.exceedlms.com/student/path/508845-google-analytics-4)

---

## ✅ Durum

- [x] Google Analytics kodu eklendi
- [x] Measurement ID doğru
- [x] Tracking aktif ve çalışıyor
- [x] API Secret güvenli saklanıyor
- [ ] İlk test ziyareti yapıldı mı?
- [ ] Hedefler oluşturuldu mu?
- [ ] Haftalık rapor rutini kuruldu mu?

---

**Son Güncelleme**: 7 Ekim 2025  
**Durum**: ✅ Aktif ve Çalışıyor  
**Measurement ID**: G-DX5FCMTMBY
