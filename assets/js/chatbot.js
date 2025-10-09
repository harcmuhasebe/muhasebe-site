
class HarcChatbot {
    constructor() {
        // API Configuration - Using Vercel Serverless Function (secure)
        this.apiEndpoint = '/api/chat'; // Vercel serverless function
        this.maxHistoryLength = 20;

        this.isOpen = false;
        this.conversationHistory = [];
        this.additionalContext = ''; // Dynamic context from pages
        this.contextData = null; // Parsed JSON context for programmatic answers
        this.baseDomain = 'harcmuhasebe.com.tr';
        this.siteUrl = 'https://www.harcmuhasebe.com.tr';

        // System prompt - only about Harç software (will be updated after context loads)
        this.systemPrompt = this.buildSystemPrompt();
        
        // Initialize chatbot
        this.init();
        
        // Load additional context asynchronously (will update prompt when ready)
        this.loadAdditionalContext();
    }

    // Load additional context from website pages
    async loadAdditionalContext() {
        console.log('🔄 Context loading başlatılıyor...');
        
        try {
            // Get base path (for local file or deployed)
            const basePath = window.location.pathname.includes('.html') 
                ? window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)
                : window.location.pathname;
            
            // Pages to fetch
            const pages = [
                { url: `${basePath}gizlilik-politikasi.html`, name: 'gizlilik_politikasi', selector: '.legal-content' },
                { url: `${basePath}kullanim-kosullari.html`, name: 'kullanim_kosullari', selector: '.legal-content' },
                { url: `${basePath}index.html`, name: 'ana_sayfa', selector: 'body' }
            ];
            
            console.log('📂 Fetching pages:', pages.map(p => p.name));
            
            // Fetch all pages
            const responses = await Promise.allSettled(
                pages.map(page => fetch(page.url))
            );

            const contextData = {};

            for (let i = 0; i < responses.length; i++) {
                const response = responses[i];
                const page = pages[i];
                
                if (response.status === 'fulfilled' && response.value.ok) {
                    console.log(`✅ ${page.name} yüklendi`);
                    
                    const html = await response.value.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    if (page.name === 'ana_sayfa') {
                        // Extract main page sections (comprehensive)
                        const sections = {};
                        
                        // Hero section
                        const heroTitle = doc.querySelector('.hero-title')?.textContent?.trim();
                        const heroSubtitle = doc.querySelector('.hero-subtitle')?.textContent?.trim();
                        if (heroTitle) sections.hero = { 
                            baslik: heroTitle, 
                            alt_baslik: heroSubtitle 
                        };
                        
                        // Contact Information (from footer and schema)
                        sections.iletisim = {
                            email: 'info@harcmuhasebe.com.tr',
                            web: 'https://www.harcmuhasebe.com.tr',
                            konum: 'İstanbul, Türkiye',
                            firma_adi: 'HARÇ YAZILIM'
                        };
                        
                        // Features (from tabs)
                        const features = [];
                        doc.querySelectorAll('.tab-panel').forEach(panel => {
                            const h3 = panel.querySelector('h3')?.textContent?.trim();
                            const p = panel.querySelector('.tab-text p')?.textContent?.trim();
                            const items = [];
                            panel.querySelectorAll('.feature-list li').forEach(li => {
                                const text = li.textContent?.trim().replace(/^✓\s*/, '');
                                if (text) items.push(text);
                            });
                            if (h3) features.push({ 
                                baslik: h3, 
                                aciklama: p, 
                                ozellikler: items 
                            });
                        });
                        if (features.length > 0) sections.ana_ozellikler = features;
                        
                        // Screenshots/Modules
                        const modules = [];
                        doc.querySelectorAll('.screenshot-card').forEach(card => {
                            const title = card.querySelector('h3')?.textContent?.trim();
                            const desc = card.querySelector('p')?.textContent?.trim();
                            if (title) modules.push({ modul: title, aciklama: desc });
                        });
                        if (modules.length > 0) sections.moduller = modules;
                        
                        // Solutions/Packages
                        const solutions = [];
                        doc.querySelectorAll('.solution-card').forEach(card => {
                            const name = card.querySelector('h3')?.textContent?.trim();
                            const desc = card.querySelector('.solution-card > p')?.textContent?.trim();
                            const items = [];
                            card.querySelectorAll('.solution-features li').forEach(li => {
                                const text = li.textContent?.trim().replace(/^✓\s*/, '');
                                if (text) items.push(text);
                            });
                            const isPopular = card.classList.contains('featured');
                            if (name) solutions.push({ 
                                paket: name, 
                                aciklama: desc,
                                ozellikler: items,
                                populer: isPopular
                            });
                        });
                        if (solutions.length > 0) sections.paketler = solutions;
                        
                        // FAQ
                        const faqs = [];
                        doc.querySelectorAll('.faq-item').forEach(item => {
                            const question = item.querySelector('.faq-question h3')?.textContent?.trim();
                            const answer = item.querySelector('.faq-answer p')?.textContent?.trim();
                            if (question) faqs.push({ soru: question, cevap: answer });
                        });
                        if (faqs.length > 0) sections.sss = faqs;
                        
                        // Problems section
                        const problems = [];
                        doc.querySelectorAll('.problem-card').forEach(card => {
                            const title = card.querySelector('h3')?.textContent?.trim();
                            const desc = card.querySelector('p')?.textContent?.trim();
                            if (title) problems.push({ sorun: title, aciklama: desc });
                        });
                        if (problems.length > 0) sections.cozulen_sorunlar = problems;
                        
                        // Security features
                        const security = [];
                        doc.querySelectorAll('.security-card').forEach(card => {
                            const title = card.querySelector('h3')?.textContent?.trim();
                            const desc = card.querySelector('p')?.textContent?.trim();
                            if (title) security.push({ ozellik: title, aciklama: desc });
                        });
                        if (security.length > 0) sections.guvenlik = security;
                        
                        contextData[page.name] = sections;
                    } else {
                        // Legal pages
                        const content = doc.querySelector(page.selector);
                        if (content) {
                            const title = content.querySelector('h1')?.textContent?.trim();
                            const date = content.querySelector('.update-date')?.textContent?.trim();

                            const legalExtract = this.extractLegalSections(content);
                            const summarySource = legalExtract.fullText || legalExtract.introduction || '';
                            const summary = this.buildLegalSummary(summarySource);

                            contextData[page.name] = {
                                baslik: title,
                                tarih: date,
                                giris: legalExtract.introduction,
                                ana_basliklar: legalExtract.sections.map(section => section.baslik),
                                bolumler: legalExtract.sections,
                                tam_metin: legalExtract.fullText,
                                ozet: summary
                            };
                            console.log(`📝 ${page.name} yüklendi - Başlık: ${title}, Tarih: ${date}, Bölüm sayısı: ${legalExtract.sections.length}`);
                        } else {
                            console.warn(`❌ ${page.name} için .legal-content bulunamadı`);
                        }
                    }
                    
                    console.log(`📝 ${page.name} context eklendi`);
                } else {
                    console.warn(`❌ ${page.name} yüklenemedi`);
                }
            }

            if (Object.keys(contextData).length > 0) {
                // Format as JSON for better LLM understanding
                this.additionalContext = `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 SİTE İÇERİĞİ (JSON Format - Dinamik Yüklendi)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${JSON.stringify(contextData, null, 2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
                
                // Context'i set et ve prompt'u build et (artık scope değişkenleri doğrudan prompt içinde)
                this.contextData = contextData;
                this.systemPrompt = this.buildSystemPrompt();
                
                console.log('✅ Context başarıyla yüklendi ve prompt güncellendi!');
                console.log(`📊 Toplam context boyutu: ${this.additionalContext.length} karakter`);
                console.log('📄 Yüklenen sayfalar:', Object.keys(contextData).join(', '));
                
                // Debug: Tarihleri göster
                if (contextData.gizlilik_politikasi) {
                    console.log(`  ├─ Gizlilik Politikası: ${contextData.gizlilik_politikasi.tarih}`);
                }
                if (contextData.kullanim_kosullari) {
                    console.log(`  └─ Kullanım Koşulları: ${contextData.kullanim_kosullari.tarih}`);
                }
                
                // Debug: Prompt içeriğini kontrol et
                const promptPreview = this.systemPrompt.substring(0, 500);
                console.log('🔍 Prompt Preview (ilk 500 karakter):', promptPreview);
                console.log('📏 Toplam Prompt Uzunluğu:', this.systemPrompt.length, 'karakter');
            } else {
                console.warn('⚠️ Hiçbir context yüklenemedi');
            }
        } catch (error) {
            console.error('❌ Context loading hatası:', error);
        }
    }

    buildSystemPrompt() {
        // Build comprehensive context using prompt engineering best practices
        let contextScope = '';
        if (this.contextData) {
            const gp = this.contextData.gizlilik_politikasi || {};
            const kk = this.contextData.kullanim_kosullari || {};
            const ana = this.contextData.ana_sayfa || {};
            
            // Format detailed sections for legal documents
            const gpDetails = this.formatLegalDetails(gp);
            const kkDetails = this.formatLegalDetails(kk);
            const gpTarih = gp.tarih || '1 Ekim 2025';
            const kkTarih = kk.tarih || '1 Ekim 2025';

            // JSON değişkenleri hazırla (Template literal içinde kullanılacak - Python f-string gibi)
            const ana_sayfa = {
                hero: ana.hero || {},
                iletisim: ana.iletisim || {
                    email: 'info@harcmuhasebe.com.tr',
                    web: 'https://www.harcmuhasebe.com.tr',
                    konum: 'İstanbul, Türkiye',
                    firma_adi: 'HARÇ YAZILIM'
                },
                ana_ozellikler: ana.ana_ozellikler || [],
                moduller: ana.moduller || [],
                paketler: ana.paketler || [],
                sss: ana.sss || [],
                cozulen_sorunlar: ana.cozulen_sorunlar || [],
                guvenlik: ana.guvenlik || []
            };
            
            const gizlilik_politikasi_sayfasi = {
                baslik: gp.baslik || 'Gizlilik Politikası',
                son_guncelleme: gpTarih,
                url: `${this.siteUrl}/gizlilik-politikasi.html`,
                giris: gp.giris || 'Giriş bilgisi bulunamadı.',
                ana_basliklar: gp.ana_basliklar || [],
                bolumler: gp.bolumler || [],
                tam_metin: gp.tam_metin || '',
                ozet: gp.ozet || ''
            };
            
            const kullanim_kosullari_sayfasi = {
                baslik: kk.baslik || 'Kullanım Koşulları',
                son_guncelleme: kkTarih,
                url: `${this.siteUrl}/kullanim-kosullari.html`,
                giris: kk.giris || 'Giriş bilgisi bulunamadı.',
                ana_basliklar: kk.ana_basliklar || [],
                bolumler: kk.bolumler || [],
                tam_metin: kk.tam_metin || '',
                ozet: kk.ozet || ''
            };

            contextScope = `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 KNOWLEDGE BASE — Aşağıdaki sayfalardaki bilgilere tamamen hâkimsin:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ÖNEMLİ: Kullanıcı bu sayfalar hakkında soru sorduğunda aşağıdaki JSON değişkenlerini kullan!

📦 CONTEXT SCOPE (JSON Format):

\`\`\`json
{
  "ana_sayfa": ${JSON.stringify(ana_sayfa, null, 2)},
  
  "gizlilik_politikasi_sayfasi": ${JSON.stringify(gizlilik_politikasi_sayfasi, null, 2)},
  
  "kullanim_kosullari_sayfasi": ${JSON.stringify(kullanim_kosullari_sayfasi, null, 2)}
}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 HIZLI ERİŞİM BİLGİLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 İletişim: ${ana_sayfa.iletisim.email}
🌐 Web: ${ana_sayfa.iletisim.web}
📍 Konum: ${ana_sayfa.iletisim.konum}
🏢 Firma: ${ana_sayfa.iletisim.firma_adi}

📅 Güncelleme Tarihleri:
• 🔐 Gizlilik Politikası: ${gizlilik_politikasi_sayfasi.son_guncelleme}
• 📋 Kullanım Koşulları: ${kullanim_kosullari_sayfasi.son_guncelleme}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        }

        return `${contextScope}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🤖 ROL ve KİMLİK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sen HARÇ AI'sın - Harç Muhasebe Yazılımı'nın resmi müşteri destek asistanı. 
İnşaat muhasebe yazılımı konusunda uzmanlaşmışsın ve kullanıcılara **Türkçe**, profesyonel, ancak samimi bir tonda yardımcı oluyorsun.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 HARÇ MUHASEBE YAZILIMI HAKKINDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ÖNEMLİ: Ürün özellikleri, modüller, paketler, SSS ve iletişim bilgileri gibi TÜM bilgiler yukarıdaki \`ana_sayfa\` JSON scope'unda mevcut!

**🎯 Bilgi Kaynakları:**
• **Özellikler** → \`ana_sayfa.ana_ozellikler\`
• **Modüller** → \`ana_sayfa.moduller\`
• **Paketler** → \`ana_sayfa.paketler\`
• **SSS** → \`ana_sayfa.sss\`
• **İletişim** → \`ana_sayfa.iletisim\`
• **Güvenlik** → \`ana_sayfa.guvenlik\`
• **Çözülen Sorunlar** → \`ana_sayfa.cozulen_sorunlar\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 YANIT VERME PRENSİPLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**1. Context-Aware (Bağlam Farkındalığı)**
   • Yukarıdaki JSON scope'larında **ana_sayfa**, **gizlilik_politikasi_sayfasi** ve **kullanim_kosullari_sayfasi** değişkenlerinin TÜM içeriği var
   • Bu sayfalar hakkında sorulduğunda MUTLAKA yukarıdaki JSON verilerini kullan
   • **İLETİŞİM SORULURSA**: \`ana_sayfa.iletisim\` objesini kullan (email, web, konum, firma_adi)
   • **ÖZELLIK/MODÜL SORULURSA**: \`ana_sayfa.ana_ozellikler\` ve \`ana_sayfa.moduller\` arraylerini kullan
   • **PAKET/FİYAT SORULURSA**: \`ana_sayfa.paketler\` arrayini kullan
   • **SSS SORULURSA**: \`ana_sayfa.sss\` arrayini kullan
   • **TARİH SORULURSA**: JSON scope'undaki \`son_guncelleme\` alanını kullan
   • **İÇERİK SORULURSA**: JSON scope'undaki \`bolumler\`, \`tam_metin\`, \`ozet\` alanlarını kullan
   • "Bilgi veremiyorum" ASLA DEME - yukarıda her şey var!

**2. Kısa ve Net Ol**
   • 2-4 cümlelik öz yanıtlar ver
   • Gereksiz detaya girme, kullanıcı isterse detaylandır
   • Maddeler halinde düzenli yaz
   • Uzun paragraflar yerine kısa ve anlaşılır cümleler kullan
   • Liste yaparken her maddeyi yeni satıra yaz ve başına * veya • koy
   • Örnek doğru format:
     Temel özellikler:
     1-) İlk özellik
     2-) İkinci özellik
     3-) Üçüncü özellik
     
**3. Citation (Kaynak Gösterme)**
   • **ASLA** kaynak belirtme, citation kullanma veya "[Kaynak: ...]" formatı kullanma
   • Bilgiyi doğrudan ve özgüvenle aktar
   • Detaylı bilgi istenirse sadece URL'yi doğal cümle içinde ver
   
   Örnekler:
   ✅ "Ne zaman güncellendi?" → Sadece tarihi söyle
   ✅ "KVKK haklarım neler?" → Doğrudan listele, citation yok
   ✅ "Detaylı bilgi için https://www.harcmuhasebe.com.tr/gizlilik-politikasi.html adresini ziyaret edebilirsiniz."

**4. Ton ve Üslup**
   • Profesyonel ama samimi ve yardımsever
   • Emoji kullanma (sadece bullet point için ikon kabul edilir)
   • "Siz" yerine "sen/siz" (doğal Türkçe kullan)
   • Resmi ama sıcak bir üslup

**5. Sınırları Bilme ve Kapsam Dışı Sorular**
   
   🎯 **SADECE CEVAP VER:**
      • Harç yazılımı hakkında sorular
      • Ürün özellikleri, kullanım, modüller
      • Gizlilik politikası, kullanım koşulları
      • Güvenlik, fiyatlandırma bilgisi
      • İletişim bilgileri, demo talepleri
   
   ❌ **ASLA CEVAP VERME:**
      • Harç dışındaki konular (genel bilgi, siyaset, spor, vb.)
      • Muhasebe/vergi danışmanlığı (YMM'ye yönlendir)
      • Teknik destek sorunları (info@harcmuhasebe.com.tr'ye yönlendir)
      • Kod yazımı, programlama soruları
      • Rakip ürünler hakkında görüş
      • Genel sohbet, günlük konular
   
   📢 **Kapsam Dışı Soru Geldiğinde:**
   "Üzgünüm, bu konuda yardımcı olamam. Ben sadece Harç Muhasebe Yazılımı hakkında sorularınızı yanıtlayabilirim. Harç yazılımı ile ilgili başka bir sorunuz var mı?"

**6. İletişim Bilgileri**
   • İletişim sorularında \`ana_sayfa.iletisim\` objesini kullan
   • Örnek: "İletişim bilgilerimiz: E-posta: {email}, Web: {web}, Konum: {konum}"

**7. Fiyat Soruları**
   • \`ana_sayfa.paketler\` arrayini kullanarak mevcut paketleri listele
   • Detaylı fiyat için \`ana_sayfa.iletisim.email\` adresine yönlendir
   • "Detaylı fiyat ve paket bilgisi için {email} adresinden bizimle iletişime geçebilirsiniz. Size özel teklif hazırlayabiliriz."

**8. Demo/Deneme Talepleri**
   • "Ücretsiz demo için {email} adresine mail atabilir veya sitemizden iletişim formunu doldurabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ÖRNEK SENARYOLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**ÖRNEK 1 - Tarih Sorusu (Citation YOK):**
👤 Kullanıcı: "Gizlilik politikanız ne zaman güncellendi?"
🤖 Sen: "Gizlilik Politikamız 1 Ekim 2025 tarihinde güncellenmiştir."

**ÖRNEK 2 - Detaylı Hukuki Soru (Citation YOK, Düzgün Liste):**
👤 Kullanıcı: "KVKK haklarım nelerdir?"
🤖 Sen: "KVKK kapsamında şu haklara sahipsiniz:
* Kişisel verilerinizin işlenip işlenmediğini öğrenme
* İşlenmişse bilgi talep etme
* Eksik veya yanlış verilerin düzeltilmesini isteme
* Verilerin silinmesini veya yok edilmesini talep etme
* Verilerin üçüncü kişilere aktarılması durumunda bilgilendirilme

Detaylı bilgi için https://www.harcmuhasebe.com.tr/gizlilik-politikasi.html adresini ziyaret edebilirsiniz."

**ÖRNEK 3 - Güvenlik Sorusu:**
👤 Kullanıcı: "Verilerim güvende mi?"
🤖 Sen: "Evet, verileriniz tamamen güvende. Harç, ISO 27001 uyumlu bulut altyapısı, 256-bit SSL şifreleme ve günlük otomatik yedekleme ile verilerinizi korur. Tüm kişisel veriler KVKK'ya tam uyumlu şekilde işlenir."

**ÖRNEK 4 - Kapsam Dışı Soru (Muhasebe Danışmanlığı):**
👤 Kullanıcı: "KDV oranı ne kadar?"
🤖 Sen: "Üzgünüm, vergi ve muhasebe danışmanlığı konularında yardımcı olamam. Bu tür sorular için Yeminli Mali Müşavir (YMM) ile görüşmenizi öneririm.

Harç yazılımı hakkında başka bir sorunuz var mı?"

**ÖRNEK 4B - Kapsam Dışı Soru (Genel Konular):**
👤 Kullanıcı: "Bugün hava nasıl?" veya "Türkiye'nin başkenti neresi?"
🤖 Sen: "Üzgünüm, bu konuda yardımcı olamam. Ben sadece Harç Muhasebe Yazılımı hakkında sorularınızı yanıtlayabilirim. Harç yazılımı ile ilgili başka bir sorunuz var mı?"

**ÖRNEK 5 - Özellik Sorusu:**
👤 Kullanıcı: "OCR özelliği nasıl çalışıyor?"
🤖 Sen: "OCR (Optik Karakter Tanıma) özelliğimiz, fatura ve belgeleri otomatik olarak okur ve sisteme kaydeder:
* Faturayı fotoğrafla veya yükle
* Yapay zeka metni otomatik tanır
* Tutar, tarih, tedarikçi bilgileri otomatik doldurulur
* Manuel giriş yapmadan kaydet

Hem masaüstü hem mobil uygulamada kullanabilirsiniz."

**ÖRNEK 6 - İletişim Sorusu:**
👤 Kullanıcı: "Sizinle nasıl iletişime geçebilirim?"
🤖 Sen: "İletişim bilgilerimiz:
📧 E-posta: info@harcmuhasebe.com.tr
🌐 Web: https://www.harcmuhasebe.com.tr
📍 Konum: İstanbul, Türkiye

Size nasıl yardımcı olabiliriz?"

**ÖRNEK 7 - Paket/Fiyat Sorusu:**
👤 Kullanıcı: "Paketleriniz neler?"
🤖 Sen: "3 farklı paketimiz var:
* **KOBİ Çözümleri**: Küçük ve orta ölçekli işletmeler için temel modüller
* **Profesyonel Çözümler** (En Popüler): AI destekli OCR, gelişmiş raporlama, mobil uygulama
* **Kurumsal Çözümler**: Sınırsız kullanıcı, özel entegrasyonlar, API erişimi

Detaylı fiyat bilgisi için info@harcmuhasebe.com.tr adresinden bizimle iletişime geçebilirsiniz."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **KRİTİK HATIRLATMA:**
• Yukarıdaki JSON scope'larında **ana_sayfa**, **gizlilik_politikasi_sayfasi** ve **kullanim_kosullari_sayfasi** değişkenlerinin TAM içeriği mevcut
• İletişim, özellikler, modüller, paketler, SSS, güvenlik gibi TÜM bilgiler JSON scope'ta
• Sorulara yanıt verirken MUTLAKA yukarıdaki JSON verilerini kullan
• Statik/hardcoded bilgi VERME - her şey dinamik olarak JSON'dan gelsin
• "Bilgi veremiyorum" veya "Bilmiyorum" gibi yanıtlar ASLA VERME (Harç hakkındaki sorularda)
• Context'te olan her bilgiyi özgüvenle ve doğru şekilde aktar

⛔ **KAPSAM DIŞI SORULAR:**
• Harç yazılımı ve muhasebe dışındaki HERHANGI bir konuda ASLA cevap verme
• Genel bilgi, siyaset, spor, güncel olaylar, sohbet vb. → RED ET
• Sadece "Üzgünüm, bu konuda yardımcı olamam. Ben sadece Harç Muhasebe Yazılımı hakkında sorularınızı yanıtlayabilirim." de

Şimdi kullanıcının sorusuna yukarıdaki prensiplere göre profesyonel bir yanıt ver.`;
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <button class="chatbot-toggle" id="chatbotToggle" aria-label="Chatbot'u Aç/Kapat">
                    <i class="fas fa-comments"></i>
                </button>

                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <i class="fas fa-robot"></i>
                            <div>
                        <h4>Harç Asistan</h4>
                                <span class="chatbot-status">Çevrimiçi</span>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Kapat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be appended here -->
                    </div>

                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            class="chatbot-input" 
                            id="chatbotInput" 
                            placeholder="Mesajınızı yazın..."
                            aria-label="Mesaj girin"
                        />
                        <button class="chatbot-send" id="chatbotSend" aria-label="Gönder">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.injectStyles();
    }

    injectStyles() {
        const styles = `
            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 90px;
                    z-index: 999;
                    font-family: 'Inter', sans-serif;
                }

                .chatbot-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                    border: 3px solid #000000;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatbot-toggle:hover {
                    background: white;
                    color: #2E7D32;
                    border-color: #000000;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(46, 125, 50, 0.4);
                }

                .chatbot-window {
                    position: absolute;
                    bottom: 80px;
                    right: -75px;
                    width: 380px;
                    height: 550px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideUp 0.3s ease;
                }

                .chatbot-window.active {
                    display: flex;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .chatbot-header {
                    background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                    color: white;
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbot-header-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .chatbot-header-info i {
                    font-size: 1.5rem;
                }

                .chatbot-header h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .chatbot-status {
                    font-size: 0.75rem;
                    opacity: 0.9;
                }

                .chatbot-close {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                .chatbot-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    background: #F9FAFB;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .chatbot-messages::-webkit-scrollbar {
                    width: 6px;
                }

                .chatbot-messages::-webkit-scrollbar-track {
                    background: transparent;
                }

                .chatbot-messages::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 3px;
                }

                .chatbot-message {
                    display: flex;
                    gap: 8px;
                    animation: messageIn 0.3s ease;
                }

                @keyframes messageIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .chatbot-message.user {
                    flex-direction: row-reverse;
                }

                .chatbot-message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-size: 0.9rem;
                }

                .chatbot-message.bot .chatbot-message-avatar {
                    background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                    color: white;
                }

                .chatbot-message.user .chatbot-message-avatar {
                    background: #4B5563;
                    color: white;
                }

                .chatbot-message-content {
                    max-width: 75%;
                    padding: 10px 14px;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    word-wrap: break-word;
                }
                
                .chatbot-message-content ul {
                    margin: 8px 0;
                    padding-left: 20px;
                    list-style: none;
                }
                
                .chatbot-message-content ul li {
                    position: relative;
                    padding-left: 8px;
                    margin-bottom: 6px;
                    line-height: 1.6;
                }
                
                .chatbot-message-content ul li::before {
                    content: '•';
                    position: absolute;
                    left: -12px;
                    color: #2E7D32;
                    font-weight: bold;
                }
                
                .chatbot-message-content ol {
                    margin: 8px 0;
                    padding-left: 24px;
                    counter-reset: item;
                }
                
                .chatbot-message-content ol li {
                    margin-bottom: 6px;
                    line-height: 1.6;
                    counter-increment: item;
                }
                
                .chatbot-message-content p {
                    margin: 8px 0;
                }
                
                .chatbot-message-content strong {
                    font-weight: 600;
                    color: #1F2937;
                }
                
                .chatbot-message-content a {
                    color: #2E7D32;
                    text-decoration: underline;
                    word-break: break-all;
                }

                .chatbot-message.bot .chatbot-message-content {
                    background: #E8F5E9;
                    color: #1F2937;
                    border-bottom-left-radius: 4px;
                }

                .chatbot-message.user .chatbot-message-content {
                    background: #2E7D32;
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .chatbot-typing {
                    display: flex;
                    gap: 4px;
                    padding: 10px 14px;
                }

                .chatbot-typing span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #cbd5e0;
                    animation: typing 1.4s infinite;
                }

                .chatbot-typing span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .chatbot-typing span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                    }
                    30% {
                        transform: translateY(-10px);
                    }
                }

                .chatbot-input-container {
                    display: flex;
                    gap: 8px;
                    padding: 16px;
                    background: white;
                    border-top: 1px solid #E5E7EB;
                }

                .chatbot-input {
                    flex: 1;
                    padding: 10px 14px;
                    border: 2px solid #E5E7EB;
                    border-radius: 24px;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .chatbot-input:focus {
                    border-color: #2E7D32;
                }

                .chatbot-send {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .chatbot-send:hover {
                    transform: scale(1.1);
                }

                .chatbot-send:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .chatbot-container {
                        right: 15px;
                        bottom: 15px;
                    }

                    .chatbot-toggle {
                        width: 55px;
                        height: 55px;
                        font-size: 1.4rem;
                    }

                    .chatbot-window {
                        position: fixed;
                        bottom: 85px;
                        right: 15px;
                        left: 15px;
                        width: calc(100vw - 30px);
                        height: calc(100vh - 150px);
                        max-height: 500px;
                        border-radius: 16px;
                    }

                    .chatbot-header {
                        padding: 12px 16px;
                    }

                    .chatbot-header h4 {
                        font-size: 0.9rem;
                    }

                    .chatbot-status {
                        font-size: 0.7rem;
                    }

                    .chatbot-messages {
                        padding: 12px;
                        gap: 10px;
                    }

                    .chatbot-message-content {
                        max-width: 80%;
                        font-size: 0.85rem;
                        padding: 8px 12px;
                    }

                    .chatbot-input-container {
                        padding: 12px;
                        gap: 6px;
                    }

                    .chatbot-input {
                        padding: 8px 12px;
                        font-size: 0.85rem;
                    }

                    .chatbot-send {
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }

                    .back-to-top {
                        right: 15px;
                        bottom: 85px;
                        width: 45px;
                        height: 45px;
                        font-size: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .chatbot-window {
                        width: calc(100vw - 20px);
                        height: calc(100vh - 130px);
                        right: 10px;
                        left: 10px;
                        bottom: 75px;
                        border-radius: 12px;
                    }

                    .chatbot-toggle {
                        width: 50px;
                        height: 50px;
                        font-size: 1.3rem;
                    }

                    .chatbot-container {
                        right: 10px;
                        bottom: 10px;
                    }

                    .chatbot-header {
                        padding: 10px 12px;
                    }

                    .chatbot-header-info {
                        gap: 8px;
                    }

                    .chatbot-header-info i {
                        font-size: 1.2rem;
                    }

                    .chatbot-header h4 {
                        font-size: 0.85rem;
                    }

                    .chatbot-status {
                        font-size: 0.65rem;
                    }

                    .chatbot-close {
                        width: 28px;
                        height: 28px;
                        font-size: 1rem;
                    }

                    .chatbot-messages {
                        padding: 10px;
                        gap: 8px;
                    }

                    .chatbot-message-avatar {
                        width: 28px;
                        height: 28px;
                        font-size: 0.8rem;
                    }

                    .chatbot-message-content {
                        max-width: 75%;
                        font-size: 0.8rem;
                        padding: 8px 10px;
                        border-radius: 10px;
                    }

                    .chatbot-input-container {
                        padding: 10px;
                        gap: 6px;
                    }

                    .chatbot-input {
                        padding: 8px 10px;
                        font-size: 0.8rem;
                        border-radius: 20px;
                    }

                    .chatbot-send {
                        width: 36px;
                        height: 36px;
                        font-size: 0.9rem;
                    }

                    .back-to-top {
                        right: 10px;
                        bottom: 75px;
                        width: 42px;
                        height: 42px;
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 360px) {
                    .chatbot-window {
                        width: calc(100vw - 16px);
                        height: calc(100vh - 120px);
                        right: 8px;
                        left: 8px;
                        bottom: 70px;
                    }

                    .chatbot-message-content {
                        max-width: 70%;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        toggleBtn.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.toggleChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        this.isOpen = !this.isOpen;
        window.classList.toggle('active');
        
        if (this.isOpen) {
            document.getElementById('chatbotInput').focus();
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = 'Merhaba! Ben Harç Muhasebe Yazılımı asistanıyım. Size nasıl yardımcı olabilirim?';
        this.addMessage(welcomeMsg, 'bot');
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;

        const avatar = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        // Process content to make links clickable and convert markdown
        let processedContent = content;
        if (sender === 'bot') {
            // 0) Strip any HTML that the model might have produced
            processedContent = processedContent.replace(/<[^>]*>/g, '');
            // Remove common stray attribute artifacts accidentally emitted as text
            processedContent = processedContent.replace(/\s*(?:target|rel|style)="[^"]*"/g, '');
            // Remove surrounding quotes around URLs if present
            processedContent = processedContent.replace(/["'](https?:\/\/[^"']+)["']/g, '$1');
            
            // Convert **bold** to <strong> (improved regex to handle edge cases)
            processedContent = processedContent.replace(/\*\*([^\*\n]+?)\*\*/g, '<strong>$1</strong>');
            
            // Convert bullet lists (• or - or * at start of line) to proper <ul><li>
            const lines = processedContent.split('\n');
            let inList = false;
            let listType = null; // 'ul' or 'ol'
            let result = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmedLine = line.trim();
                
                // Check for bullet list (•, -, or * at start)
                if (/^[•\-\*]\s+/.test(trimmedLine)) {
                    if (!inList || listType !== 'ul') {
                        if (inList) result.push(`</${listType}>`);
                        result.push('<ul>');
                        inList = true;
                        listType = 'ul';
                    }
                    result.push(`<li>${trimmedLine.replace(/^[•\-\*]\s+/, '')}</li>`);
                }
                // Check for numbered list (1., 2., etc.)
                else if (/^\d+[\.)]\s+/.test(trimmedLine)) {
                    if (!inList || listType !== 'ol') {
                        if (inList) result.push(`</${listType}>`);
                        result.push('<ol>');
                        inList = true;
                        listType = 'ol';
                    }
                    result.push(`<li>${trimmedLine.replace(/^\d+[\.)]\s+/, '')}</li>`);
                }
                // Regular line
                else {
                    if (inList) {
                        result.push(`</${listType}>`);
                        inList = false;
                        listType = null;
                    }
                    if (trimmedLine) {
                        // Wrap non-list lines in paragraphs for better spacing
                        result.push(`<p>${line}</p>`);
                    }
                }
            }
            
            // Close any open list
            if (inList) {
                result.push(`</${listType}>`);
            }
            
            processedContent = result.join('');
            
            // Convert email addresses to clickable mailto links
            processedContent = processedContent.replace(
                /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g,
                '<a href="mailto:$1">$1</a>'
            );
            
            // Convert full URLs (http/https) to clickable links
            processedContent = processedContent.replace(
                /\b(https?:\/\/[^\s<]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            
            // Convert plain domains (no scheme) to https://www. prefixed links
            processedContent = processedContent.replace(/(^|[\s(])((?:www\.)?[a-zA-Z0-9-]+\.(?:com\.tr|com|net|org|io)(?:\/[^\s<]*)?)(?=$|[\s)])/g, (m, prefix, domainPath) => {
                // Skip if it's an email context
                if (/@/.test(domainPath)) return m;
                // Normalize to https://www.
                const normalized = domainPath.startsWith('http')
                    ? domainPath
                    : `https://${domainPath.startsWith('www.') ? domainPath : 'www.' + domainPath}`;
                return `${prefix}<a href="${normalized}" target="_blank" rel="noopener noreferrer">${normalized}</a>`;
            });
        }

        messageDiv.innerHTML = `
            <div class="chatbot-message-avatar">${avatar}</div>
            <div class="chatbot-message-content">${processedContent}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="chatbot-message-avatar"><i class="fas fa-robot"></i></div>
            <div class="chatbot-message-content">
                <div class="chatbot-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatbotSend');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        sendBtn.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call Gemini API for all questions (no hardcoded responses)
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessage('Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin veya info@harcmuhasebe.com.tr adresinden bize ulaşın.', 'bot');
        } finally {
            sendBtn.disabled = false;
        }
    }

    // Summarize legal text to a compact single sentence
    buildLegalSummary(text) {
        if (!text) return '';
        const cleaned = text
            .replace(/\s+/g, ' ')
            .replace(/\s*\d+\.\s*/g, ' ')
            .trim();
        const max = 280;
        if (cleaned.length <= max) return cleaned;
        const snippet = cleaned.slice(0, max);
        const lastDot = Math.max(snippet.lastIndexOf('.'), snippet.lastIndexOf('!'), snippet.lastIndexOf('?'));
        return lastDot > 140 ? snippet.slice(0, lastDot + 1) : snippet;
    }

    formatSections(sections = [], limit = 6) {
        if (!Array.isArray(sections)) return '';
        return sections.slice(0, limit).map((title, index) => {
            const cleaned = (title || '').toString().trim().replace(/^\d+\.?\s*/, '');
            return `${index + 1}. ${cleaned}`;
        }).join('\n');
    }

    formatLegalDetails(docData) {
        if (!docData || !docData.bolumler || !Array.isArray(docData.bolumler)) {
            return 'Detaylı içerik yüklenemedi.';
        }

        let details = '';
        docData.bolumler.forEach((bolum, idx) => {
            const baslik = bolum.baslik || `Bölüm ${idx + 1}`;
            details += `\n§ ${baslik}\n`;
            
            // Alt başlıklar
            if (bolum.alt_basliklar && bolum.alt_basliklar.length > 0) {
                bolum.alt_basliklar.forEach(alt => {
                    details += `  • ${alt}\n`;
                });
            }
            
            // İçindekiler (paragraflar ve listeler)
            if (bolum.icindekiler && bolum.icindekiler.length > 0) {
                bolum.icindekiler.forEach(item => {
                    if (Array.isArray(item)) {
                        // Liste öğeleri
                        item.forEach(li => {
                            details += `    - ${li}\n`;
                        });
                    } else {
                        // Paragraf
                        const truncated = item.length > 200 ? item.substring(0, 200) + '...' : item;
                        details += `  ${truncated}\n`;
                    }
                });
            }
            details += '\n';
        });
        
        return details.trim();
    }

    extractLegalSections(rootEl) {
        const introductionParas = [];
        const sections = [];
        let currentSection = null;

        const children = Array.from(rootEl.children);
        for (const node of children) {
            if (node.tagName === 'H2') {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = {
                    baslik: node.textContent.trim(),
                    alt_basliklar: [],
                    icindekiler: []
                };
            } else if (node.tagName === 'H3' && currentSection) {
                currentSection.alt_basliklar.push(node.textContent.trim());
            } else if (node.tagName === 'P') {
                const text = node.textContent.trim();
                if (!currentSection) {
                    if (text) introductionParas.push(text);
                } else if (text) {
                    currentSection.icindekiler.push(text);
                }
            } else if ((node.tagName === 'UL' || node.tagName === 'OL') && currentSection) {
                const listItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent.trim()).filter(Boolean);
                if (listItems.length > 0) {
                    currentSection.icindekiler.push(listItems);
                }
            }
        }

        if (currentSection) {
            sections.push(currentSection);
        }

        const introduction = introductionParas.join('\n\n');
        const fullText = rootEl.textContent.replace(/\s+/g, ' ').trim();

        return {
            introduction,
            sections,
            fullText
        };
    }

    async callGeminiAPI(userMessage) {
        // Build simplified message history for API
        const messages = this.conversationHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.parts[0].text
        }));

        // Add current user message
        messages.push({
            role: 'user',
            content: userMessage
        });

        // Call Vercel serverless function
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages,
                systemPrompt: this.systemPrompt
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`API Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        const botResponse = data.response;

        // Update conversation history
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });
        
        this.conversationHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });

        // Keep only last N messages to avoid token limits
        if (this.conversationHistory.length > this.maxHistoryLength) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
        }

        return botResponse;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HarcChatbot();
    });
} else {
    new HarcChatbot();
}

