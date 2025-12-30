# Truth Re:Build AI Uygulaması Erişilebilirlik Analizi ve İyileştirme Stratejisi (WCAG 2.1 AA Odaklı)

## Yönetici Özeti ve Kapsam

Bu rapor, Truth Re:Build AI uygulamasının erişilebilirlik olgunluğunu Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.1 Level AA düzeyi perspektifinden değerlendirir; tespit edilen kritik boşluklar için somut düzeltmeler ve bileşen düzeyinde uygulama stratejileri sunar. İnceleme, iki ana bileşen üzerinden gerçekleştirilmiştir: üst seviye uygulama ve sekme yapısını taşıyan App.tsx ve analiz/oynatım akışlarını barındıran AnalysisTab.tsx. Bulgular, erişilebilirliğin temel direkleri olan Algılanabilir, İşletilebilir, Anlaşılabilir ve Sağlam (POUR) ilkeleri ekseninde gruplandırılmıştır.[^1]

Genel sonuç: Uygulama, semantik yapı, ekran okuyucu uyumluluğu, klavye erişilebilirliği ve canlı medya bölgelerinin duyurulması gibi alanlarda AA hedefi için anlamlı iyileştirmelere ihtiyaç duymaktadır. En kritik boşluklar beş başlıkta toplanır: (i) skip-link ve doğru landmark kullanımıyla klavye kısayollarının güçlendirilmesi, (ii) tablist/tabpanel desenine uygun ARIA ve klavye davranışı, (iii) ikon butonlarda erişilebilir isim (accessible name) sağlanması ve gereksiz ARIA’dan kaçınma, (iv) TTS/sesli anlatım için live region (aria-live), durdur/durdur-ve-okut gibi kontrol desenleri ve kullanıcı tercihlerinin kalıcılığı, (v) kontrast ve görsel-işitsel ayrışma ilkeleriyle tasarımın AA’ya yükseltilmesi.[^1]

İş değeri ve risk: Bu iyileştirmeler, motor engelli kullanıcılar ve ekran okuyucu kullanıcıları başta olmak üzere geniş bir kullanıcı kitlesi için uygulamayı fiilen kullanılabilir hale getirir; yasal uyum riskini azaltır; kalite ve güven algısını güçlendirir; TTS ile hukuki içeriklerin anlaşılabilirliğini artırır. Uygulama planı, bileşen bazlı teknik değişiklikleri, test/CDP (Continuous Delivery Pipeline) pratiklerini ve geriye dönük uyumluluğu (regressive) kapsar.

Hızlı kazanımlar (0–2 hafta):
- Skip-link ekleme, header/nav/main/footer landmark’larını semantikleştirme, varsayılan outline’ı geri getirme ve görünür odak göstergeleri.
- Tüm ikonlu butonlara aria-label veya görünür metinle erişilebilir isim.
- audioService ve dinamik oynatma akışında aria-live ile durum duyuruları.
- “Play Analysis”/“Full Court Simulation” gibi eylemler için aria-disabled ve klavye kısayolu bilgilendirmeleri.

Orta vadeli (2–6 hafta):
- Tabs ve sekme içi kontrollerde roving tabindex ile klavye desteği; tablist/tabpanel ARIA desenleri; focus management iyileştirmeleri.
- TTS ayarları (hız, ses, oynatma, sessize alma, durdurma) için erişilebilir kontroller, kullanıcı tercihlerinin kalıcılığı.
- Renk körlüğü ve AA kontrast hedeflerine yönelik tema/token iyileştirmeleri.

Uzun vadeli (6+ hafta):
- Gelişmiş TTS: rol bazlı sesli örnekler, dil/bölge/aksan seçimi, kuyruğa alma.
- Hukuki metinlerin yapılandırılmış okuma deneyimi (özet, anahtar cümleler, kaynak, uyarılar).
- Özel bileşenler için ARIA Authoring Practices (APG) desenlerinin standartlaştırılması ve CI/CD otomasyonuna derin entegrasyon.[^3]

