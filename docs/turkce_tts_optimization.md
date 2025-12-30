# Hukuki Metinler İçin Türkçe TTS Optimizasyon Stratejisi

## Yönetici Özeti

Hukuki metinlerin sesli okuma (Text-to-Speech, TTS) uygulamalarında doğruluk ve anlaşılabilirlik, teknik mükemmellik kadar dilin özgün yapısına ve bağlamsal hassasiyetlere bağlıdır. Bu rapor, Türkiye’deki hukuk sistemine uygun Türkçe TTS optimizasyonu için bütüncül bir strateji sunar. Yaklaşımımız, dört temel ekseni birbirine bağlar: terminoloji yönetimi ve sözlükleme, ses parametrelerinin (hız, ton, vurgu, duraklama) ayarı, Speech Synthesis Markup Language (SSML) ile ara düzey kontrol, ve Türkçe hukuki metinlere özgü yapay zekâ (AI) optimizasyonları.

Türkiye’deki yargı sistemi, adli, idari ve anayasa yargısının farklı kollar ve mahkeme türleriyle örgütlendiği resmî bir yapıya sahiptir; kanun ve yönetmeliklerin üstünlüğü ve bağlayıcılık, birebir TTS anlatım stratejilerini doğrudan etkiler.[^1] Hukuki dilin terminolojik omurgası büyük ölçüde yabancı kökenli terimlerden (Arapça, Farsça ve Batı dilleri) oluşur; bu terimlerde yazım ve telaffuz incelikleri (uzun ünlüler, düzeltme işareti kullanımı, ses uyumları) sıkça sorun üretir ve öğrenciler ile uygulamacılar nezdinde anlam kaymalarına yol açabilir.[^2] Bu nedenle TTS sistemleri, yalnızca genel Türkçe fonetik kurallarına değil, hukuki bağlama özgü istisna ve tercihlere duyarlı bir sözlük ve kural setine dayanmalıdır.

Önerilen strateji, üç katmanda hayata geçirilir: birincisi, Adalet Bakanlığı Hukuk Sözlüğü ve Türk Dil Kurumu (TDK) kaynaklarını temel alan bir Terim Kütüphanesi; ikincisi, SSML ile prosodi, duraklama ve özel telaffuzların kontrolü; üçüncüsü, hukuki metin türlerine göre parametre matrisleri ve denetimli kullanıcı testleri. Raporun son bölümü, uygulamaya dönük SSML şablonları ve ölçümleme planıyla, ürün ve içerik ekiplerinin hızla devreye alabileceği pratik bir yol haritası sunar.

---

## Kapsam, Yöntem ve Kaynaklar

Bu çalışma, Türkiye Cumhuriyeti yargı sistemine uygun hukuki metinlerin TTS ile seslendirilmesinde, anlaşılabilirlik ve doğruluğu artırmak üzere dilbilimsel ve teknik ilkeleri bütünleştirir. Kapsam, kanun ve yönetmeliklerden idari ve yargısal kararlara, yargı organlarının resmî açıklamalarından eğitim amaçlı hukuk metinlerine uzanır. Yöntem, alan yazın ve resmî kılavuzların taranması, TTS platformlarının yeteneklerinin incelenmesi ve SSML kontrol düzeylerinin hukuki metin gereksinimleriyle eşleştirilmesini içerir.

Kaynaklar, TDK’nın yükseköğretimde karşılaşılan terim sorunları raporundan elde edilen dilsel içgörüler, Adalet Bakanlığı Hukuk Sözlüğü ile TDK Sözlük referansları, Dışişleri Bakanlığı’nın hukuk terminolojisi kılavuzu, ve TTS sağlayıcılarının Türkçe desteği ile SSML teknik referanslarıdır.[^2][^3][^4][^5] Terminoloji sınıflandırması, MFA’nın konu alanı kodlarına dayanır; bu kodlar, TTS’de bağlam-tabanlı ses tercihleri (ör. usul ve yargılama vs. uluslararası hukuk) için pratik bir çerçeve sunar.[^5]

Sınırlılıklar: Türkçe hukuki metinlerde TTS için resmî standartlaştırılmış hız/tempo değerleri mevcut değildir; bu nedenle A/B testleriyle temkinli aralıklar önerilir. Mahkeme türlerine özgü resmî ses profili tavsiyeleri bulunmamaktadır; kullanıcı testleriyle yerel uyarlama zorunludur. Yüksek kaliteli hukuki metin tabanlı açık veri setleri sınırlıdır; model eğitimi için iç veri toplama ve etik uygunluk şarttır. Hukuki terimlerde standardize fonetik transkripsiyon (IPA) kapsamı eksiktir; kapsamlı sözlükleme ve kalite denetimi gereklidir.[^2]

---

## Türk Hukuk Sistemi ve Hukuki Metin Türleri

