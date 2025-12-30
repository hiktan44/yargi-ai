# Yargi-MCP Hukuki Kurum Modülleri: Tespit, Analiz ve Entegrasyon Yol Haritası

## 1) Amaç, Kapsam ve Çerçeve

Bu rapor, Yargi-MCP projesi kapsamında bulunan hukuki kurum modüllerinin kapsamlı bir envanterini çıkarmak; her bir modülün amaçlanan hukuki kurum/kaynak sistemini, fonksiyon setini, arama ve analiz yeteneklerini, dış kaynaklarla etkileşim biçimlerini (HTTP/Playwright), veri modellerini ve dönüştürme süreçlerini ayrıntılı şekilde analiz etmek amacıyla hazırlanmıştır. Çalışma, modüllerin üretim ortamına alınabilmesi için gerekli teknik önkoşulları, riskler ve kırılganlık alanlarını, uyumluluk ve veri kalitesi gereksinimlerini, ayrıca sürdürülebilir bir “MCP entegrasyon katmanı” tasarımını ortaya koyar.

Kapsam dahilinde modüller:
- Anayasa (Norm Denetimi + Bireysel Başvuru)
- BDDK (Bankacılık Düzenleme ve Denetleme Kurumu)
- Danıştay
- Emsal (UYAP)
- KİK (Kamu İhale Kurumu)
- KVKK (Kişisel Verilerin Korunması Kurumu)
- Rekabet Kurumu
- Sayıştay (Genel Kurul, Temyiz Kurulu, Daire)
- Uyuşmazlık Mahkemesi
- Yargıtay
- Bedesten (Alternatif karar arama/servis katmanı)

Analiz; modül sınıfları, Pydantic modelleri, endpoint ve sayfa yolları, HTTP/Playwright etkileşimleri, HTML parsing, HTML→Markdown (MarkItDown) ve PDF→Markdown (pypdf + MarkItDown) dönüştürme hatları üzerinden yapılmıştır. Rapor boyunca her bir modül, “Ne” (kurum/amaç), “Nasıl” (erişim ve dönüştürme tekniği) ve “Sonuç” (veri/entegrasyon çıktısı) sorularının cevaplanmasıyla ele alınmıştır.

Varsayımlar ve kısıtlar:
- Tüm modüller birer istemci soyutlamasıdır; resmi REST olmayan birçok kaynakla HTML/Form/DataTables veya HTML içinde gömülü JSON alanları üzerinden çalışır.
- Modeller, Pydantic tabanlıdır ve arama/yanıt/dönüştürme sırasındaki veri yapılarını şekillendirir.
- Aşağıdaki bilgi boşlukları rapor boyunca açıkça işaretlenmiştir: bazı alan adları ve resmi endpoint yolları doğrulanmamıştır; KİK’te anti-bot tercihleri ve oran sınırlamaları; BDDK ve KVKK’de üçüncü parti API kullanım kotaları; Yargıtay/Danıştay/Emsal’de pagination parametrelerinin tavan değerleri; çıktıların meta veri alanları standardizasyonu; kaynak site yapı değişiklikleri; kritik model alanlarının kapsamı; authentication (mcp_auth) ve CORS/mimarisi; risk ve ölçeklenebilirlik metrikleri.

Bu çalışma, proje mimarisi ve geliştirme ekiplerinin üretim yol haritasını belirlerken, ürün ve uyum ekiplerinin de veri kalitesi, mevzuata uygunluk ve referans doğrulama gereksinimlerini sistematik biçimde ele almasını hedefler.

## 2) Envanter ve Kurumsal Eşleştirme

Modüller, hukuki kurumlara göre sınıflandırılmış olup aşağıdaki matriste özetlenmiştir. Kurumsal kaynaklar ve tipik karar/doküman içeriklerine ilişkin doğrulama notları ilgili referanslarla desteklenmiştir.[^4][^5][^7][^11][^12][^13][^14][^15][^16][^17][^18]

Bu çerçeveyi somutlaştırmak için aşağıdaki tablo, modül-kurum eşleşmesini, ana erişim yöntemini ve dönüştürme yaklaşımını bir arada sunar.

### Tablo 1 — Modül–Kurum Eşleştirme Matrisi

| Modül | Kurum | Kaynak Referansı | Erişim Yöntemi (HTTP/Playwright) | Dönüştürme (HTML→MD / PDF→MD) | Ana Kullanım Amacı |
|---|---|---|---|---|---|
| anayasa_mcp_module | Anayasa Mahkemesi (Norm Denetimi ve Bireysel Başvuru) | [^4][^5] | HTTP (httpx) + HTML parsing + MarkItDown | HTML→MD (MarkItDown, 5.000 karakter sayfalama) | Norm denetimi ve bireysel başvuru kararlarında arama ve tam metin |
| bddk_mcp_module | BDDK | [^6][^7] | HTTP + Tavily Search API (keşif) | HTML/PDF→MD (MarkItDown) | Kurum kararlarını bulma ve içeriklerini Markdown’a çevirme |
| danistay_mcp_module | Danıştay | [^8] | HTTP (JSON/Form) + HTML döküman | HTML→MD (MarkItDown) | İdari yargı kararlarında detaylı/anahtar kelime arama ve doküman |
| emsal_mcp_module | Emsal (UYAP) | [^9] | HTTP (JSON/Form) + HTML döküman | HTML→MD (MarkItDown) | İçtihat niteliğinde emsal karar arama ve doküman |
| kik_mcp_module | KİK | [^10] | Playwright (headless, anti-bot) + HTML parsing | HTML→MD (MarkItDown) | Kamu İhale Kurulu kararlarında form tabanlı arama ve modal/iframe içerik |
| kvkk_mcp_module | KVKK | [^12][^13] | HTTP + Brave Search API (keşif) | HTML→MD (MarkItDown) | Karar özetleri ve karar sayfalarından içerik çıkarımı |
| rekabet_mcp_module | Rekabet Kurumu | [^14][^15] | HTTP + PDF keşif/çekme + pypdf + MarkItDown | PDF→MD (pypdf + MarkItDown) | Karar listeleri ve PDF içeriklerinden sayfa bazlı Markdown |
| sayistay_mcp_module | Sayıştay | [^16][^17] | HTTP (DataTables) + session/CSRF | HTML→MD (MarkItDown) | Genel Kurul, Temyiz ve Daire kararlarında arama ve doküman |
| uyusmazlik_mcp_module | Uyuşmazlık Mahkemesi | [^18][^19] | HTTP (Form/x-www-form-urlencoded) + HTML parsing | HTML→MD (MarkItDown) | Uyuşmazlık türü/sonucuna göre arama ve doküman |
| yargitay_mcp_module | Yargıtay | [^1][^2] | HTTP (JSON/Form) + HTML döküman | HTML→MD (MarkItDown) | Yargıtay dairelerinde detaylı arama ve doküman |
| bedesten_mcp_module | Bedesten (Adalet Bakanlığı) | [^11] | HTTP (JSON) + base64 içerik | HTML/PDF→MD (MarkItDown) | Yargıtay/Danıştay ve diğer mahkeme türleri için alternatif arama ve doküman |

