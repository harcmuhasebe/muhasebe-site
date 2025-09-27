// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ntcr2uy';
const EMAILJS_TEMPLATE_ID = 'template_k6xzoix';
const EMAILJS_PUBLIC_KEY = 'POLb_RP5SJeLhzzkz'; // Bu anahtarı EmailJS dashboard'dan alacaksınız

// EmailJS initialization
(function() {
    // EmailJS'yi yükle
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS kütüphanesi yüklenmedi. Lütfen CDN linkini kontrol edin.');
        return;
    }
    
    // EmailJS'yi başlat
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Form verilerini email olarak gönder
async function sendContactForm(formData) {
    try {
        // Form verilerini EmailJS template formatına dönüştür
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.countryCode + ' ' + formData.phone,
            activity: getActivityText(formData.activity),
            city: getCityText(formData.city),
            consent1: formData.consent1 ? 'Evet' : 'Hayır',
            consent2: formData.consent2 ? 'Evet' : 'Hayır',
            to_email: 'harcmuhasebe@gmail.com',
            subject: 'Yeni İletişim Formu - Harç Muhasebe',
            message: generateEmailMessage(formData)
        };

        // EmailJS ile email gönder
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email başarıyla gönderildi:', response);
        return { success: true, message: 'Form başarıyla gönderildi!' };

    } catch (error) {
        console.error('Email gönderim hatası:', error);
        return { 
            success: false, 
            message: 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' 
        };
    }
}

// Faaliyet alanı metnini döndür
function getActivityText(activity) {
    const activities = {
        'insaat': 'İnşaat',
        'mimarlik': 'Mimarlık',
        'muhendislik': 'Mühendislik',
        'danismanlik': 'Danışmanlık',
        'diger': 'Diğer'
    };
    return activities[activity] || activity;
}

// Şehir metnini döndür
function getCityText(city) {
    const cities = {
        'istanbul': 'İstanbul',
        'ankara': 'Ankara',
        'izmir': 'İzmir',
        'bursa': 'Bursa',
        'antalya': 'Antalya',
        'diger': 'Diğer'
    };
    return cities[city] || city;
}

// Email içeriği oluştur
function generateEmailMessage(formData) {
    return `
Yeni bir iletişim formu dolduruldu:

Kişi Bilgileri:
- Ad Soyad/Unvan: ${formData.name}
- E-posta: ${formData.email}
- Telefon: ${formData.countryCode} ${formData.phone}
- Faaliyet Alanı: ${getActivityText(formData.activity)}
- Şehir: ${getCityText(formData.city)}

Onaylar:
- Kişisel veri aktarımı: ${formData.consent1 ? 'Evet' : 'Hayır'}
- Ticari elektronik ileti: ${formData.consent2 ? 'Evet' : 'Hayır'}

Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}
    `;
}

// Form gönderim durumunu kontrol et
function checkEmailJSStatus() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS yüklenmedi');
        return false;
    }
    return true;
}

// Export functions for use in other files
window.MailService = {
    sendContactForm,
    checkEmailJSStatus,
    generateEmailMessage
};
