# Kapsamlı Türkçeleştirme Stratejisi: UI/UX Metinleri, Veri Dosyaları, Hukuki Terminoloji ve TTS için Entegre Yaklaşım

## 1. Amaç, Kapsam ve Başarı Kriterleri

Bu doküman, ürünün kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) metinleri, veri dosyaları ve şablonları, hukuki terminoloji ile metin-konuşma (Text-to-Speech, TTS) boru hattında kullanılacak hukuki metinlerin Türkçeleştirilmesi için uçtan uca bir strateji sunar. Amaç, tutarlı bir dil ve terminoloji kullanarak erişilebilir, anlaşılır ve seslendirmeye uygun içerik üretmek; aynı zamanda teknik altyapıda tekrar kullanılabilir, sürüm kontrollü ve ölçülebilir bir çeviri süreci kurmaktır. Strateji üç ayrı içerik alanına özgü çeviri yaklaşımlarını ve bunların TTS gereksinimleriyle nasıl bütünleştirileceğini tanımlar.

Bu kapsamda başarı; doğruluk ve tutarlılık, kullanılabilirlik ve erişilebilirlik, üretim verimliliği ve hız, sürdürülebilirlik ve kalite güvencesi, hukuki uygunluk ve risk azaltma gibi çıktılarla ölçülür. Başarı kriterleri, metin türlerine göre farklılaşır: UI/UX metinlerinde kısalık ve netlik ön plandayken, veri dosyalarında alan adları ve şema bütünlüğü kritik önem taşır. Hukuki metinlerde terminoloji doğruluğu ve özgün anlamın korunması temel hedefdir. TTS içinse söz dizimi, noktalama, seslendirme işaretlemesi ve hukuki metinlerde okunabilirlik önceliklidir.

Mevcut bilgi boşlukları nedeniyle bazı varsayımlar yapılmıştır: hedef kullanıcı segmentleri ve erişilebilirlik düzeyleri, veri dosyalarının format ve şema özellikleri, hukuki metin türlerinin kapsamı ve bağlayıcılık seviyeleri, TTS motoru/SSP (Ses Sağlayıcı) seçimi, yerelleştirme altyapısı ve otomasyon araçları, kalite metrikleri ve tolerans eşikleri ile kullanıcı geri bildirim kanalları netleşmemiştir. Bu boşluklar, ilerleyen fazlarda doldurulmak üzere hipotez olarak ele alınmış; planlanan çalışmalarla bu alanların doğrulanması öngörülmüştür.

### 1.1 Paydaşlar ve Roller

Bu stratejinin uygulanması ürün yöneticileri, içerik stratejistleri, UX yazarları, yerelleştirme uzmanları, hukuk danışmanları, TTS ses mühendisleri ve kalite güvencesi (QA) ekiplerinin koordinasyonunu gerektirir. Onay mekanizmaları içerik türlerine göre farklılaşır: UI/UX metinlerinde ürün ve UX yazım liderliği; veri dosyalarında veri mimarisi ve içerik yöneticileri; hukuki metinlerde hukuk birimi; TTS çıktılarında ses mühendisliği ve içerik ekipleri nihai onay sahipleridir. QA süreçleri tüm kanallarda devreye girer ve değişikliklerin sürüm takibi ile yayın onayları standart hale getirilir.

Risklerin yönetimi, erken uyarı mekanizmaları ve geri dönüş (rollback) prosedürlerini kapsar. Özellikle hukuki metinlerde küçük bir terminoloji hatası büyük etkiler doğurabileceğinden, kontrol listeleri ve çoklu gözden geçirme adımları zorunlu tutulur. TTS tarafında, beklenmeyen vurgu veya duraklama hataları canlı yayınlarda risk taşır; bu nedenle test senaryoları ve örneklemeli insan denetimi kritik kontrol noktasıdır.

### 1.2 Varsayımlar ve Kısıtlar

