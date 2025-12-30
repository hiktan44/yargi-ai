# Truth Re:Build AI Uygulaması Yapı Analizi

## Proje Genel Bilgileri

**Uygulama Adı**: Truth Re:Build AI  
**Teknoloji Stack**: React 18 + TypeScript + Vite + Tailwind CSS  
**Proje Türü**: AI-powered hukuki asistan platformu  
**Ana Özellikler**: TTS (Text-to-Speech), hukuki dava arama, tanık analizi, zaman çizelgesi analizi

## Dosya Yapısı Analizi

### Ana Dizin Yapısı
```
truth-rebuild-ai-enhanced/
├── src/
│   ├── components/          # UI bileşenleri
│   ├── data/               # Mock veri dosyaları
│   ├── hooks/              # React hooks
│   ├── lib/                # Utilitiler
│   ├── services/           # API ve servisler
│   └── types/              # TypeScript tipler
├── public/                 # Statik dosyalar
├── dist/                   # Build çıktısı
└── config dosyaları       # Vite, TypeScript, ESLint vb.
```

### Kritik Dosyalar

#### 1. **package.json**
- **Durum**: İngilizce değil, sadece teknik bilgiler
- **Değişiklik Gereksinimi**: Yok (teknik metadata)

#### 2. **index.html**
- **Durum**: Minimal, dil ayarı "en" olarak ayarlı
- **Değişiklik Gereksinimi**: `lang="tr"` olarak değiştirilmeli

#### 3. **Vite Config (vite.config.ts)**
- **Durum**: Teknik konfigürasyon
- **Değişiklik Gereksinimi**: Yok (teknik ayarlar)

#### 4. **Tailwind Config (tailwind.config.js)**
- **Durum**: Renk şeması ve tema ayarları
- **Değişiklik Gereksinimi**: Yok (CSS konfigürasyonu)

## Türkçe Çeviri Gereken Dosyalar

### 1. Ana Uygulama Dosyaları (YÜKSEK ÖNCELİK)

#### **src/App.tsx**
- **İçerik**: Ana layout, header, navigation, footer
- **Çevrilmesi Gereken Metinler**:
  - "Truth Re:Build AI" → "Truth Re:Build AI" (marka adı korunabilir)
  - "AI-Powered Legal Assistant" → "Yapay Zeka Destekli Hukuk Asistanı"
  - "Search", "Chat", "Analysis", "Upload", "About" → "Ara", "Sohbet", "Analiz", "Yükle", "Hakkında"
  - "Demo User" → "Demo Kullanıcı"
  - "Logout" → "Çıkış Yap"
  - "Developed by" → "Geliştirici"
  - "Enhanced Audio & Verified Legal Sources" → "Gelişmiş Ses ve Doğrulanmış Hukuki Kaynaklar"
  - "Educational Demo Only" → "Sadece Eğitim Amaçlı Demo"
  - "All case data from verified public domain sources" → "Tüm dava verileri doğrulanmış kamu kaynaklarından"
  - "Not legal advice" → "Hukuki tavsiye değildir"

### 2. Bileşen Dosyaları (YÜKSEK ÖNCELİK)

#### **src/components/SearchTab.tsx**
- **İçerik**: Hukuki dava arama arayüzü
- **Çevrilmesi Gereken Metinler**:
  - "Legal Precedent Search" → "Hukuki Precedent Arama"
  - "AI-powered search through verified public domain legal databases" → "Doğrulanmış kamu hukuki veritabanlarında AI destekli arama"
  - "Audio On/Off" → "Ses Açık/Kapalı"
  - "Search legal cases, precedents, or key terms..." → "Hukuki davalar, precedensler veya anahtar terimler ara..."
  - "Search" → "Ara"
  - "Searching..." → "Aranıyor..."
  - "Quick Search Examples" → "Hızlı Arama Örnekleri"
  - "Verified Legal Sources" → "Doğrulanmış Hukuki Kaynaklar"
  - "All legal data is sourced from verified public domain databases:" → "Tüm hukuki veriler doğrulanmış kamu veritabanlarından alınmıştır:"
  - "Search Results" → "Arama Sonuçları"
  - "Filter by relevance" → "İlgiliye göre filtrele"
  - "Similarity" → "Benzerlik"
  - "Key Factors" → "Temel Faktörler"
  - "Outcome" → "Sonuç"
  - "Relevance" → "İlgi"
  - "Source" → "Kaynak"
  - "No cases found" → "Dava bulunamadı"
  - "Try different search terms or browse our examples" → "Farklı arama terimleri deneyin veya örneklerimizi inceleyin"

