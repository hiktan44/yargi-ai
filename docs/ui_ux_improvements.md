# Truth Re:Build AI: UI/UX İyileştirme ve Tasarım Sistemi Yol Haritası

## Yürütücü Özet ve Ana Bulgular

Truth Re:Build AI, hukuki ön inceleme ve vaka analizi süreçlerini desteklemek üzere tasarlanmış bir yapay zekâ (YZ) destekli uygulama. Mevcut kullanıcı arayüzü koyu tema üzerinde sağlam bir iskelet sunuyor: başlık (header), sekme navigasyonu (Search/Chat/Analysis/Upload/About), ana içerik alanı ve dipnot (footer). Renklerde mavi ve sarı vurgu, tipografide basit bir hiyerarşi ve kart tabanlı içerik düzeni kullanılmış. Buna karşın üç ana iyileştirme ekseni öne çıkıyor: güven ve şeffaflık sinyallerinin görünür biçimde güçlendirilmesi, karanlık modda kontrast ve okuma ergonomisinin iyileştirilmesi, ve arayüz genelinde mikro etkileşimler ile bilgi yoğunluğunun sadeleştirilmesi.

Konuşmalı YZ arayüzlerinde kullanıcı güveni, sistemin ne olduğu ve ne olmadığına dair açık iletişim, takip soruları ve kaynak işaretleriyle belirgin biçimde artar[^1][^2]. Hukuk bağlamında ise bilginin aşamalı açığa çıkarılması (progressive disclosure), bilişsel yükün azaltılması ve veri ilişkilerinin görselleştirilmesi, hem verimliliği hem doğruluğu yükseltir[^3]. Bu rapor, mevcut UI/UX’i bu ilkeler ışığında ele alır ve yalın bir uygulama yol haritası önerir.

En kritik değişiklikler şu başlıklarda toplanır:
- Güven ve şeffaflık: Kaynak bağlantıları, alıntı etiketleri, güven düzeyi göstergeleri ve açıkça tanımlanmış YZ sınırları (disclaimer). Chat yanıtlarında ve arama/analiz kartlarında standartlaştırılmış “kaynak” ve “alıntı” işaretleri.
- Kontrast ve tipografi: Karanlık modda AA kontrast hedefleri, font ağırlık ve boyut ayarları, off-white metin ve yumuşatılmış vurgu renkleriyle okunabilirliği artırma[^4][^7][^8][^9][^10][^11].
- Mikro etkileşimler ve loading stratejisi: 10 saniyeyi aşan beklemelerde determinatif ilerleme; aksi durumlarda minimal feedback. Spinner yerine duruma özgü “iskelet” (skeleton) ve mikro geri bildirimler[^12][^13][^14][^15].

Başarı metrikleri üç grupta izlenmelidir: benimseme (ör. sohbet sekmesinde takip sorusu kullanım oranı), görev tamamlama (arama/analiz akışlarında kaynak doğrulama adımıyla sonuçlanan oturum yüzdesi), ve hata oranı (yanlış kaynak atfı veya yanlış anlaşılma bildirimlerinde düşüş). Bu metrikler, yukarıda anılan ilkelerin uygulamaya gerçek etkisini ölçmeyi ve tasarım kararlarını veriyle doğrulamayı hedefler.

## Bağlam, Kapsam ve Metodoloji

Kapsam, mevcut uygulamanın dört ana bileşenini ve düzen genelini inceler: SearchTab, ChatTab, AnalysisTab ve uygulama çerçevesi (header, nav, main, footer). Yöntem, doğrudan kod incelemesiyle UI/UX öğelerinin gözlemlenmesi ve modern arayüz prensipleriyle karşılaştırmalı değerlendirmedir. Değerlendirme çerçevesi, dört başlıkta toplanır: kullanılabilirlik (bilişsel yük, geri bildirim, hata kurtarma), erişilebilirlik (kontrast, klavye navigasyonu, odak görünürlüğü), bilgi mimarisi (hiyerarşi, progressive disclosure, görselleştirme) ve güven/şeffaflık (YZ kullanımının duyurulması, kaynak ve alıntı işaretleri). İnceleme, hukuki teknoloji (legal tech) ürünlerine özgü gereksinimler ve 2025 tasarım trendleriyle zenginleştirilmiştir[^5][^3][^6].