Teknik kısıtlar arasında karakter setleri (Unicode/UTF-8), uzunluk sınırlamaları (UI alanlarının piksel ve token kısıtları), dosya formatları (CSV, JSON, XML, INI, YAML, PO vb.), satır içi değişkenler ve yer tutucular (placeholders), bağlama duyarlı çeviri ve çok dil desteği sayılabilir. Terminoloji kaynaklarının mevcut olmaması, ekip kapasitesinin belirsizliği ve farklı zaman dilimlerinde yayın takvimleri uygulamada kısıt oluşturur. Bu kısıtlar, aşamalı teslimat ve önceliklendirme ile yönetilecek; otomasyonun artırılması ve kaynak havuzu oluşturulmasıyla etkileri azaltılacaktır.

## 2. Mevcut Analizlerin Sentezi (Ne?)

Mevcut durumda UI/UX metinleri, veri dosyaları ve hukuki terminoloji için ayrı ayrı kapsamlı analizlerin çıktılarına erişim bulunmamaktadır. Bu nedenle strateji, genel ilkeler ve sahada kanıtlanmış yaklaşımlar üzerine kurulmuştur. UI/UX metinleri kullanıcının görev tamamlama yolunun omurgasıdır; kısa, yönlendirici ve tutarlı olmalıdır. Veri dosyaları ve şablonları, sistemin makine tarafındaki dilidir; alan adları, anahtarlar, değerler, açıklamalar ve varyantlar için şema bütünlüğü esastır. Hukuki metinler, yüksek doğruluk ve anlamın özgün haliyle korunmasını gerektirir; karmaşık cümle yapılarının sadeleştirilmesi ve okunabilirliğin artırılması, kullanıcı deneyimi ve TTS uyumu açısından kritik önem taşır.

Bu üç alanın kesişim noktası, metinlerin TTS boru hattına hazırlanmasıdır. TTS için doğru söz dizimi, noktalama, duraklama ve vurgu işaretlemesi; hukuki metinlerde ise okunabilirliği artıracak yapısal düzenlemeler ve metin segmentasyonu gereklidir. UI/UX metinleri TTS uyumlu olduğunda, sistem içi anonslar, yardım içerikleri ve talimatlar sesli arayüzlerde doğal ve anlaşılır şekilde işitilecektir.

### 2.1 UI/UX Metinleri: Temel Bulgular

UI/UX metinleri, görev odaklı, kısa ve tutarlı olmalı; mikro kopyalar ile hata iletileri kullanıcıyı çözüme yönlendirmelidir. Jargon ve belirsiz ifadelerden kaçınmak, aktif ses ve açık çağrılar (Call to Action, CTA) kullanmak etkileşimi artırır. Tutarlılık, tekrar eden kalıpların standardize edilmesiyle sağlanır: aynı anlama gelen metinler aynı şekilde yazılmalı, gönder butonu her yerde aynı terimle ifade edilmelidir. Hata iletilerinde sorun, çözüm ve beklenen davranış bir arada sunulmalıdır.

### 2.2 Veri Dosyaları: Temel Bulgular

Veri dosyalarında çeviri, yalnızca görünen değerlerin değil, meta verilerin, şema etiketlerinin ve yardım metinlerinin de kapsamına alınmalıdır. Anahtar-değer yapıları, alan adları, ID’ler, yorum satırları ve varsayılan değerler için kurallar tanımlanmalıdır. Satır içi değişkenler ve yer tutucular korunmalı; çeviri sırasında bağlama duyarlı nüanslar dikkate alınmalıdır. Dil varyantları (tr, tr-TR) ve çok dillilik desteklenmeli; çeviri belleği ile yeniden kullanım oranı artırılmalıdır.

### 2.3 Hukuki Terminoloji: Temel Bulgular

Hukuki metinlerde terminoloji doğruluğu ve anlamın korunması önceliklidir. Mevzuat ve sözleşme dili ile kullanıcı arayüzü dili arasında bir denge kurulmalı; kullanıcıya yönelen kısımlar sade, hukuki bağlamı koruyan ama gündelik dile yakın bir üslupla sunulmalıdır. Karmaşık yapılar sadeleştirilirken özgün anlamın kaybolmaması için açıklayıcı dipnotlar veya kısa bilgi kutuları kullanılabilir. Tutarlılık, terim sözlüğü ve onay süreçleriyle güvence altına alınır.

## 3. UI/UX Metinleri için Çeviri Yaklaşımı (Nasıl?)