Matristeki modüllerin büyük kısmı, resmi bir REST API yerine web sayfalarının sunduğu form veya DataTables uç noktalarıyla çalışır. Bu nedenle HTML parsing, form parametrelerinin doğru şekilde üretilmesi ve dönüşümün güvenilirliği kritik başarım ve uyumluluk unsurlarıdır.

## 3) Mimari Desenler ve Erişim Stratejileri

Yargi-MCP modüllerinin erişim ve dönüştürme desenleri, üç ana kategoriye ayrılır: HTTP tabanlı JSON/Form istekleri, HTTP tabanlı HTML sayfa keşfi ve Playwright tabanlı tarayıcı otomasyonu. Dönüştürme katmanı çoğunlukla MarkItDown ile HTML→Markdown; Rekabet Kurumu özelinde pypdf ile PDF→Markdown üzerinden gerçekleştirilir. Bu ayrım, üretim ortamında hem dayanıklılık hem de ölçeklenebilirlik açısından farklı stratejiler gerektirir.

- HTTP + JSON/Form/DataTables: Yargıtay, Danıştay, Emsal ve Sayıştay modülleri bu gruba girer. Sayıştay’da ASP.NET WebForms oturum ve CSRF token yönetimi vardır; DataTables parametreleri (draw, start, length) üzerinden sayfalama yapılır.[^1][^8][^16]
- HTTP + HTML scraping ve içerik keşfi: Anayasa, KVKK ve Rekabet modülleri, karar listelerini HTML’den ayrıştırır; Rekabet modülü ayrıca PDF URL keşfi ve sayfa bazlı Markdown dönüşümü yapar.[^4][^13][^14]
- Playwright tabanlı otomasyon: KİK modülü, kurul karar sorgulama formu ve sonuç tablosu ile etkileşime girer; modal/iframe içerikleri ile doküman sayfalarına erişir. Anti-bot önlemleri ve insan davranışı simülasyonu uygulanır.[^10]

Markdown dönüştürme desenleri, karakter tabanlı sayfalama (çoğunlukla 5.000 karakter) ile büyük belgelerin kontrollü biçimde sunulmasını sağlar. Rekabet modülünde ise PDF sayfaları tekil PDF olarak çıkarılıp pypdf + MarkItDown ile dönüştürülür; bu, sayfa bazlı içerik tüketimi sağlar.[^14]

Üretim uygunluğu açısından kritik noktalar: oran sınırlaması, anti-bot sistemlere saygı, oturum/CSRF yönetimi, hata dayanıklılığı (timeouts, retry/backoff), içerik doğrulaması ve kayıt altına alma (audit). KİK’te Playwright, Yargıtay/Danıştay/Emsal/Sayıştay’da JSON/Form ve DataTables, KVKK’de Brave API keşfi tercih edilmiştir.[^1][^8][^10][^13][^14][^16]

Bu mimari farklılıkları karşılaştırmalı olarak gösteren tablo aşağıdadır.

### Tablo 2 — Erişim Deseni Karşılaştırması

| Modül | Yöntem | Anti-bot/Token | Dönüştürme | Hata Toleransı Notları |
|---|---|---|---|---|
| Anayasa | HTTP + HTML parsing | Yok | HTML→MD (5.000 karakter) | Boş HTML/parsingk hatalarında uyarı ve kısmi dönüş |
| BDDK | HTTP + Tavily keşif | API anahtarı | HTML/PDF→MD | Üçüncü parti API hatalarında boş sonuç ve uyarı |
| Danıştay | HTTP + JSON/Form | Yok | HTML→MD | Boş HTML, MarkItDown hatalarında None |
| Emsal | HTTP + JSON/Form | Yok | HTML→MD | Payload temizleme ve boş alanları çıkarma |
| KİK | Playwright | Anti-bot (stealth), insan davranışı simülasyonu | HTML→MD | Modal/iframe timeout ve postback hatalarında geriye dönüş |
| KVKK | HTTP + Brave keşif | API anahtarı | HTML→MD | HTML’den içerik çıkarımı başarısızlığında uyarı |
| Rekabet | HTTP + PDF çekme | Yok | PDF→MD (pypdf + MarkItDown) | PDF yok/bozuk sayfalarında kısmi sonuç |
| Sayıştay | HTTP + DataTables + CSRF | Oturum/CSRF | HTML→MD | Token süresi ve yenileme stratejisi |
| Uyuşmazlık | HTTP + Form + HTML parsing | Yok | HTML→MD | Popover/PDF link yoksa kısmi dönüş |
| Yargıtay | HTTP + JSON/Form | Yok | HTML→MD | “data” alanı yoksa varsayılan boş yanıt |
| Bedesten | HTTP + JSON | Application header | HTML/PDF→MD | Base64 hatalarında ValueError ve uyarı |

Bu desenler, entegrasyon katmanında bir “tip-adaptör” yaklaşımıyla (Ayrıntılı arama, Liste arama, Doküman indirme) standartlaştırılmalıdır; böylece her kuruma özgü farklar, üst katmanda ortak bir sözleşmeye dönüşür.

## 4) Modül Bazında Derin Analiz

Bu bölümde her modülün kurum/kaynak sistemi, fonksiyonlar, arama/analiz, endpoint/erişim, veri modelleri ve dönüştürme mekanizması ayrıntılandırılır. Üretim uygunluğu ve uyumluluk riskleri ayrıca ele alınır.

### 4.1 Anayasa Mahkemesi (Norm Denetimi + Bireysel Başvuru)

Kurum ve amaç: Anayasa Mahkemesi’nin Norm Denetimi ve Bireysel Başvuru sistemleri üzerinden karar arama ve doküman içeriğine erişim sağlanır.[^4][^5]

Fonksiyonlar:
- Norm denetimi arama (kelime all/any/exclude), dönem, başvuru türü, tarih aralıkları, başvuran, raportör, norm türü/madde, inceleme türü ve sonuçlar, mühürlü karar ve resmi gazete filtreleri.
- Sonuç sayfası ayrıştırma ile decision summary üretimi (E.K. No, tarih, başvuru türü, başvuran, sonuç özeti).
- Belge içeriğinin HTML’den Markdown’a çevrilmesi ve 5.000 karakter sayfalama.

Arama ve analiz: Gelişmiş parametre seti ve sayfalanabilir liste; belgeden ek no/karar tarihi/RG bilgisi çıkarımı.

Veri modelleri:
- Arama: AnayasaNormDenetimiSearchRequest, AnayasaBireyselReportSearchRequest, AnayasaUnifiedSearchRequest
- Sonuç: AnayasaSearchResult, AnayasaBireyselReportSearchResult, AnayasaUnifiedSearchResult
- Doküman: AnayasaDocumentMarkdown, AnayasaBireyselBasvuruDocumentMarkdown, AnayasaUnifiedDocumentMarkdown

Dönüştürme: HTML→Markdown (MarkItDown), karakter bazlı sayfalama.

Üretim uygunluğu ve riskler: HTML değişikliklerine duyarlılık; RG alanları ve tarih formatlarının doğrulanması; sayfalama sırasında bağlam kaybı.

### Tablo 3 — Anayasa Norm Denetimi Arama Parametreleri