Bu yaklaşım, “mevcut durumu” tespit etmekle kalmaz; önerilen tasarım sistemi ve bileşen kütüphanesiyle uygulanabilir bir yol haritası sunar. Böylece hem kısa vadede hızlı kazanımlar (quick wins) elde edilebilir, hem de orta-uzun vadede modüler ve erişilebilir bir tasarım altyapısı kurulabilir.

## Mevcut UI/UX Durum Analizi (Bileşen Bazlı)

Uygulama koyu tema üzerinde grid ve kart bileşenleriyle çalışıyor. Arama ve analiz içerikleri kartlarla, sohbet ise mesaj balonlarıyla sunuluyor. Sesli oynatma kontrolleri birçok bölümde tekrar eden bir etkileşim öğesi. Aşağıdaki gözlemler bileşen bazında özetlenmiştir.

### Header/Nav ve Genel Düzen

Başlık alanı logosu (terazi), ürün adı ve “AI-Powered Legal Assistant” alt başlığı ile kullanıcıya bağlamı açık biçimde veriyor. Sekme navigasyonu yatay ve açık. Dipnot, “Educational Demo Only” ve “Not legal advice” uyarılarıyla uyumluluk ve sorumluluk sınırlarını hatırlatıyor. Ancak bazı erişilebilirlik ve hiyerarşi sinyalleri eksik: etkin sekmenin altındaki mavi çizgi iyi bir odak göstergesi, ancak odak halkalarının (focus ring) klavye kullanımında tüm etkileşimli öğelerde görünür olması gerekir. Renkler güçlü, fakat karanlık modda metin ve arka plan kontrastının AA hedeflerini tutarlı karşıladığından emin olunmalı[^4][^7][^8][^9][^10][^11].

### SearchTab

Arama çubuğu net; “Enter” ile tetikleme ve sağda “Search” butonu iyi bir affordans. “Audio On/Off” anahtarıyla kullanıcı sesli geri bildirimi kontrol edebiliyor. Hızlı örnekler (quick examples) bilişsel yükü azaltıyor ve aramaya başlamayı kolaylaştırıyor. Sonuç kartları başlık, mahkeme/yıl, benzerlik yüzdesi, sesli özet ve sonuç metni gibi kritik bilgileri kapsamlı şekilde listeliyor. Ancak kartlarda kaynak bilgisi görünür olsa da, kaynak bağlantıları ve alıntı etiketleri (örn. “Kaynak”, “Alıntı”) standartlaştırılmamış. Karanlık modda ikincil metinlerin kontrastı bazı yerlerde düşük kalabilir. Kart içindeki etiket ve “Similarity/Relevance” gibi metriklerin görsel ağırlığı iyi, fakat kart içi hiyerarşide bazı ikon kullanımları daha sistematik olabilir.

### ChatTab

Sohbet ekranında kullanıcı ve asistan mesajları farklı renklerde ayrışıyor. “AI is thinking...” göstergesi ve sesli oynatma düğmeleri olumlu. Örnek senaryolar, yeni kullanıcıların akla gelebilecek soruları keşfetmesini kolaylaştırıyor. Eksik olan, asistanın kendini YZ olarak açık biçimde tanıtması, yanıtların altında takip soruları önermesi ve yanıt kaynağına dair işaretlerin tutarlı biçimde gösterilmesi. Güven/şeffaflık sinyallerinin konuşma akışına entegre edilmesi, hem beklenti yönetimini güçlendirir hem de kullanıcıyı doğru eylemlere yönlendirir[^1][^2].

### AnalysisTab

Bu sekme çoklu bölümlerle (precedents, witness, timeline, scenario) zengin bir analitik görünüm sunuyor. Zaman çizgisi (timeline) iyi bir görselleştirme; tanık güvenilirlik puanları ve olasılık (scenario) metrikleri renk kodlamasıyla hızla anlaşılıyor. “Full Court Simulation” ve rol bazlı sesli örnekler kullanışlı bir ek bağlam. Buna karşın, bu bölümde kaynak/atıf görünürlüğü ve metin-kontrast iyileştirmeleri daha da kritik: kullanıcıların YZ çıktılarına güvenebilmesi için neden-sonuç açıklamaları ve kaynak işaretleri, kritik kararların hemen yakınında görünmelidir[^3].

