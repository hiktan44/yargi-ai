# Türkiye Bağlamında Mobil Uyumluluk ve Responsive Tasarım İyileştirmeleri: Hukuk Uygulamaları Odaklı Analiz ve Yol Haritası

## 1. Yönetici Özeti ve Bağlam

Türkiye’de internet kullanım oranı 16–74 yaş grubunda 2025 itibarıyla %90,9’a ulaşmış durumda. Bu oran, 2024’te %88,8’di. Artış, dijital ürünlerin mobil öncelikli kurgulanmasını stratejik bir zorunluluk haline getiriyor.[^1] Mobil internet trafiğinin küresel ölçekte kullanıcıların büyük bölümüne ulaştığı, mobil cihazların (özellikle akıllı telefonların) kullanıcı davranışındaki merkezi konumunu pekiştiriyor.[^7] Ülkemizde akıllı telefon kullanıcı sayısının 2020–2029 döneminde istikrarlı şekilde artacağı öngörülüyor.[^2] Pazar payı tarafında Android’in yaklaşık üçte birlik üstünlüğü, iOS’un güçlü ikinci konumu tasarım kararlarında hem UI bileşenlerinin davranışını hem de test stratejilerini doğrudan etkiliyor.[^3] Sektörel veriler, mobil genişbant penetrasyonunun yüksek seviyede seyrettiğini ve mobil internet deneyiminin altyapı tarafında da olgunlaştığını gösteriyor.[^4]

Hukuk alanına özgü dijital ürünlerde mobil deneyim kritik fark yaratıyor. Avukatların önemli bir kısmı mobil cihazlarını iş süreçlerinde aktif kullanıyor; bu kullanım, mesajlaşma ve bildirim akışlarının mobil tasarımda birincil öncelik olarak ele alınmasını gerektiriyor.[^5] Aynı dönemde hukuk piyasasında bulut tabanlı çözümlere geçiş, güvenlik ve üretkenlik odaklı teknoloji benimsemesi ve yapay zekâ destekli araçların yaygınlaşması, mobil ürün stratejilerinin bu dönüşümle uyumlu kurgulanmasını zorunlu kılıyor.[^6]

Bu rapor, Türkiye mobil bağlamını merkeze alarak hukuk odaklı bir web ürününün mobil uyumluluğunu ve responsive tasarımını analiz eder; mevcut kod tabanındaki tespitlerden yola çıkıp erişilebilirlik, dokunma hedefleri, mobil navigasyon, responsive tablolar ve formlar için ölçülebilir iyileştirmeler önerir. Son bölümde, uygulanabilir bir yol haritası, ölçümleme ve test stratejisiyle birlikte sorumluluk matrisi sunulur.

Bilgi boşlukları: (i) Türkiye’ye özgü ekran çözünürlük/DP yoğunluk dağılımı, (ii) hukuk profesyonellerinin görev bazlı mobil kullanım örüntülerine ilişkin ayrıntılı saha verileri, (iii) ürün düzeyinde görev tamamlama süreleri ve hata oranları, (iv) mevcut altyapı performans metrikleri ve (v) üçüncü parti SDK’ların sürüm/erişilebilirlik kısıtları. Bu boşluklar, yol haritası bölümünde önerilen araştırma ve telemetri adımlarıyla kapatılacaktır.

---

## 2. Türkiye Mobil Bağlamı: Penetrasyon, Cihaz ve Davranış

Türkiye’de internet kullanım oranındaki artış, dijital ürün kullanım eşiğini yükseltirken, mobil cihazın birincil erişim aracı olarak kalıcılaşması tasarım yaklaşımını belirliyor. 2024’ten 2025’einternet kullanım oranındaki yükseliş (88,8% → 90,9%), mobilde daha yoğun içerik ve iş akışı kurgularını destekleyen bir demografik zemin oluşturuyor.[^1] Küresel mobil internet trafiği verileri, mobil cihazların kullanıcı erişimindeki baskın konumunu teyit eder nitelikte.[^7] Statista’nın öngörüleri, akıllı telefon kullanıcı tabanının önümüzdeki yıllarda da büyümeye devam edeceğini gösteriyor.[^2] Pazar payı açısından Android’in yaklaşık üçte birlik, iOS’un yaklaşık dörtte birlik ağırlığı, tasarımda Android cihaz çeşitliliği ve iOS platform kılavuzlarına uyumu birlikte gözetmeyi gerektiriyor.[^3] BiLGEM (BTHK) raporları, mobil genişbant penetrasyonunun yüksek seviyede olduğunu ve mobil internetin erişilebilirlik düzeyinin altyapı tarafında olgunlaştığını gösteriyor.[^4]

Aşağıdaki tablolar, tasarım ve test stratejisine doğrudan etki eden temel metrikleri özetler.