Bu raporda sunulan düzeltmeler, React’in erişilebilirlik ilkeleri ve semantikleştirme pratiğiyle uyumlu biçimde, minimum kırılma ve en yüksek etki prensibiyle önceliklendirilmiştir.[^2]

## Metodoloji ve Kanıt Tabanı

Analiz iki düzeyde yürütüldü: kod yapısı ve bileşen davranışları. App.tsx’te başlık/brand, üst navigasyon (tabs), ana içerik ve footer bölümleri incelenirken, AnalysisTab.tsx’te bölümler (precedents, witness, timeline, scenario), TTS/oynatım butonları ve dinamik durum mesajları değerlendirildi. Erişilebilirlik değerlendirmesi; semantik (landmarks, headings), isimlendirme (accessible name), ARIA kullanımı, klavye etkileşim modeli ve görsel kontrast eksenlerinde WCAG 2.1 AA gereksinimleri ile karşılaştırmalı yapıldı.[^1] React’e özgü uygulama notları (ARIA nitelikleri, Fragment kullanımı, focus yönetimi ve Refs) referans alındı.[^2]

Sınırlamalar: audioService, mock veri setleri ve geri kalan sekmelerin (SearchTab, ChatTab, UploadTab, AboutTab) uygulama detayları bu kapsamda görülemedi. Bu nedenle, platform genelinde kural/ilke düzeyinde öneriler geliştirildi; gerekli görülen yerlerde “bilgi boşluğu” notları düşüldü.

## Mevcut Uygulamanın Erişilebilirlik Durumu: App.tsx

Üst düzey yapı koyu tema (bg-gray-900) üzerinde içerik sunar; header, nav ve footer bölümleri görsel olarak ayrışır. Sekmeler, görsel bir tab şeridi içinde butonlarla temsil edilir. Ancak, sekme listesinin tablist/tabpanel ARIA modeliyle tanımlanmadığı ve klavye etkileşimlerinin (roving tabindex, ok tuşlarıyla sekme geçişi) bulunmadığı görülür. İkonlu butonlar (User, LogOut, Play/Pause/Stop) için görünür metin veya aria-label ile erişilebilir isim sağlanmamıştır. “Skip to main content” bağlantısı yoktur; landmark kullanımı (header/nav/main/footer) semantikleştirilmemiştir. Odak göstergelerinin varsayılan tarayıcı davranışına müdahale edilip edilmediği belirsizdir.

Bu bulgular, klavye kullanıcıları ve ekran okuyucu kullanıcıları için kritik bir erişilebilirlik açığı yaratır: sekmeler, ok tuşlarıyla gezilemez; ikonlu eylemlerde isim belirsizliği nedeniyle amaç/kapsam ekran okuyucu tarafından doğru anonslanamaz; skip-link olmadan uzun içerikte gezinme yorucu ve yavaştır. Aşağıdaki tablo, WCAG 2.1 AA kriterleri ile mevcut durumu karşılaştırmalı olarak özetler.[^1][^7][^8][^9]

Tablo 1 — App.tsx için WCAG 2.1 AA uyum matrisi (özet)