Genel olarak, sesli oynatma için global bir audio status göstergesi mevcut, ancak beklemelerde determinatif ilerleme göstergeleri sınırlı; kullanıcı beklentisini yönetmek için farklı beklenen süre eşiklerine göre uygun indicator türleri seçilmelidir[^12][^13][^14][^15].

## Bilgi Mimarisi ve Gezinme

Gezinme sekme tabanlı ve basit. Buna rağmen, kullanıcının işini hızla bitirebilmesi için bağlamsal kısayollar ve akış içi yönlendirmeler önerilir. Örneğin arama sonuçlarında, bir kararın detayına “Hızlı Bakış” (quick glance) modu ve oradan doğrudan “Analiz”e geçiş, gereksiz sayfa değişimlerini azaltır. Sohbette, yanıtların altına önerilen takip soruları (CTAlar) yerleştirilmesi, görev odaklı akışları güçlendirir[^1][^3].

Analiz bölümü zaten modüler; bu modülerliği kart şablonlarında da yansıtmak, arama ve analiz kartlarının aynı tipografi, boşluk ve ikonografi sistemiyle üretilmesini sağlamak, bilişsel yükü düşürür. Hukuk bağlamında veri ilişkilerinin (zaman çizelgesi, tanık beyanları, delil, senaryo olasılıkları) görselleştirilmesi, kullanıcıların büyük veri yığınları arasında bağlantıları hızla görmesini sağlar[^3]. Bilgi mimarisi, kullanıcı hedeflerine göre sadeleştikçe hem karar hızı artar hem de hata riski azalır.

## Görsel Hiyerarşi ve İçerik Önceliklendirme

Başlıklar ve alt başlıklar hiyerarşisi, karanlık modda okunabilirliği ve dikkat yönlendirmeyi doğrudan etkiler. Kart düzeni, farklı bilgi türlerini eşit görsel ağırlıkla sunma eğiliminde; oysa benzerlik yüzdesi ve olasılık gibi kritik metrikler, hiyerarşide daha görünür olmalı. Mikro kopya ve empty state tasarımları, akış boşluklarında kullanıcıyı yönlendirecek şekilde güçlendirilmeli. Kart düzenleri modüler olduğundan, başlık/alt başlık ağırlıkları ve etiket rengi/lOCUS (odak) standartlarıyla hiyerarşi pekiştirilmelidir[^5][^3].

## Renk Paleti ve Karanlık Mod İyileştirmeleri

Mevcut koyu gri zemin ve mavi/sarı vurgu, hukuk ve teknoloji bağlamında güven ve dikkat sinyalleri veriyor. Ancak karanlık modda kontrast ve yorgunluk yönetimi için paletin yumuşatılması ve sistematikleştirilmesi gerekir. Off-white metinler, kısık vurgular ve yumuşak parlamalar, düşük ışık konforunu destekler[^6][^7][^8][^9][^10][^11].

Bunu sistematik hale getirmek için aşağıdaki token yapısını öneriyoruz. Tablo 1, önerilen renk token’larını ve WCAG 2.1 AA kontrast hedefleriyle eşleşmesi amaçlanan kullanım bağlamlarını özetler. Değerler, kontrastı garanti eden isimlendirmelerle (ör. text/primary, surface/raised) verilmiş, sayısal HEX/HSLA değerleri tasarım aşamasında ölçülecektir.

Tablo 1. Önerilen Renk Token’ları ve Kullanım Bağlamları (AA hedefli)

| Token İsmi             | Önerilen Kullanım                                    | WCAG 2.1 AA Notu |
|------------------------|-------------------------------------------------------|------------------|
| surface/default        | Sayfa arka planı, koyu gri                           | Metin + ikonla AA |
| surface/raised         | Kart arka planı, hafif yükseltilmiş yüzey            | AA metin kontrastı |
| surface/depth-1/2/3    | Modal/çekmece/alt panel arka planları                | AA metin kontrastı |
| text/primary           | Birincil metin (off-white)                           | AA zorunlu        |
| text/secondary         | İkincil metin (daha kısık)                           | AA hedeflenmeli   |
| text/inverse           | Koyu üstünde açık metin                              | AA zorunlu        |
| brand/primary          | Birincil vurgu (mavi), ana eylem renkleri            | AA düğme metni    |
| brand/secondary        | İkincil vurgu (sarı), öne çıkan metrikler            | AA metin üstü     |
| status/success         | Başarı/olumlu göstergeler                            | AA ikon/metin     |
| status/warning         | Uyarı, kritik olmayan risk                           | AA ikon/metin     |
| status/error           | Hata, iptal, yüksek risk                             | AA ikon/metin     |
| focus/outline          | Klavye odak halkası                                   | Görünür ve AA     |