Tablo 1 – Türkiye internet kullanımı (16–74), yıllık karşılaştırma

| Yıl | İnternet Kullanım Oranı (16–74) |
|---|---|
| 2024 | %88,8 |
| 2025 | %90,9 |

Kaynak: TÜİK, Hanehalkı BT Kullanım Araştırması, 2024–2025.[^1]

Yorum: Artış, mobilde görev tamamlama ve içerik tüketiminin artacağına işaret eder. Ürün stratejisi, mobilde “ilk sınıf” deneyim sunmayı hedeflemeli, masaüstü ile eşdeğer işlevsellik sağlamalıdır.

Tablo 2 – Türkiye mobil işletim sistemi pazar payı

| İşletim Sistemi | Pazar Payı (yaklaşık) |
|---|---|
| Android | %75,5 |
| iOS | %24,0 |

Kaynak: StatCounter, Sep 2024 – Oct 2025 dönemi verileri.[^3]

Yorum: Android ağırlığı, cihaz ve ekran çeşitliliğini destekleyen bir test matrisi ve esnek layout stratejisi gerektirir. iOS tarafında platform yönergeleri ile uyum, erişilebilirlik ve dokunma hedefleri açısından güvenli bir zemin sunar.

Tablo 3 – Türkiye mobil genişbant penetrasyonu (seçilmiş karşılaştırma)

| Gösterge | Türkiye | OECD Ortalaması |
|---|---|---|
| Mobil genişbant penetrasyonu | %109,4 | %134,1 |

Kaynak: BiLGEM (BTHK), 2025 Q1.[^4]

Yorum: Yüksek penetrasyon, “mobil her yerde” varsayımını doğrular; buna karşın farklı ağ koşullarında performans ve kullanılabilirlik, tasarımda başat kısıt olmaya devam eder.

Özetle: Türkiye’de internet ve mobil genişbant erişimi olgunlaşmış, akıllı telefon kullanımı yaygınlaşmıştır. Hukuk bağlamında bu olgunlaşma, mobilde hızlı görev tamamlama, güvenli iletişim, bildirimlerin erişilebilirliği ve offline toleranslı akışlar gibi gereksinimleri öne çıkarır.

---

## 3. Hukuk Uygulamalarında Mobil Kullanım Örüntüleri

Hukuk profesyonelleri mobil cihazları yoğun şekilde iş süreçlerine entegre etmiştir. Özellikle mesajlaşma, bildirimler, hızlı araştırma, takvim ve müvekkil iletişimi gibi işlevler, mobilde “anlık ve kesintisiz” bir deneyim talep eder. 2024 Legal Trends Report bulguları; bulut tabanlı sistemlere geçiş, otomasyon ve güvenlik uygulamalarının hızlandığını, ücretlendirme ve müvekkil etkileşiminde şeffaflığın arttığını ve yapay zekâ destekli araçların benimsenmesinde ciddi bir sıçrama yaşandığını gösteriyor.[^5] Barolar ve meslek örgütleri tarafından yayımlanan pratik raporlar, mobil teknolojilerin büroların operasyonel verimliliği üzerinde doğrudan etkisi olduğunu ve mobil iletişimin müvekkil memnuniyetiyle yakından ilişkili bulunduğunu işaret ediyor.[^6][^16]

Bu çerçevede, mobilde öncelikli kullanım alışkanlıkları ve ürün karşılıkları aşağıda özetlenmiştir.

Tablo 4 – Hukuk profesyonelleri için mobil öncelikli kullanım alanları ve ürün karşılıkları

| Kullanım Alanı | Ürün Karşılığı | Tasarım/İşlev Öncelikleri |
|---|---|---|
| Mesajlaşma | Gerçek zamanlı mesajlaşma, grup sohbetleri, dosyaya bağlanan ileti | Anlık bildirimler; açıkça etiketlenmiş konuşmalar; ek dosya önizleme |
| Bildirimler | Görev, takvim, duruşma, son tarih (deadline) hatırlatıcıları | Zamanında, eyleme geçirilebilir bildirim kartları; derin bağlantı |
| Takvim | Duruşma ve randevu yönetimi, hatırlatmalar | Takvim kartları; tek dokunuşla RSVP; saat dilimi farkındalığı |
| Hızlı Araştırma | İçtihat/mevzuat arama, favoriler, notlar | Arama kutusu öne alınmış; klavye tipine uygun kısayollar |
| Müvekkil İletişimi | Oturum açmadan görüntülenen özet bilgiler, güvenli mesajlaşma | Mobil kimlik doğrulama; hassas veride masked IP/UI desenleri |
| Dosya Yönetimi | Belge görüntüleme,批注 (annotation), paylaşım | Online/offline görüntüleyici; imza akışları için tek dokunuşlu adımlar |