UI/UX metinlerinde stratejinin odağı kısa, net ve görev odaklı bir dil kullanmaktır. Mikro kopya kalıpları ve hata mesajları standardize edilerek tutarlılık sağlanır. Durumsal ton (tone) ve bağlama göre yazım kılavuzu ile giriş formları, hatalar, onaylar, durum mesajları ve sistem bildirimleri için yönlendirici şablonlar oluşturulur. Erişilebilirlik ilkeleri metin uzunluğu ve kontrast gibi ayrıntılarla desteklenir; ekran okuyucu uyumu ve odak sırasıyla uyumlu içerik üretilir. Sürümleme ve yerelleştirme akışı i18n (uluslararasılaştırma), l10n (yerelleştirme), çeviri belleği (Translation Memory, TM) ve terim veritabanı (Termbase) kullanımıyla yönetilir.

### 3.1 Mikro Kopya ve Etkileşim Kalıpları

Mikro kopya, butonlar, menü öğeleri, ipuçları (tooltips), boş durum mesajları ve onboarding adımlarındaki yönlendirici metinlerdir. Burada hedef, minimum kelime ile maksimum netlik sağlamaktır. “Gönder” yerine “Kaydet ve devam et” gibi sonuç odaklı ifadeler, kullanıcı beklentisini netleştirir. Boş durumlarda “Henüz hiç proje oluşturmadınız. Yeni proje başlatmak için buraya tıklayın.” şeklinde çözüme çağrı yapan mesajlar, kullanıcıyı hızla doğru davranışa yönlendirir.

### 3.2 Hata Mesajları ve Yardım İçerikleri

Hata mesajları üç bileşenle tasarlanır: sorunun ne olduğu, neden oluştuğu ve kullanıcının ne yapması gerektiği. Örneğin, “Giriş bilgileri hatalı. Şifrenizi sıfırlamak için ‘Şifremi unuttum’ bağlantısını kullanın.” biçiminde bir mesaj, çözüm adımını açıkça gösterir. Yardım içerikleri ve rehberler, bağlama duyarlı olarak ilgili ekranın hemen yanında sunulmalı; adım adım talimatlar ve kısa videolarla desteklenmelidir.

### 3.3 Erişilebilirlik ve Teknik Uyum

Erişilebilirlik açısından metinler kontrastı yüksek, ekran okuyucularla uyumlu ve anlamı koruyan alternatiflerle desteklenmelidir. Klavye ile gezinme sırasında odak sırasına uygun etiketleme (ARIA), doğru başlık hiyerarşisi ve bildirimlerin programatik olarak duyurulması gerekir. UI alanları için karakter/piksel sınırları belirlenerek uzun metinlerde kısaltma stratejileri uygulanmalı; çok satırlı taşmalar ve kesilmiş ifadeler engellenmelidir.

## 4. Veri Dosyaları ve Şablonları için Çeviri Yaklaşımı

Veri dosyalarında çeviri, yalnızca görünen değerleri değil, meta verileri de kapsamalıdır. Anahtar-değer (key-value) dosyalarında anahtar adları genellikle çevrilmez; değerler ve açıklamalar çevrilir. CSV, JSON, XML, YAML, INI ve PO gibi formatlarda alan adları, şema etiketleri, ID’ler, yorum satırları ve varsayılan değerler için tutarlı kurallar belirlenmelidir. Bağlama duyarlı metinler, referans ekranlar veya örneklerle birlikte çevirmenlere sunulmalıdır. Yer tutucuların korunması, çeviri sırasında anlam bütünlüğünü sağlar. Dil varyantları ve çok dillilik, çeviri belleği ve otomatik tutarlılık kontrolleriyle desteklenmelidir.

### 4.1 Dosya Formatına Göre Uygulama

- CSV: Sütun başlıkları ve meta alanlar korunmalı; hücre içi yorumlar ve açıklamalar çevrilmeli; anahtar alanlar (ID) değişmemelidir.
- JSON: Anahtarlar genelde çevrilmez; değerler ve “description” gibi meta alanlar çevrilir. Yer tutucular (“{name}”, “{count}”) ve biçim kuralları (tarih, sayı) korunur.
- XML: Etiket adları korunur; içerik ve attribute değerleri çevrilir. Şema (XSD) etkileri göz önünde bulundurulur.
- YAML: Yorum satırları ve yardım metinleri çevrilir; anahtar adları sabit tutulur; yer tutucular ve liste öğeleri bağlama göre çevrilir.
- INI: Anahtarlar korunur; değerler çevrilir; bölüm başlıkları (section) değişmez.
- PO: msgid (kaynak) korunur, msgstr (çeviri) üretilir; yorum satırları çeviriye rehberlik eder; ngettext gibi çoklu biçimler dikkate alınır.