| Kriter (WCAG 2.1) | Durum | Etki | Öneri Özeti |
|---|---|---|---|
| 2.1.1 Keyboard | Kısmi | Sekmeler klavye ile erişilebilir ancak ok tuşlarıyla sekme geçişi yok; ikonlu butonlara odak var ama isimlendirme eksik | roving tabindex ile sekme klavye davranışı; tüm butonlara aria-label |
| 2.4.1 Bypass Blocks (Skip-link) | Yok | İçeriğe atlamak için uzun liste/sekme traversal zor | Sayfanın başına skip-link ekle; odak main’e yönlensin |
| 2.4.2 Page Titled | Belirsiz | Sayfa başlığı yönetimi görünmüyor | document.title’ı dinamik ayarla (sekme/bölüm adı) |
| 2.4.3 Focus Order | Kısmi | Varsayılan DOM sırası uygun ama custom widget’larda risk | Focus management testi ve gerektiğinde programatik yönetim |
| 2.4.6 Headings and Labels | Kısmi | Header ve başlıklar görsel olarak var; hiyerarşik anons belirsiz | Hiyerarşik başlık yapısı (h1–h3) ve landmark ile semantikleştir |
| 2.4.7 Focus Visible | Belirsiz | Outline kaldırılmış olabilir | Varsayılan outline’ı koru veya görünür odak stili tanımla |
| 4.1.2 Name, Role, Value | Kısmi | İkon butonlarda isim eksik; TTS durumlarının duyurumu yok | aria-label; aria-live polite ile durum duyuruları |
| 3.2.1 On Focus | Kısmi | Odakla tetiklenen davranış belirsiz | Odakla içerik değişikliğinden kaçın |
| 1.4.3 Contrast (Minimum) | Kısmi | Koyu temada kontrast genelde uygun; hover/disabled ayrımı riskli | AA kontrastına göre token/tema doğrula |
| 3.3.5 Help | Değerlendirilemedi | Yardım/özet bilgi metinleri sınırlı | Hukuki içerik için yardım, uyarı ve kaynak alanları yapısallaştır |

Bu matristeki kritik satırlar (2.1.1, 2.4.1, 2.4.7, 4.1.2) AA hedefinin çekirdeğini oluşturur. Skip-link’in eklenmesi, sekmelerin APG tablist/tabpanel desenine uyarlanması ve ikon butonların isimlendirilmesi, kısa vadede en yüksek etkiyi yaratacaktır.[^3][^8][^9]

## Mevcut Uygulamanın Erişilebilirlik Durumu: AnalysisTab.tsx

AnalysisTab, “precedents”, “witness”, “timeline”, “scenario” bölümlerini içeren bir sekme yapısına ve yoğun TTS/oynatım davranışına sahiptir. Görsel olarak her bölümde kartlar, listeler ve durum rozetleri bulunur. Erişilebilirlik açısından kritik bulgular:

- İkonlu butonlar (Play, Pause, Stop, ses aç/kapa) aria-label veya görünür metinle desteklenmediğinde ekran okuyucuda amaç belirsiz kalabilir. “Full Court Simulation” gibi özel eylemler de aynı şekilde isimlendirilmeyi gerektirir.
- TTS oynatma durumunun ekran okuyucuya duyurulması için canlı medya bölgesi (aria-live) kullanılmamıştır. “Playing Audio...” görsel göstergesi, yardımcı teknolojiler tarafından algılanmayabilir.
- Sekme içi araç çubuğu ve butonlar roving tabindex ile yönetilmediğinde klavye deneyimi parçalı kalabilir. Tabpanel’lerdeki odak başlangıcı ve focus trap gereksinimi değerlendirilmelidir.
- Zaman çizelgesi ve olasılık/önem rozetleri (high/medium vb.) yalnızca renk ile ayrıştırılmıştır; ek metinsel açıklama veya ikon+metin birleşimi olmadan renk körlüğü senaryolarında anlam kaybı oluşabilir.
- AA kontrast oranları için doğrulama yapılmalı; koyu tema üzerinde sarı/yeşil/yeşilimsi/altın renklerin 4.5:1 eşiğini karşıladığından emin olunmalıdır.[^6]

Aşağıdaki tablo, kritik bileşenler için risk/öncelik matrisi sunar.

Tablo 2 — AnalysisTab bileşenleri için risk ve öncelik