Kaynaklar: Clio Legal Trends Report 2024 ve ABA pratik yönetim TechReport bulguları ile sektör gözlemleri.[^5][^6][^16]

Yorum: Hukuk bağlamında mobil, “hızlı karar ve eylem” alanıdır. Bu nedenle, mobil navigasyonda kritik yol kısaltılmalı, görevler tek ekranda tamamlanabilir kılınmalı ve bildirim akışlarıyla entegrasyon birinci sınıf bir yetenek olarak ele alınmalıdır.

---

## 4. Mevcut Uygulama Kod Tabanı Analizi

Uygulama, mobil tespit için 768 px eşik değeriyle çalışan bir hook (useIsMobile) ve CSS tarafında Tailwind tabanlı bir stil yapısı kullanıyor. Tailwind’in yetenekleri, utility-first yaklaşımıyla mobil öncelikli kırılımları hızlıca uygulamaya imkân tanır; buna rağmen erişilebilirlik kriterleri ve dokunma ergonomisi açısından ek katmanlar gereklidir.

Tablo 5 – Kırılım noktası haritası: Mevcut durum ve öneri

| Aralık | Kullanım Durumu (Mevcut) | Öneri (İyileştirme) | Not |
|---|---|---|---|
| < 768 px | “Mobile” kabulü, uygulama geniş şeritleri kısaltır | Mevcut yaklaşımı koruyun; kapsayıcı sorgu (container queries) ve akışkan tipografi ekleyin | 768 px Türkiye pratiğinde güvenli bir mobil eşik |
| ≥ 768 px | “Desktop/Tablet” kabulü | Grid ve multi-column düzenlerle içerik yoğunluğunu yönetin | Kapsayıcı genişliğine duyarlı kırılımlar değerlendirilmesi |

Aşağıdaki alt bölümler, iki temel yapıtaşını detaylandırır.

### 4.1 useIsMobile Hook İncelemesi

Mevcut hook, ekran genişliğini 768 px ile karşılaştırarak mobil durumu belirliyor; MatchMedia ile dinleyici ekleyip değişimlere tepki veriyor. Bu yaklaşım, tarayıcı desteği ve bellek yönetimi açısından sağlıklı. Ancak kullanıcı deneyimi ve performans açısından iki iyileştirme önerilir:

- Kullanıcı tercihlerini de dikkate alın: ekran genişliğine ek olarak “reduced motion” ve “forced-colors” gibi kullanıcı tercihlerine saygı duyan medya sorgularıyla bileşen davranışını uyarlayın.[^11]
- Olay yönetimini rafine edin: ilk mount’ta geçici undefined durumu görsel davranışı etkileyebilir; bu nedenle bir “stabil” başlangıç değeri (örneğin false) veya skeleton ekranla başlatma stratejisi benimseyin. Bu yaklaşım, İlk Boyama (FCP) ve Kümülatif Düzen Kayması (CLS) üzerinde olumlu etki yaratır.

### 4.2 index.css ve Tailwind Kullanımı

Tailwind, utility-first yaklaşımıyla responsive varyantları doğrudan sınıflar üzerinden uygulamaya izin verir. Erişilebilirlik açısından Tailwind’in yararı, sistem renklerine yakınlaşma ve kontrast oranlarını doğru kurgulamaya elverişli olmasıdır. Ancak erişilebilirlik, yalnızca görsel kontrastla sınırlı değildir; odak durumları, dokunma hedefleri ve semantik, bileşen düzeyinde garanti edilmelidir. Aşağıdaki düzenlemeler önerilir:

- Odak stilleri:Varsayılan outline yerine yüksek kontrastlı, marka kimliğiyle uyumlu odak halkaları ekleyin. Klavyeyle navigasyonun görünürlüğünü artırın.
- Dokunma ergonomisi: Dokunma hedefleri için minimum 48x48 dp ölçüsünü ve hedefler arası en az 8 px boşluğu güvence altına alın.[^9][^10]
- Sistem renkleri ve kontrast: WCAG 2.1 AA hedeflerine uygun kontrast oranlarını (metin ve kritik UI öğeleri için) doğrulayın.[^8]
- Tipografik ölçek: Kapsayıcı genişliğine bağlı akışkan tipografi (clamp) uygulayarak satır uzunluğunu ve satır aralığını mobilde okunabilir aralıklarda tutun.[^18]

---

## 5. Erişilebilirlik ve Dokunma Ergonomisi (WCAG 2.1 AA Odaklı)

Mobil uyumluluk, erişilebilirlik kriterleriyle birlikte ele alındığında sürdürülebilir bir deneyim sağlar. WCAG 2.1 (Web Content Accessibility Guidelines) AA düzeyi, dokunma hedefleri, metin ölçeklenebilirliği, kontrast ve klavye/odak yönetimi gibi başlıklarda net gereklilikler getirir.[^8] Dokunma hedefleri için önerilen minimum fiziksel boyut, 9 mm civarındaki alanı ifade eder; pratikte bu, yaklaşık 48x48 dp’lik bir etkileşim alanına denk gelir.[^9][^10] Hedefler arasında en az 8 px boşluk, “fat-finger” hatalarını azaltır.[^9]