### 4.2 Şema, Alan Adları ve Varsayılan Değerler

Alan adları (field names) sistem semantic’i açısından kritik olduğundan genelde çevrilmez. Açıklamalar ve yardım metinleri çevrilerek kullanıcıya anlamı netleştirir. Varsayılan değerler (default values) ve örnekler (samples) bağlama duyarlı olarak değerlendirilir; yer tutucular ve kısıtlar (örneğin minimum/maksimum uzunluk) çeviri sırasında etkilenmemelidir. Şema bütünlüğü, doğrulama kuralları ve otomatik testlerle denetlenmelidir.

## 5. Hukuki Metinler için Çeviri Yaklaşımı

Hukuki metinlerde amaç, özgün anlamı ve bağlayıcılığı korurken kullanıcıya anlaşılır şekilde sunmaktır. Metin türleri (mevzuat, sözleşme, politika, aydınlatma, rıza) farklı zorluklar içerir: Mevzuat metinleri yüksek doğruluk ve terminoloji tutarlılığı gerektirir; sözleşmelerde yükümlülük ve sorumlulukların net aktarımı esastır; gizlilik ve aydınlatma metinleri sade dil ve açık örneklerle desteklenmelidir. Kullanıcı arayüzü ile dengeleme stratejisi, kullanıcıya yönelen kısımlarda sade dil kullanmak; hukuki çerçeveyi dipnotlar veya açıklama kutularıyla güçlendirmektir.

### 5.1 Mevzuat ve Sözleşme Metinleri

Mevzuat ve sözleşmelerde özgün anlamın korunması, terminoloji tutarlılığı ve bağlam bütünlüğü zorunludur. Uzun ve karmaşık cümleler, anlamı bozmadan kısaltılabilir; ancak hukuki yükümlülük ve yetki ifadeleri değiştirilmemelidir. Tutarlılık, onay süreçleri ve terim sözlüğüyle sağlanır; noktalama ve terminoloji hataları risk doğurur, bu nedenle çift kontrol ve hukuk biriminin nihai onayı şarttır.

### 5.2 Politika ve Gizlilik Metinleri

Politika ve gizlilik metinlerinde sade dil ve açık örnekler tercih edilmelidir. Kullanıcı hakları, veri işleme amaçları ve süreler gibi unsurlar net ve yapılandırılmış şekilde sunulmalıdır. Listeler ve tablo yapıları, sorumluluk ve hakların görünürlüğünü artırır; gerektiğinde “Sıkça Sorulan Sorular” (SSS) ile karmaşık kısımlar desteklenmelidir.

### 5.3 Tutarlılık ve Terim Yönetimi

Terim sözlüğü, onay süreçleri ve sürüm kontrolüyle tutarlılık güvence altına alınır. Terim değişiklikleri izlenir ve yayın onayına bağlanır. Hukuki birim ile içerik ve yerelleştirme ekipleri arasında düzenli uyumluluk toplantıları yapılır; farklı görüşler karar defterine işlenerek kurumsal hafıza güçlendirilir.

## 6. TTS için Özel Strateji: Hukuki Metinlerin Seslendirmeye Uyumlanması

TTS uyumluluğu için metinler sade söz dizimi, doğru noktalama ve açıklayıcı işaretleme ile hazırlanır. Kısaltmalar, sayılar ve tarihler seslendirmeye uygun biçimde yazılır; yasal atıflar (ör. madde, fıkra, bend) sıralı ve belirgin şekilde sunulur. Noktalama ve duraklama, cümle sınırlarında anlamı destekleyecek şekilde ayarlanır; gerektiğinde SSML (Speech Synthesis Markup Language) etiketleri ile vurgu ve duraklama kontrol edilir. Segmentasyon, cümle ve paragraf bazlı yapılır; uzun tümceler kısaltılarak anlam kaybı olmadan bölünür. Seslendirme testleri, örneklemeli insan denetimiyle tamamlanır.