| Bileşen | Erişilebilirlik Riski | Etki | Öncelik | Öneri |
|---|---|---|---|---|
| Play/Pause/Stop butonları | İkon-only, isim yok | Yüksek | P0 | aria-label; varsa görünür metin; Space/Enter davranışı doğrula |
| “Full Court Simulation” | Amaç/kapsam belirsiz | Yüksek | P0 | aria-label + kısa açıklayıcı; klavye kısayolu bilgisi |
| TTS oynatma durumu | Live region yok | Yüksek | P0 | aria-live=polite ile durum duyuruları; “Durdur/İlerlet” komutları |
| Timeline rozetleri | Renk ile anlam | Orta | P1 | Metinsel etiket + ikon; tooltipleri aria-describedby ile bağla |
| İçerik bölümü tablist | Klavye deseni eksik | Yüksek | P0 | tablist/tabpanel + roving tabindex; Tab/←/→/Home/End |
| Kontrast (sarı/yeşil) | AA riski | Orta | P1 | Token/tema doğrulaması; 3:1 büyük metin, 4.5:1 normal metin |

Renk körlüğü uyumu için tek başına renk yeterli değildir; AA gereksinimlerine uygun kontrast ve metinsel ipuçları ile ayrışma sağlanmalıdır.[^6][^13]

## WCAG 2.1 AA Uyum Matrisi ve Önceliklendirme

AA hedefini hızla yakalamak için kritik kriterleri sıralıyoruz. Skip-link (2.4.1), klavye (2.1.1), focus görünürlüğü (2.4.7), anlam ve isim/rol/değer (4.1.2), kontrast (1.4.3), odak sırası (2.4.3) ilk grupta ele alınmalıdır.[^1][^7]

Tablo 3 — WCAG 2.1 AA uyum matrisi (öz)

| Kriter | Mevcut Durum | Etki | Düzeltme | Öncelik |
|---|---|---|---|---|
| 2.4.1 Bypass Blocks | Skip-link yok | Yüksek | “Skip to main content” + odak main’e | P0 |
| 2.1.1 Keyboard | Tabs/ikon-butonlarda eksikler | Yüksek | roving tabindex, ok tuşları, Enter/Space | P0 |
| 2.4.7 Focus Visible | Belirsiz/kapalı olabilir | Yüksek | outline geri; görünür focus stili | P0 |
| 4.1.2 Name, Role, Value | İkon isimleri ve live region yok | Yüksek | aria-label; aria-live; role doğruluğu | P0 |
| 1.4.3 Contrast | Doğrulanmamış | Orta | Token/tema kontrastı AA’ya çek | P1 |
| 2.4.3 Focus Order | Kısmi | Orta | Odak akışını semantikleştir | P1 |
| 2.4.6 Headings and Labels | Kısmi | Orta | h1–h3 hiyerarşisi; landmark’lar | P1 |
| 3.2.1 On Focus | Belirsiz | Orta | Odakla içerik değişiminden kaçın | P1 |
| 3.3.5 Help | Sınırlı | Düşük | Hukuki içerikte yardım alanları | P2 |

## Screen Reader Uyumluluğu ve ARIA Stratejisi

Ekran okuyucu kullanıcıları için semantik ve isimlendirme esastır. Mümkün olduğunda native HTML elementleri tercih edilmeli; ARIA, semantiğin yetmediği yerde tamamlayıcı olarak kullanılmalıdır. Tabs için tablist/tabpanel, ikonlu eylemler için aria-label, açılabilir alanlar için aria-expanded/aria-haspopup/aria-controls, durum duyuruları için aria-live ve rozet/etiket ilişkileri için aria-describedby önerilir.[^4][^3][^2]

- Tabs (nav sekmeleri ve AnalysisTab sekmeleri): container’ı role="tablist", her sekmeyi role="tab", içerik panelini role="tabpanel" olarak tanımlayın. Ok tuşlarıyla sekme gezintisi, Enter/Space ile etkinleştirme; roving tabindex ile yalnızca aktif sekmede tabindex="0".[^3]
- İkonlu butonlar: Görünür metin yoksa aria-label ile amacı açıkça ifade edin (ör. “Durdur”, “Play Analysis”, “Full Court Simulation”). SVG iconlar için de aynı ilke geçerlidir.[^2]
- TTS durumları: Oynatım başlatıldığında/durdurulduğunda aria-live="polite" ile ekran okuyucuya “Analiz oynatılıyor…”, “Oynatma durduruldu” gibi kısa ve zamansal sıralı duyurular yapın.
- Yardımcı açıklamalar: Rozet etiketleri (ör. “Yüksek önem”) aria-describedby ile ilgili metin öğelerine bağlanmalı; tooltip kullanımında da aynı yaklaşım izlenmelidir.