Tablo 6 – Dokunma hedefleri öneri özeti

| Kaynak | Minimum Boyut | Boşluk | Not |
|---|---|---|---|
| web.dev | 48x48 dp | ≥ 8 px | Hedefler arası minimum boşluk 8 px önerilir |
| Material Design | 48x48 dp | — | Fiziksel boyut ~9 mm eşdeğeri |
| BBC Accessibility | 7–10 mm | — | 7x7 mm kabul edilebilir alt sınır; 9–10 mm önerilir |
| NN/g | ~10 mm (1 cm) | — | Kritik etkileşimlerde 1 cm önerisi |

Kaynaklar: web.dev, Material Design, BBC, Nielsen Norman Group.[^9][^10][^21][^22]

Yorum: Bu ölçüler, özellikle hukuk bağlamında “yanlış dokunuşların kritik sonuçlara” yol açtığı durumlarda (ör. yanlış dosyaya not düşmek, yanlış kişiye mesaj göndermek) önemli hata önleme sağlar.

Erişilebilir odak yönetimi ve klavye desteği: Odak halkaları görünür olmalı; odak sırası semantik yapıyla uyumlu ilerlemeli; skip-links, form alanları ve tablo başlıkları için anlamlı alternatif metinler sağlanmalıdır.[^8]

---

## 6. Mobile Navigation İyileştirmeleri

Mobilde navigasyon, görünür öncelikleri netleştirmeli, hızlı geri dönüş (back) ve arama erişimini birinci sınıf citizen yapmalıdır. Hukuk bağlamında, sık kullanılan yollar (mesajlar, takvim, arama) anahtar kelime erişimiyle birlikte öne çıkarılmalıdır. En çok bilinen kalıplar arasında hamburger menü, alt tab çubuğu, tam ekran navigasyon ve floating action button (FAB) öne çıkar.[^11][^12][^13]

Tablo 7 – Navigasyon kalıpları karşılaştırması

| Kalıp | Artılar | Eksiler | Uygun Kullanım |
|---|---|---|---|
| Hamburger Menü | İçeriği açar, UI sade kalır | Keşfedilebilirlik düşük; derin görevler uzaklaşır | İkincil/seyrek öğeler; bilgi mimarisi geniş |
| Alt Tab Çubuğu | Süper hızlı erişim; başparmak dostu | 5 öğre sınırı; çok dallı IA için yetersiz | Sık kullanılan görevler; ana yollar |
| Tam Ekran Navigasyon | Yoğun bilgi mimarisi; derin erişim | Kullanıcı bağlamı kaybı riski | Yeni kullanıcı onboarding; kapsamlı menüler |
| Floating Action Button | Birincil eylemi öne çıkarır | Çoklu birincil eylemde kafa karıştırır | Tek ana eylem (örn. “Yeni Mesaj”) |

Kaynaklar: Justinmind, Storyly, Webstacks, Sendbird, Claritee.[^11][^12][^13][^14][^15]

Yorum: Hukuk ürünleri için alt tab çubuğu ile sık kullanılan görevleri görünür kılmak, geri kalan içerikleri tam ekran veya hamburger altında düzenlemek hibrit bir strateji olarak işlevseldir. FAB, yalnızca tek bir birincil eylem varsa kullanılmalıdır.

---

## 7. Responsive Tablolar: Strateji, Erişilebilirlik ve Performans

Hukuk bağlamında tablolar, içtihat, dava listeleri, masraflar, tarife ve takvim verilerini yoğun şekilde taşır. Mobilde tablo gösterimi, semantiği bozmadan okunabilirliği korumayı gerektirir. CSS Grid ve Flexbox bu konuda güçlü araçlardır; ancak semantik ve erişilebilirlik açısından doğru stratejiyi seçmek önemlidir.[^17][^18][^19]

Tablo 8 – Responsive tablo stratejileri karşılaştırması

| Strateji | Açıklama | Erişilebilirlik Etkisi | Performans | Uygun Senaryolar |
|---|---|---|---|---|
| Grid ile Responsive Tablo | CSS Grid ile sütun/ satır yerleşimi, kapsayıcı genişliğine göre akış | Semantik korunur; th/td ilişkisi bozulmaz | İyi; minimal JS | Karmaşık veri, çok sütun |
| “Card” Dönüşümü (stacked) | Tablo satırlarını kartlara dönüştür; başlıklar data-label ile eşlenir | Ekran okuyucu uyumu için data-label kullanılmalı | İyi; CSS-only mümkün | Listeler; dar ekranlar |
|最小 CSS ile Dönüşüm| Az sayıda kuralla overflow/collapse uygular | Başlık eşleşmeleri açıkça işaret edilmeli | Çok iyi; hafif | Basit tablolar |
| “Div” Tablolar | div ve CSS ile tablo taklidi | Ekran okuyucu semantiği kaybolur; kaçınılmalı | JS müdahalesi gerekebilir | — |