Türkiye’de yargı sistemi; adli yargı, idari yargı ve anayasa yargısı olmak üzere üç ana kolda örgütlenir. Her kolda farklı görev ve yetki alanlarına sahip mahkemeler yer alır; bu farklılaşma, anlatı tarzını ve ses profilini doğrudan etkiler.[^1][^6] Örneğin idari yargıda iptal ve yürütmenin durdurulması gibi terimler sıkça geçerken, adli yargıda taraflar, dava türleri ve delil kavramları öne çıkar. Anayasa yargısında ise normlar hiyerarşisi ve Anayasaya aykırılık denetimleri belirleyicidir.[^7]

Hukuki metin türleri, TTS tasarımına şu açılardan etki eder: üst normlar (Anayasa) bağlayıcılığı ve ağırlığıyla daha ağır ve temkinli bir anlatım ister; kanun ve yönetmelikler hüküm ve yaptırım dilinin kesinliğini yansıtır; idari ve yargısal kararlar, gerekçeli yapı nedeniyle daha uzun cümle akışlarıyla gelir. Bu çeşitlilik, ses hızını, duraklama sıklığını ve vurgu stratejilerini bağlama göre ayarlamayı zorunlu kılar.[^1][^7]

![Türk yargı sistemi broşüründen görsel](.pdf_temp/viewrange_chunk_1_1_5_1762213857/images/sav9cn.jpg)

Aşağıdaki tablo, hukuki metin türlerine göre önerilen TTS ses konfigürasyonlarını çerçeveler. Bu matristeki değerler, resmî standart olmamakla birlikte, dilbilimsel ilkeler ve yargı sistemi bağlamı dikkate alınarak temkinli aralıklar halinde önerilmiştir; uygulamada A/B testleriyle rafine edilmelidir.

### Tablo 1. Hukuki Metin Türleri → Önerilen TTS Ses Konfigürasyonları

| Metin Türü                  | Hız (Konuşma Oranı) | Ton (Prosodi)       | Vurgu                          | Duraklama Sıklığı        | Açıklama ve Gerekçe                                                                 |
|-----------------------------|---------------------|---------------------|--------------------------------|--------------------------|-------------------------------------------------------------------------------------|
| Anayasa                     | 0.85–0.95           | Nötr/daha derin     | Başlık, ilke ve haklar vurgulu | Yüksek (cümle/fasıl)     | Üst normların bağlayıcılığı ve kavram yoğunluğu; dinleyicinin takibini kolaylaştırır.[^7] |
| Kanun                       | 0.90–1.00           | Nötr                | Madde/fıkra vurgusu            | Orta-Yüksek              | Hüküm ve yaptırım dilinin kesinliği; madde geçişlerinde net duraklama gerekir.          |
| Yönetmelik                  | 0.95–1.05           | Nötr                | Yetki, yükümlülük, usul vurgulu| Orta                     | İşlevsel ve uygulamaya dönük hükümler; akışta ritim korunmalı.                          |
| İdari Yargı Kararı          | 0.90–0.98           | Nötr/daha derin     | Gerekçe ve sonuç vurgulu       | Orta-Yüksek              | Uzun gerekçeli yapı; kritik bulgularda ton varyasyonu anlaşılırlığı artırır.            |
| Adli Yargı Kararı           | 0.92–1.00           | Nötr                | Delil ve hüküm vurgulu         | Orta                     | Taraflar ve delil ilişkilerinin takibi; cümle içi duraklamalar kritik noktalarda artırılır. |
| Anayasa Mahkemesi Kararı    | 0.85–0.95           | Nötr/daha derin     | Norm ve ilke vurgulu           | Yüksek                   | Normlar hiyerarşisi ve ilkesel hükümler; ağır ve kontrollü anlatım gerektirir.[^7]      |
| Yargıtay İçtihatları        | 0.92–1.00           | Nötr                | İlke ve istisna vurgulu        | Orta                     | İlkesel nitelik ve emsal değer; vurgu ile anlam ayrımı belirginleştirilmelidir.          |

Bu konfigürasyonlar, TTS sağlayıcılarının prosodi, hız, ton ve duraklama kontrolleriyle SSML üzerinden uygulanabilir.[^8][^9][^10] Özellikle yüksek duraklama gerektiren metin türlerinde <break> etiketlerinin stratejik kullanımı, anlam birimlerini ayrıştırarak yanlış anlamaları azaltır.[^11][^12][^13]

---

## Türkçe Hukuki Terminolojinin Sesli Okuma İçin Analizi

Türk hukuk dili, tarihsel ve sistematik nedenlerle yabancı kökenli terimleri yoğun biçimde kullanır. TDK’nın terim sorunları raporu, öğrencilerin ve uygulamacıların bu terimlerde yazım ve telaffuz bakımından sıkça zorlandığını, anlam kaymalarının yaygın olduğunu gösterir.[^2] Örneğin “mahsur” ve “mahzur” gibi sesleri yakın kelimelerin karıştırılması, “hile” kelimesinde uzun hecenin kısa söylenmesi, Arapça kökenli bazı terimlerde düzeltme işareti ve ek uyumlarının (iştirak, kasdî, itiyadî) doğru yorumlanmaması anlam ve doğruluk sorunlarını artırır.[^2]

