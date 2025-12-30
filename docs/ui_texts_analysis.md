# React UI Metinleri Hukuki Çeviri ve Yerelleştirme Analizi (Truth Re:Build AI)

## Yönetici Özeti ve Amaç

Bu rapor, Truth Re:Build AI uygulamasının kullanıcı arayüzünde (UI) yer alan İngilizce metinlerin kapsamlı bir envanterini çıkararak, Türkçe karşılıklarını hukuki terminoloji ilkelerine uygun biçimde önermek amacıyla hazırlanmıştır. Çalışma kapsamı, uygulamanın tüm katmanlarındaki metinlerden örneklerle birlikte sistematik bir liste sunulması, kritik terimler için gerekçeli çeviri kararları ve yerelleştirme ilkelerinin ortaya konması, ayrıca ayrıntılı bir sözlük ve uygulanabilir bir eşleme tablosu ile desteklenmiştir. Çıktının nihai hedefi, geliştirici ve yerelleştirme ekiplerinin doğrudan tüketebileceği operasyonel bir belge oluşturmaktır.

Rapor, bileşen bazında envanter ve çeviri önerilerini, hukuki doğrulama ilkelerini, genel terminoloji sözlüğünü, sürümleme ve teslim planını ve ekleri bir araya getirir. Dil ve hukuk terminolojisi açısından tutarlı, anlaşılır ve bağlama duyarlı bir Türkçe kullanım öncelenmiştir. Yargı alanına özgü terimlerde Türkçe karşılıklar, T.C. Dışişleri Bakanlığı Tercüme Dairesi Başkanlığı’nın hukuk terminolojisi kılavuzları ve temel kavram sözlükleri gibi güvenilir referanslarla ilişkilendirilmiştir[^1][^2].

### Hedefler ve Kapsam

Bu çalışmanın temel hedefleri şunlardır:
- Tüm UI metinlerinin eksiksiz envanterini çıkarma ve kritik noktaları işaretleme.
- Metinlerin bağlama göre anlamlandırılması; buton, başlık, açıklama, durum mesajları gibi sınıflara göre çeviri yaklaşımı belirleme.
- Özellikle hukuki terimlerde Türkiye’de kullanılan terminolojiye uyumlu karşılıklar üretme ve gerekçelendirme.

Kapsam, App.tsx ve Tab bileşenlerindeki (SearchTab, ChatTab, AnalysisTab, UploadTab, AboutTab) tüm görünür metinleri kapsar. Hedef kullanıcı, geliştiriciler ve yerelleştirme uzmanlarıdır; hukuki danışmanlar için bağlam doğrulama önerileri ve ek kaynaklara yönlendirmeler sağlanır.

## Yöntem ve Kaynaklar

Metinlerin toplanması kod düzeyinde, bileşen ve alt metin sınıflarına göre gerçekleştirilmiştir. Başlıklar, alt başlıklar, buton metinleri, yer tutucu (placeholder) ifadeler, durum/gösterge metinleri ve yardım metinleri her bileşen için ayrı alt başlıklarda listelenmiş; kritik terimler tek tek ele alınmıştır.

Çeviri ilkeleri bağlam temelli yaklaşımı benimser. Türkçe kullanımı doğal ve sade tutarken, hukuki kavramların Türkiye’de yerleşik terminolojisine bağlı kalınır. “Legal precedent” gibi kavramlar için doğrudan “içtihat” karşılığı tercih edilmiştir; yargı alanındaki kurumsal terimlerde yerleşik kullanım korunur[^1][^4].

Kalite güvencesi, iki aşamalı gözden geçirme ile sağlanır: terminolojik doğruluk ve bağlamsal uygunluk. Hukuki danışman görüşü alınması önerilir. Değişiklikler sürüm notlarına işlenir.

### Hukuki Terminoloji İlkeleri

Çeviride tutarlılık esastır. Yerleşik karşılıkları bulunan terimler için Türkçe kullanım tercih edilir; açıklama gereken yerlerde dipnot benzeri kısa notlar eklenir. İçtihat (legal precedent) gibi merkezi terimlerde, Türkiye’deki terminolojiye uyum zorunludur[^1][^2][^3].

### Bağlam ve Metin Sınıfları

Aşağıdaki sınıflandırma, çeviri yaklaşımını belirlemek için kullanılmıştır:

- Başlıklar ve navigasyon etiketleri: Kısa, doğal, kullanıcıyı yönlendirici.
- Butonlar ve eylemler: Emir kipinde anlaşılır; durum bildirimleri net.
- Durum/gösterge metinleri: Yükleme ve arama gibi geçici durumlar için kısa ve tekil ifadeler.
- Yardım ve açıklama metinleri: Bilgilendirici, yönlendirici; gerektiğinde hukuki uyarılarla uyumlu.