Kaynaklar: CSS-Tricks, Medium, nSiteful, WisdmLabs; erişilebilirlik uyarıları için Adrian Roselli.[^17][^18][^19][^20]

Yorum: Mümkün olan her yerde semantik tablo yapısını koruyun. Grid ile responsive düzen, erişilebilirlik ve performans arasında iyi bir denge sunar. Dar ekranlarda “card” dönüşümü ekran okuyucularla uyumlu şekilde uygulanmalıdır. Flexbox ile tablo semantiğini bozmak erişilebilirlik açısından sakıncalıdır.[^20]

Alternatifler: Yatay kaydırma ile dikkatli kullanım (başlıkları sabit tutarak), filtreleme ve arama kabiliyetiyle sütun sayısını azaltma, veri yoğunluğu modları.

---

## 8. Mobil Formlar: Tasarım, Validasyon ve Gönderim

Mobil formlar, tek sütun düzen, yeterli boşluk ve doğru klavye tipleriyle hız ve doğruluk kazanır. Gerekli alanları net işaretlemek, hata mesajlarını satır içi ve anlaşılır yazmak ve adımları kısa tutmak dönüşümü artırır.[^25][^26][^27]

Tablo 9 – Mobil form alanları için klavye tipleri ve özellikler

| Alan Tipi | Önerilen Klavye/Özellik | Not |
|---|---|---|
| Metin (ad, soyad) | text | Otomatik büyük harf önerisi kapalı |
| E-posta | email | Yerleşik doğrulama |
| Telefon | tel | Ülke kodu yardımı |
| Sayısal | number | Binlik ayırıcıya dikkat |
| Tarih | date | Yerel tarih formatı |
| Para birimi | text + number | Maskeleme ve TRY formatı |
| Arama | search | Öneri/suggestions |

Tablo 10 – Form doğrulama ve hata gösterimi desenleri

| Desen | Artı | Eksi | Öneri |
|---|---|---|---|
| Satır içi (inline) | Anında geri bildirim; öğrenme kolay | Yoğun sayfada görsel karmaşa | Kritik alanlarda tercih |
| Sonunda (submit sonrası) | Sayfa sade; odak dağınıklığı az | Yeniden doldurma yükü | Küçük formlarda kabul edilebilir |
| Kısmi (onBlur) | Denge sağlar | Çok fazla odak değişimi | Karmaşık formlarda alternatif |

Kaynaklar: Forms On Fire, Typeform, IxDF, UX StackExchange, Platoforms.[^25][^26][^27][^28][^29]

Yorum: Hukuk ürünlerinde kimlik doğrulama ve imza akışları gibi güvenlik kritik adımlar, tek sayfada baştan sona tamamlanabilmeli; adımlar arası durum korunmalı; hata mesajları eyleme geçirilebilir olmalıdır.

---

## 9. Performans ve Teknik Optimizasyonlar (React Odaklı)

Mobilde algılanan hız ve gerçek hız, kullanıcı memnuniyetini belirler. React uygulamalarında aşağıdaki optimizasyon stratejileri önerilir:[^30][^31][^32][^33]

- Kod bölme ve懒加载 (lazy loading): Route ve bileşen bazında bölme; sadece ihtiyaç duyulanı yükleme.
- Durum yönetimi ve memoizasyon: Gereksiz yeniden oluşturmayı engelleyen useMemo/useCallback; bileşen seviyesinde ölçülü kullanım.
- Responsive görseller ve CDN: Kaynakları uygun boyutlarda sunma; önbellekleme stratejileri.
- Ölçümleme ve izleme: Web Vitals (FCP, LCP, CLS, INP, TTI) için hedefler; gerçek kullanıcı verileriyle (RUM) takip.

Tablo 11 – Optimizasyon tekniği → Etki ve izleme

| Teknik | Beklenen Etki | İzleme Metriği | Not |
|---|---|---|---|
| Route/komponent bazlı lazy load | İlk yük süresini azaltır | FCP, LCP | Kritik rota ayrımı |
| useMemo/useCallback | Yeniden oluşturma maliyetini düşürür | TTI, INP | Ölç, sonra uygula |
| Resim optimizasyonu (responsive images/CDN) | Bant genişliği tasarrufu | LCP | Modern formatlar (WebP/AVIF) |
| Kapsayıcı sorgular | Duyarlı layout | CLS | Masaüstünde karmaşık düzenler |
| Prefetch/preload | Bekleme sürelerini azaltır | FCP/LCP | Kritik kaynaklarda ölçülü |