Adalet Bakanlığı Hukuk Sözlüğü ve TDK Sözlük, resmî referans olarak tutarlı telaffuz ve yazım birliğini sağlamada birincil dayanaklardır.[^3][^4] Bu sözlükler, hukuki terimlerin bağlam içi anlamlarını ve dil içi eklerin davranışını gözeterek TTS kural setine işlenmelidir. MFA’nın hukuk terminolojisi kılavuzu ise terimlerin konu alanlarına göre sınıflandırılmasını sağlar; bu sınıflandırma, TTS’de bağlama duyarlı ses ayarlarına (ör. usul vs. uluslararası hukuk) zemin hazırlar.[^5]

![TDK Terim Sorunları raporundan ilgili sayfa görseli](.pdf_temp/viewrange_chunk_2_6_10_1762213859/images/7vxuqd.jpg)

Aşağıdaki tablolar, TTS mühendisliği ve ses tasarımı açısından kritik örnekleri sistematize eder.

### Tablo 2. Hukuki Terimlerde Sık Telaffuz Hataları → Doğru Kullanım → Referans

| Terim      | Sık Hata                         | Doğru Kullanım ve Not                                                  | Referans |
|------------|----------------------------------|-------------------------------------------------------------------------|----------|
| Mahsur     | “Mahzur” ile karışır             | “Mahsur” (bir yerde, ocakta, karda kalma); “Mahzur” (sakınca).[^2]    | [^2]     |
| Mahzur     | “Mahsur” ile karışır             | Sakınca, sakıncalı anlamı; bağlamla ayrışır.[^2]                       | [^2]     |
| Hile       | İlk hece kısa söylenir           | İlk hece uzun (hî-le); vurgu ve süre doğru uygulanmalı.[^2]            | [^2]     |
| İştirak    | Son hece kalın varsayılır        | Son hece ince telaffuz; ek ince ünlülü (-ki); k yumuşamaz.[^2]         | [^2]     |
| Kasdî      | Düzeltme işareti gereksiz konur  | Nispet eki; düzeltme işareti konmaz; d→t yumuşaması bağlamı.[^2]       | [^2]     |
| İtiyadî    | Düzeltme işareti yanlış kullanılır| Sıfat biçimi; düzeltme işareti konmaz; “itiyat” (alışkanlık) kökeni.[^2] | [^2]     |
| Müteselsilen| Türkçe karşılıkta tereddüt       | Müteselsilen (zarf), müteselsil (sıfat); Türkçeleştirme tercihleri mümkün.[^2] | [^2]     |

### Tablo 3. MFA Terminoloji Kodları → Örnek Terimler

| Kod  | Konu Alanı                              | Örnek Terimler (Türkçe/İngilizce)                  |
|------|------------------------------------------|----------------------------------------------------|
| 1206 | Genel Hukuk Terminolojisi                | Adil yargılanma / Fair trial; Hukuk devleti / Rule of law[^5] |
| 1211 | Medeni/Borçlar Hukuku                    | Akit / Contract; Borç / Obligation[^5]            |
| 1216 | Ceza Hukuku                               | Adli para cezası / Judicial fine; Cezalandırma / Imposition of penalty[^5] |
| 1221 | Yargılama Hukuku ve Usul                  | Duruşma / Hearing; Davacı / Claimant[^5]          |
| 1226 | Mahkemeler ve Yargı Teşkilatı            | Asliye Hukuk Mahkemesi / Civil court of first instance[^5] |
| 1231 | Uluslararası Hukuk                        | Antlaşma / Treaty; Açık denizler / High seas[^5]  |
| 1236 | İnsan Hakları                             | Adil tatmin / Just satisfaction; Aile birleşimi / Family reunification[^5] |

Bu sınıflandırma, TTS’de bağlama uygun prosodi ve duraklama paternlerinin seçilmesini kolaylaştırır. Örneğin insan hakları metinlerinde empati ve açıklık vurgusu, uluslararası hukuk metinlerinde ise terim tutarlılığı ve yavaşlatılmış tempo daha uygundur.

---

## Türkçe Hukuki Metinlerde Ses Hızı, Tonlama, Vurgu ve Duraklama

Hukuki metinlerde konuşma hızı (tempo), anlaşılabilirliği doğrudan etkiler. Aşırı hız, terim yoğun yapıda yanlış anlamaya; aşırı yavaşlık ise monotonluk ve dikkat kaybına yol açar. Erişilebilirlik literatürü, hız ayarını içerik türüne göre stratejik biçimde yönetmeyi, kritik noktalarda ton varyasyonu ve vurgu kullanımını önerir.[^14] Tonlama, resmiyet ve tarafsızlığı korurken, gerektiğinde empatiyi veya otoriteyi iletmek için kontrollü biçimde değiştirilmelidir.[^14] Vurgu ve duraklama, Türkçenin son hece vurgusu kuralına bağlı kalarak, hukuki metinlerde madde/fıkra geçişleri, tanımlar ve istisnalar gibi yapısal unsurları netleştirecek şekilde uygulanır.[^15]

