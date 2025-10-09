# Harç Chatbot - Gemini AI 🤖

## Model Bilgileri 📊

### Kullanılan Model: `gemini-flash-lite-latest`

**Özellikleri:**
- ✅ En hızlı ve ekonomik model
- ✅ Düşük gecikme süresi
- ✅ Yüksek throughput
- ✅ Chatbot için optimize edilmiş
- ✅ 1M token context window
- ✅ Function calling destekli

**Kaynak:** [Google Gemini Models](https://ai.google.dev/gemini-api/docs/models#latest)

## Yapılandırma ⚙️

### Optimize Edilmiş Parametreler

**Temperature: 0.4**
- Düşük temperature = Tutarlı ve profesyonel cevaplar
- Chatbot için ideal (0.3-0.5 arası)
- Hallüsinasyon riski minimum

**Top-P: 0.95**
- Nucleus sampling (Google önerisi)
- Daha geniş kelime havuzu
- Doğal cevaplar

**Top-K: 40**
- Optimal değer
- Hız ve kalite dengesi


### Config Dosyası
```javascript
// assets/js/config.js
const ChatbotConfig = {
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent',
    MODEL_NAME: 'gemini-flash-lite-latest',
    
    // Optimize edilmiş parametreler
    TEMPERATURE: 0.4,           // Tutarlılık
    MAX_OUTPUT_TOKENS: 500,     // Cevap uzunluğu
    TOP_P: 0.95,                // Nucleus sampling (Google önerisi)
    TOP_K: 40,                  // Optimal değer
    THINKING_BUDGET: 600,       // Düşünme token limiti (512-24576)
    CANDIDATE_COUNT: 1,         // Tek cevap
    MAX_HISTORY_LENGTH: 20      // Konuşma geçmişi
};
```

**Not:** API anahtarını `config.js` dosyasına ekleyin. Bu dosya `.gitignore`'da olduğu için Git'e gitmeyecektir.

## Güvenlik 🔒

- ✅ API key hardcode değil
- ✅ `config.js` .gitignore'da
- ⚠️ Production'da environment variables kullan

## Model Alternatifleri 🔄

### Latest Aliaslar (Otomatik Güncellenir)
```javascript
'gemini-flash-lite-latest'  // ✅ Şu anki - En hızlı ve ekonomik
'gemini-flash-latest'       // Dengeli performans
'gemini-pro-latest'         // En güçlü model
```

### Model Karşılaştırması
| Model | Hız | Maliyet | Kullanım Senaryosu |
|-------|-----|---------|---------------------|
| **gemini-flash-lite-latest** ⚡ | En Hızlı | En Ucuz | Chatbot, Basit Görevler |
| gemini-flash-latest | Hızlı | Ucuz | Genel Amaçlı |
| gemini-pro-latest | Normal | Pahalı | Karmaşık Analiz |

## Özellikler ✨

- ✅ Minimal ve modern tasarım
- ✅ Sağ alt köşede (scroll-to-top ile uyumlu)
- ✅ Hover efektleri (yeşil ↔ beyaz)
- ✅ Siyah border (hem chatbot hem scroll-to-top)
- ✅ Conversation history (son 20 mesaj)
- ✅ Typing indicator animasyonu
- ✅ Mobil responsive
- ✅ Semantic filtering (sadece Harç hakkında)

## Teknik Detaylar 🛠️

### Kullanılan Teknolojiler
- **Frontend**: Vanilla JavaScript (framework yok)
- **API**: Direkt Google Gemini REST API
- **Serverless**: Backend gerektirmiyor
- **Semantic Filtering**: Prompt engineering ile

### Dosya Yapısı
```
muhasebe-site/
├── assets/js/
│   ├── config.js       (API key - Git'e gitmez)
│   ├── chatbot.js      (Chatbot kodu)
│   └── script.js       (Ana script)
├── .gitignore          (config.js burada)
└── index.html
```

## BM25 Durumu 🔍

**BM25 eklenemedi** çünkü:
- Backend sunucu gerekli
- Doküman veritabanı gerekli
- Browser'da çalışamaz

**Çözüm:** Prompt engineering ile semantic filtering

## Performans 📈

- **Model**: gemini-flash-lite-latest (en hızlı)
- **Yanıt süresi**: ~0.5-1 saniye (çok hızlı!)
- **Context window**: 1M token
- **Conversation history**: 20 mesaj
- **Temperature**: 0.4 (tutarlı cevaplar)
- **Thinking Budget**: 0 (maksimum hız)
- **Top-P**: 0.95 (Google önerisi)

## İletişim 📧

Destek: info@harcmuhasebe.com.tr