## Bileşen Bazında UI Metin Envanteri ve Çeviri Önerileri

Bu bölümde, App.tsx ve Tab bileşenlerindeki görünür metinler sınıflandırılarak Türkçe karşılıkları önerilir. Kritik terimler için gerekçeler eklenmiştir.

### App.tsx

Aşağıdaki envanter ve öneriler, uygulama çerçevesi ve global etiketler için temel bir çeviri setini sunar.

Tablo 1. App.tsx UI metinleri envanteri ve çeviri önerileri

| Metin (EN)                                   | Türkçe Karşılık                          | Notlar |
|----------------------------------------------|------------------------------------------|--------|
| Truth Re:Build AI                            | Truth Re:Build AI                        | Ürün adı; çevrilmez. |
| AI-Powered Legal Assistant                   | Yapay Zekâ Destekli Hukuk Asistanı       | Doğal ve teknik terimlere duyarlı. |
| Demo User                                    | Demo Kullanıcı                           | Basit ve açık. |
| Logout                                       | Çıkış                                    | Standart UI terimi. |
| Search                                       | Arama                                    | Navigasyon ve etiket. |
| Chat                                         | Sohbet                                   | Navigasyon etiketi. |
| Analysis                                     | Analiz                                   | Navigasyon etiketi. |
| Upload                                       | Yükleme                                  | Navigasyon etiketi. |
| About                                        | Hakkında                                 | Navigasyon etiketi. |
| Developed by MiniMax Agent                   | Geliştiren: MiniMax Agent                 | Üretici adı; gerektiğinde korunur. |
| Enhanced Audio & Verified Legal Sources      | Geliştirilmiş Ses ve Doğrulan Hukuki Kaynaklar | Ürün özelliği tanımı. |
| Educational Demo Only                        | Yalnızca Eğitim Amaçlı Demodur           | Yasal uyarıyla uyumlu. |
| All case data from verified public domain sources. Not legal advice. | Tüm dava verileri doğrulanmış kamuya açık kaynaklardan alınmıştır. Hukuki tavsiye değildir. | Yasal sorumsuzluk metni; açık ve bağlayıcı dil. |

### SearchTab

Arama ve sonuç ekranı için kısa ve yönlendirici Türkçe karşılıklar önerilir.

Tablo 2. SearchTab metinleri ve çeviri önerileri

| Metin (EN)                                          | Türkçe Karşılık                                             | Notlar |
|-----------------------------------------------------|-------------------------------------------------------------|--------|
| Legal Precedent Search                               | İçtihat Araması                                              | “Precedent” için içtihat tercihi[^1][^2]. |
| AI-powered search through verified public domain legal databases | Doğrulanmış kamuya açık hukuki veritabanlarında yapay zekâ destekli arama | Sesli anlatım uyumu. |
| Audio On / Audio Off                                 | Ses Açık / Ses Kapalı                                       | Durum etiketleri. |
| Search legal cases, precedents, or key terms...      | Dava içtihatları, emsal kararlar veya anahtar terimler arayın... | Yer tutucu metin. |
| Searching... / Search                                | Aranıyor... / Ara                                            | Durum ve buton metni. |
| Quick Search Examples                                | Hızlı Arama Örnekleri                                        | Başlık. |
| Verified Legal Sources                               | Doğrulanmış Hukuki Kaynaklar                                 | Başlık. |
| All legal data is sourced from verified public domain databases: | Tüm hukuki veriler doğrulanmış kamuya açık veritabanlarından sağlanır: | Bilgilendirme. |
| Search Results (n)                                   | Arama Sonuçları (n)                                          | Sonuç başlığı. |
| Filter by relevance                                  | Önem derecesine göre filtrele                                | UI etiketi. |
| Similarity / Match                                   | Benzerlik / Eşleşme                                          | Skor etiketleri. |
| Key Factors:                                         | Ana Faktörler:                                               | Liste başlığı. |
| Outcome:                                             | Sonuç:                                                       | Bilgilendirme. |
| Relevance:                                           | Uygunluk:                                                    | Skor etiketi. |
| Source:                                              | Kaynak:                                                      | Bilgilendirme. |
| No cases found                                       | Sonuç bulunamadı                                             | Durum mesajı. |
| Try different search terms or browse our examples    | Farklı arama terimleri deneyin veya örneklerimze göz atın    | Yönlendirme. |
| Play audio summary / Stop audio                      | Sesli özeti çal / Sesi durdur                                | Eylem butonları. |

### ChatTab

Sohbet arayüzü için sade ve anlaşılır karşılıklar önerilmiştir.

Tablo 3. ChatTab metinleri ve çeviri önerileri