Ses kalitesi ve netlik, boğumlanma (artikülasyon) disiplinine dayanır; dudak ve dil hareketlerinin tam çıkarılması, ünlü ve ünsüzlerin hakkının verilmesi, özellikle son seste sert ünsüzlerin doğru telaffuzu, TTS çıktısında anlatımın kesinliğini artırır.[^15] Duraklamalar, cümle içi anlam birimlerini ayrıştırır; gereksiz uzun duraklar akışı bozarken, kritik noktalarda yetersiz duraklama yanlış bağlam oluşturur. Bu nedenle noktalama işaretlerine bağlı bir duraklama protokolü ve SSML <break> yönetimi uygulanmalıdır.[^11][^12][^13]

---

## SSML ile Hukuki Metinlere Özel Ses Kontrolü

Speech Synthesis Markup Language (SSML), TTS çıktısını ara düzeyde kontrol etmeyi sağlayan standart bir işaretleme dilidir. Hukuki metinlerde hassas telaffuz, prosodi ve duraklama gereksinimleri SSML ile etkin biçimde yönetilir. <prosody> etiketi pitch (ton yüksekliği), rate (konuşma hızı) ve volume (ses düzeyi) parametrelerini ayarlar; <break> etiketi duraklama sürelerini belirler; <say-as> etiketi, belirli metin türlerinin (ör. tarih, madde numarası, kanun referansı) doğru söylenişini sağlar.[^11][^12][^13][^16]

SSML kullanımı, sadece teknik bir tercih değil, aynı zamanda sorumlu AI uygulamalarının bir parçasıdır. Microsoft’un sorumlu AI notları, TTS şeffaflığı ve kullanıcıya açıklık ilkelerini vurgular; SSML ile yapılan özelleştirmelerin belgelendirilmesi ve denetlenebilirliği bu kapsamda değerlendirilmelidir.[^9] Aşağıdaki tablo, hukuki kullanım senaryolarına uygun SSML örneklerini özetler.

### Tablo 4. SSML Etiketleri → Hukuki Kullanım Senaryoları → Örnek

| Etiket     | Amaç                         | Kullanım Senaryosu                   | Örnek (özet)                                                                 |
|------------|------------------------------|--------------------------------------|-------------------------------------------------------------------------------|
| <prosody>  | Hız/Ton/Volüm ayarı          | Anayasa veya ilke cümleleri          | `<prosody rate="85%" pitch="-2st">Anayasa’nın 10. maddesi…</prosody>`[^11][^12] |
| <break>    | Duraklama ekleme             | Madde/fıkra geçişleri                | `<break time="300ms"/>`, kritik tanımdan sonra `<break time="500ms"/>`[^11][^12] |
| <say-as>   | Özel söyleniş                | Kanun maddesi, tarih, sayı           | `<say-as interpret-as="characters">m. 141/2</say-as>`, `<say-as interpret-as="date">2025-05-27</say-as>`[^11][^16] |
| <voice>    | Ses profili seçimi           | Resmî metinlerde nötr/derin ton      | `<voice name="tr-TR-Standard-A">…</voice>` (sağlayıcıya göre değişir)[^8][^10]    |

Bu etiketler, hukuki metnin yapısına gömülü olarak kullanıldığında (ör. kanun maddesi XML içinde etiketlenirse), TTS motorları bağlamı doğru yorumlayarak sesli anlatımı standardize eder. Ses sağlayıcılarının desteklediği voice ve style seçenekleri farklılık gösterebilir; Google Cloud TTS ve Azure documentation, Türkçe voice ve SSML desteğine ilişkin referans sağlar.[^8][^10][^11][^12]

---

## Türkçe TTS Sağlayıcıları ve Teknik Yetenekler

Piyasadaki başlıca TTS sağlayıcıları, Türkçe dil desteği ve SSML uyumluluğu bakımından farklı güçlü yönlere sahiptir. Kurumsal çözümler (Azure, Google, ReadSpeaker) denetimli entegrasyon ve geniş dokümantasyon sunarken; Narakeet gibi içerik odaklı araçlar pratik kullanımda hız ve çoklu format desteği sağlar. Murf AI ve ElevenLabs gibi yapay zekâ tabanlı üreticiler, doğal ve esnek seslerle öne çıkar. Twilio, geliştirici odaklı entegrasyonlarda <say-as> ile kategorik söylenişi destekler; ses envanterinde düzenli güncellemeler yapar.[^8][^10][^11][^12][^16][^17][^18][^19][^20][^21][^22]