Uygulamada, React JSX içinde aria-* nitelikleri doğrudan desteklenir; camelCase vs. kebap-case farkı önemlidir (ör. aria-expanded). Fragment’lar ile semantik yapı korunmalı; Refs ile programatik odak yönetimi yapılmalıdır.[^2]

## Klavye Navigasyonu ve Motor Engelli Kullanıcılar İçin Ergonomi

Klavye, motor engelli kullanıcılar için birincil etkileşim aracıdır. Bu nedenle standart klavye kalıplarına titiz uyum gerekir: Tab/Shift+Tab ile gezinme; Enter/Space ile etkinleştirme; ok tuşlarıyla tab/accordion/menu/slider hareketi; Esc ile diyalog/oynatım kuyruğu kapatma.[^5]

- Focus indicator: Varsayılan outline’ı kaldırmayın; görünür bir odak stili (ör. mavi çerçeve veya glow) tanımlayın. Koyu temada kontrastı yüksek tutun.[^7]
- Roving tabindex: Tabs, toolbars ve menülerde yalnızca aktif öğe tabindex="0" olsun; diğerleri -1. Ok tuşlarıyla hareket ettirin.[^3]
- Skip navigation: “Ana içeriğe atla” bağlantısı, header’ın hemen altında, ilk odaklanabilir öğe olmalı; odak main’e yönlensin.[^7]
- Hareket azaltımı: Animasyon/ses kuyruğu uzun süreli beklemeye neden olabilir; kullanıcı tercihlerine saygı gösterin ve iptal mekanizmalarını klavye ile erişilebilir kılın.[^5]

Aşağıdaki tablo, önerilen klavye etkileşimlerini özetler.

Tablo 4 — Önerilen klavye etkileşimleri (seçme kalıpları)

| Bileşen | Tuş | Beklenen Davranış |
|---|---|---|
| Tab Sekmesi | Tab/Shift+Tab | Sekmeler ve içerik arasında gezinme |
| Tab Sekmesi | ←/→ | Sekme seçimini hareket ettirme |
| Tab Sekmesi | Enter/Space | Aktif sekmeyi etkinleştirme |
| Toolbar/Buttons | Tab/Shift+Tab | Odak sırayla butonlar arasında |
| Buton | Enter/Space | Butonu etkinleştirme |
| Diyalog/Modal | Esc | Kapatma ve odağı önceki konuma dönme |
| Oynatım Kontrolü | Space | Oynat/Duraklat |
| Oynatım Kontrolü | Esc | Durdur |
| Slider (varsa) | ←/→, Home/End | Değer değiştirme, uçlara gitme |

## Renk Körlüğü ve Kontrast (AA)

Uygulama koyu tema kullanır; sarı/yeşil/yeşilimsi vurgular AA kontrast hedeflerine göre doğrulanmalıdır. AA’da normal metin için minimum 4.5:1, büyük metin için 3:1 kontrast oranı gereklidir.[^6][^12] Ayrıca, anlam taşıyan bilgiyi yalnızca renk ile iletmekten kaçınılmalı; ikon+metin ve desen+metin kombinasyonlarıyla ayrışma artırılmalıdır. DevTools eklentileri ve çevrimiçi kontrast araçlarıyla token/temalar sistematik olarak test edilmelidir.[^10]

Tablo 5 — Kontrast kontrol planı

| Tema Token | Foreground | Background | Hedef Oran | Test Aracı |
|---|---|---|---|---|
| text-primary | Beyaz/açık gri | Koyu gri | 4.5:1 | WebAIM Contrast Checker / DevTools |
| text-muted | Orta gri | Koyu gri | 4.5:1 | Aynı |
| brand-yellow | Siyah/beyaz | Sarı | 4.5:1 | Aynı |
| badge-green | Beyaz/açık | Yeşil | 4.5:1 | Aynı |
| badge-yellow | Siyah/beyaz | Sarı | 4.5:1 | Aynı |