| Parametre | Açıklama | Tip | Zorunluluk |
|---|---|---|---|
| keywords_all | Tüm kelimeler (AND) | List[str] | Opsiyonel |
| keywords_any | Herhangi bir kelime (OR) | List[str] | Opsiyonel |
| keywords_exclude | Hariç tutulan kelimeler | List[str] | Opsiyonel |
| period | Dönem (ALL/1961/1982) | Literal | Varsayılan ALL |
| case_number_esas | Esas no | str | Opsiyonel |
| decision_number_karar | Karar no | str | Opsiyonel |
| first_review_date_start / end | İlk inceleme tarih aralığı | str | Opsiyonel |
| decision_date_start / end | Karar tarih aralığı | str | Opsiyonel |
| application_type | Başvuru türü | Literal | Varsayılan ALL |
| applicant_general_name / specific_name | Başvuran | str | Opsiyonel |
| official_gazette_date_start / end | RG tarih aralığı | str | Opsiyonel |
| official_gazette_number_start / end | RG sayı aralığı | str | Opsiyonel |
| has_press_release | Basın duyurusu var mı? | Literal | Varsayılan ALL |
| has_dissenting_opinion | Karşı oy | Literal | Varsayılan ALL |
| has_different_reasoning | Farklı gerekçe | Literal | Varsayılan ALL |
| attending_members_names | Katılan üyeler | List[str] | Opsiyonel |
| rapporteur_name | Raportör | str | Opsiyonel |
| norm_type / id_or_name / article | Norm türü, adı/no, madde | str/Literal | Opsiyonel |
| review_outcomes | İnceleme türü ve sonuçlar | List[Literal] | Opsiyonel |
| reason_for_final_outcome | Sonuç gerekçesi | Literal | Varsayılan ALL |
| basis_constitution_article_numbers | Dayanak Anayasa maddeleri | List[str] | Opsiyonel |
| results_per_page | Sayfa başına sonuç (1–10) | int | Varsayılan 10 |
| page_to_fetch | Sayfa numarası | int | Varsayılan 1 |
| sort_by_criteria | Sıralama (KararTarihi/YayinTarihi/Toplam) | str | Varsayılan KararTarihi |

### Tablo 4 — Anayasa Yanıt ve Doküman Modelleri

| Model | Alanlar | Açıklama |
|---|---|---|
| AnayasaDecisionSummary | decision_reference_no, decision_page_url, keywords_found_count, application_type_summary, applicant_summary, decision_outcome_summary, decision_date_summary, reviewed_norms[] | Liste öğesi |
| AnayasaSearchResult | decisions[], total_records_found, retrieved_page_number | Liste yanıtı |
| AnayasaDocumentMarkdown | source_url, decision_reference_no_from_page, decision_date_from_page, official_gazette_info_from_page, markdown_chunk, current_page, total_pages, is_paginated | Doküman |

Referanslar: Norm Kararları Bilgi Bankası ve Bireysel Başvuru sistemleri.[^4][^5]

### 4.2 BDDK (Bankacılık Düzenleme ve Denetleme Kurumu)

Kurum ve amaç: BDDK kararlarının keşfi ve doküman içeriklerinin Markdown’a çevrilmesi.[^7]

Fonksiyonlar:
- Tavily Search API ile “Karar Sayısı” içeren ve BDDK DokumanGetir alanında sonuçlar üreten sorgular.
- Doküman ID çıkarımı (DokumanGetir/Liste/EkGetir desenleri).
- HTML/PDF içeriklerin MarkItDown ile Markdown’a dönüştürülmesi (5.000 karakter sayfalama).

Arama ve analiz: Üçüncü parti arama motoru üzerinden keşif; sayfa parametreleri kısıtlı (Tavily pagination yok).

Veri modelleri: BddkSearchRequest, BddkSearchResult, BddkDocumentMarkdown.

Riskler: API anahtarı ve kota; değişken URL desenleri; içerik tipinin (HTML/PDF) doğru belirlenmesi.

### Tablo 5 — BDDK Arama Parametreleri ve Dönüşüm

| Alan | Açıklama |
|---|---|
| keywords | Türkçe arama anahtar kelimeleri |
| page | Sayfa (Tavily pagination yok; >1 boş) |
| pageSize | Sayfa boyutu (1–50) |
| Dönüşüm | Doküman ID çıkarımı → URL desenleri → HTML/PDF → MarkItDown → Sayfalama |

### Tablo 6 — BDDK Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| BddkDecisionSummary | title, document_id, content | Liste öğesi |
| BddkSearchResult | decisions[], total_results, page, pageSize | Liste yanıtı |
| BddkDocumentMarkdown | document_id, markdown_content, page_number, total_pages | Doküman |

Referans: BDDK resmi site.[^7]

### 4.3 Danıştay

Kurum ve amaç: Danıştay karar arama sistemi üzerinden idari yargı kararlarına erişim.[^8]

Fonksiyonlar:
- İki arama biçimi: keyword (AND/OR/NOT) ve detailed (daire, esas/karar yıl ve sıra, tarih aralığı, mevzuat/madde).
- JSON/Form POST ile arama; sonuçlarda document_url üretimi.
- /getDokuman ile doğrudan HTML döküman; HTML→Markdown dönüşümü.

Arama ve analiz: DataTables benzeri yapı (recordsTotal/filtered, draw).

Veri modelleri: DanistayKeywordSearchRequest, DanistayDetailedSearchRequest, DanistayApiResponse, CompactDanistaySearchResult, DanistayDocumentMarkdown.

Riskler: Form payload’larının boş alanlarının temizlenmesi; /getDokuman HTML yapısının değişmesi.

### Tablo 7 — Danıştay Arama Parametreleri

| Arama Türü | Parametre | Açıklama |
|---|---|---|
| Keyword | andKelimeler / orKelimeler / notAndKelimeler / notOrKelimeler | Kelime listeleri |
| Keyword | pageSize / pageNumber | Sayfalama |
| Detailed | daire, esasYil, esasIlkSiraNo, esasSonSiraNo, kararYil, kararIlkSiraNo, kararSonSiraNo, baslangicTarihi, bitisTarihi, mevzuatNumarasi, mevzuatAdi, madde | Yapılandırılmış alanlar |
| Detailed | siralama / siralamaDirection | Sıralama |
| Detailed | pageSize / pageNumber | Sayfalama |

### Tablo 8 — Danıştay Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| DanistayApiDecisionEntry | id, chamber, esasNo, kararNo, kararTarihi, arananKelime, document_url | Liste öğesi |
| DanistayApiResponseInnerData | data[], recordsTotal, recordsFiltered, draw | Liste yanıtı |
| DanistayDocumentMarkdown | id, markdown_content, source_url | Doküman |

### 4.4 Emsal (UYAP)

Kurum ve amaç: Emsal sistemi üzerinden içtihat niteliğinde kararların aranması ve doküman içeriklerinin alınması.[^9]

Fonksiyonlar:
- Detaylı arama (arananKelime; BAM/Hukuk mahkemeleri; bölgesel odalar; esas/karar yıl ve sıra; tarih aralığı; sıralama).
- JSON/Form payload; sonuçlarda document_url üretimi.
- /getDokuman JSON içinde HTML “data” alanı; HTML→Markdown dönüşümü.