#### **src/components/ChatTab.tsx**
- **İçerik**: AI sohbet arayüzü
- **Çevrilmesi Gereken Metinler**:
  - "Welcome to Truth Re:Build AI Legal Assistant!" → "Truth Re:Build AI Hukuki Asistanına Hoş Geldiniz!"
  - "I can help you analyze cases, identify legal issues..." → "Davaları analiz etmenize, hukuki sorunları belirlemenize yardımcı olabilirim..."
  - "How can I assist you today?" → "Size bugün nasıl yardımcı olabilirim?"
  - "AI Legal Assistant" → "AI Hukuki Asistanı"
  - "Conversational case analysis and legal consultation" → "Konuşmalı dava analizi ve hukuki danışmanlık"
  - "Audio" → "Ses"
  - "Clear" → "Temizle"
  - "AI is thinking..." → "AI düşünüyor..."
  - "Example Case Scenarios" → "Örnek Dava Senaryoları"
  - "Describe your legal case or question..." → "Hukuki davanızı veya sorunuzu açıklayın..."

#### **src/components/AnalysisTab.tsx**
- **İçerik**: Kapsamlı dava analiz araçları
- **Çevrilmesi Gereken Metinler**:
  - "Case Analysis & Reconstruction" → "Dava Analizi ve Yeniden İnşası"
  - "Comprehensive multi-dimensional case analysis tools with audio narration" → "Ses anlatımı ile kapsamlı çok boyutlu dava analiz araçları"
  - "Stop Audio" → "Sesi Durdur"
  - "Playing Audio..." → "Ses Çalınıyor..."
  - "Legal Precedents" → "Hukuki Precedentler"
  - "Play Analysis" → "Analizi Çal"
  - "Match" → "Eşleşme"
  - "Witness Analysis" → "Tanık Analizi"
  - "Credibility" → "Güvenilirlik"
  - "Inconsistencies" → "Tutarsızlıklar"
  - "Key Points" → "Temel Noktalar"
  - "Event Timeline" → "Olay Zaman Çizelgesi"
  - "Scenario Analysis & Court Simulation" → "Senaryo Analizi ve Mahkeme Simülasyonu"
  - "Full Court Simulation" → "Tam Mahkeme Simülasyonu"
  - "Probability" → "Olasılık"
  - "Predicted Outcome" → "Tahmin Edilen Sonuç"
  - "Court Role Voice Demonstration" → "Mahkeme Rolü Ses Demo"

#### **src/components/UploadTab.tsx**
- **İçerik**: Dosya yükleme arayüzü
- **Çevrilmesi Gereken Metinler**:
  - "Evidence Image Recognition" → "Kanıt Görüntü Tanıma"
  - "GeoSpy-like location analysis and forensic image examination" → "GeoSpy benzeri konum analizi ve adli görüntü incelemesi"
  - "Upload Feature Coming Soon" → "Yükleme Özelliği Yakında Geliyor"
  - "Enhanced image analysis with audio narration will be available in the next update" → "Ses anlatımı ile gelişmiş görüntü analizi bir sonraki güncellemede mevcut olacak"