Renk körlüğü senaryoları (protanopia, deuteranopia, tritanopia) göz önüne alınarak yalnızca renge bağlı ayrışmalar metinsel etiketlerle desteklenmelidir.[^13]

## TTS ve Hukuki Metinler İçin Erişilebilirlik Stratejisi

TTS (Metinden-Konuşmaya) sistemi, hukuki içeriklerin anlaşılabilirliğini ve kapsayıcılığını artırır. Tasarım, kullanıcı kontrolünü (oynat/duraklat/durdur, hız, ses seçimi), açık durum duyurularını (aria-live) ve kuyruğa alma/ilerleme geri bildirimini öncelemelidir.[^2][^10]

- Hukuki metinler: Her bölüm için özet, anahtar cümleler, kaynak ve uyarı (yasal tavsiye değildir) alanları yapısal olarak sunulsun. Bu alanlar başlıklandırılmış, etiketlenmiş ve ekran okuyucu tarafından kolayca taranabilir olsun.
- TTS kontrolleri: aria-live=polite ile oynatma/durdurma/ilerleme duyuruları; klavye kısayolları ve görünür etiketler; hız ve ses tercihleri için erişilebilir form kontrolleri; tercihler yerel olarak kalıcı olsun (gizlilik notlarıyla).
- Sesli simülasyon: “Full Court Simulation” akışında rol bazlı sesler (hakim, savcı, savunma, tanık) kullanılacaksa, her rol için açık etiketleme ve kullanıcıya bilgilendirme sağlayın; gizlilik/etik hususlara dikkat çekin.
- Gelişmiş seçenekler: Dil/bölge/aksan seçimi; cümle bazında ilerleme; oynatma listesinin (kuyruk) yönetimi.

Bu strateji, WCAG’in “Operable” ve “Understandable” ilkeleriyle uyumlu olarak, bilgiye çoklu formatta erişim sağlar ve bilişsel yükü azaltır.[^1][^10]

## Geliştirici Araçları, Test Süreci ve CI/CD’ye Entegrasyon

Erişilebilirlik, otomasyon ve manuel testlerin birlikte yürütüldüğü bir disiplin gerektirir. Otomatik denetimler sorunların bir kısmını yakalarken, ekran okuyucu ve klavye ile manuel doğrulama şarttır.[^2][^11]

- Otomasyon: eslint-plugin-jsx-a11y (kod aşaması), axe-core (React içinde react-axe ile), Lighthouse (hızlı denetimler), WAVE (sayfa denetimi), Pa11y (CLI otomasyon).[^2][^11]
- Manuel testler: NVDA/JAWS/VoiceOver ile başlıklandırma, landmark’lar, tablist/tabpanel davranışı, ikon buton isimleri ve TTS akışları test edilmelidir.
- CI/CD: Linting ve test aşamalarına axe-core/Pa11y entegrasyonu; erişilebilirlik puanı eşikleri (ör. Lighthouse a11y puanı) ve kritik ihlallerde “fail the build” politikası.

Tablo 6 — Test araçları karşılaştırması

| Araç | En İyi Kullanım | CI Desteği | Bildirdiği Sorun Kapsamı | Notlar |
|---|---|---|---|---|
| eslint-plugin-jsx-a11y | Kod anında statik analiz | Evet | Sözdizimi/ARIA hataları | Hızlı geri bildirim |
| axe-core/react-axe | Çalışma zamanı ağaç denetimi | Evet | Semantik, isimlendirme, kontrast | En yüksek kapsama |
| Lighthouse | Hızlı genel denetim | Evet | Geniş spektrum | DevTools entegrasyonu |
| WAVE | Sayfa üzerinde görsel rapor | Eklenti | İhlal türleri haritası | Eğitim/öğrenme için faydalı |
| Pa11y | Çok sayfa CLI | Evet | Otomasyon senaryoları | Pipeline için ideal |