Aşağıdaki tablo, Türkçe TTS için teknik yetenekleri karşılaştırmalı olarak sunar.

### Tablo 5. Türkçe TTS Sağlayıcıları → Teknik Yetenekler

| Sağlayıcı       | Türkçe SSML | Özelleştirme (Prosodi/Vurgu/Duraklama) | Türkçe Voice Seçenekleri     | Entegrasyon ve Notlar                                           |
|-----------------|-------------|----------------------------------------|------------------------------|-----------------------------------------------------------------|
| Azure TTS       | Evet[^11][^12][^13] | Evet (prosody, break, say-as)            | Evet (Neural/Standard)       | Kurumsal, sorumlu AI notları, geliştirici dokümantasyonu güçlü.[^9] |
| Google Cloud TTS| Evet[^11]    | Evet                                     | Evet                          | Geniş voice listesi ve tipler; güçlü API.[^8][^10]               |
| ReadSpeaker     | Evet         | Evet                                     | Evet                          | Kurumsal içerik ve erişilebilirlik çözümleri.[^17]              |
| Narakeet        | Evet[^19]    | Evet                                     | Evet (55 Türkçe ses)[^19]     | İçerik üretimine uygun; m4a/mp3/wav çıktı; pratik kullanım.[^19] |
| Murf AI         | Evet         | Evet                                     | Evet                          | Doğal AI sesler; pitch/speed/pronunciation ayarları.[^20]       |
| ElevenLabs      | Evet         | Evet                                     | Evet                          | İnsan benzeri Türkçe sesler; çeşitli kullanım senaryoları.[^18] |
| Twilio          | Evet[^16][^22] | Evet                                     | Evet                          | <say-as> desteği; düzenli voice güncellemeleri.[^16][^22]       |

Seçim kriterleri, hukuki bağlamda SSML esnekliği, ses kalitesi, entegrasyon kolaylığı ve maliyet/ölçeklenebilirlik olarak özetlenebilir. Kurumsal uygulamalarda Azure ve Google, SSML ve denetlenebilirlik avantajlarıyla öne çıkar; içerik ve eğitim odaklı projelerde Narakeet ve Murf pratiklik sağlar.

---

## AI ve Makine Öğrenmesi ile Optimizasyon

Türkçe TTS, derin öğrenme tabanlı yaklaşımlarla son yıllarda belirgin gelişim göstermiştir. Tacotron 2 gibi uçtan uca sinirsel mimariler, doğal prosodi ve Türkçe fonetik özelliklerini daha iyi yakalayabilmektedir.[^23] Derin öğrenme tabanlı otomatik konuşma tanıma (ASR) çalışmaları, Türkçeye özgü veri ve modelleme stratejilerinin başarımı artırdığını göstermiştir; bu içgörüler, TTS’de hedef metin analizi ve prosodi planlamasında kullanılabilir.[^24]

Hukuki metinlere özgü veri artırma stratejileri, ad-entity tanıma (Named-Entity Recognition, NER) ile kurum adları, kişi unvanları, madde ve fıkra referansları gibi unsurların otomatik etiketlenmesini içerir. Bu sayede <say-as> ve prosodi kontrolü, metin yapısına gömülü biçimde uygulanabilir.[^25] Türk Anayasa Mahkemesi kararları üzerinde özetleme ve analiz çalışmaları, uzun metinlerde kritik bulguların vurgulanmasına dönük veri odaklı yaklaşımların etkisini göstermektedir.[^26]

Önerilen pipeline: veri toplama → etiketleme (NER) → sözlükleme (TDK/Adalet/MFA) → model ayarı (SSML tabanlı prosodi/durak) → denetimli kullanıcı testi → iteratif iyileştirme. Bu süreçte veri gizliliği ve telif, sorumlu AI ilkeleri ve yerel düzenlemeler çerçevesinde yönetilmelidir.[^9]

---

## Doğrulama, Kalite Ölçümü ve Erişilebilirlik

Kalite ölçümü, nesnel ve öznel metriklerin birlikte kullanılmasını gerektirir. Nesnel ölçümler; telaffuz doğruluğu (sözlük ve kural tabanlı denetim), terim doğruluğu (sözlük eşleme), boğumlanma netliği (akustik analiz) ve prosodi uygunluğu (markup ile hedeflenen paternlere uyum) olarak özetlenebilir. Öznel değerlendirme; hukukçular ve dil uzmanlarıyla A/B testleri ve dinleyici anketlerini içerir. Erişilebilirlik ölçütleri, hız ve anlaşılabilirlik dengesi, tonlama ve vurgu ile dinleyici yükünün azaltılması gibi unsurları kapsar.[^14][^27][^28]