| Metin (EN)                                                     | Türkçe Karşılık                                            | Notlar |
|----------------------------------------------------------------|------------------------------------------------------------|--------|
| AI Legal Assistant                                             | Yapay Zekâ Hukuk Asistanı                                  | Ürün etiketi. |
| Conversational case analysis and legal consultation            | Söylevsel dava analizi ve hukuki danışmanlık               | Açıklayıcı. |
| Audio                                                          | Ses                                                         | Etiket. |
| Clear                                                          | Temizle                                                     | Eylem butonu. |
| Example Case Scenarios                                         | Örnek Dava Senaryoları                                      | Bölüm başlığı. |
| Analyze the {title}: {description}                             | {title} konusunu analiz et: {description}                   | Dinamik mesaj. |
| Describe your legal case or question...                        | Hukuki davanızı veya sorununuzu anlatın...                 | Yer tutucu. |
| AI is thinking...                                              | Yapay zekâ düşünüyor...                                     | Durum metni. |
| Welcome to Truth Re:Build AI Legal Assistant! ...             | Truth Re:Build AI Hukuk Asistanı’na hoş geldiniz! ...      | Karşılama metni. |
| I can help you analyze legal cases using AI-powered insights. ... | Hukuki davaları yapay zekâ destekli içgörülerle analiz etmenize yardımcı olabilirim. ... | Çok satırlı açıklama. |
| Based on the negligence case analysis, ...                     | İhmalkârlık (negligence) davası analizine göre, ...        | Hukuki bağlam[^8]. |
| Duty of Care / Breach of Standard / Causation / Damages       | Özen Yükümlülüğü / Standart İhlali / Nedensellik / Zararlar | Hukuki ilkeler. |
| Witness credibility analysis involves several critical factors: | Tanık güvenilirliği analizi birkaç kritik faktör içerir:    | Terminoloji uyumu[^5][^7]. |
| Consistency Assessment / Credibility Indicators                | Tutarlılık Değerlendirmesi / Güvenilirlik Göstergeleri      | Analiz alt başlıkları. |
| Case Precedent Analysis                                        | İçtihat Analizi                                             | “Precedent” = içtihat[^1][^2]. |
| Witness Credibility Assessment                                 | Tanık Güvenilirlik Değerlendirmesi                          | Sözlükteki karşılık[^5][^7]. |
| Timeline Reconstruction                                        | Zaman Çizelgesi Yeniden Oluşturma                            | Olay dizisinin yeniden kurulması. |
| Legal Strategy Development                                     | Hukuki Strateji Geliştirme                                   | Süreç odaklı. |
| All analysis is based on verified public domain legal sources. | Tüm analizler doğrulanmış kamuya açık hukuki kaynaklara dayanmaktadır. | Kaynak uyarısı. |

### AnalysisTab

Analiz bölümü için teknik ve yargı bağlamına uygun terminoloji kullanılmıştır.

Tablo 4. AnalysisTab metinleri ve çeviri önerileri

| Metin (EN)                                                   | Türkçe Karşılık                                                | Notlar |
|--------------------------------------------------------------|----------------------------------------------------------------|--------|
| Case Analysis & Reconstruction                               | Dava Analizi ve Yeniden Oluşturma                              | Üst başlık. |
| Comprehensive multi-dimensional case analysis tools with audio narration | Çok boyutlu dava analiz araçleri ve sesli anlatım                | Açıklama. |
| Legal Precedents                                             | İçtihatlar                                                     | Bölüm başlığı[^1][^2]. |
| Play Analysis                                                | Analizi Çal                                                   | Eylem etiketi. |
| Match / Outcome / Source                                     | Eşleşme / Sonuç / Kaynak                                      | Liste öğeleri. |
| Witness Analysis                                             | Tanık Analizi                                                 | Bölüm başlığı. |
| Credibility / Inconsistencies / Key Points                   | Güvenilirlik / Tutarsızlıklar / Ana Noktalar                   | Değerlendirme başlıkları[^5][^6]. |
| Event Timeline                                               | Olay Zaman Çizelgesi                                           | Bölüm başlığı. |
| high / medium significance                                   | yüksek / orta önem derecesi                                    | Gösterge etiketleri. |
| Scenario Analysis & Court Simulation                          | Senaryo Analizi ve Duruşma Simülasyonu                          | Bölüm başlığı. |
| Full Court Simulation                                         | Tam Duruşma Simülasyonu                                         | Eylem etiketi. |
| Predicted Outcome:                                           | Öngörülen Sonuç:                                               | Değerlendirme çıktısı. |
| Audio On / Audio Off                                         | Ses Açık / Ses Kapalı                                          | Durum etiketi. |
| Stop Audio                                                   | Sesi Durdur                                                    | Eylem butonu. |
| Playing Audio...                                             | Ses Çalınıyor...                                               | Durum göstergesi. |
| Timeline event at {time}: {event}. Source: {source}. This event has {level} significance to the case analysis. | {time} tarihli zaman çizelgesi olayı: {event}. Kaynak: {source}. Bu olayın dava analizine ilişkin {level} önem derecesi vardır. | Dinamik sesli anlatım metni. |