Bu token sistemi, koyu temada renklerin rolünü standardize eder. Materyal Tasarım’ın karanlık tema ilkeleri ve kapsayıcı karanlık mod rehberleri, kontrast ve göz konforunu önceliklendirmeyi destekler[^7][^9][^10][^11][^5][^6]. Özellikle “text/primary” ve “surface/raised” çiftinin AA hedefiyle test edilmesi, uzun okumalarda yorgunluğu azaltır.

## Tipografi ve Okunabilirlik

Karanlık modda okunabilirlik, font seçimi, ağırlık, satır yüksekliği ve harf aralığıyla güçlendirilmelidir. İnce (ultra-thin) ağırlıklardan kaçınılmalı; başlık/alt başlık/k Gövde metin arasında net bir boyut ve ağırlık farkı olmalı. Progresif tipografi ölçeği, hem arama hem analiz hem de sohbet bileşenlerinde aynı sistemi izlemeli[^5][^10][^11].

Tablo 2. Tipografi Ölçeği ve Satır Yükseklikleri

| Tipografi Rolü      | Önerilen Boyut (rem tabanlı) | Ağırlık (font-weight) | Satır Yüksekliği (line-height) |
|---------------------|-------------------------------|-----------------------|----------------------------------|
| H1 (Sayfa Başlığı)  | 1.75–2.25                     | 700–800               | 1.2–1.3                          |
| H2 (Bölüm Başlığı)  | 1.5–1.75                      | 700                   | 1.25–1.35                        |
| H3 (Alt Başlık)     | 1.25–1.5                      | 600–700               | 1.3–1.4                          |
| H4 (Kart/Modül Başlık) | 1.125–1.25                  | 600                   | 1.35–1.45                        |
| Body (Ana Metin)    | 1.0–1.0625                    | 400–500               | 1.5–1.65                         |
| Caption/Etiket      | 0.875–0.9375                  | 500                   | 1.4–1.5                          |
| Mikro Kopya         | 0.75–0.875                    | 400–500               | 1.4–1.6                          |

Bu ölçek, kart başlıklarından zaman çizelgesi etiketlerine kadar tekdüze bir görsel ritim sağlar. Hukuki içerik yoğun olduğundan, metin bloklarında satır yüksekliğini artırmak ve geniş ekranlarda sütun genişliklerini okuma kolaylığına göre sınırlamak (örn. 65–75 karakter) önerilir.

## Erişilebilirlik (WCAG 2.1 AA) ve Uyumluluk

Erişilebilirlik dört ilkede özetlenir: algılanabilir, işletilebilir, anlaşılabilir, sağlam (POUR). Karanlık modda kontrast, odak göstergelerinin görünürlüğü, klavye navigasyonu ve anlamlı alternatif metinler en kritik gereksinimlerdir[^6][^16][^17][^18]. Ayrıca, devlet ve kamu kurumları için web içeriğinin WCAG 2.1 AA düzeyine uygunluğu giderek bir gereklilik haline gelmektedir[^19].

Tablo 3. WCAG 2.1 AA Kontrol Listesi ve Mevcut Durum

| Kriter                                | Durum        | Not                                   | Öneri                                               |
|---------------------------------------|--------------|----------------------------------------|------------------------------------------------------|
| Metin/Kontrast (AA)                   | Kısmen       | Koyu modda bazı ikincil metinler düşük | text/primary ve surface token’larıyla yeniden test   |
| Klavye Navigasyonu                    | Kısmen       | Odak halkaları görünür değil           | focus/outline token’iyle tüm etkileşimli öğelerde    |
| Odak Görünürlüğü                      | Kısmen       | Spinner ve butonlarda eksik            | Odak/hover/active state’leri standardize et           |
| Alternatif Metin (img/icons)          | Kısmen       | Tüm görsellerde ALT metin sağlanmalı   | Icon ve görsellere anlamlı ALT/aria-label            |
| Durdur/Devam Et (Animasyon)           | Yok          | Ses simülasyonu sırasında eksik        | Kullanıcı tercihi: azalt/orta/çok; durdur kontrolü   |
| Hata Mesajları ve Yardım              | Kısmen       | Genel uyarılar, spesifik çözüm yok     | Eylem odaklı mikro kopya, geri al/tekrar dene        |
| ARIA ve Semantik                      | Kısmen       | Bazı bileşenlerde rol/atribüt eksik    | role="status"/"alert", aria-live=polite               |