Veri modelleri: EmsalSearchRequest, EmsalDetailedSearchRequestData, EmsalApiResponse, CompactEmsalSearchResult, EmsalDocumentMarkdown.

Riskler: Alias alan adlarının payload ile uyumu; boş alanların temizlenmesi; “data” içinde HTML structure değişiklikleri.

### Tablo 9 — Emsal Arama Parametreleri

| Parametre | Açıklama |
|---|---|
| keyword | Aranan kelime |
| selected_bam_civil_court / selected_civil_court | BAM/Hukuk mahkemesi |
| selected_regional_civil_chambers | Bölgesel Hukuk Mahkemeleri (+ ayrılmış) |
| case_year_esas / start_seq / end_seq | Esas yıl ve sıra aralığı |
| decision_year_karar / start_seq / end_seq | Karar yıl ve sıra aralığı |
| start_date / end_date | Tarih aralığı (DD.MM.YYYY) |
| sort_criteria / sort_direction | Sıralama |
| page_number / page_size | Sayfalama |

### Tablo 10 — Emsal Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| EmsalApiDecisionEntry | id, daire, esasNo, kararNo, kararTarihi, arananKelime, durum, document_url | Liste öğesi |
| EmsalApiResponseInnerData | data[], recordsTotal, recordsFiltered, draw | Liste yanıtı |
| EmsalDocumentMarkdown | id, markdown_content, source_url | Doküman |

### 4.5 KİK (Kamu İhale Kurumu)

Kurum ve amaç: EKAP üzerinden Kurul Karar Sorgu sayfasında form tabanlı arama ve sonuç tablosundan karar ayrıştırma.[^10]

Fonksiyonlar:
- Playwright ile sayfa etkileşimi; insan davranışı simülasyonu ve stealth script enjeksiyonu.
- Form alanları (karar tipi radio; karar no; tarih aralığı; RG sayı/tarih; başvuru konusu/şikayetçi; ihale yapan idare; yıl; karar metni).
- __doPostBack ile arama ve sayfalama; sonuç tablosu HTML parsing (span id/lblKno/lblKtar vb.).
- Modal/iframe üzerinden doküman içeriği; KararId parametresinin çıkarımı; HTML→Markdown dönüşümü.

Arama ve analiz: Event target ve satır bazlı ayrıştırma ile karar no/tarih/idare/şikayetçi/ihale konusu elde edilir; Base64 composite ID (“karar_tipi|karar_no”) üretilir.

Veri modelleri: KikSearchRequest, KikDecisionEntry, KikSearchResult, KikDocumentMarkdown, KikKararTipi enum.

Riskler: Anti-bot tespitine takılma; oran sınırlaması; UI değişiklikleri; iframe/modal davranışı; Playwright kaynak tüketimi.

### Tablo 11 — KİK Arama Formu Alanları ve Olaylar

| Alan | Açıklama |
|---|---|
| karar_tipi (radio) | Uyumsuzlık/Düzenleyici/Mahkeme |
| karar_no | Karar numarası (“_” → “/” dönüşümü) |
| karar_tarihi_baslangic / bitis | DD.MM.YYYY |
| resmi_gazete_sayisi / resmi_gazete_tarihi | RG filtreleri |
| basvuru_konusu_ihale | İhale konusu |
| basvuru_sahibi | Şikayetçi |
| ihaleyi_yapan_idare | İdarenin adı |
| yil | Yıl seçimi |
| karar_metni | Tam metin arama |
| Olay | __doPostBack ile arama ve sayfalama |

### Tablo 12 — KİK Liste Satır Ayrıştırma ve ID Üretimi

| Alan | Lokatör/İpucu |
|---|---|
| preview_event_target | __doPostBack linkinden “eventTarget” |
| karar_no | span#lblKno (veya regex) |
| karar_tarihi | span#lblKtar (tarih deseni) |
| idare | cell[3] span (lblIdare) |
| basvuru_sahibi | cell[4] span (lblSikayetci) |
| ihale_konusu | cell[5] span (lblIhale) |
| karar_id | Base64(“karar_tipi.value|karar_no”) |

### Tablo 13 — KİK Doküman Alma Süreci ve Hata Noktaları

| Adım | Açıklama | Hata Durumu |
|---|---|---|
| Hedef arama | Karar_no ve tip ile hedeflenmiş arama | Sonuç yoksa geri dönüş |
| Modal açma | __doPostBack(eventTarget) | Timeout |
| iframe URL | KararGoster.aspx?KararId=… | URL yoksa uyarı |
| İçerik çekme | Yeni sayfa ile HTML içerik | Bozuk içerik |
| MD dönüşüm | MarkItDown + sayfalama | Dönüşüm hatası |

### 4.6 KVKK (Kişisel Verilerin Korunması Kurumu)

Kurum ve amaç: KVKK karar özetleri ve doküman içeriklerinin Brave Search ile keşfi; karar sayfalarından Markdown üretimi.[^12][^13]

Fonksiyonlar:
- Brave API ile “site:kvkk.gov.tr ‘karar özeti’” odaklı sorgular.
- Karar ID çıkarımı (Icerik/… yolundan); başlık içinden karar tarihi ve numarası regex çıkarımı.
- HTML’den “blog-post-inner” içerik çıkarımı; tablo alanlarından metadata; HTML→Markdown dönüşümü ve 5.000 karakter sayfalama.

Veri modelleri: KvkkSearchRequest, KvkkDecisionSummary, KvkkSearchResult, KvkkDocumentMarkdown.

Riskler: Üçüncü parti API kota ve kalite; sayfa yapısı değişikliği; HTML’den metadata çıkarımında hata.

### Tablo 14 — KVKK Arama Parametreleri ve Sonuç Modeli

| Alan | Açıklama |
|---|---|
| keywords | Brave sorgusu |
| page / pageSize | Sayfalama |
| Dönüşüm | Başlık → tarih/numara; URL → decision_id; HTML → MD (sayfalama) |

### Tablo 15 — KVKK Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| KvkkDecisionSummary | title, url, description, decision_id, publication_date, decision_number | Liste öğesi |
| KvkkSearchResult | decisions[], total_results, page, pageSize, query | Liste yanıtı |
| KvkkDocumentMarkdown | source_url, title, decision_date, decision_number, subject_summary, markdown_chunk, current_page, total_pages, is_paginated, error_message | Doküman |

### 4.7 Rekabet Kurumu

Kurum ve amaç: Rekabet Kurumu karar listeleri ve PDF dokümanlarının sayfa bazlı Markdown’a dönüştürülmesi.[^14][^15]

Fonksiyonlar:
- Kararlar sayfası HTML parsing; karar linklerinden “kararId” çıkarımı.
- Landing sayfadan PDF URL keşfi (a/iframe/embed); PDF indirme; tek sayfa çıkarımı (pypdf); sayfa → Markdown (MarkItDown).
- Sayfa tabanlı tüketim (current_page, total_pages).

Veri modelleri: RekabetKurumuSearchRequest, RekabetDecisionSummary, RekabetSearchResult, RekabetDocument.

Riskler: PDF yapısı (metin tabanlı vs taranmış); bağlantı desenleri değişirse kırılma; sayfa çıkarım başarısızlıklarında geri bildirim.