### UploadTab

Yükleme sekmesi henüz geliştirme aşamasındadır; kısa ve net mesajlar önerilir.

Tablo 5. UploadTab metinleri ve çeviri önerileri

| Metin (EN)                                               | Türkçe Karşılık                                 | Notlar |
|----------------------------------------------------------|-------------------------------------------------|--------|
| Evidence Image Recognition                                | Delil Görüntü Tanıma                            | İşlevsel başlık. |
| GeoSpy-like location analysis and forensic image examination | Coğrafi konum analizi ve adli görüntü incelemesi (GeoSpy benzeri) | Teknik açıklama. |
| Upload Feature Coming Soon                                | Yükleme Özelliği Yakında                        | Durum mesajı. |
| Enhanced image analysis with audio narration will be available in the next update | Geliştirilmiş görüntü analizi ve sesli anlatım bir sonraki güncellemede sunulacaktır | Bilgilendirme. |

### AboutTab

Hakkında ve sorumsuzluk metinleri için resmi ve sade dil tercih edilmiştir.

Tablo 6. AboutTab metinleri ve çeviri önerileri

| Metin (EN)                                                      | Türkçe Karşılık                                                    | Notlar |
|-----------------------------------------------------------------|--------------------------------------------------------------------|--------|
| Truth Re:Build AI                                               | Truth Re:Build AI                                                  | Ürün adı; çevrilmez. |
| AI-Powered Legal Assistant Platform                             | Yapay Zekâ Destekli Hukuk Asistanı Platformu                       | Başlık. |
| Our Mission                                                     | Misyonumuz                                                         | Bölüm başlığı. |
| Rebuild Truth                                                   | Gerçeği Yeniden İnşa Etmek                                        | Slogan. |
| Detect Inconsistencies                                          | Tutarsızlıkları Tespit Etmek                                      | Slogan. |
| Strategic Insights                                              | Stratejik İçgörüler                                               | Slogan. |
| Enhanced Features                                               | Geliştirilmiş Özellikler                                          | Bölüm başlığı. |
| Browser Text-to-Speech                                          | Tarayıcı Metinden Sese (Text-to-Speech)                            | Teknik açıklama. |
| Court Audio Scripts                                             | Duruşma Ses Betikleri                                              | Ürün özelliği. |
| Core Capabilities                                               | Temel Yetenekler                                                   | Bölüm başlığı. |
| Legal Precedent Search                                          | İçtihat Arama                                                      | Yetenek açıklaması[^1][^2]. |
| Conversational AI Assistant                                     | Söylevsel Yapay Zekâ Asistanı                                      | Yetenek açıklaması. |
| Verified Legal Sources                                          | Doğrulanmış Hukuki Kaynaklar                                       | Bölüm başlığı. |
| All legal data is sourced exclusively from verified public domain databases, ensuring legal compliance and educational safety. | Tüm hukuki veriler yalnızca doğrulanmış kamuya açık veritabanlarından sağlanır; bu durum hukuki uyumluluğu ve eğitim güvenliğini sağlar. | Kaynak uyarısı. |
| Important Legal Disclaimers                                     | Önemli Hukuki Sorumsuzluk Uyarıları                                | Bölüm başlığı. |
| Educational Use Only                                            | Yalnızca Eğitim Amaçlı Kullanım                                    | Uyarı metni. |
| Not Legal Advice                                                | Hukuki Tavsiye Değildir                                            | Uyarı metni. |
| Enhanced Audio & Verified Legal Sources • Educational Demo • August 2025 | Geliştirilmiş Ses ve Doğrulanmış Hukuki Kaynaklar • Eğitim Demoları • Ağustos 2025 | Alt bilgi. |

## Hukuki Çeviri Notları ve Doğrulama

Hukuki metinlerde terminolojik tutarlılık, anlamın korunması ve kullanıcı açısından anlaşılabilirliğin sağlanması esastır. İçtihat (legal precedent) gibi temel kavramlar, Türkiye’deki yargı pratikleri ve terminolojide yerleşik karşılıklarla kullanılmalıdır[^1][^2][^3]. Benzer şekilde “negligence” için Türk hukukunda yerleşik karşılık “ihmal” veya “ihmalkârlık” olup, bağlama göre uygun olan tercih edilmelidir[^8]. “Witness credibility” için “tanık güvenilirliği” veya “tanıklığın güvenilirliği” karşılıkları kullanılabilir[^5][^6][^7].