### 6.1 Yazım ve Biçem

Aktif ve anlaşılır söz dizimi tercih edilir. Kısaltmalar açık biçimde yazılır veya seslendirme için uygun kısaltma stratejileri uygulanır; örneğin “ör.” yerine “örnek olarak” ifadesi kullanılabilir. Sayılar ve tarihler seslendirmeyi zorlaştıracak biçimsel karmaşadan arındırılır; tutarlı numaralandırma ve tarih formatı seçilir. Yasal atıflar, “madde 5, fıkra (b), bend (ii)” gibi sıralı ve ayrıştırılabilir şekilde verilerek TTS’in doğru okuması sağlanır.

### 6.2 SSML ve Ses İşaretlemesi

Vurgu (emphasis), duraklama (break), hız (prosody rate) ve ton (pitch) gibi parametrelerle SSML etiketleri kullanılabilir. Örneğin, bir tanım cümlesinde vurgu ilk terimde başlatılır; uzun listelerde kısa duraklalar madde geçişlerini belirginleştirir. Özel terimler, öncesinde kısa bir tanımla tanıtılarak seslendirme sırasında şaşkınlık azaltılır. SSML etiketlemesi, TTS motorunun desteklediği ölçüde ve test edilerek uygulanır.

### 6.3 Kalite Güvencesi

TTS çıktılarında sessizlik, yanlış vurgu, ritim bozukluğu ve okunuş hataları sık görülen sorunlardır. Otomatik kontrol listeleri (ör. noktalama düzeni, sayı biçimleri, kısaltma tutarlılığı) ve örneklemeli insan denetimi birlikte yürütülür. Hukuki metinlerde en küçük anlam sapması bile riskli olduğundan, hukuk birimi ile ses mühendisliği ekipleri birlikte “kırmızı çizgi” kurallarını uygular; örneğin yasal yetki ve sorumluluk ifadelerinde vurgu düzeyi ve duraklama süreleri titizlikle ayarlanır.

## 7. Kullanıcı Deneyimi Açısından Önceliklendirme (So what?)

Deneyim etkisini en yüksek düzeyde artırmak için önceliklendirme ilkeleri belirlenmelidir. Görev tamamlama etkisi yüksek alanlar, hata oranı ve destek talepleri yoğun bölümler, erişilebilirlik riski taşıyan ekranlar ve TTS ile etkileşim yoğun süreçler önceliklendirilir. KPI (Temel Performans Göstergeleri) ile izleme yapılır: görev tamamlama süresi, hata oranı, destek talebi hacmi, anlaşılabilirlik puanları, TTS okunabilirlik ve dinleyici memnuniyeti gibi göstergeler düzenli raporlanır.

### 7.1 Öncelik Matrisi

Öncelik belirleme, çaba (implementation effort) ve etki (user impact) dengesiyle yapılır. Düşük çaba – yüksek etki kombinasyonlarına öncelik verilir: örneğin hata mesajlarının standardize edilmesi ve temel ekranlardaki CTA metinlerinin sadeleştirilmesi. Yüksek çaba – yüksek etki alanları, örneğin veri şemasının yeniden yapılandırılması gibi, aşamalı planlamayla ele alınır. Düşük etkili alanlar sona bırakılır; kaynaklar kritik kullanıcı akışlarına yoğunlaştırılır.

### 7.2 Yayın Planı ve Aşamalı Teslimat

Aşamalı teslimat, erken kazanımları kullanıcıya hızla sunmayı sağlar. İlk aşamada temel UI mikro kopyaları, kritik hata mesajları ve TTS’e uygun kısa bildirimler yayınlanır. İkinci aşamada veri dosyaları ve şablonların çevirisi, TM ve terim veritabanı oluşturularak standardize edilir. Üçüncü aşamada kapsamlı hukuki metin revizyonları ve TTS işaretlemesi tamamlanır. Geri bildirim kanalları sürekli açık tutulur; geri bildirimlerin ürün yol haritasına geri beslenmesiyle iteratif iyileştirme yapılır.