#### **src/components/AboutTab.tsx**
- **İçerik**: Uygulama hakkında bilgiler
- **Çevrilmesi Gereken Metinler**:
  - "AI-Powered Legal Assistant Platform" → "Yapay Zeka Destekli Hukuki Asistan Platformu"
  - "Our Mission" → "Misyonumuz"
  - "Truth Re:Build AI revolutionizes legal research..." → "Truth Re:Build AI hukuki araştırmaları..."
  - "Rebuild Truth" → "Gerçeği Yeniden İnşa Et"
  - "Detect Inconsistencies" → "Tutarsızlıkları Tespit Et"
  - "Strategic Insights" → "Stratejik İçgörüler"
  - "Enhanced Features" → "Gelişmiş Özellikler"
  - "Audio Functionality" → "Ses Fonksiyonalitesi"
  - "Browser Text-to-Speech" → "Tarayıcı Metinden Sese"
  - "Court Audio Scripts" → "Mahkeme Ses Betikleri"
  - "Core Capabilities" → "Temel Yetenekler"
  - "Legal Precedent Search" → "Hukuki Precedent Arama"
  - "Conversational AI Assistant" → "Konuşmalı AI Asistan"
  - "Verified Legal Sources" → "Doğrulanmış Hukuki Kaynaklar"
  - "All legal data is sourced exclusively from verified public domain databases" → "Tüm hukuki veriler özellikle doğrulanmış kamu veritabanlarından alınmaktadır"
  - "Educational Use Only" → "Sadece Eğitim Amaçlı Kullanım"
  - "Not Legal Advice" → "Hukuki Tavsiye Değildir"

### 3. Veri Dosyaları (ORTA ÖNCELİK)

#### **src/data/legalCases.ts**
- **İçerik**: Mock hukuki dava verileri
- **Çevrilmesi Gereken Metinler**: Tüm dava başlıkları, açıklamaları, mahkeme isimleri ve hukuki terimler
- **Örnekler**:
  - "Anonymous v. Mountain Trail Authority" → "Anonim v. Dağ Patika Otoritesi"
  - "Hong Kong District Court" → "Hong Kong Bölge Mahkemesi"
  - "Trail safety negligence" → "Patika güvenlik ihmali"
  - "Defendant found liable for negligence" → "Sanığın ihmalden sorumlu bulunduğu"

#### **src/data/mockCourtAudio.ts** (varsa)
- **İçerik**: Mahkeme ses betikleri
- **Çevrilmesi Gereken Metinler**: Tüm diyalog ve yasal metinler

### 4. Servis ve Tip Dosyaları (DÜŞÜK ÖNCELİK)

#### **src/services/audioService.ts**
- **İçerik**: Ses servisleri
- **Değişiklik Gereksinimi**: Minimal (hata mesajları varsa çevrilmeli)

#### **src/types/index.ts**
- **İçerik**: TypeScript tip tanımları
- **Değişiklik Gereksinimi**: Yorumlar ve string literal tipler

## Çeviri Stratejisi

### 1. **Hukuki Terminoloji**
- Hukuki terimlerde tutarlılık sağlanmalı
- Türk hukuk sistemine uygun terminoloji kullanılmalı
- İngilizce-terim parantez içinde verilebilir

### 2. **TTS (Text-to-Speech) Uyumluluğu**
- Ses sistemi Türkçe karakterlerle uyumlu olmalı
- Ses kalitesi Türkçe için optimize edilmeli

### 3. **Kullanıcı Deneyimi**
- Türkçe RTL (right-to-left) desteği gerekli değil
- Font seçimi Türkçe karakterler için uygun olmalı
- UI boyutları Türkçe metinler için ayarlanmalı

## Önerilen Çeviri Sırası

1. **Phase 1**: App.tsx ve ana navigation
2. **Phase 2**: SearchTab ve ChatTab (en çok kullanılan)
3. **Phase 3**: AnalysisTab (detaylı)
4. **Phase 4**: AboutTab ve UploadTab
5. **Phase 5**: Data dosyaları ve servisler

## Teknik Gereksinimler

- Türkçe locale desteği
- Türkçe TTS seslerinin kontrol edilmesi
- UI elemanlarının Türkçe metin boyutlarına uygunluğu
- Hukuki terimlerin doğruluğunun kontrolü

## Test Edilmesi Gerekenler

1. Tüm metinlerin görüntülenmesi
2. TTS sisteminin Türkçe metinleri doğru okuması
3. Responsive tasarımın Türkçe metinlerle çalışması
4. Hukuki terimlerin doğruluğu

---

**Son Güncelleme**: 2025-11-04  
**Analiz Eden**: MiniMax Agent  
**Durum**: İnceleme Tamamlandı