Yerelleştirme stratejisinde kısalık ve yalınlık gözetilir; açıkça anlaşılabilen teknik terimler gereksiz açıklamalarla uzatılmaz. Yasal sorumsuzluk ve eğitim amaçlı kullanım vurguları korunur.

### Kritik Terimler ve Gerekçeler

Tablo 7. Kritik hukuki terimler – karşılaştırmalı gerekçe

| İngilizce Terim             | Önerilen Türkçe Karşılık          | Gerekçe / Kaynak |
|-----------------------------|-----------------------------------|------------------|
| legal precedent             | içtihat                           | Türkiye’de yerleşik hukuki terim; kılavuzlarla uyum[^1][^2][^3]. |
| negligence                  | ihmal / ihmalkârlık               | Hukuki bağlama göre tercih; sözlükte yerleşik karşılıklar[^8]. |
| witness credibility         | tanık güvenilirliği               | Tanıklık bağlamında kullanılan standart karşılık[^5][^7]. |
| cross-examination           | çapraz sorgu                      | Yargı süreci terminolojisi; yerleşik kullanım[^1][^2]. |
| duty of care                | özen yükümlülüğü                  | Haksız fiil ve ihmal bağlamında temel kavram[^2]. |
| causation                   | nedensellik                        | Hukuki illiyet bağı için standart terim[^2]. |
| damages                     | zararlar                           | Tazminat hukukunda kullanılan karşılık[^2]. |
| timeline reconstruction     | zaman çizelgesi yeniden oluşturma  | Olay dizisini yeniden kurma anlamında açıklayıcı. |
| case analysis               | dava analizi                       | Yargı pratiklerinde yerleşik. |
| scenario analysis           | senaryo analizi                    | Ürün bağlamında anlaşılır ve teknik. |

## Sözlük ve Eşleme Tablosu

Tüm UI metinlerinin Türkçe karşılıklarını tek tabloda toplamak, yerelleştirme sürecinde tek kaynak noktası oluşturur ve tutarlılık sağlar. Aşağıdaki kapsamlı eşleme, bileşen ve metin türü bilgisini içerir.

Tablo 8. UI Metinleri – Kapsamlı Eşleme Tablosu