Uyumluluk için en hızlı kazanımlar, kontrast ve odak göstergeleriyle birlikte ARIA semantiğinin düzeltilmesidir. Bu adımlar, klavye kullanıcıları ve ekran okuyucularla çalışan kullanıcılar için doğrudan fayda sağlar[^16][^18].

## Güven ve Şeffaflık Tasarımı (YZ Asistan Bağlamında)

Konuşmalı YZ arayüzlerinde güven, açıklık ve kontrol duygusuyla başlar. Asistan, ilk yanıtta kendisinin YZ olduğunu ve yetenek/sınır bilgilerini açıkça belirtmeli; her yanıtın altında kaynak işaretleri ve mümkünse alıntı etiketleri bulunmalıdır. Kullanıcıya takip sorularıyla hedef odaklı seçenekler (CTA) sunmak, yanlış anlamaları azaltır ve görev tamamlama hızını artırır[^1][^2]. Hukuk bağlamında bu şeffaflık, bir hukuki görüşün dayanağına işaret ederek YZ’nin rolünü doğru konumlandırır: bilgi işaretleyici ve analiz destekleyici, nihai karar verici değil[^3].

Tablo 4. Güven Göstergeleri Matrisi

| Öğe                                 | Bileşen         | Amaç                                  | Örnek Uygulama                                           |
|-------------------------------------|-----------------|----------------------------------------|----------------------------------------------------------|
| YZ Kullanım Duyurusu                | Chat            | Beklenti yönetimi                      | “Ben YZ destekli asistanım; yalnızca bilgi sağlarım.”    |
| Kaynak Bağlantı/Etiketi             | Search/Chat/Analysis | Güven ve doğrulanabilirlik         | “Kaynak: Public Domain DB • Alıntı bölümü”               |
| Güven Düzeyi/Probability            | Analysis/Chat   | Belirsizlik yönetimi                   | “Güven düşük: daha fazla kaynak önerisi isteyin.”        |
| Takip Soruları (CTA)                | Chat            | Hedef odaklı akış                      | “İlgili maddeyi aç/Örnek karşılaştır/İnsana yönlendir”   |
| İnsan Destekine Devretme            | Chat            | Çıkış ve güven                         | “Çözemedim; bir temsilciye bağlanmak ister misiniz?”    |
| Geri Bildirim Toplama               | Chat            | Sürekli iyileştirme                    | 👍/👎 + “Neden?” açıklaması                        |

Bu yapı, hem arama hem sohbet hem de analizde kullanıcıya “neden” ve “neye dayanarak” sorularını yanıtlayan bir çerçeve sağlar. Böylece YZ çıktılarının etik ve tutarlı kullanımı desteklenir[^2].

## İnteraksiyon Tasarımı, Mikro Etkileşimler ve Feedback

Hata önleme, kullanıcıya nazik uyarılar ve net kurtarma yolları sunma üzerine kurulmalıdır. Kullanıcı alışılmadık bir eylem yaptığında, örneğin bir tanık güvenilirlik puanını yüksek olasılıkla ilişkilendirirken, sistem “Bu eşleştirme bağlamsal olarak zayıf görünüyor; yine de devam etmek ister misiniz?” uyarısıyla hatayı daha oluşmadan yakalayabilir[^3]. Boş durumlar, kullanıcıyı ürün içinde yönlendiren mikro kopya ile zenginleştirilmeli; “Henüz arama yapılmadı. Hızlı örneklerden birini seçin.” gibi. 

Spinners yalnızca kısa beklemelerde kullanılmalı; 10 saniyeyi aşan işlemlerde determinatif ilerleme (yüzde veya adım) tercih edilmelidir[^12][^13][^14][^15]. Bu yaklaşım, kullanıcının sistemi “duyduğunu” ve ilerleme kaydedildiğini görsel olarak anlamasını sağlar.

