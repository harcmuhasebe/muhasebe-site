# EmailJS Kurulum Rehberi

Bu dosya, form doldurma kısmında mail gönderimi için EmailJS servisinin nasıl kurulacağını açıklar.

## 1. EmailJS Hesabı Oluşturma

1. [EmailJS](https://www.emailjs.com/) sitesine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard'a giriş yapın

## 2. Email Servisi Ekleme

1. Dashboard'da "Email Services" sekmesine gidin
2. "Add New Service" butonuna tıklayın
3. Gmail seçin
4. Gmail hesabınızla bağlantı kurun
5. Servis ID'yi not edin (örn: `service_xxxxxxx`)

## 3. Email Template Oluşturma

1. "Email Templates" sekmesine gidin
2. "Create New Template" butonuna tıklayın
3. Template ID'yi not edin (örn: `template_xxxxxxx`)

### Template İçeriği:

**Subject:** `Yeni İletişim Formu - Harç Muhasebe`

**Body:**
```
Yeni bir iletişim formu dolduruldu:

Kişi Bilgileri:
- Ad Soyad/Unvan: {{from_name}}
- E-posta: {{from_email}}
- Telefon: {{phone}}
- Faaliyet Alanı: {{activity}}
- Şehir: {{city}}

Onaylar:
- Kişisel veri aktarımı: {{consent1}}
- Ticari elektronik ileti: {{consent2}}

Gönderim Tarihi: {{date}}

---
Bu email Harç Muhasebe web sitesinden otomatik olarak gönderilmiştir.
```

## 4. Public Key Alma

1. "Account" sekmesine gidin
2. "API Keys" bölümünden Public Key'i kopyalayın

## 5. Kod Güncelleme

`assets/js/mail.js` dosyasında aşağıdaki değerleri güncelleyin:

```javascript
const EMAILJS_SERVICE_ID = 'service_ntcr2uy'; // Kendi servis ID'nizi yazın
const EMAILJS_TEMPLATE_ID = 'template_k6xzoix'; // Kendi template ID'nizi yazın
const EMAILJS_PUBLIC_KEY = 'POLb_RP5SJeLhzzkz'; // Kendi public key'inizi yazın
```

## 6. Test Etme

1. Web sitesini açın
2. İletişim formunu doldurun
3. "Gönder" butonuna tıklayın
4. `harcmuhasebe@gmail.com` adresine email gelip gelmediğini kontrol edin

## 7. Güvenlik Notları

- Public Key'i güvenli tutun
- Rate limiting ayarlarını kontrol edin
- Spam koruması için CAPTCHA ekleyebilirsiniz

## 8. Sorun Giderme

### Email gelmiyor:
- EmailJS dashboard'da logları kontrol edin
- Template parametrelerini kontrol edin
- Gmail spam klasörünü kontrol edin

### JavaScript hataları:
- Browser console'u kontrol edin
- EmailJS CDN linkinin yüklendiğini kontrol edin
- Public Key'in doğru olduğunu kontrol edin

## 9. Ücretsiz Limitler

- Günlük 200 email
- Aylık 2000 email
- Daha fazla kullanım için ücretli plan gerekir

## 10. Alternatif Çözümler

EmailJS çalışmazsa:
- Formspree
- Netlify Forms
- Backend API ile email gönderimi