Kaynaklar: 200OK Solutions, dev.to, Sterling Technolabs, Growin, BrowserStack.[^30][^31][^32][^33][^36]

Yorum: Önce ölçümleme, sonra optimizasyon. Her değişiklik, Web Vitals üzerinde net etkisiyle gerekçelendirilmelidir.

---

## 10. Responsive Kırılım Noktaları ve Layout Sistemi

Kırılım noktaları seçimi, cihaz çeşitliliğine rağmen “az ama etkili” yaklaşımıyla yapılmalıdır. Yaygın kırılım noktaları; 320 px (küçük), 768 px (tablet), 1024 px (masaüstü) olarak bilinir.[^34][^37][^38] 2025 perspektifinde kapsayıcı sorgular ve akışkan tasarım teknikleri, kırılım noktası sayısını doğal olarak azaltır ve bileşenlerin kendi kapsayıcı genişliğine uyarlanmasını sağlar.[^34]

Tablo 12 – Kırılım noktaları ve layout stratejisi

| Kırılım | Tipik Cihaz | İçerik Yoğunluğu | Layout Notu |
|---|---|---|---|
| 320–480 px | Telefon (küçük/orta) | Düşük/orta | Tek sütun, akışkan tipografi |
| 481–767 px | Telefon (büyük) | Orta | Kartlar/dropdown’lar; kritik yol kısa |
| 768–1023 px | Tablet (dikey/yatay) | Orta/yüksek | İki sütun; tablo görünümleri |
| 1024–1439 px | Küçük masaüstü | Yüksek | 2–3 sütun; yan panel |
| 1440 px+ | Büyük masaüstü | Yüksek | Grid yoğunluğu artar; reflow kontrollü |

Kaynaklar: LogRocket, freeCodeCamp, Hoverify, Medium (Abdulsamad).[^34][^37][^38][^35]

Yorum: Kapsayıcı sorgular ve akışkan tipografi ile cihaz sayısındaki çeşitliliğe rağmen sürdürülebilir bir layout elde edilir. Bu yaklaşım, ekran boyutundan bağımsız olarak tutarlı bir deneyim sunar.

---

## 11. Test ve Ölçümleme Stratejisi

Türkiye cihaz/OS dağılımı (Android/iOS), kırılım noktaları ve gerçek ağ koşullarında sürdürülebilir bir test planı kurulmalıdır.[^3] BrowserStack gibi platformlar, gerçek cihaz bulutlarında görsel gerileme testleri (visual regression) ve form akışı testlerini otomatikleştirmeyi kolaylaştırır.[^36]

- Görsel gerileme: Kritik ekranlar (navigasyon, tablolar, formlar) için temel setler belirlenmeli; kırılım noktaları ve tema (açık/koyu) varyantları dahil edilmelidir.
- Form senaryoları: Doğrulama hataları, zorunlu alanlar, adım sayısı, başarı/başarısızlık akışları.
- Kullanılabilirlik testleri: Görev tamamlama süresi ve hata oranı; dokunma hedefleri ve navigasyon sezgiselliği; “yanlış dokunuş” analizi.
- Sürekli izleme: Web Vitals ve RUM; erişilebilirlik otomasyonu (linters, kontrast denetimleri).

Tablo 13 – Test plan matrisi (özet)

| Ekran/Kalıp | Cihaz/OS | Kırılım | Senaryo | Başarı Kriteri |
|---|---|---|---|---|
| Ana navigasyon | Android/iOS | 320–480, 768–1023 | Alt tab çubuğu, hamburger açma | Dokunma hedefi ≥ 48x48 dp |
| Liste/Tablo | Android/iOS | 320–480 | Card dönüşümü, başlık eşleşmesi | Ekran okuyucu uyumu |
| Form (Kimlik) | Android/iOS | 320–480 | Validasyon, klavye tipleri | Hata mesajları satır içi; %0 yanlış gönderim |
| Görsel gerileme | Android/iOS | Tümü | A/B ekranlar, tema değişimi | Görsel fark < eşik değeri |

Kaynaklar: StatCounter (cihaz kapsamı), BrowserStack (test otomasyonu), WCAG 2.1 (erişilebilirlik doğrulama).[^3][^36][^8]

---

## 12. Uygulama Yol Haritası ve Sorumluluk Matris

Yüksek etkili ve düşük riskli iyileştirmelerle başlamak, ekiplerin hızla değer üretmesini sağlar. Erken kazanımlar, daha kapsamlı mimari değişiklikler için zemin hazırlar.

Tablo 14 – Yol haritası: Backlog ve sorumluluk