Kaynak: React ve MDN erişilebilirlik araçları ekosistemi.[^2][^11]

## Bileşen Bazlı Uygulama Planı ve Geriye Dönük Uyumluluk

App.tsx:
- Semantik: header/nav/main/footer. “Skip to main content” bağlandırması ile odak main’e yönlensin.
- Sekmeler: roving tabindex ve ok tuşlarıyla geçiş; Enter/Space ile etkinleştirme; tablist/tabpanel rolleri.[^3]
- Odak göstergesi: Varsayılan outline korunsun veya görünür bir odak stili uygulansın; hover/focus durumları AA kontrastını korusun.[^6]
- İkon butonlar: aria-label ile erişilebilir isim; görünür metin eklemek mümkünse tercih edilsin.

AnalysisTab.tsx:
- TTS durumları: aria-live=polite ile “Oynatılıyor”, “Durduruldu” duyuruları; durdur/durdur-ve-okut eylemleri klavye ile erişilebilir.
- Timeline rozetleri: metinsel etiket (ör. “Yüksek/Orta”) ve ikon kombinasyonu; aria-describedby ile bağlama.[^6]
- Oynatma kuyruğu: kullanıcı iptali (Esc) ve geri bildirim; uzun akışlarda ilerleme göstergesi.

Ortak:
- eslint-plugin-jsx-a11y kurallarını devreye alın; react-axe ile geliştirme sırasında denetimleri yoğunlaştırın.[^2]
- Focus management: Refs ile programatik odak; modal/overlay açıldığında focus trap; kapanışta odak geri alma.[^2][^3]

Geriye dönük uyumluluk:
- Mevcut sınıfları ve görsel kimliği koruyarak semantik ve ARIA’yı enjekte edin.
- Davranış değişiklikleri minimal ve test edilebilir olsun; feature flag ile kademeli yayın.

## Ölçüm, İzleme ve Kabul Kriterleri

Başarı ölçümü, erişilebilirlik puanları, bulgu kapatma süresi ve manuel test kapsaması ile izlenmelidir.

Tablo 7 — KPI tablosu

| Metrik | Hedef | Ölçüm Yöntemi | Sıklık | Sahip |
|---|---|---|---|---|
| Lighthouse Erişilebilirlik Puanı | ≥ 90 | Lighthouse raporu | Her PR / haftalık | Frontend |
| Otomatik İhlal Sayısı (axe) | Kritik=0 | axe-core/react-axe | CI/CD | QA/Frontend |
| İhlal Kapatma Süresi | ≤ 10 iş günü | Issue tracker | Sürekli | Ürün & Eng |
| Manuel Test Kapsaması | ≥ 80% senaryo | NVDA/JAWS/VoiceOver test listesi | Sürüm döngüsü | QA |
| Kontrast Uyum | 100% AA | Contrast checker | Her tema değişimi | Tasarım/Frontend |

Hedefler, WCAG 2.1 AA uyum eşiğini esas alır.[^1]

## Yol Haritası: Zamanlama ve Kaynak Planı

Fazlandırma, en yüksek etki ve en düşük risk prensibiyle yapılandırılmıştır.

Tablo 8 — Zaman çizelgesi

| Faz | Hedef | Kapsam | Tahmini Süre | Bağımlılıklar |
|---|---|---|---|---|
| Faz 1 (0–2 hf) | Hızlı kazanımlar | Skip-link, landmark’lar, ikon isimleri, odak göstergeleri, aria-live | 2 hf | Tasarım token onayı |
| Faz 2 (2–6 hf) | Bileşen erişilebilirliği | Tabs (APG), roving tabindex, TTS ayarları, kontrast düzeltmeleri | 4 hf | eslint/jsx-a11y, axe |
| Faz 3 (6+ hf) | Gelişmiş TTS ve desen standardizasyonu | Kuyruk/geri bildirim, rol bazlı ses, APG standartları, CI otomasyon derinleştirme | 6–8 hf | CDP entegrasyonu |