A/B test planı, farklı hız (ör. 0.90 vs 0.95), duraklama (300ms vs 500ms), ve prosodi (nötr vs derin ton) kombinasyonlarını aynı metin üzerinde karşılaştırır. Kullanıcı geri bildirimleri ve hata analizleri, sözlük ve SSML kurallarının iteratif güncellenmesini besler. Operasyonel gereksinimler, gürültü azaltma, ses seviyelerinin normalizasyonu ve farklı platformlarda tutarlılık (web, mobil, e-öğrenme) olarak belirlenir.[^14][^27]

### Tablo 6. Kalite Metrikleri ve Ölçüm Planı

| Metrik                 | Tanım                                         | Ölçüm Yöntemi                                      | Araç/Kaynak           | Hedef Aralık/İlke                                 |
|------------------------|-----------------------------------------------|----------------------------------------------------|------------------------|----------------------------------------------------|
| Telaffuz Doğruluğu     | Terim ve fonetik kurallara uyum               | Sözlük/kural tabanlı denetim; otomatik fonetik kontrol | TDK/Adalet sözlükleri[^3][^4] | ≥ 98% doğruluk                                     |
| Terim Doğruluğu        | Hukuki terimin bağlama uygun kullanımı        | NER ve sözlük eşleme                               | NER+ sözlük[^25]       | ≥ 97% eşleşme                                     |
| Boğumlanma Netliği     | Ünlü/ünsüzlerin hakkının verilmesi            | Akustik analiz (temizlik, artikülasyon skoru)      | A/B test + akustik analiz | Monotonluk veya bulanıklık yok; netlik yüksek[^15]  |
| Prosodi Uygunluğu      | Hız, ton ve vurgu paternlerinin bağlama uygunluğu | SSML hedefleri vs çıktı karşılaştırma              | SSML kontrolleri[^11][^12] | Bağlama uygun prosodi; kritik noktalar vurgulu     |
| Anlaşılabilirlik       | Dinleyicinin metni doğru anlama oranı         | Dinleyici testleri ve anket                        | Erişilebilirlik kılavuzları[^27][^28] | ≥ 85% doğru anlama                                 |
| Kullanıcı Memnuniyeti  | Genel deneyim ve profesyonellik algısı        | Anket ve geri bildirim                             | A/B test               | ≥ 4/5 memnuniyet                                  |

---

## Uygulama Yol Haritası

Yol haritası, terminoloji sözlüğünün kurulması ve teknik entegrasyonun tamamlanmasını, ardından saha validasyonunu içerir. İlk fazda, Adalet Bakanlığı Hukuk Sözlüğü ve TDK referanslarıyla, MFA kodlu bir Terim Kütüphanesi oluşturulur.[^3][^4][^5] İkinci fazda, SSML şablonlarıyla prosodi, duraklama ve özel söyleniş kontrolü sağlayan teknik entegrasyon yapılır; ses sağlayıcı seçimi (Azure, Google, ReadSpeaker vb.) ve API entegrasyonu tamamlanır.[^8][^9][^10][^11][^12] Üçüncü fazda, hukukçular ve dil uzmanlarıyla saha testleri yürütülür; hata analizi ve iteratif iyileştirme döngüleri planlanır.[^14]

![Hukuk Dili ve Terminolojisi ders kitabı görseli (kapsam vurgusu)](.pdf_temp/viewrange_chunk_1_1_5_1762213857/images/oi9wm1.jpg)

### Tablo 7. Uygulama Adımları → Sorumlular → Zaman Çizelgesi → Çıktılar

| Adım                                      | Sorumlular                         | Zaman Çizelgesi          | Çıktılar                                                     |
|-------------------------------------------|------------------------------------|--------------------------|--------------------------------------------------------------|
| Terim Kütüphanesi (TDK/Adalet/MFA)        | Dil uzmanları, hukukçular          | 4–6 hafta                | Kodlu sözlük, telaffuz kuralları, diyakritikler[^3][^4][^5]  |
| SSML Şablon Tasarımı                      | TTS mühendisleri, ürün ekipleri    | 3–4 hafta                | <prosody>/<break>/<say-as> şablonları, stil rehberi[^11][^12]|
| Sağlayıcı Entegrasyonu ve Test            | TTS mühendisleri, DevOps           | 3–5 hafta                | API entegrasyonu, ses envanteri, SSML doğrulama[^8][^9][^10] |
| Saha Validasyonu (A/B Test)               | Hukukçular, UX araştırmacıları     | 4–6 hafta                | Hata analizi, kullanıcı geri bildirimi, iyileştirme planı[^14]|
| Operasyonel Yayın ve İzleme               | Ürün, kalite, içerik ekipleri      | Süreklilik               | Ölçüm panoları, geri bildirim döngüleri, sürüm yönetimi      |

---

## Riskler, Etik ve Uyum