| Bileşen    | Metin (EN)                                                                 | Türkçe Karşılık                                                                                           | Notlar |
|------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|--------|
| App.tsx    | Truth Re:Build AI                                                          | Truth Re:Build AI                                                                                          | Ürün adı. |
| App.tsx    | AI-Powered Legal Assistant                                                 | Yapay Zekâ Destekli Hukuk Asistanı                                                                          | Teknik/ürün açıklaması. |
| App.tsx    | Demo User                                                                  | Demo Kullanıcı                                                                                             | Basit. |
| App.tsx    | Logout                                                                     | Çıkış                                                                                                      | UI etiketi. |
| App.tsx    | Developed by MiniMax Agent                                                 | Geliştiren: MiniMax Agent                                                                                  | Üretici adı. |
| App.tsx    | Enhanced Audio & Verified Legal Sources                                    | Geliştirilmiş Ses ve Doğrulan Hukuki Kaynaklar                                                              | Özellik özeti. |
| App.tsx    | Educational Demo Only                                                      | Yalnızca Eğitim Amaçlı Demodur                                                                             | Uyarı. |
| App.tsx    | All case data ... Not legal advice.                                        | Tüm dava verileri ... Hukuki tavsiye değildir.                                                             | Yasal sorumsuzluk. |
| SearchTab  | Legal Precedent Search                                                     | İçtihat Araması                                                                                             | Başlık[^1][^2]. |
| SearchTab  | AI-powered search ...                                                      | Doğrulanmış kamuya açık hukuki veritabanlarında yapay zekâ destekli arama                                  | Açıklama. |
| SearchTab  | Audio On / Off                                                             | Ses Açık / Ses Kapalı                                                                                      | Durum. |
| SearchTab  | Search legal cases, precedents, or key terms...                            | Dava içtihatları, emsal kararlar veya anahtar terimler arayın...                                           | Placeholder. |
| SearchTab  | Searching... / Search                                                      | Aranıyor... / Ara                                                                                          | Durum/buton. |
| SearchTab  | Quick Search Examples                                                      | Hızlı Arama Örnekleri                                                                                       | Başlık. |
| SearchTab  | Verified Legal Sources                                                     | Doğrulanmış Hukuki Kaynaklar                                                                                | Başlık. |
| SearchTab  | All legal data is sourced ...                                              | Tüm hukuki veriler doğrulanmış kamuya açık veritabanlarından sağlanır:                                     | Açıklama. |
| SearchTab  | Search Results (n)                                                         | Arama Sonuçları (n)                                                                                         | Başlık. |
| SearchTab  | Filter by relevance                                                        | Önem derecesine göre filtrele                                                                               | Etiket. |
| SearchTab  | Similarity / Match                                                         | Benzerlik / Eşleşme                                                                                         | Skor etiketleri. |
| SearchTab  | Key Factors:                                                               | Ana Faktörler:                                                                                               | Liste başlığı. |
| SearchTab  | Outcome: / Relevance: / Source:                                            | Sonuç: / Uygunluk: / Kaynak:                                                                                | Bilgi etiketleri. |
| SearchTab  | No cases found                                                             | Sonuç bulunamadı                                                                                            | Durum. |
| SearchTab  | Try different search terms or browse our examples                          | Farklı arama terimleri deneyin veya örneklerimize göz atın                                                 | Yönlendirme. |
| ChatTab    | AI Legal Assistant                                                         | Yapay Zekâ Hukuk Asistanı                                                                                   | Başlık. |
| ChatTab    | Conversational case analysis and legal consultation                        | Söylevsel dava analizi ve hukuki danışmanlık                                                                 | Açıklama. |
| ChatTab    | Audio / Clear                                                              | Ses / Temizle                                                                                               | Etiket/buton. |
| ChatTab    | Example Case Scenarios                                                     | Örnek Dava Senaryoları                                                                                       | Başlık. |
| ChatTab    | Describe your legal case or question...                                    | Hukuki davanızı veya sorunuzu anlatın...                                                                    | Placeholder. |
| ChatTab    | AI is thinking...                                                          | Yapay zekâ düşünüyor...                                                                                      | Durum. |
| ChatTab    | Welcome ...                                                                | Hoş geldiniz ...                                                                                            | Karşılama. |
| ChatTab    | Based on the negligence case analysis ...                                  | İhmalkârlık (negligence) davası analizine göre ...                                                          | Hukuki bağlam[^8]. |
| ChatTab    | Duty of Care / Breach / Causation / Damages                                | Özen Yükümlülüğü / Standart İhlali / Nedensellik / Zararlar                                                 | Hukuki ilkeler[^2]. |
| ChatTab    | Witness credibility analysis ...                                           | Tanık güvenilirliği analizi ...                                                                             | Terminoloji[^5][^7]. |
| ChatTab    | Consistency Assessment / Credibility Indicators                            | Tutarlılık Değerlendirmesi / Güvenilirlik Göstergeleri                                                      | Analiz başlıkları. |
| ChatTab    | Case Precedent Analysis                                                    | İçtihat Analizi                                                                                              | Terminoloji[^1][^2]. |
| ChatTab    | Witness Credibility Assessment                                             | Tanık Güvenilirlik Değerlendirmesi                                                                          | Sözlük uyumu[^5][^7]. |
| ChatTab    | Timeline Reconstruction                                                    | Zaman Çizelgesi Yeniden Oluşturma                                                                            | Teknik. |
| ChatTab    | Legal Strategy Development                                                 | Hukuki Strateji Geliştirme                                                                                   | Süreç odaklı. |
| AnalysisTab| Case Analysis & Reconstruction                                             | Dava Analizi ve Yeniden Oluşturma                                                                            | Üst başlık. |
| AnalysisTab| Comprehensive ... with audio narration                                     | Çok boyutlu dava analiz araçları ve sesli anlatım                                                            | Açıklama. |
| AnalysisTab| Legal Precedents                                                           | İçtihatlar                                                                                                    | Bölüm başlığı[^1][^2]. |
| AnalysisTab| Play Analysis                                                              | Analizi Çal                                                                                                   | Etiket. |
| AnalysisTab| Match / Outcome / Source                                                   | Eşleşme / Sonuç / Kaynak                                                                                     | Liste öğeleri. |
| AnalysisTab| Witness Analysis                                                           | Tanık Analizi                                                                                                 | Bölüm başlığı. |
| AnalysisTab| Credibility / Inconsistencies / Key Points                                 | Güvenilirlik / Tutarsızlıklar / Ana Noktalar                                                                 | Başlıklar[^5][^6]. |
| AnalysisTab| Event Timeline                                                             | Olay Zaman Çizelgesi                                                                                          | Bölüm başlığı. |
| AnalysisTab| high / medium significance                                                 | yüksek / orta önem derecesi                                                                                  | Gösterge. |
| AnalysisTab| Scenario Analysis & Court Simulation                                       | Senaryo Analizi ve Duruşma Simülasyonu                                                                        | Bölüm başlığı. |
| AnalysisTab| Full Court Simulation                                                      | Tam Duruşma Simülasyonu                                                                                       | Etiket. |
| AnalysisTab| Predicted Outcome:                                                         | Öngörülen Sonuç:                                                                                              | Çıktı. |
| AnalysisTab| Audio On / Off                                                             | Ses Açık / Ses Kapalı                                                                                         | Durum. |
| AnalysisTab| Stop Audio                                                                 | Sesi Durdur                                                                                                   | Buton. |
| AnalysisTab| Playing Audio...                                                           | Ses Çalınıyor...                                                                                              | Durum. |
| UploadTab  | Evidence Image Recognition                                                 | Delil Görüntü Tanıma                                                                                          | Başlık. |
| UploadTab  | GeoSpy-like location analysis ...                                          | Coğrafi konum analizi ve adli görüntü incelemesi (GeoSpy benzeri)                                            | Açıklama. |
| UploadTab  | Upload Feature Coming Soon                                                 | Yükleme Özelliği Yakında                                                                                      | Durum. |
| UploadTab  | Enhanced image analysis ... next update                                    | Geliştirilmiş görüntü analizi ve sesli anlatım bir sonraki güncellemede sunulacaktır                         | Bilgilendirme. |
| AboutTab   | AI-Powered Legal Assistant Platform                                        | Yapay Zekâ Destekli Hukuk Asistanı Platformu                                                                  | Başlık. |
| AboutTab   | Our Mission                                                                | Misyonumuz                                                                                                    | Başlık. |
| AboutTab   | Rebuild Truth / Detect Inconsistencies / Strategic Insights                | Gerçeği Yeniden İnşa Etmek / Tutarsızlıkları Tespit Etmek / Stratejik İçgörüler                              | Sloganlar. |
| AboutTab   | Enhanced Features                                                           | Geliştirilmiş Özellikler                                                                                      | Başlık. |
| AboutTab   | Browser Text-to-Speech                                                      | Tarayıcı Metinden Sese (Text-to-Speech)                                                                       | Teknik. |
| AboutTab   | Court Audio Scripts                                                         | Duruşma Ses Betikleri                                                                                         | Özellik. |
| AboutTab   | Core Capabilities                                                           | Temel Yetenekler                                                                                              | Başlık. |
| AboutTab   | Legal Precedent Search                                                      | İçtihat Arama                                                                                                  | Yetenek[^1][^2]. |
| AboutTab   | Conversational AI Assistant                                                 | Söylevsel Yapay Zekâ Asistanı                                                                                  | Yetenek. |
| AboutTab   | Verified Legal Sources                                                      | Doğrulanmış Hukuki Kaynaklar                                                                                  | Başlık. |
| AboutTab   | All legal data is ... educational safety.                                   | Tüm hukuki veriler ... eğitim güvenliğini sağlar.                                                             | Açıklama. |
| AboutTab   | Important Legal Disclaimers                                                 | Önemli Hukuki Sorumsuzluk Uyarıları                                                                            | Başlık. |
| AboutTab   | Educational Use Only                                                        | Yalnızca Eğitim Amaçlı Kullanım                                                                                | Uyarı. |
| AboutTab   | Not Legal Advice                                                            | Hukuki Tavsiye Değildir                                                                                        | Uyarı. |
| AboutTab   | Enhanced Audio ... August 2025                                              | Geliştirilmiş Ses ... Ağustos 2025                                                                            | Alt bilgi. |