### Tablo 16 — Rekabet Arama Parametreleri

| Parametre | Açıklama |
|---|---|
| sayfaAdi | Başlık |
| YayinlanmaTarihi | Yayınlanma tarihi |
| PdfText | PDF metin filtresi |
| KararTuruID | Karar türü GUID (ALL dahil) |
| KararSayisi | Karar sayısı |
| KararTarihi | Karar tarihi |
| page | Sayfa |

### Tablo 17 — Rekabet PDF→MD Süreci

| Aşama | Açıklama |
|---|---|
| Landing HTML | “kararId” ile karar sayfasına git |
| PDF keşif | a/iframe/embed → PDF URL |
| İndirme | HTTP GET → bytes |
| Sayfa çıkarımı | pypdf ile istenen sayfa tek PDF |
| Dönüştürme | MarkItDown → Markdown |
| Sayfalama | PDF toplam sayfa → current/total |

### Tablo 18 — Rekabet Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| RekabetDecisionSummary | publication_date, decision_number, decision_date, decision_type_text, title, decision_url, karar_id, related_cases_url | Liste öğesi |
| RekabetSearchResult | decisions[], total_records_found, retrieved_page_number, total_pages | Liste yanıtı |
| RekabetDocument | source_landing_page_url, karar_id, title_on_landing_page, pdf_url, markdown_chunk, current_page, total_pages, is_paginated, error_message | Doküman |

### 4.8 Sayıştay

Kurum ve amaç: Genel Kurul, Temyiz Kurulu ve Daire kararları; ASP.NET WebForms oturum ve CSRF token; DataTables ile sayfalama.[^16][^17]

Fonksiyonlar:
- Oturum başlatma ve __RequestVerificationToken çıkarımı.
- DataTables parametreleri (draw, start, length); kolon tanımları ve sıralama.
- Her karar tipi için form verisi hazırlama ve POST.
- Detay URL’lerinden HTML→Markdown dönüşümü.

Veri modelleri: GenelKurul/Temyiz/Daire arama ve yanıt modelleri; SayistayDocumentMarkdown; Unified sözleşmeler.

Riskler: Token süresi ve oturum yenileme; sayfalama tutarlılığı; kolon/sıralama alanlarının API ile uyumu.

### Tablo 19 — Sayıştay Endpoint ve Form Alanları

| Karar Tipi | Endpoint | Form Verisi Örnekleri |
|---|---|---|
| Genel Kurul | /KararlarGenelKurul/DataTablesList | KARARNO, KARAREK, KARARTARIHBaslangic/Bitis, KARARTAMAMI, __RequestVerificationToken |
| Temyiz Kurulu | /KararlarTemyiz/DataTablesList | ILAMDAIRESI, YILI, KARARTRHBaslangic/Bitis, KAMUIDARESITURU, ILAMNO, DOSYANO, TEMYIZTUTANAKNO, TEMYIZKARAR, WEBKARARKONUSU |
| Daire | /KararlarDaire/DataTablesList | YARGILAMADAIRESI, KARARTRHBaslangic/Bitis, ILAMNO, KAMUIDARESITURU, HESAPYILI, WEBKARARKONUSU, WEBKARARMETNI |

### Tablo 20 — Sayıştay Sayfalama ve CSRF Yönetimi

| Unsur | Açıklama |
|---|---|
| draw | DataTables sayacı |
| start/length | Başlangıç ve kayıt sayısı |
| __RequestVerificationToken | Form içi CSRF token |
| Oturum | Cookie ve token storage |
| Yenileme | Gerektiğinde sayfa → token yenileme |

### Tablo 21 — Sayıştay Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| GenelKurulDecision / TemyizKuruluDecision / DaireDecision | id, karar_no, karar_tarih, karar_ozeti / temyiz_tutanak_tarihi, ilam_dairesi, temyiz_karar / yargilama_dairesi, karar_no, ilam_no, madde_no, kamu_idaresi_turu, hesap_yili, web_karar_konusu, web_karar_metni | Liste öğesi |
| GenelKurulSearchResponse / TemyizKuruluSearchResponse / DaireSearchResponse | decisions[], total_records, total_filtered, draw | Liste yanıtı |
| SayistayDocumentMarkdown | decision_id, decision_type, source_url, markdown_content, error_message | Doküman |

### 4.9 Uyuşmazlık Mahkemesi

Kurum ve amaç: Uyuşmazlık Mahkemesi kararlarının aranması ve doküman içeriğinin alınması.[^18][^19]

Fonksiyonlar:
- Form/x-www-form-urlencoded POST; Enum→ID haritaları (Bölüm, Uyuşmazlık türü).
- Karar sonucu checkbox’ları için GUID listeleri.
- HTML liste ayrıştırma (table-hover); popover content özetleri; PDF link seçimi.
- Doküman URL’inden HTML→Markdown dönüşümü.

Veri modelleri: UyusmazlikSearchRequest, UyusmazlikApiDecisionEntry, UyusmazlikSearchResponse, UyusmazlikDocumentMarkdown.

Riskler: Enum→ID haritalarının güncelliği; HTML yapı değişiklikleri; PDF link eksikliği.

### Tablo 22 — Uyuşmazlık Enum→ID Haritaları

| Kategori | Enum | API ID |
|---|---|---|
| Bölüm | TUMU/ALL | “” |
| Bölüm | CEZA_BOLUMU | GUID |
| Bölüm | GENEL_KURUL_KARARLARI | GUID |
| Bölüm | HUKUK_BOLUMU | GUID |
| Uyuşmazlık Türü | TUMU/ALL | “” |
| Uyuşmazlık Türü | GOREV_UYUSMAZLIGI | GUID |
| Uyuşmazlık Türü | HUKUM_UYUSMAZLIGI | GUID |
| Karar Sonucu | HUKUM_UYUSMAZLIGI_OLMADIGINA_DAIR | GUID |
| Karar Sonucu | HUKUM_UYUSMAZLIGI_OLDUGUNA_DAIR | GUID |

### Tablo 23 — Uyuşmazlık Liste Satır Alanları ve Linkler

| Alan | Açıklama |
|---|---|
| karar_sayisi / esas_sayisi | Karar ve esas no |
| bolum | Bölüm adı |
| uyusmazlik_konusu | Konu |
| karar_sonucu | Sonuç metni |
| popover_content | Özet içerik |
| document_url | Karar sayfası URL |
| pdf_url | PDF URL (varsa) |

### 4.10 Yargıtay

Kurum ve amaç: Yargıtay karar arama sistemi; detaylı arama ve doküman içeriği.[^1][^2]

Fonksiyonlar:
- /aramadetaylist POST (JSON/Form); “data” içinde arananKelime, birim, esas/karar yıl ve sıra, tarih aralıkları, sayfalama.
- Yanıtta “data.data” liste; document_url üretimi.
- /getDokuman ile JSON “data” içinde HTML; HTML→Markdown dönüşümü.

Veri modelleri: YargitayDetailedSearchRequest, YargitayApiDecisionEntry, YargitayApiResponseInnerData, YargitayApiSearchResponse, YargitayDocumentMarkdown, CompactYargitaySearchResult.