Telif ve veri gizliliği, hukuki metinlerin seslendirilmesinde öncelikli risk alanıdır. Kaynak metinlerin telif durumu, kullanım lisansları ve kişisel verilerin korunması (özellikle yargısal kararlarda taraf adları ve özel bilgiler) titizlikle yönetilmelidir. Sorumlu AI ilkeleri, TTS şeffaflığı, ses profili kullanımında açıklık ve kullanıcı bilgilendirmesini gerektirir.[^9] Türkiye’de yapay zekâya özgü doğrudan ve kapsamlı bir düzenleme bulunmamakla birlikte, mevcut hukuk ve düzenleyici çerçeve uyumunun izlenmesi önerilir.[^29][^30] Model önyargıları ve terim yanlışlıkları, düzenli denetim ve sözlük güncellemeleriyle azaltılmalıdır.

---

## Sonuç ve Ekler

Bu rapor, Türkçe hukuki metinler için TTS optimizasyonunu terminoloji, ses parametreleri, SSML kontrolü ve AI destekli süreçlerle bütünleştiren bir strateji ortaya koymuştur. Temel bulgular üç başlıkta toplanabilir: birincisi, hukuki dilin yabancı kökenli terimleri ve yazım/telaffuz incelikleri, TTS sistemlerinde sözlükleme ve kural setine dayalı yaklaşımı zorunlu kılar; ikincisi, ses hızı, ton ve duraklama ayarlarının metin türüne göre temkinli aralıklarla uyarlanması, anlaşılabilirliği belirgin biçimde artırır; üçüncüsü, SSML ve NER tabanlı pipeline, uzun ve terim yoğun metinlerde denetlenebilir ve ölçülebilir bir kalite yönetimi sağlar.

Bilgi boşlukları ve sınırlamalar: resmî hız/tempo standardı yok; mahkeme türlerine özgü resmî ses profili tavsiyeleri bulunmuyor; hukuki metin tabanlı açık veri setleri sınırlı; terimlerin standardize fonetik transkripsiyonu eksik. Bu nedenle önerilen aralıkların sahada A/B testleriyle rafine edilmesi ve kapsamlı sözlükleme/kalite denetimi şarttır.

Ekler, TTS mühendisleri ve içerik ekiplerinin hızla uygulayabileceği SSML örneklerini ve bir terim önceliklendirme taslağını içerir:

1) SSML örnekleri:
- Prosodi ile ağır tempoda ilke cümlesi:
```
<prosody rate="88%" pitch="-2st" volume="medium">Anayasa’nın eşitlik ilkesi uyarınca…</prosody>
```
- Madde geçişinde duraklama:
```
Hüküm <break time="400ms"/> Madde 5 <break time="300ml"/>…
```
- Kanun maddesi ve tarih için <say-as>:
```
<say-as interpret-as="characters">m. 141/2</say-as>
<say-as interpret-as="date">2025-05-27</say-as>
```
- Uzun ünlü ve vurgu için break ve emphasis (örnek yaklaşım):
```
İtiyadî <break time="200ms"/> kullanım… (vurgu bağlama göre <prosody> ile)
```

2) Terim Sözlüğü Taslağı (kodlu ve etiketli):
- Terim | Köken | Yazım/Telaffuz Kuralı | MFA Kodu | Önerilen SSML/Kural | Kaynak
- Örnek giriş:
  - İştirak | Arapça | Son hece ince; ek ince ünlülü (-ki); k yumuşamaz | 1216 | <say-as> gerekmez; prosody’de vurgu son heceye | TDK, Adalet[^2][^3][^4]
  - Kasdî | Arapça | Nispet eki; düzeltme işareti yok; d→t yumuşaması bağlamı | 1216 | Diyakritik doğrulama; <say-as> gerekmez | TDK[^2][^4]

3) Başlıca Ekler:
- MFA kod listesi ve örnek terimlerle eşleme (bkz. Tablo 3).
- Hız/tempo A/B testi protokolü (örnek: 0.90 vs 0.95; 300ms vs 500ms).
- NER etiketleme şeması (MADDE, FIKRA, TARİH, KURUM_ADI, UNVAN, SAYI).

Stratejik öneri: Uygulamayı pilot metinlerle başlatın; sözlükleme ve SSML kurallarını sahada doğrulayın; ölçüm panoları ve kullanıcı geri bildirimleriyle sürekli iyileştirme döngüsü oluşturun. Bu yaklaşım, hukuki doğruluk ve erişilebilirliği birlikte maksimize edecek, kurumsal ölçekte sürdürülebilir bir TTS standardı sağlayacaktır.

---

## Kaynaklar