Tablo 5. Loading Göstergesi Seçimi

| Eşik/Süre                   | Önerilen İndikatör              | Gerekçe                                            | Kaynak  |
|----------------------------|---------------------------------|----------------------------------------------------|---------|
| < 2 sn                     | İskelet (skeleton) + mikro kopya| Hızlı algı, sayfa iskeletiyle beklenti yönetimi    | [^12][^13] |
| 2–10 sn                    | Deterministik progress bar      | İlerleme hissi, kullanıcı güveni                   | [^12][^14][^15] |
| > 10 sn                    | Deterministik + milestone metin | Kırılma noktası; ilerleme ve “ne oldu” açıklaması  | [^14][^15] |

Bu seçim, beklemeleri kabul edilebilir kılar ve terk oranını azaltır. Özellikle analiz ve arama işlemlerinde, duruma özgü mikro kopya (“Kaynaklar taranıyor… 3/5”) belirsizliği azaltır.

## Bileşen Tasarım Sistemi ve Kart Düzeni

Kartlar, arama ve analiz içeriklerinin ana taşıyıcısıdır. Modüler kart şablonları, hem arama sonuçları hem de analiz bileşenleri için ortak bir dil oluşturur. Şablonlar, metriklerin görünürlüğünü ve kaynak/atıf işaretlerini standartlaştırır. Kartların responsive davranışı, konteyner sorguları (container queries) ve modern esnek ızgara (grid) ile sağlanmalıdır[^20][^21][^22][^23][^24].

Tablo 6. Kart İçin Önerilen Slotlar ve Varyantlar

| Slot Adı          | Açıklama                                   | Zorunlu/Varyant | Not (Arama/Analiz)              |
|-------------------|---------------------------------------------|------------------|----------------------------------|
| Header            | Başlık + ikincil meta (mahkeme, yıl)        | Zorunlu          | Hiyerarşi H4/H5                  |
| Metric Bar        | Similarity/Probability/Relevance            | Varyant          | Renk kodlaması standart          |
| Body              | Özet/ana metin                              | Zorunlu          | Progressive disclosure           |
| Tags              | Key factors / senaryo faktörleri            | Varyant          | Etiket token’ları                |
| Actions           | Oynat/Detay/Analiz Et/İncele                | Zorunlu          | CTA metinleri net                |
| Source/Quote      | Kaynak adı, alıntı bölümü                   | Zorunlu          | Güven sinyali                    |
| Audio Controls    | Oynat/Durdur                               | Varyant          | Ses durumu global göstergeden   |

Bu yapı, kartların farklı bağlamlarda yeniden kullanılabilmesini ve görsel tutarlılık sağlamasını mümkün kılar. Özellikle “Source/Quote” slotunun standartlaşması, güven ve şeffaflık gereksinimini görünür kılar.

## Önceliklendirilmiş İyileştirme Yol Haritası

Önceliklendirme, kısa vadede hızlı kazanımlar, orta vadede erişilebilirlik ve tasarım sistemi, uzun vadede modüler bileşen kütüphanesi ve deneysel özelliklerle ilerler. Kısa vadede güven/şeffaflık ve kontrast/odak göstergelerindeki düzeltmeler, hem en yüksek etkiyi yaratır hem de riskleri azaltır[^2][^16][^7].

Tablo 7. Yol Haritası Özeti

| Zaman Ufku | İş Kalemi                                        | Etki (UX/Trust) | Efor (Dev/Design) | Bağımlılıklar                       |
|------------|---------------------------------------------------|------------------|-------------------|-------------------------------------|
| 0–2 hf     | Kaynak/alıntı etiketleri (kart/chat)              | Yüksek           | Düşük             | Şablon slotları, ikonografi         |
| 0–2 hf     | Chat’ta YZ kullanım duyurusu + takip soruları     | Yüksek           | Düşük             | Mikro kopya, CTA butonları          |
| 0–2 hf     | Focus ring standardı + kontrast düzeltmeleri      | Orta-Yüksek      | Düşük             | Token güncellemesi, test            |
| 2–6 hf     | Tipografi ölçeği + kart şablonları                | Orta             | Orta              | Tasarım sistemi (H/M/L)             |
| 2–6 hf     | Loading stratejisi (iskelet/progress)             | Orta             | Orta              | Bekleme süreleri ve durumlar        |
| 2–6 hf     | WCAG AA denetimi + ARIA semantik                  | Yüksek           | Orta              | Bileşen envanteri                   |
| 6–12 hf    | Tasarım sistemi (renk/typo/token)                 | Yüksek           | Orta-Yüksek       | Figma/Kitaplık/Standartlar          |
| 6–12 hf    | Responsive grid + container queries               | Orta             | Orta              | Kart varyantları                    |
| 12+ hf     | Modüler bileşen kütüphanesi (kart, timeline, chat)| Yüksek           | Yüksek            | Sistem mimarisi                     |
| 12+ hf     | Göz izleme/ısı haritası A/B testleri              | Orta             | Orta              | Araçlar, katılımcılar               |