Riskler: Endpoint yolu ve davranış doğrulaması; “data” alanı yoksa varsayılan boş yanıt; SSL doğrulama devre dışı.

### Tablo 24 — Yargıtay Detaylı Arama Parametreleri

| Parametre | Açıklama |
|---|---|
| arananKelime | Kelime/ifade (operator destekli) |
| birimYrgKurulDaire | Daire/Kurul |
| esasYil / esasIlkSiraNo / esasSonSiraNo | Esas yıl ve sıra aralığı |
| kararYil / kararIlkSiraNo / kararSonSiraNo | Karar yıl ve sıra aralığı |
| baslangicTarihi / bitisTarihi | Tarih aralığı (DD.MM.YYYY) |
| pageSize / pageNumber | Sayfalama |

### Tablo 25 — Yargıtay Yanıt/Doküman Modeli

| Model | Alanlar | Açıklama |
|---|---|---|
| YargitayApiDecisionEntry | id, daire, esasNo, kararNo, kararTarihi, document_url | Liste öğesi |
| YargitayApiResponseInnerData | data[], recordsTotal, recordsFiltered | Liste yanıtı |
| YargitayDocumentMarkdown | id, markdown_content, source_url | Doküman |

### 4.11 Bedesten

Kurum ve amaç: Adalet Bakanlığı Bedesten sistemi; Yargıtay/Danıştay ve diğer mahkeme türleri için alternatif arama ve doküman.[^11]

Fonksiyonlar:
- /emsal-karar/searchDocuments (JSON) ile arama; birimAdi haritalaması (kısa → tam ad).
- /emsal-karar/getDocumentContent (JSON) ile base64 içerik çekme; HTML/PDF → Markdown dönüşümü.

Veri modelleri: BedestenSearchRequest, BedestenSearchResponse, BedestenDocumentRequest/Response, BedestenDocumentMarkdown.

Riskler: BirimAdi haritalarının eksiksizliği; base64 içerik ve MIME türü doğruluğu; applicationName başlığı.

### Tablo 26 — Bedesten Arama Parametreleri

| Parametre | Açıklama |
|---|---|
| data.pageSize / pageNumber | Sayfalama |
| data.itemTypeList | Mahkeme türü listesi (YARGITAYKARARI, DANISTAYKARAR, …) |
| data.phrase | Arama ifadesi (operatörler destekli) |
| data.birimAdi | Birim filtre (kısa → tam ad haritası) |
| data.kararTarihiStart / End | Tarih aralığı |
| data.sortFields / sortDirection | Sıralama |

### Tablo 27 — Bedesten Doküman Alma ve Dönüştürme

| Adım | Açıklama |
|---|---|
| Doküman isteği | documentId ile JSON POST |
| Base64 içerik | content (HTML/PDF) |
| MIME türü | text/html veya application/pdf |
| Dönüşüm | MarkItDown → Markdown |

## 5) Karşılaştırmalı Özet: Fonksiyonlar, Parametreler ve Dönüştürme

Modüller arası fonksiyonel eşleşmeler, arama parametreleri ve dönüştürme katmanı bakımından aşağıda özetlenmiştir. Bu özet, MCP entegrasyon katmanında ortak bir sözleşme tasarlarken hangi alanların zorunlu ve hangilerinin opsiyonel olacağına dair temel bir çerçeve sunar.

### Tablo 28 — Modüller Arası Özellik Karşılaştırması

| Modül | Arama Tipleri | Pagination | Filtreler | Doküman Erişim | Dönüştürme | Sayfalama |
|---|---|---|---|---|---|---|
| Anayasa | Kelime + gelişmiş | Sayfa | Dönem, tür, tarih, RG, üyeler/raportör, norm bilgisi | HTML sayfa | HTML→MD | 5.000 karakter |
| BDDK | API keşif | Yok | Anahtar kelime | HTML/PDF | HTML/PDF→MD | 5.000 karakter |
| Danıştay | Keyword/Detailed | Sayfa | Daire, mevzuat, tarih, esas/karar no | HTML | HTML→MD | Tekil doküman |
| Emsal | Detailed | Sayfa | Mahkeme türü, birim, yıl/sıra, tarih | HTML | HTML→MD | Tekil doküman |
| KİK | Form tabanlı | Sayfa | Karar tipi, no, tarih, RG, konu, taraf, idare | Modal/iframe | HTML→MD | 5.000 karakter |
| KVKK | API keşif | Var | Anahtar kelime | HTML | HTML→MD | 5.000 karakter |
| Rekabet | Form/HTML | Var | Karar türü, tarih, sayı, metin | PDF | PDF→MD (sayfa) | PDF sayfa bazlı |
| Sayıştay | DataTables | Var | Daire, konu, tarih, ilam no, hesap yılı | HTML | HTML→MD | Tekil doküman |
| Uyuşmazlık | Form + HTML | Yok | Bölüm, tür, sonuç, tarih, no, RG | HTML/PDF | HTML→MD | Tekil doküman |
| Yargıtay | Detailed | Sayfa | Birim, yıl/sıra, tarih | HTML | HTML→MD | Tekil doküman |
| Bedesten | JSON | Var | Mahkeme türü, birim, tarih, ifade | Base64 | HTML/PDF→MD | Tekil doküman |

### Tablo 29 — Sayfalama Stratejileri Karşılaştırması

| Modül | Sayfalama Türü | Sınır/Tavan | Not |
|---|---|---|---|
| Anayasa | Sayfa numarası (1–100) | results_per_page (1–10) | 5.000 karakter doküman sayfalama |
| BDDK | Üçüncü parti API | pageSize (1–50) | Tavily pagination yok |
| Danıştay | pageNumber | pageSize (1–10) | DataTables benzeri |
| Emsal | page_number | page_size (1–10) | Payload alias uyumu |
| KİK | __doPostBack | — | UI sayfalama linkleri |
| KVKK | offset tabanlı | count (1–10) | Brave API |
| Rekabet | HTML “Toplam :” | — | Toplam kayıt ve son sayfa linkinden |
| Sayıştay | DataTables (start/length) | length (1–10) | CSRF + oturum |
| Uyuşmazlık | Yok | — | Tek sayfa sonuç listesi |
| Yargıtay | pageNumber | pageSize (1–10) | “data” alanına bağlı |
| Bedesten | pageNumber | pageSize (1–10) | JSON tabanlı |

### Tablo 30 — Dönüştürme Yaklaşımı Karşılaştırması

| Modül | Dönüştürme | Yöntem | Sayfalama |
|---|---|---|---|
| Anayasa | HTML→MD | MarkItDown | 5.000 karakter |
| BDDK | HTML/PDF→MD | MarkItDown | 5.000 karakter |
| Danıştay | HTML→MD | MarkItDown | Tekil |
| Emsal | HTML→MD | MarkItDown | Tekil |
| KİK | HTML→MD | MarkItDown | 5.000 karakter |
| KVKK | HTML→MD | MarkItDown | 5.000 karakter |
| Rekabet | PDF→MD | pypdf + MarkItDown | PDF sayfa bazlı |
| Sayıştay | HTML→MD | MarkItDown | Tekil |
| Uyuşmazlık | HTML→MD | MarkItDown | Tekil |
| Yargıtay | HTML→MD | MarkItDown | Tekil |
| Bedesten | HTML/PDF→MD | MarkItDown | Tekil |