Uygulamada ayrıca statü/etiket ve durum mesajları bulunur. Bunlar için kısa ve tekil ifadeler tercih edilmiştir.

Tablo 9. Statü/Etiket metinleri – Kısa çeviri listesi

| Metin (EN)         | Türkçe Karşılık     |
|--------------------|---------------------|
| Audio On / Off     | Ses Açık / Ses Kapalı |
| Searching...       | Aranıyor...         |
| Play Analysis      | Analizi Çal         |
| Stop Audio         | Sesi Durdur         |
| Playing Audio...   | Ses Çalınıyor...    |
| Quick Search       | Hızlı Arama         |
| Filter by relevance| Önem derecesine göre filtrele |
| Similarity         | Benzerlik           |
| Match              | Eşleşme             |
| Credibility        | Güvenilirlik        |
| Inconsistencies    | Tutarsızlıklar      |
| Key Points         | Ana Noktalar        |
| Relevance          | Uygunluk            |
| Outcome            | Sonuç               |
| Source             | Kaynak              |
| Scenario           | Senaryo             |
| Probability        | Olasılık            |

## Uygulama Planı ve Dosya Yapısı

Çeviri envanterinin konsolide hali, “docs/ui_texts_analysis.md” dosyasında tutulmalıdır. Dosya; yönetici özeti, yöntem ve kaynaklar, bileşen bazında metin envanteri ve çeviri önerileri, hukuki çeviri notları, sözlük ve eşleme tablosu, uygulama planı ve ekler bölümlerini içermelidir. Her güncellemede sürüm numarası ve tarih damgası eklenir; değişikliklerin kısa özeti ve etkilenen bileşenlerin listesi sunulur. Dosya, geliştiriciler ve yerelleştirme uzmanları için tek kaynak noktası olarak yönetilir.