Bu yol haritası, “güven ve erişilebilirlik” odağını koruyarak teknik borcu azaltır ve ölçülebilir fayda üretir.

## Ölçümleme ve Başarı Kriterleri

Metrikler, kullanıcı davranışını ve tasarım kararlarının etkisini görünür kılar. Temel metrikler, görev tamamlama oranı, zaman toplama (time-to-task), güven sinyalleri etkileşimi (kaynağa tıklama, takip sorusu seçimi), erişilebilirlik uygunluk skorları ve hata/geri alma oranını içerir. Bu çerçeve, NN/G’nin YZ’nin UX’teki rolü ve güven algısı perspektifleriyle uyumludur[^25][^1][^2][^12][^13].

Tablo 8. Metrik Tanımları

| Metrik Adı                      | Tanım                                              | Ölçüm Yöntemi                          | Hedef          |
|---------------------------------|----------------------------------------------------|----------------------------------------|----------------|
| Görev Tamamlama Oranı          | Arama/analiz akışlarında kaynak doğrulama ile biten oturum yüzdesi | Olay zinciri (search → validate)      | +10–20%        |
| Time-to-Task                    | Görev başlatma→tamamlama süresi                   | Zaman damgaları                         | −15%           |
| Takip Sorusu Kullanım Oranı     | Chat yanıtlarında önerilen CTA’ların tıklanma oranı| Event tracking                          | +25%           |
| Kaynak/Alıntı Tıklama Oranı     | Kaynak ve alıntı etiketlerine tıklama yüzdesi     | Click map                               | +15%           |
| Erişilebilirlik Uygunluk Skoru  | WCAG AA kontrol listesi uyumu                      | Denetim + otomatik test                 | ≥ 95%          |
| Hata/Geri Alma Oranı            | Hata mesajı ve geri alma eylemleri                 | Hata günlükleri                         | −20%           |
| Loading Algısı                  | Beklemede terk ve şikayet oranı                    | Çıkış ve geri bildirim                   | −25%           |

Bu metrikler, yalnızca mevcut durumu değil, tasarım değişikliklerinin zaman içindeki etkisini de izler. Örneğin “Loading Algısı”, iskelet ve determinatif progress kullanımıyla birlikte düşmeyi hedefler.

## Bilgi Boşlukları ve Varsayımlar

Mevcut analiz, UI/UX çerçevesinde ilerlerken aşağıdaki bilgi boşluklarını not eder: kullanıcı araştırması ve görev senaryoları, gerçek kullanıcı testleri (göz izleme, ısı haritası), performans metrikleri (Core Web Vitals, gerçek API gecikmeleri, ortalama beklemeler), içerik stratejisi ve mikro kopya envanteri, görsel varlıklar (ikon seti, illüstrasyonlar, marka kuralları), mobil/tablet davranışları ve responsive kırılımları, erişilebilirlik denetimi ve ekran okuyucu testleri. Bu boşluklar, tasarım kararlarının etkisini ölçmek ve iyileştirmek için kapatılmalıdır. Aksi durumda, önerilerin bir kısmı varsayım düzeyinde kalacaktır.

## Sonuç