| Kalem | Öncelik | Etki | Efor | Sorumlu | Zamanlama |
|---|---|---|---|---|---|
| Dokunma hedefleri ve boşluk standardı | Yüksek | UX, hata önleme | Düşük | UI/UX, FE | 1 sprint |
| Odak stilleri ve kontrast düzeltmeleri | Yüksek | Erişilebilirlik | Düşük | FE, QA | 1 sprint |
| Mobile navigation (alt tab + hamburger) | Yüksek | Keşfedilebilirlik | Orta | UI/UX, FE | 2 sprint |
| Responsive tablolar (Grid + card) | Orta | Okunabilirlik | Orta | FE | 2–3 sprint |
| Form klavye tipleri ve validasyon | Orta | Dönüşüm | Orta | FE | 2 sprint |
| Lazy load ve kod bölme | Orta | Performans | Orta | FE | 2–3 sprint |
| RUM ve Web Vitals izlemesi | Orta | Sürekli iyileştirme | Orta | FE, QA, DevOps | 2 sprint |

Açıklama: İlk iki kalem, hızlı teslimatla erişilebilirlik uyumunu artırır. Navigasyon ve tablolar, kullanım sıklığı yüksek ekranlarda algılanan kaliteyi hızla yükseltir. Form ve performans iyileştirmeleri, dönüşüm ve memnuniyet üzerinde doğrudan etkilidir. Telemetri, kararları veriyle doğrular.

---

## Sonuç: Stratejik Çıkarımlar ve “So What”

- Türkiye’de mobil internet ve akıllı telefon kullanımının yaygınlığı, hukuk ürünlerinde “mobil birinci” tasarımı zorunlu kılar. Android ağırlığı ve iOS’un ikinci sıradaki payı, test ve uyumluluk stratejilerinin iki ekosistemi kapsamasını gerektirir.[^1][^3]
- Hukuk profesyonelleri için mobil, hızlı iletişim ve eylem alanıdır. Bu nedenle navigasyonda sık kullanılan görevler görünür olmalı; bildirim ve takvim entegrasyonları güçlü kurgulanmalıdır.[^5][^6]
- Erişilebilirlik ve dokunma ergonomisi (48x48 dp, ≥ 8 px boşluk) yanlış dokunuşları azaltır, klavye/odak yönetimi ise kapsayıcılığı artırır.[^8][^9][^10]
- Responsive tablolar semantik korunarak (Grid + card dönüşümü) okunabilir ve erişilebilir biçimde sunulmalı; “div tablo” gibi semantiği bozan yaklaşımlardan kaçınılmalıdır.[^17][^20]
- Mobil formlarda tek sütun, doğru klavye tipleri ve satır içi validasyon dönüşümü artırır; güvenlik kritik akışlar adım sayısını minimize etmelidir.[^25][^26][^27]
- Performans optimizasyonları (lazy load, memoizasyon, görsel optimizasyonu) ölçümleme ile yönlendirilmelidir; her değişiklik Web Vitals üzerinde doğrulanmalıdır.[^30][^31][^32][^33]
- Kırılım noktaları ve layout sistemi, kapsayıcı sorgular ve akışkan tipografi ile sadeleştirilmeli; az ama etkili kırılımlar tercih edilmelidir.[^34][^37][^38]
- Test stratejisi, Türkiye cihaz/OS dağılımını kapsayacak şekilde gerçek cihazlarda ve farklı ağ koşullarında yürütülmelidir; erişilebilirlik otomasyonu sürece entegre edilmelidir.[^3][^36][^8]

Bilgi boşlukları, kullanıcı araştırmaları, telemetri ve ek saha çalışmalarıyla kapatıldığında, bu yol haritası sürdürülebilir bir mobil deneyimi ve erişilebilirlik uyumunu kalıcı hale getirecektir.

---

## References