## 6) Güvenlik, Uyumluluk ve Etik Kullanım İlkeleri

Robots.txt ve kullanım şartları: KİK ve diğer kurum sitelerinin robots.txt ve kullanım şartlarına uyum esastır. Playwright ile insan davranışı simülasyonu ve stealth enjeksiyonu, anti-bot sistemlere saygı ve oran sınırlama ile birlikte uygulanmalıdır. Kritik bölümlerde bekleme süreleri ve hız limitleri konfigüre edilmelidir.[^10]

Üçüncü parti API kullanımı: BDDK (Tavily) ve KVKK (Brave) aramalarında API anahtar güvenliği, kota ve maliyet takibi, geriye dönük caching ve sonuç kalitesinin değerlendirilmesi gereklidir.[^6][^13]

Veri koruma ve gizlilik: KVKK karar içerikleri ve UYAP/Emsal verileri, kişisel veriler ve hassas bilgiler açısından uygun şekilde ele alınmalı; paylaşım ve saklama süreleri kurum politikalarıyla uyumlu olmalıdır.[^12]

SSL/TLS ve anti-bot: Bazı modüllerde SSL doğrulama devre dışıdır (ör. Danıştay/Yargıtay/Emsal istemci ayarları). Üretimde doğrulama etkinleştirilmeli; yalnızca geçici test ortamları için devre dışı bırakılmalıdır.[^1][^2][^8][^9]

Oran sınırlaması ve kaynak kullanımı: Playwright oturumları ve sayfa zaman aşımı değerleri optimize edilmeli; retry/backoff ve idempotent tasarım uygulanmalıdır.蕴

## 7) Operasyonel Riskler ve Sürdürülebilirlik

HTML yapısı değişiklikleri: Parsing’e dayalı modüller (Anayasa, KİK, KVKK, Rekabet, Uyuşmazlık) yapı değişikliklerine duyarlıdır. Lokatör tabanlı ayrıştırma yerine daha dayanıklı seçiciler ve test kapsamı gereklidir.[^10][^14][^18]

Anti-bot güncellemeleri: KİK, stealth ve insan davranışı simülasyonu kullansa da güncellemeler karşısında kırılgan olabilir; izleme ve hızlı adaptasyon süreci şarttır.[^10]

Üçüncü parti API bağımlılığı: BDDK (Tavily) ve KVKK (Brave) aramalarında dış bağımlılıklar maliyet, kota ve kalite risklerini beraberinde getirir. Caching ve offline indeksleme stratejileri değerlendirilmelidir.[^6][^13]

Observability: Hata ve timeout, parsing istisnaları, dönüştürme hataları (MarkItDown/pypdf) için merkezi loglama, izleme ve uyarı mekanizmaları kurulmalıdır.

## 8) Önerilen MCP Entegrasyon Katmanı Tasarımı

MCP araç sözleşmesi: Modüller arası ortak bir araç seti standardize edilmelidir:
- list_search(module, query, filters, pagination)
- get_document(module, doc_id | url, page_number)

Tip-adaptörler: Her modül için ayrı adaptör; ortak sözleşmeye map edilir. Örneğin “Ayrıntılı Arama” (Yargıtay/Danıştay/Emsal) → list_search; “Liste Arama” (Anayasa/KVKK/Rekabet/Sayıştay) → list_search; “Doküman İndirme” (tümü) → get_document.

Hata dayanıklılığı: Retry/backoff, zaman aşımı, bölümsel başarı (partial success), boş yanıt/kısmi dönüşüm, sürdürülebilir loglama.

Veri normalizasyonu: Karar özetleri için ortak meta (kurum, karar no/tarihi, kaynak URL, tür); tam metin için Markdown sayfalama; PDF sayfa referansı.

Güvenlik ve uyumluluk: oran sınırlaması, cache politikaları, PII işleme kuralları, kaynak attribution.

### Tablo 31 — Önerilen MCP Araç/Parametre Matrisi

| Araç | Zorunlu Parametreler | Opsiyonel Parametreler | Modül Kapsaması |
|---|---|---|---|
| list_search | module, query | filters, pagination | Anayasa, BDDK, Danıştay, Emsal, KİK, KVKK, Rekabet, Sayıştay, Uyuşmazlık, Yargıtay, Bedesten |
| get_document | module, doc_id_or_url | page_number | Tüm modüller |

### Tablo 32 — Normalize Edilmiş Veri Şeması

| Alan | Açıklama |
|---|---|
| institution | Kurum adı (Anayasa/Yargıtay/Danıştay/KİK/Sayıştay/KVKK/BDDK/Rekabet/Uyuşmazlık/Bedesten) |
| decision_type | Norm Denetimi / Bireysel Başvuru / Genel Kurul / Temyiz / Daire / Uyusmazlık vb. |
| decision_no | Karar no / Esas-Karar no |
| decision_date | Karar tarihi (DD.MM.YYYY veya ISO) |
| source_url | Kaynak doküman sayfası |
| content_type | text/html / application/pdf |
| content | Markdown chunk (sayfa) veya tekil içerik |
| pagination | current_page, total_pages (MD veya PDF sayfa bazlı) |
| metadata | Ek bilgi (RG, daire, konu, taraf, vb.) |

## 9) Uygulama Planı, Test Stratejisi ve Kalite Güvencesi

Aşamalı entegrasyon: Modüllerin risk ve bağımlılık seviyelerine göre sıralanması önerilir.
1) Yargıtay/Danıştay/Emsal (JSON/Form ve HTML dönüştürme),
2) Sayıştay (DataTables + CSRF),
3) Anayasa (HTML parsing + MD),
4) KİK (Playwright, anti-bot),
5) Rekabet (PDF keşfi ve pypdf),
6) BDDK/KVKK (API keşif + MD).

Test çiftleri: Birim testleri (payload üretimi, parsing, dönüştürme), entegrasyon testleri (endpoint şemaları ve oturum/CSRF), uçtan uca testler (arama → doküman → MD sayfalama).

Mock ve fixture’lar: Örnek HTML/JSON yanıtları; PDF örnekleri; ayrıştırma birim testleri; PDF→MD tek sayfa çıkarımı.

Kalite metrikleri: 
- Dönüştürme doğruluğu (HTML/PDF → MD),
- Sayfalama tutarlılığı,
- Hata oranları (timeout/404/500),
- Süreklilik (HTML değişikliklerine uyum).

### Tablo 33 — Test Kapsam Matrisi (Örnek)

| Modül | Test Türü | Kapsam | Metrik |
|---|---|---|---|
| Anayasa | Entegrasyon | Arama + MD sayfalama | Başarılı dönüşüm oranı |
| Danıştay | Birim | Payload temizleme | Boş alan kaldırma doğruluğu |
| KİK | Uçtan uca | Form → modal/iframe → MD | Hata/timeout oranı |
| Rekabet | Birim | PDF sayfa çıkarımı | Sayfa sayısı doğruluğu |
| Sayıştay | Entegrasyon | CSRF oturum + DataTables | draw/start/length tutarlılığı |
| KVKK | Entegrasyon | Brave keşif + HTML→MD | Boş içerik uyarı oranı |
| BDDK | Entegrasyon | Tavily keşif + MD | Toplam sonuç tutarlılığı |
| Bedesten | Birim | Base64 → MIME → MD | Bozuk içerik tespiti |
| Uyuşmazlık | Entegrasyon | Enum→ID + parsing | GUID harita doğruluğu |
| Yargıtay | Birim | data alanı kontrolü | Varsayılan boş yanıt doğruluğu |