## 8. Süreç, Yönetişim ve Kalite Güvencesi

Uçtan uca çeviri boru hattı, çeviri belleği (TM), terim veritabanı (Termbase), otomatik tutarlılık kontrolleri ve insan denetiminden oluşan hibrit bir süreçtir. Kaynak yönetimi ve sürüm kontrolü, değişikliklerin izlenmesini ve yayın onaylarını güvence altına alır. Uyumluluk ve risk kontrol mekanizmaları, özellikle hukuki metinlerde çoklu gözden geçirme ve terim değişiklik onayı ile yürütülür.

### 8.1 İş Akışı ve Araçlar

Çeviri yönetim sistemi (TMS) ve içerik yönetim sistemi (CMS) ile otomasyon entegrasyonu sağlanır. Otomatik tutarlılık kontrolleri, TM ve Termbase kullanımını zorunlu kılar. Değişiklik istekleri (merge/pull request) ve onay kapıları (gate) ile sürüm akışı disiplin altına alınır. UI/UX metinlerinde küçük değişiklikler bile UX yazım liderinin onayına tabiidir; hukuki metinlerde hukuk biriminin onayı zorunludur.

### 8.2 Kalite Güvencesi ve Ölçüm

Kalite ölçümleri hem metin hem de TTS çıktılarını kapsar. Anlaşılabilirlik testleri, A/B mikro kopya testleri ve uzman incelemeleriyle doğrulama yapılır. TTS testleri, örneklemeli insan denetimi ve otomatik SSML doğrulama adımlarını içerir. Geri besleme döngüleri ve hızlı düzeltme mekanizmaları, özellikle kritik hatalar için kısa MTTR (Mean Time to Resolution) hedefiyle çalışır. Düzeltmeler, TM ve Termbase’ye işlenerek tekrar kullanım artırılır.

## 9. Uygulama Planı ve Yol Haritası

Uygulama planı 0–30–60–90 gün fazlarıyla ilerler. İlk 30 günde temel kılavuzlar, terim sözlüğü iskeleti ve kritik UI mikro kopyalarının standardizasyonu tamamlanır. 60. günün sonunda veri dosyaları ve şablonların çevirisi, TM ve otomatik tutarlılık kontrolleri devreye alınır. 90. günün sonunda hukuki metinlerin sadeleştirilmesi ve TTS işaretlemesi yayınlanmış, KPI takibi başlatılmış olacaktır. Ekip ve kaynak planlaması, hukuk birimi, UX yazarları, yerelleştirme uzmanları, TTS ses mühendisleri ve QArollerinin net tanımlanmasını içerir. Riskler ve önlemler, özellikle terminoloji hataları ve TTS okunuş bozukluklarına karşı çoklu kontrol listeleri ve geri dönüş planlarıyla yönetilir.

### 9.1 Eylem Planı ve Sorumluluklar

Sorumluluk matrisi (RACI: Responsible, Accountable, Consulted, Informed) ile görevler netleştirilir. UX yazarları mikro kopyalar ve hata mesajları için Responsible; ürün yöneticileri Accountable; hukuk danışmanları Consulted; QA ekipleri ve ses mühendisleri ilgili adımlarda Consulted olarak tanımlanır. Terim sözlüğü oluşturma ve güncelleme süreçleri, yerelleştirme uzmanları ve hukuk biriminin birlikte yönetimiyle yürütülür. Başarı ölçütleri; UI metinlerde netlik ve kısalık puanları, veri dosyalarında şema uyumu ve hata oranı, hukuki metinlerde terminoloji tutarlılığı ve onay süresi, TTS’te okunabilirlik ve dinleyici memnuniyeti olarak belirlenir.

---

Bu strateji, üç farklı içerik alanının ihtiyaçlarını bütünleşik biçimde ele alır. UI/UX metinlerinde netlik ve tutarlılık; veri dosyalarında şema ve anahtar bütünlüğü; hukuki metinlerde doğruluk ve anlamın korunması; TTS tarafında söz dizimi ve işaretleme uyumu, ortak başarı çıtasını oluşturur. Bilgi boşlukları, planlanan doğrulama ve ölçüm adımlarıyla kapatılarak sürdürülebilir bir yerelleştirme altyapısı kurulacaktır.