[^1]: TÜİK. Hanehalkı Bilişim Teknolojileri (BT) Kullanım Araştırması, 2025. https://data.tuik.gov.tr/Bulten/Index?p=Hanehalki-Bilisim-Teknolojileri-(BT)-Kullanim-Arastirmasi-2025-53925
[^2]: Statista. Number of smartphone users in Turkey 2020–2029. https://www.statista.com/statistics/467181/forecast-of-smartphone-users-in-turkey/
[^3]: StatCounter. Mobile Operating System Market Share Turkey. https://gs.statcounter.com/os-market-share/mobile/turkey
[^4]: BiLGEM (BTHK). Elektronik Haberleşme Sektörü 3 Aylık Veriler Raporu 2025 Q1. https://www.bthk.org/Documents/raporlar/pazar-verileri-sektorel-raporlar/2025%20Q1%20Raporu.pdf
[^5]: Clio. Highlights from the 2024 Legal Trends Report. https://www.clio.com/blog/highlights-from-2024-legal-trends-report/
[^6]: American Bar Association. 2024 Practice Management TechReport. https://www.americanbar.org/groups/law_practice/resources/tech-report/2024/2024-practice-management-techreport/
[^7]: Exploding Topics. Internet Traffic from Mobile Devices (July 2025). https://explodingtopics.com/blog/mobile-internet-traffic
[^8]: W3C. Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/
[^9]: web.dev. Accessible tap targets. https://web.dev/articles/accessible-tap-targets
[^10]: Material Design. Accessibility – Touch Targets. https://m2.material.io/design/usability/accessibility.html
[^11]: Justinmind. Mobile navigation: patterns and examples. https://www.justinmind.com/blog/mobile-navigation/
[^12]: Storyly. Mobile Navigation Patterns and Best Practices. https://www.storyly.io/post/basic-patterns-for-mobile-navigation-and-the-best-practices
[^13]: Webstacks. 8 Best Mobile Navigation Menu Design Examples in 2025. https://www.webstacks.com/blog/mobile-navigation-menu-design
[^14]: Sendbird. Top 20 must-know mobile app UX best practices. https://sendbird.com/blog/mobile-app-ux-best-practices
[^15]: Claritee. Creative Mobile UI Patterns for Enhanced Navigation. https://claritee.io/blog/creative-mobile-ui-patterns-for-enhanced-navigation/
[^16]: Massachusetts Bar Association. Apps for mobile attorneys. https://www.massbar.org/publications/ejournal/ejournal-article/lawyers-journal-2017-julyaugust/apps-for-mobile-attorneys
[^17]: CSS-Tricks. CSS Grid Layout Guide. https://css-tricks.com/snippets/css/complete-guide-grid/
[^18]: Medium. Responsive data tables with CSS Grid. https://medium.com/evodeck/responsive-data-tables-with-css-grid-3c58ecf04723
[^19]: nSiteful. Responsive Tables with Minimal CSS. https://nsiteful.com/responsive-tables-with-minimal-css/
[^20]: Adrian Roselli. A Responsive Accessible Table. https://adrianroselli.com/2017/11/a-responsive-accessible-table.html
[^21]: BBC. Target touch size – Accessibility for Products. https://www.bbc.co.uk/accessibility/forproducts/guides/mobile/target-touch-size/
[^22]: Nielsen Norman Group. Touch Targets on Touchscreens. https://www.nngroup.com/articles/touch-target-size/
[^23]: W3C WAI. Understanding Success Criterion 2.5.5: Target Size. https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
[^24]: Adrian Roselli. Target Size and 2.5.5. https://adrianroselli.com/2019/06/target-size-and-2-5-5.html
[^25]: Forms On Fire. 13 Mobile Form Design Best Practices and Examples. https://www.formsonfire.com/blog/mobile-form-design
[^26]: Typeform. Mobile-friendly forms design tips. https://www.typeform.com/blog/mobile-form-design-best-practices
[^27]: Interaction Design Foundation. UI Form Design. https://www.interaction-design.org/literature/article/ui-form-design
[^28]: UX StackExchange. Best practices on building large forms for data entry. https://ux.stackexchange.com/questions/145403/what-are-some-best-practices-on-building-large-forms-for-data-entry
[^29]: Platoforms. Are Your Forms Mobile-Ready? https://www.platoforms.com/blog/mobile-friendly-forms/
[^30]: 200OK Solutions. Optimizing React Applications for Performance in 2024. https://200oksolutions.com/blog/optimizing-react-applications-for-performance-in-2024/
[^31]: dev.to. Optimize React Performance in 2024 — Best Practices. https://dev.to/topeogunleye/optimize-react-performance-in-2024-best-practices-4f99
[^32]: Sterling Technolabs. Top 7 React App Optimisation Techniques for 2024. https://www.sterlingtechnolabs.com/blog/react-app-optimisation-techniques
[^33]: Growin. React Performance Optimization: Techniques for Faster Apps 2025. https://www.growin.com/blog/react-performance-optimization-2025/
[^34]: LogRocket. Using CSS breakpoints for fluid, future-proof layouts (2025). https://blog.logrocket.com/css-breakpoints-responsive-design/
[^35]: Medium (Abdulsamad). Responsive Web Design: Best Practices for 2024. https://medium.com/@abdulsamad18090/responsive-web-design-best-practices-for-2024-492a42635a4c
[^36]: BrowserStack. How to make React App Responsive. https://www.browserstack.com/guide/how-to-make-react-app-responsive
[^37]: freeCodeCamp. How to Use Breakpoints for Responsive Web Design. https://www.freecodecamp.org/news/breakpoints-for-responsive-web-design/
[^38]: Hoverify. Responsive Design Breakpoints: 2024 Guide. https://tryhoverify.com/blog/responsive-design-breakpoints-2024-guide/