[^1]: Türkiye Adalet Sistemi Broşürü (TAA). https://taa.gov.tr/yuklenenler/dosyalar/f29b2a4b-ce9d-482d-ae66-97a6864ca7eb-turk-yargi-sistemi-brosur-son-28.08.2020-tr1.pdf  
[^2]: Yükseköğretimde Karşılaşılan Terim Sorunları (TDK). https://tdk.gov.tr/wp-content/uploads/2014/07/20140710.pdf  
[^3]: T.C. Adalet Bakanlığı Hukuk Sözlüğü. https://sozluk.adalet.gov.tr/  
[^4]: Türk Dil Kurumu Sözlükleri. https://sozluk.gov.tr/  
[^5]: Genel Hukuk Terminolojisi (T.C. Dışişleri Bakanlığı). https://www.mfa.gov.tr/data/Terminoloji/hukuk-terminoloji-110615.pdf  
[^6]: Türkiye’de Yargı Teşkilatı (Vikipedi). https://tr.wikipedia.org/wiki/T%C3%BCrkiye%27de_yarg%C4%B1_te%C5%9Fkilat%C4%B1  
[^7]: Anayasa Mahkemesi: Kanun. https://www.anayasa.gov.tr/tr/mevzuat/kanun/  
[^8]: Google Cloud Text-to-Speech: Desteklenen Sesler ve Diller. https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types  
[^9]: Microsoft Azure: TTS Şeffaflık Notu (Sorumlu AI). https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/transparency-note  
[^10]: Google Cloud: SSML Referansı. https://docs.cloud.google.com/text-to-speech/docs/ssml  
[^11]: Azure AI Speech: SSML ile Ses ve Ses Kontrolü. https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-voice  
[^12]: Azure AI Speech: SSML ile Telaffuz Kontrolü. https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-pronunciation  
[^13]: W3C: SSML Gereksinimleri. https://www.w3.org/TR/ssml11reqs/  
[^14]: Enhancing Accessibility in Legal Content: TTS Hız, Ton, Ses Seviyesi. https://usattorneys.com/enhancing-accessibility-in-legal-content-how-to-adjust-text-to-speech-speed-pitch-volume/  
[^15]: Güzel Konuşma ve Diksiyon (Telaffuz, Vurgu, Duraklama). https://www.kendinigelistir.com/guzel-konusma-ve-diksiyon/  
[^16]: Twilio: Metinden Konuşmaya (TTS) ve SSML <say-as>. https://www.twilio.com/docs/voice/twiml/say/text-speech  
[^17]: ReadSpeaker Türkçe TTS. https://www.readspeaker.com/languages-voices/turkish/  
[^18]: ElevenLabs Türkçe TTS. https://elevenlabs.io/text-to-speech/turkish  
[^19]: Narakeet Türkçe TTS. https://www.narakeet.com/languages/text-to-speech-turkish/  
[^20]: Murf AI Türkçe TTS. https://murf.ai/text-to-speech/turkish  
[^21]: Turkish Text-to-Speech API Documentation (CorollaryML). https://www.corollaryml.com/turkishttsdoc  
[^22]: Twilio: 2025 TTS Ses Güncellemeleri. https://www.twilio.com/en-us/changelog/new-text-to-speech-voices-for-say-update-03-2025  
[^23]: A Novel End-to-End Turkish TTS System via Deep Learning (MDPI). https://www.mdpi.com/2079-9292/12/8/1900  
[^24]: Customized Deep Learning Based Turkish ASR (NIH/PMC). https://pmc.ncbi.nlm.nih.gov/articles/PMC11041944/  
[^25]: Named-Entity Recognition in Turkish Legal Texts (Cambridge). https://www.cambridge.org/core/journals/natural-language-engineering/article/namedentity-recognition-in-turkish-legal-texts/012269AA2BBD10E546F8E5043426349A  
[^26]: Summarization of Turkish Constitutional Court Decisions (IEEE). https://ieeexplore.ieee.org/iel8/6287639/10820123/10947032.pdf  
[^27]: Text-to-Speech Erişilebilir İçerik Kılavuzu (iubenda). https://www.iubenda.com/en/help/183765-text-to-speech-assistive-technology  
[^28]: Web’de TTS Uygulaması için En İyi Uygulamalar (GraceThemes). https://gracethemes.com/best-practices-for-implementing-text-to-speech-on-your-website/  
[^29]: Global Regulatory Tracker: Turkey (AI) (White & Case). https://www.whitecase.com/insight-our-thinking/ai-watch-global-regulatory-tracker-turkey  
[^30]: AI, ML ve Big Data Yasaları 2025 – Türkiye (Global Legal Insights). https://www.globallegalinsights.com/practice-areas/ai-machine-learning-and-big-data-laws-and-regulations/turkey/  
[^31]: Türk Yargı Örgütü ve Hukuk Yargısı (Ankara Ü.). https://acikders.ankara.edu.tr/pluginfile.php/52227/mod_resource/content/2/2-Tu%CC%88rk%20Yarg%C4%B1%20O%CC%88rgu%CC%88tu%CC%88%20ve%20Hukuk%20Yarg%C4%B1s%C4%B1%20.pdf  
[^32]: Hukukun Çeşitli Anlamları (Ders Notu). https://hukuk.erdogan.edu.tr/Files/ckFiles/hukuk-erdogan-edu-tr/Ders%20Notlar%C4%B1/2.%20HAFTA.pdf