Truth Re:Build AI’nin arayüzü güçlü bir temel üzerine kurulu. Buna rağmen, karanlık modda kontrast/ergonomi, güven/şeffaflık ve mikro etkileşim/feedback stratejilerindeki iyileştirmeler, hem hukuk bağlamının gerektirdiği ciddiyet ve doğruluk hissini güçlendirir hem de görev odaklı kullanımı hızlandırır. Renk ve tipografi token’larıyla sistematikleştirilmiş bir tasarım sistemi, WCAG 2.1 AA uyumu, kart şablonlarının standardizasyonu ve konuşmalı YZ güven desenlerinin uygulanması, kısa-orta vadede yüksek etki yaratır. Ölçümleme ve A/B testleriyle desteklenen bu yol haritası, ürünün kullanıcılar nezdinde güvenilir, erişilebilir ve verimli bir hukuki YZ asistanı olarak konumlanmasını sağlayacaktır.

---

## Kaynaklar

[^1]: TELUS Digital. Conversational AI Assistant Design: 7 UX/UI Best Practices. https://www.telusdigital.com/insights/digital-experience/article/7-ux-ui-rules-for-designing-a-conversational-ai-assistant  
[^2]: Aufait UX. AI Interface Usability: 10 Key Principles for Better UX. https://www.aufaitux.com/blog/ai-interface-usability-principles/  
[^3]: Lazarev.agency. 6 UX/UI Design Principles in Legal Tech That Work. https://www.lazarev.agency/articles/legaltech-design  
[^4]: Laws of UX. https://lawsofux.com/  
[^5]: Medium (Maja Mitrovikj). UX/UI Trends 2025. https://medium.com/codeart-mk/ux-ui-trends-2025-818ea752c9f7  
[^6]: Smashing Magazine. Inclusive Dark Mode: Designing Accessible Dark Themes. https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/  
[^7]: Material Design. Dark theme. https://m2.material.io/design/color/dark-theme.html  
[^8]: NN/G. Dark Mode: How Users Think About It and Issues to Avoid. https://www.nngroup.com/articles/dark-mode-users-issues/  
[^9]: UX Design Institute. Dark Mode Design: A Practical Guide. https://www.uxdesigninstitute.com/blog/dark-mode-design-practical-guide/  
[^10]: Design Shack. Typography in Dark Mode: How to Optimize Fonts for Low-Light UI. https://designshack.net/articles/typography/dark-mode-typography/  
[^11]: Medium (Enzoy M. Ribeiro). Designing in the Dark: The Best Practices for Dark Mode UI. https://medium.com/@enzoymribeiro/designing-in-the-dark-the-best-practices-for-dark-mode-ui-0ffe20057311  
[^12]: Pencil & Paper. UX Design Patterns for Loading. https://www.pencilandpaper.io/articles/ux-pattern-analysis-loading-feedback  
[^13]: UX Design (Medium). Loading & progress indicators — UI Components series. https://uxdesign.cc/loading-progress-indicators-ui-components-series-f4b1fc35339a  
[^14]: NN/G. Progress Indicators Make a Slow System Less Insufferable. https://www.nngroup.com/articles/progress-indicators/  
[^15]: Boldist. Your Loading Spinner Is a UX Killer! https://boldist.co/usability/loading-spinner-ux-killer/  
[^16]: W3C. Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/  
[^17]: W3C WAI. WCAG 2 Overview. https://www.w3.org/WAI/standards-guidelines/wcag/  
[^18]: USWDS. Accessibility. https://designsystem.digital.gov/documentation/accessibility/  
[^19]: ADA.gov. Fact Sheet: New Rule on the Accessibility of Web Content. https://www.ada.gov/resources/2024-03-08-web-rule/  
[^20]: UI-Patterns. Cards design pattern. https://ui-patterns.com/patterns/cards  
[^21]: Design Shack. How Card-Based Layouts Shape Modern UX. https://designshack.net/articles/ux-design/card-layouts-modern-ux/  
[^22]: UXPin. Responsive Design: Best Practices Guide [2025]. https://www.uxpin.com/studio/blog/responsive-design-guide/  
[^23]: Justinmind. Card UI design: fundamentals and examples. https://www.justinmind.com/ui-design/cards  
[^24]: BRICX. 10 Card UI Design Examples That Actually Work in 2025. https://bricxlabs.com/blogs/card-ui-design-examples  
[^25]: NN/G. AI as a UX Assistant. https://www.nngroup.com/articles/ai-roles-ux/  
[^26]: Bird Marketing. How to Use Feedback Loops in UX Design. https://bird.marketing/blog/digital-marketing/guide/ux-design-principles/use-feedback-loops-ux-design/