### İş Akışı

- Envanter çıkarımı ve ilk taslak: Bileşen bazında metinler toplanır, sınıflandırılır ve Türkçe karşılıklar önerilir.
- Hukuki gözden geçirme: Kritik terimler için hukuki danışman görüşü alınır; terminoloji tutarlılığı kontrol edilir[^1][^2].
- Revizyon ve onay: Geri bildirimler doğrultusunda metinler revize edilir; final onayı sağlanır.
- Sürümleme: “v1.0”, “v1.1” gibi sürüm etiketleri ve tarih damgası eklenir; değişiklik özeti hazırlanır.

## Ekler ve Referanslar

### Kısaltmalar ve Terim Tanımları

Tablo 10. Kısaltmalar ve tanımlar

| Kısaltma | Tam Adı                                   | Tanım                                                                 | Kaynak |
|----------|--------------------------------------------|-----------------------------------------------------------------------|--------|
| TTS      | Text-to-Speech (Metinden Sese)             | Metni sesli çıkışa dönüştüren tarayıcı teknolojisi.                  | —      |
| UI       | User Interface (Kullanıcı Arayüzü)         | Kullanıcının uygulamayla etkileşime girdiği görsel ve metinsel öğeler. | —      |
| EN       | English (İngilizce)                        | Kaynak dil.                                                           | —      |
| TR       | Turkish (Türkçe)                           | Hedef dil.                                                            | —      |
| MFA TR   | T.C. Dışişleri Bakanlığı – Terminoloji     | Türkiye’de yerleşik hukuk ve genel terminoloji kılavuzu.             | [^1]   |

### Metin Sınıfları ve Çeviri Stratejisi

- Başlıklar ve navigasyon: Kısa ve doğal Türkçe; ürün adları korunur.
- Butonlar ve eylemler: Emir kipi ve net anlam; durum butonları için “Çal/Durdur” gibi tekil ifadeler.
- Durum/gösterge metinleri: Kısa ve tekil; üç nokta kullanımı (“...”) ile geçici durum belirtilir.
- Yardım/açıklama: Bilgilendirici ve yönlendirici; gerektiğinde hukuki uyarılarla uyumlu.

### Bilgi Boşlukları

- Uygulamanın geri kalan bileşenlerindeki metinler bu rapor kapsamı dışında kalmış olabilir.
- “ GeoSpy-like ” gibi marka/第三 ürün adlarının Türkiye’deki resmi karşılıkları ve kullanım izinleri doğrulanmalıdır.
- Bazı jargon ve ürün özel terimler için nihai hukuki danışman onayı gereklidir.
- Tarih ve sürüm bilgileri ile değişiklik günlüğü (changelog) uygulamaya özgü olarak netleştirilmemiştir.

## Referanslar

[^1]: T.C. Dışişleri Bakanlığı Tercüme Dairesi Başkanlığı – Hukuk Terminolojisi (2018). https://www.mfa.gov.tr/data/Terminoloji/hukuk-terminoloji-110615.pdf
[^2]: Kemal Gözler – Hukukun Temel Kavramları (Sözlük). https://www.anayasa.gen.tr/htk-sozlukler.htm
[^3]: legal precedent – Tureng (İçtihat). https://tureng.com/en/turkish-english/legal%20precedent
[^4]: Türk Yargı Sistemindeki Mahkemelerin İngilizce Hukuki Terminolojisindeki Karşılıkları. https://legistranslate.com/tr/5/turk-yargi-sistemindeki-mahkemelerin-ingilizce-hukuki-terminolojisindeki-karsiliklari.html
[^5]: credibility of testimony – Tureng (Tanıklığın güvenilirliği). https://tureng.com/en/turkish-english/credibility%20of%20testimony
[^6]: witness – Cambridge Dictionary (İngilizce-Türkçe). https://dictionary.cambridge.org/dictionary/english-turkish/witness
[^7]: WITNESS – Cambridge Dictionary (Türkçe Açıklama). https://dictionary.cambridge.org/tr/s%C3%B6zl%C3%BCk/ingilizce-t%C3%BCrk%C3%A7e/witness
[^8]: negligence – Cambridge Dictionary (İngilizce-Türkçe). https://dictionary.cambridge.org/dictionary/english-turkish/negligence

---

Bu rapor, Truth Re:Build AI uygulamasının UI metinleri için Türkçe yerelleştirme ve hukuki terminoloji açısından uygulanabilir bir çerçeve sunar. Geliştirici ve yerelleştirme ekipleri, tabloları doğrudan kod ve içerik güncellemelerinde referans alarak çeviri tutarlılığını koruyabilir; hukuki doğrulama adımlarıyla ürünün güvenilirliğini ve uyumluluğunu pekiştirebilir.