## 10) Bilgi Boşlukları ve Doğrulama Notları

- Resmi endpoint yollarının bazıları net değil veya doğrulama gerektiriyor: Yargıtay/Danıştay/Emsal’de arama yolu ile form eşleşmesi, KİK iframe iç kaynakları, Rekabet Kurumu PDF link kalıpları.
- KİK anti-bot ve tarayıcı otomasyon tercihlerinin üretim ortamı uyumluluğu ve oran sınırlamaları.
- BDDK ve KVKK’de üçüncü parti arama API’lerinin kotaları, maliyetleri ve rate limit politikaları.
- Yargıtay/Danıştay/Emsal pagination parametrelerinin kesin sınırları.
- Arama sonuç çıktılarının normalize edilmiş meta veri alanlarının standardizasyonu.
- Kaynak sitelerin HTML yapılarında olası değişiklikler.
- Kapsamlı alan sözlüklerinin eksik kısımları (ör. Uyuşmazlık “Karar Sonucu” tüm checkbox’ları).
- mcp_auth modülünün bağlanma biçimi ve CORS/uygulama mimarisi.
- Risk ve ölçeklenebilirlik ölçümleri (eşzamanlı oturum sayısı, beklenen TPS).

Bu boşluklar, üretim öncesi doğrulama ve test planında öncelikli iş kalemleri olarak ele alınmalıdır.

## 11) Sonuç ve Eylem Maddeleri

Yargi-MCP’nin hukuki kurum modülleri, çok farklı erişim ve dönüştürme desenlerini bir araya getirir. JSON/Form ve DataTables ile çalışan Yargıtay, Danıştay, Emsal ve Sayıştay modülleri daha öngörülebilir bir yapı sunarken; KİK ve Rekabet gibi modüller, sırasıyla Playwright ve PDF süreçleri nedeniyle operasyonel hassasiyet taşır. BDDK ve KVKK, üçüncü parti API bağımlılığıyla keşfi kolaylaştırsa da kota ve maliyet boyutlarının yönetimi kritik önemdedir.

Önerilen MCP entegrasyon katmanı ile araç sözleşmesi ve tip-adaptörler üzerinden normalizasyon sağlanarak, modül bazlı farklılıkların üst katmanda gizlenmesi ve tüketim deneyiminin birleştirilmesi mümkündür. Operasyonel riskler, gözlemlenebilirlik ve test kapsamı güçlendirilerek yönetilmelidir.

Aşağıdaki eylem planı, üretim yol haritasının temel taşlarını oluşturur:

### Tablo 34 — Eylem Planı

| Görev | Modül | Öncelik | Sorumlu | Bağımlılıklar | Hedef Tarih |
|---|---|---|---|---|---|
| JSON/Form uç noktalarının doğrulaması | Yargıtay, Danıştay, Emsal | Yüksek | Ürün+Mühendislik | Kaynak site test | Kısa vade |
| DataTables + CSRF oturum yönetimi | Sayıştay | Yüksek | Mühendislik | Session token yenileme | Kısa vade |
| HTML parsing stabilizasyonu | Anayasa, Uyuşmazlık, KVKK, Rekabet | Orta | Mühendislik | UI değişiklik izleme | Orta vade |
| Playwright anti-bot uyumluluğu | KİK | Yüksek | Mühendislik+Uyum | Oran sınırı politikaları | Kısa vade |
| PDF→MD süreç sertleştirmesi | Rekabet | Orta | Mühendislik | pypdf + MarkItDown tuning | Orta vade |
| Üçüncü parti API yönetimi | BDDK, KVKK | Orta | Ürün+Finans | Kota ve caching stratejisi | Orta vade |
| MCP araç sözleşmesi tasarımı | Tümü | Yüksek | Mühendislik | Tip-adaptör şeması | Kısa vade |
| Normalize veri şeması ve meta | Tümü | Yüksek | Mühendislik+Ürün | Sözleşme onayı | Kısa vade |
| Observability ve test kapsamı | Tümü | Yüksek | Mühendislik | CI/CD pipeline | Orta vade |
| Uyum ve güvenlik denetimi | Tümü | Yüksek | Uyum | robots.txt, SSL, PII | Sürekli |

---

## Referanslar

[^1]: Yargıtay Karar Arama Sistemi (Resmi Site). https://karararama.yargitay.gov.tr  
[^2]: Yargıtay Karar Arama - Detaylı Arama Endpoint (Yol). https://karararama.yargitay.gov.tr/aramadetaylist  
[^3]: Yargıtay Karar Arama - Döküman Endpoint (Yol). https://karararama.yargitay.gov.tr/getDokuman  
[^4]: Anayasa Mahkemesi Norm Denetimi Kararları Bilgi Bankası (Resmi Site). https://normkararlarbilgibankasi.anayasa.gov.tr  
[^5]: Anayasa Mahkemesi - Ara (Norm Denetimi Arama) Endpoint (Yol). https://normkararlarbilgibankasi.anayasa.gov.tr/Ara  
[^6]: Tavily Search API. https://api.tavily.com/search  
[^7]: BDDK Resmi Sitesi. https://www.bddk.org.tr  
[^8]: Danıştay Karar Arama (Resmi Site). https://karararama.danistay.gov.tr  
[^9]: Emsal (UYAP) Karar Arama Sistemi (Resmi Site). https://emsal.uyap.gov.tr  
[^10]: EKAP - KİK Kurul Karar Sorgu Sayfası. https://ekap.kik.gov.tr/EKAP/Vatandas/kurulkararsorgu.aspx  
[^11]: Bedesten (Adalet Bakanlığı) - Arama Endpoint (Yol). https://bedesten.adalet.gov.tr/emsal-karar/searchDocuments  
[^12]: Kişisel Verilerin Korunması Kurumu (Resmi Site). https://www.kvkk.gov.tr  
[^13]: Brave Search API. https://api.search.brave.com/res/v1/web/search  
[^14]: Rekabet Kurumu (Resmi Site). https://www.rekabet.gov.tr  
[^15]: Rekabet Kurumu - Kararlar Listesi Sayfası (Yol). https://www.rekabet.gov.tr/tr/Kararlar  
[^16]: Sayıştay (Resmi Site). https://www.sayistay.gov.tr  
[^17]: Sayıştay - Genel Kurul Kararları DataTables Endpoint (Yol). https://www.sayistay.gov.tr/KararlarGenelKurul/DataTablesList  
[^18]: Uyuşmazlık Mahkemesi Kararları (Resmi Site). https://kararlar.uyusmazlik.gov.tr  
[^19]: Uyuşmazlık Mahkemesi - Arama Endpoint (Yol). https://kararlar.uyusmazlik.gov.tr/Arama/Search