## Bilgi Boşlukları ve Varsayımlar

- audioService API yüzeyi (durdur/ara/durdur-ve-okut, hız/konuşmacı seçimi) ve test edilebilir örnekler görülmedi; bu nedenle TTS stratejisi prensip düzeyinde tanımlandı.
- Global CSS/Tailwind tema token’ları görülmedi; kontrast hedefleri token/tema doğrulaması sonrası kesinleşecektir.
- Kullanıcı tercihleri (ses, hız, otomatik oynatma) ve kalıcılık (localStorage vb.) bilgisi yok; gizlilik notları (GDPR/CCPA) değerlendirme gerektirir.
- Diğer sekmeler (SearchTab, ChatTab, UploadTab, AboutTab) hakkında veri yok; standart bileşen kütüphanesi yaklaşımıyla ortak desenler uygulanmalıdır.
- Hukuki içerik sunum biçimi (tam metin/özet, başlıklandırma, kaynaklandırma) ve multi-dil gereksinimi belirsiz; lang özniteliği ve çokdilli ses seçenekleri değerlendirilecektir.

## Ek: Uygulama İçin Kontrol Listesi (Uygulama Ekipleri İçin)

- Skip-link ve landmark’lar: header/nav/main/footer semantikleri; “Ana içeriğe atla” bağlantısı; odak main’e yönlensin.[^7]
- Tabs: role="tablist"/"tab"/"tabpanel"; roving tabindex; ok tuşları; Enter/Space etkinleştirme.[^3]
- İkon butonlar: aria-label veya görünür etiket; görsel ve işitsel geri bildirim tutarlılığı.[^2]
- TTS/ARIA-live: aria-live=polite; kısa, zamansal sıralı duyurular; Esc ile durdurma.[^2]
- Timeline rozetleri: metinsel etiket + ikon; tooltipler aria-describedby ile bağlansın.[^4]
- Kontrast: 4.5:1 (normal), 3:1 (büyük); token/tema doğrulaması; yalnızca renge bağlı anlam yok.[^6]
- Klavye: Tab/Shift+Tab; Enter/Space; ok tuşları; Home/End; Esc; focus görünürlüğü.[^5][^7]
- Test: eslint-plugin-jsx-a11y; axe-core/react-axe; Lighthouse; WAVE; Pa11y; manuel SR testleri.[^2][^11]

---

## Kaynaklar

[^1]: W3C: Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/
[^2]: React: Accessibility (Resmi Dokümantasyon). https://legacy.reactjs.org/docs/accessibility.html
[^3]: WAI-ARIA Authoring Practices Guide (APG) – Desenler. https://www.w3.org/WAI/ARIA/apg/patterns/
[^4]: WAI-ARIA 1.2 – Roller, Durumlar ve Özellikler. https://www.w3.org/TR/wai-aria-1.2/
[^5]: WebAIM: Keyboard Accessibility. https://webaim.org/techniques/keyboard/
[^6]: WebAIM: Contrast and Color Requirements. https://webaim.org/articles/contrast/
[^7]: WebAIM: Skip Navigation Links. https://webaim.org/techniques/skipnav/
[^8]: W3C: Understanding WCAG 2.0 – Navigation Mechanisms (Title). https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html
[^9]: MDN: Accessibility Inspector (DevTools). https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector
[^10]: Accessibility Checker: Text-to-Speech Accessibility – Complete Guide. https://www.accessibilitychecker.org/blog/text-to-speech-accessibility/
[^11]: MDN: Accessibility Tooling and Assistive Technology. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling
[^12]: U.S. Web Design System (USWDS): Using Color. https://designsystem.digital.gov/design-tokens/color/overview/
[^13]: Deque University: Color Contrast Tips. https://dequeuniversity.com/tips/color-contrast
[^14]: UXPin: How React Components Enhance Screen Reader Accessibility. https://www.uxpin.com/studio/blog/how-react-components-enhance-screen-reader-accessibility/