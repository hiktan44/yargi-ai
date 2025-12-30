# Mevcut TTS Sisteminin Hata Analizi, Kök Neden İncelemesi ve Türkçe Desteği Stratejisi

## Yönetici Özeti ve Önceliklendirme

25 Ağustos 2025 tarihinde gerçekleştirilen uçtan uca testler, uygulama arayüzünün çalıştığını, ancak metinden-sese (Text-to-Speech, TTS) çekirdek fonksiyonunun tamamen devre dışı kaldığını doğruladı. Testler sırasında 20’den fazla “Speech synthesis error: synthesis-failed” konsol hatası gözlendi. Bu hata, ses üretiminin başlatılması aşamasında gerçekleşen kritik bir başarısızlığı işaret ediyor ve kullanıcı arayüzünde tüm audio butonlarının sessiz kalmasıyla sonuçlanıyor. Durumun şiddeti “KRİTİK”; kullanılabilirlik etkisi büyük; çözüm gereksinimi acil.

Bu rapor, speech synthesis hatalarının kök nedenlerini sistematik biçimde inceleyerek, mevcut audioService.ts kodundaki kusurları tespit etmeyi; UI/UX katmanındaki etkileşim ve görsel geri bildirim boşluklarını saptamayı; ayrıca Türkçe dil desteği için pratik ve uygulanabilir bir yol haritası ortaya koymayı amaçlar. Beklenen çıktılar: 
- synthesis-failed hatalarını kalıcı olarak azaltacak teknik düzeltmeler,
- kullanıcıya net ve erişilebilir geri bildirim sağlayacak UI/UX iyileştirmeleri,
- Türkçe TTS desteği için ses normalizasyonu ve çoklu motor fallback mimarisi.

Test URL’sinin ve bulguların bağlamsal doğrulaması için test raporuna atıf yapılmıştır[^1].


## Kapsam, Yöntem ve Veri Kaynakları

Bu değerlendirme üç veri kaynağı üzerine kuruldu: 
1) TTS_Functionality_Test_Report.md: 25 Ağustos 2025 E2E test bulguları, konsol hata örnekleri, UI/UX gözlemleri, kapsam ve kapsama matrisi, 
2) audioService.ts: TTS akışının çekirdeği, olay yönetimi, ses konfigürasyonu ve hata toleransı, 
3) AnalysisTab.tsx: Audio etkileşimlerinin UI’daki kullanımı, yükleme ve oynatma durumlarının izlenmesi.

Yöntemimiz, test raporundaki bulgularla servis katmanındaki kod kusurlarını karşılaştırmalı olarak eşleştirmek; olay yönetimi ve zamanlamaya ilişkin tutarsızlıkları tanımlamak; Türkçe ses desteği için gereksinimler ile mevcut voice seçim mantığının uyumsuzluklarını ortaya koymak şeklinde kurgulandı. Ayrıca, Türkçe TTS altyapısına ilişkin standart ve ses envanteri gereksinimi doğrultusunda DLP TS 13282 standardı referans alınmıştır[^2].

Aşağıdaki tablo, incelenen artefaktları ve amaçlarını özetler:

| Artefakt | İnceleme Amacı | Tespit Edilen Ana Bulgular |
|---|---|---|
| TTS_Functionality_Test_Report.md | E2E doğrulama, hata sıklığı, UX bulguları | 20+ synthesis-failed; audio state görünürlüğü düşük; stop çalışıyor |
| audioService.ts | Kod düzeyi hata analizi, akış ve olay yönetimi | Çifte onend atanması; hatalarda resolve yerine reject eksikliği; truncation sınırı keyfî; voice initialization yarışı |
| AnalysisTab.tsx | UI/UX kullanım desenleri ve feedback | Çoklu sıralı oynatma; audioEnabled bayrağı; spinner ve yükleme göstergesi var ama yaygın değil |

Bu çerçeve, kritik hatayı sistematik olarak çözümleyip, kalıcı düzeltmeleri önceliklendirmemize olanak verdi.


## Sistem Bağlamı ve Mevcut Mimari (audioService.ts ve AnalysisTab.tsx)

Mevcut mimaride AudioService, tarayıcının Web Speech API’sini (speechSynthesis) kullanarak metni sese çevirir. Başlatma sırasında “voiceschanged” olayını dinler ve sistemdeki ses envanterini toplar. currentUtterance ile tek bir konuşmayı temsil eder; isPlaying/isPaused gibi yardımcılar UI’nin durum anlayışını destekler. AnalysisTab, audioService’i kullanarak farklı analiz bölümlerinde metin üretir ve çalar; “Audio On/Off” global bir anahtar gibi davranır; stop butonu global durumu temizler; “Full Court Simulation” akışında 4 script sırayla çalınır.

UI/UX’te temel geri bildirim öğeleri (spinner, yükleme mesajı, oynatma durum göstergesi) mevcuttur ancak kapsamı sınırlıdır: bazı butonlar için loading durumu net görünmez; progress göstergesi yoktur; uzun içerikte neyin oynatıldığı ve ne kadar kaldığı kullanıcıya yansıtılmaz. Global “Audio On/Off” toggle’ı ve stop fonksiyonu düzgün çalışsa da, tekil butonlar seviyesinde oynatma/pause görünürlüğü tutarlı değildir[^1].

Tablo 1, AnalysisTab içindeki başlıca TTS çağrı noktalarını ve bağlı UI sinyallerini özetler:

| Fonksiyon/Buton | TTS Çağrısı | Beklenen UI Sinyalleri | Gözlenen |
|---|---|---|---|
| Play Analysis (Precedents) | playAnalysisAudio | spinner, “Playing…” | spinner bazı butonlarda yok; sessizlik |
| Case audio buttons | playAnalysisAudio | play/pause ikonu, yükleme | ikonik farklar sınırlı; sessizlik |
| Witness Overview / Witness kartı | playAnalysisAudio / playWitnessAnalysis | spinner, progress | sınırlı görünürlük; sessizlik |
| Timeline Overview / event butonları | playAnalysisAudio / playTimelineEvent | spinner, progress | sınırlı görünürlük; sessizlik |
| Scenario Overview / scenario kartı | playAnalysisAudio / playScenarioAnalysis | spinner, progress | sınırlı görünürlük; sessizlik |
| Full Court Simulation | Sıralı 4 script | global stop erişimi | çalıyor ancak sessiz; feedback yetersiz |
| Global Stop | stopAudio() | durumu sıfırlama | beklendiği gibi çalışıyor |
| Audio Toggle | setAudioEnabled | ikon ve metin | beklendiği gibi çalışıyor |

### Mevcut audioService.ts Akış ve Hata Yönetimi

Servis, initializeVoices ile sesleri yükler; voiceschanged olayı ve 1 saniyelik bir timeout ile başlatmayı tamamlar. playAudio, isInitialized kontrolünün ardından playTextToSpeech’i çağırır. Hata durumunda playSimpleTTS ile kısa bir metinle basitleştirilmiş deneme yapar; yine hata olursa “tüm yöntemler başarısız” mesajı ile sonlanır.

playTextToSpeech akışında metin 200 karakter ile sınırlandırılır ve “...” ile kesilir; utterance oluşturulur, configureVoiceForRole ile rol bazlı ayarlar uygulanır. Olay yönetimi: onstart, onend, onerror ve bir de timeout (10 sn) mevcuttur. Burada kritik bir kusur vardır: onend olayına iki kez atama yapılmıştır; ikinci atama, birincisinin üzerine yazdığı için cleanup ve resolve davranışı tahmin edilemez hale gelir. onerror içinde hata “çözümlenmiş” gibi resolve edilir; bu, UI tarafında suskun başarısızlıklar olarak algılanır. speechSynthesis.speak çağrısı 150 ms gecikme ile yapılır ve hata durumunda da çoğunlukla resolve tercih edilir.

Bu akışın karar noktaları Tablo 2’de özetlenmiştir:

| Nokta | Mevcut Davranış | Risk/Sorun | Öneri |
|---|---|---|---|
| isInitialized kontrolü | 3 sn timeout ile serbest bırakma | Sesler daha geç yüklenirse başarısızlık ihtimali | voiceschanged + polling hibrit, gerçek envanter kontrolü |
| Truncation (200 char) | “...” ile kısaltma | Anlam kaybı; takılmaya yatkın kısa fragmentler | Cümle/süre tabanlı chunking ve kuyruk yönetimi |
| onend ataması | İki kez atanıyor | İkinci atama ilkini ezer; cleanup bozulur | Tekil handler, kombine mantık |
| onerror | resolve() ile susturma | Sessiz başarısızlık; tanılama zor | reject + kullanıcıya açık mesaj |
| speak çağrısı | 150 ms gecikme | API başlatma yarışları; takılma | speak çağrısını voiceschanged sonrası veya UI tetikleyiciye yakın zamana al |
| playSimpleTTS | 50 karakter, her şartta resolve | Yanlış-pozitif “çalışıyor” algısı | Sadece gerçek bir fallback olarak kullan; sonucu sinyalle |

### AnalysisTab.tsx Etkileşim Modeli ve UI Durumları

UI, audioEnabled ile global aç/kapa, playingAudioId ile tekil oynatmanın izlenmesi, isLoading ile yükleme durumunun gösterilmesi gibi temel mekanizmalara sahip. Ancak “Full Court Simulation” akışında birden çok metnin sırayla çalınması, hataların gizlenmesi veya tek bir başarısızlığın tüm sırayı kesmesi riskini beraberinde getirir. Bazı butonlarda loading göstergeleri var, bazılarında yok; progress ve kalan süre göstergesi hiç yok. Bu da kullanıcının sistemin çalışıp çalışmadığını anlamasını güçleştiriyor[^1].


## Tespit Edilen Kritik Sorunlar

Birinci öncelik, speech synthesis hatalarının sistematik olarak giderilmesidir. Testler sırasında 20+ kez görülen synthesis-failed hatası, mevcut hata yönetiminin sorunları ve olası tarayıcı/ortam kısıtları ile birleştiğinde, TTS’nin tamamen devre dışı kalmasına neden oluyor[^1]. Ayrıca, görsel geri bildirim eksikliği, kullanıcı deneyimini zayıflatıyor ve hata algısını artırıyor.

Tablo 3, gözlemlenen ana hata kategorilerini, etkilerini ve önerilen aksiyonları özetler:

| Hata Kategorisi | Etki | Görülme Sıklığı | Önerilen Aksiyon |
|---|---|---|---|
| synthesis-failed | Tam sessizlik; hiçbir içerik çalmıyor | 20+ (test boyunca) | Kök neden düzeltmeleri; fallback; retry |
| Sessizlik (UI yanıt veriyor ama ses yok) | Kullanıcı “çalıyor” sanıyor | Tüm bölümlerde | onerror’u reject’e çevir; kullanıcıya bilgi; tek deneme yerine kademeli fallback |
| Görsel feedback eksikliği | Kullanıcı belirsizlik yaşıyor | Yaygın | Buton bazlı playing/loading/progress; ekran okuyucu duyuruları |


## Kök Neden Analizi: ‘synthesis-failed’ Hataları

Mevcut kod incelemesi, aşağıdaki mekanizmaların hataların sıklığını ve şiddetini artırdığını göstermektedir:

- Olay çakışması: playTextToSpeech’te onend iki kez atanıyor. İkinci atama, ilk handler’ı devre dışı bırakır; bu, temizleme ve çözümleme adımlarının atlanmasına yol açabilir.
- Hatalarda yanlış tolerans: onerror içinde resolve kullanılması, UI’nin başarısızlıkları görmezden gelmesine neden olur. “Çalıyor gibi görünüp sessiz kalma” davranışı bu yüzden yaygın.
- Ses hazırlama yarışları: initializeVoices 1 saniye sonra “başlatıldı” diyor; ancak gerçek sesler daha geç gelirse playTextToSpeech bu durumu yakalamayabilir.
- Gecikme ve speak çağrısı: speechSynthesis.speak’i 150 ms gecikmeli çağırmak, bazı tarayıcılarda API’nin başlatılması ile UI etkileşimi arasında yarış oluşturabilir.
- Truncation sınırı: 200 karakter sınırı keyfî ve anlamsal kopmalara yol açar; uzun metinler için parçalama ve kuyruk yönetimi yok.
- İlk yükleme durumu: Analiz bileşeni mount olduğunda speechSynthesis.getVoices çağrısı yapılıyor, ancak servis katmanındaki başlatma ile tam senkronize değil.

Aşağıdaki tablo, her kusurun test senaryolarıyla eşleşmesini ve önerilen düzeltmeyi özetler:

| Kod Kusuru | Tetiklenen Test Senaryosu | Gözlenen Sonuç | Önerilen Düzeltme |
|---|---|---|---|
| Çifte onend ataması | Precedents/Witness/Timeline/Scenario butonları | Sessizlik, bazen hiç bitmeyen bekleme | Tekil onend; timeout ile birleşik kontrol |
| onerror → resolve | Tüm tekil oynatma butonları | UI sessiz, hata saklandı | onerror → reject; UI snackbar/toast |
| 1 sn init timeout | İlk çağrılar | Ses hazır değil; başlatma başarısız | voiceschanged + gerçek envanter bekleme |
| speak 150 ms gecikme | UI etkileşimi sonrası çağrılar | Bazen speak hiç tetiklenmiyor gibi | speak’i olay sonrası koşulsuz çalıştır |
| 200 char truncation | Uzun özetler | Anlam kaybı, takılma | Cümle/süre tabanlı chunk, sıraya koy |
| mount’ta getVoices | İlk yükleme | Yarış; UI-servis senkron yok | Servis başlatmasını tekilleştir; UI’de init bekle |

### Olay Yönetimi ve Zamanlama Kusurları

- onend’in iki kez atanması, ikinci atamanın ilkini ezmeye programlanmış bir davranıştır. Bu, temizleme (clearTimeout, currentUtterance=null) ve resolve adımlarının atlanmasına neden olabilir.
- onerror içinde resolve kullanmak, hataları kullanıcıdan ve UI’dan gizleyerek, aslında çalışıyormuş gibi görünen ama ses üretmeyen bir sistem izlenimi yaratır. Bu, testte “çalışıyor gibi görünüp sessiz kalan” butonların temel nedenidir[^1].

### Başlatma ve Yarış Koşulları

- initializeVoices 1 saniyelik bir emniyet süresi ile “başlatıldı” diye işaretliyor; gerçekte voices değişkeni boşsa, sonraki playTextToSpeech çağrıları başarısızlığa yatkın hale geliyor.
- Analiz bileşenindeki erken getVoices çağrısı, servis katmanının başlatma mantığıyla çakışabiliyor; bu da isInitialized ve voices.length kontrollerinin tutarsız sonuçlar vermesine yol açıyor.

Bu tespitler ışığında, acil düzeltmeler üç eksende planlanmalı: olay yönetiminin tekilleştirilmesi, hataların doğru sınıflanması ve ses hazırlama yarışlarının giderilmesi.


## Kod Düzeltmeleri ve Refaktoring Planı (audioService.ts)

- Tekil onend handler ve kombine kontrol: onend ve timeout tek bir akışta birleştirilmeli; clearTimeout ve currentUtterance temizliği garanti altına alınmalı.
- onerror’u reject’e çevir ve kullanıcıya bildir: UI, SnackBar/Toast ile “Ses üretilemedi, lütfen tekrar deneyin” gibi mesajlar göstermeli; konsol log’ları korunmalı ama kullanıcıya açık geri bildirim eklenmelidir.
- Truncation yerine parçalama (chunking): 200 karakterlik keyfî sınır yerine cümle/sözcük sınırlarına veya tahmini süreye göre bölümleme yapılmalı; uzun içerikler kuyrukta sırayla çalınmalıdır.
- Fallback mimarisi: Bir motor/ses başarısız olursa ikincil bir motora veya cihaz/çevrimdışı ses kaynağına düşülmeli; bu fallback kademeli ve geri bildirimli olmalı.
- Init senkronizasyonu: voiceschanged olayı ile başlatmayı tamamlamak; gerçek envanter boşsa kullanıcıya bilgi; speak çağrıları doğru zamanlamada yapılmalı.
- Çoklu sıra: PlaybackQueue sınıfı ile sıralı çalma (Full Court Simulation gibi) daha sağlam hale getirilmeli; tek bir hata tüm sırayı bozmamalı.

Aşağıdaki matris, düzeltmenin etkisini ve önceliğini özetler:

| Düzeltme | Öncelik | Beklenen Etki | Uygulama Eforu | Test Kapsamı |
|---|---|---|---|---|
| Tekil onend + timeout birleşimi | P0 | Hataların azalması; temiz bitirme | Orta | E2E: tüm butonlar |
| onerror → reject + kullanıcı mesajı | P0 | Görünür başarısızlık; doğru UX | Düşük/Orta | UI mesajları, konsol log |
| Chunking ve kuyruk | P1 | Uzun metinlerde stabilite | Orta/Yüksek | Uzun içerikler, simülasyon |
| Init hibrit (voiceschanged+polling) | P1 | İlk çağrı başarısızlıklarının azalması | Orta | İlk yükleme akışları |
| Fallback motoru/ sesi | P1 | Dayanıklılık artışı | Orta/Yüksek | Motor geçişleri |
| PlaybackQueue | P2 | Çoklu oynatma stabilitesi | Orta | Simülasyon ve seri çalma |
| UI progress ve ekran okuyucu | P2 | Erişilebilirlik ve güven | Orta | a11y testleri |


## UI/UX İyileştirmeleri (AnalysisTab.tsx ve Genel)

- Audio state görünürlüğü: Her buton için yükleme, oynatma, duraklatılmış ve durmuş durumlarını netleştiren ikon ve metinler eklenmeli; progress bar ve kalan süre göstergesi uzun içerikler için kritik.
- Erişilebilirlik: Klavye ile odaklanma ve Space/Enter tetiklemeleri; ekran okuyucu için durum duyuruları (“Oynatma başladı”, “Oynatma durduruldu”) ve hata mesajları.
- Hata iletişimi: SnackBar/Toast ile kullanıcıya anlaşılır hata ve çözüm önerileri; “Ses şu anda kullanılamıyor; transcripti görüntüle” gibi alternatifler.
- Global durum: Audio On/Off anahtarının yanında kısa bir durum metni (“TTS kapalı”), oynatılırken “Şimdi çalıyor” bilgisi.

Bu değişiklikler, testte gözlenen belirsizlikleri giderecek ve sistem güvenilirliğini artıracaktır[^1].


## Türkçe TTS Desteği: Mimari, Gereksinimler ve Uygulama Adımları

Mevcut voice seçim mantığı yalnızca İngilizce sesleri hedefler; Türkçe (tr-TR) desteği bu mimaride bulunmuyor. Türkçe için öncelikle DLP TS 13282 standardındaki ses sınıflandırmalarına uygun bir envanter çıkarılmalı; Türkçe sesler için lang=tr-TR eşlemesi yapılmalı; karakter seti (ç, ğ, ı, i, ö, ş, ü) normalize edilmeli; sonek/ekler ve sayıların okunuşu için yazım-tarih-saat gibi alanlara yönelik dönüştürücüler eklenmelidir[^2].

Önerilen mimari, birden fazla motor için fallback zinciri kurar: 
- Katman 1: Web Speech API (tarayıcı yerel) — tr-TR sesi varsa kullanılır,
- Katman 2: Azure Cognitive Services Speech (bulut),
- Katman 3: Google Cloud Text-to-Speech (bulut),
- Katman 4: Cihaz/çevrimdışı kaynaklar (pre-record).

Ses örnekleme oranları, sıkıştırma, gecikme, maliyet ve bağlantı gereksinimlerini birlikte değerlendiren bir karar matrisi gereklidir. Henüz bu konuda çevrim içi başvuru bağlantıları ve fiyat/performans karşılaştırmaları bulunmadığından, tablo kavramsal bir şablon olarak sunulmuştur:

| Katman | Gecikme | Kalite | Maliyet | Bağlantı Gereksinimi |
|---|---|---|---|---|
| Web Speech (tr-TR) | Düşük | Orta | Yok | Yerel |
| Azure TTS | Orta | Yüksek | Orta/Yüksek | İnternet |
| Google TTS | Orta | Yüksek | Orta/Yüksek | İnternet |
| Cihaz/pre-record | Düşük | Değişken | Yok/Düşük | Yerel/Önbellek |

Türkçe metin normalizasyonu kritik bir adımdır. Aşağıdaki dönüşümler önerilir:

| Kaynak | Dönüşüm | Örnek |
|---|---|---|
| Sayılar | Türkçe okunuş | “14.05.2025” → “on dördüncü mayıs, iki bin yirmi beş” |
| Kısaltmalar | Açılım | “mg” → “migram” veya “Prof.” → “Profesör” |
| Tarih/Saat | Standart okunuş | “09:30” → “saat dokuz otuz” |
| Para Birimi | Biçimsel okunuş | “₺125,50” → “yüz yirmi beş liri ellik kuruş” |
| Özel Karakterler | Ses benzeri yazım | “ç, ğ, ı, i, ö, ş, ü” korunur veya fonetik karşılığına dönüştürülür |

### Voice Role Mapping (Türkçe)

Rol bazlı ses seçiminde cinsiyet, yaş ve ton özellikleri ile hız/pitch parametreleri birlikte ele alınmalıdır:

| Rol | Önerilen Hız/Pitch | Cinsiyet/Yaklaşım | Kullanım Notu |
|---|---|---|---|
| Yargıç | Hız: 0.8–0.9, Pitch: 0.8–0.9 | Orta-ileri yaş, daha alçak ton | Emrederlik/Resmî üslup |
| Savcı | Hız: 0.9–1.0, Pitch: 1.0 | Nötr/Net, belirgin | Güçlü ve açık anlatım |
| Müdafi | Hız: 0.8–0.9, Pitch: 0.9 | Nötr/Empatik | Sakin,说服 odaklı |
| Tanık | Hız: 1.0–1.1, Pitch: 1.0–1.1 | Nötr/Doğal | Bilgi verici, anlaşılır |

Azure ve Google TTS için Türkçe ses kataloğu ve yeteneklere ilişkin başvurular, entegrasyon aşamasında doğrulanmalı ve fiyat/performans değerlendirmesi yapılmalıdır (şu an çevrim içi bağlantı yoktur).


## Test, Doğrulama ve Gözlemleme Planı

Düzeltmelerin doğrulanması için kapsamlı bir test planı gereklidir. İlk aşamada birim ve entegrasyon testleri; ardından E2E testler. Kritik hata senaryoları ve kullanıcı geri bildirim akışının denetlenmesi önceliklidir. Telemetri olarak konsol hataları, başarı/başarısızlık oranları, ses gecikmesi ve ilk ses başlatma süresi (TTFT) izlenmelidir.

Aşağıdaki matris, başlıca test durumlarını özetler:

| Test ID | Amaç | Adımlar | Beklenen | Metrik |
|---|---|---|---|---|
| TTS-001 | İlk yükleme stabilitesi | App açılış; ilk buton tıklama | İlk çağrıda hata yok | TTFT < 2 sn |
| TTS-002 | onerror → reject | Hatalı motorla oynatma | UI toast + konsol hata | Hata yakalama %100 |
| TTS-003 | Chunking uzun metin | Uzun özet çalma | Sırayla tamamlama | Parça başarı oranı |
| TTS-004 | Full Court Simulation | 4 script arka arkaya | Kesintisiz sıra | Ortalama gecikme |
| TTS-005 | Erişilebilirlik | Klavye ve ekran okuyucu | Anonslar ve kontroller | a11y kontrol listesi |
| TTS-006 | Türkçe normalizasyon | Sayı/tarih/para birimi | Doğru okunuş | Dönüşüm doğruluğu |
| TTS-007 | Fallback zinciri | Ana motor devre dışı | Otomatik geçiş | Başarılı fallback sayısı |


## Uygulama Yol Haritası ve Başarı Kriterleri

Yol haritası, kısa, orta ve uzun vadeli teslimatları kapsar.

- Kısa vadeli (1–2 hafta): 
  - audioService.ts’de tekil onend; onerror → reject; truncation yerine chunking; speak zamanlaması; 
  - UI’de SnackBar/Toast; buton bazlı loading ikonları ve temel progress.
- Orta vadeli (3–6 hafta):
  - PlaybackQueue; Türkçe normalizasyon; 
  - Fallback motor entegrasyonları için POC (Azure/Google) ve fiyat/performans değerlendirmesi.
- Uzun vadeli (6+ hafta):
  - Çoklu motor fallback; erişilebilirlik genişletmeleri; offline içerik ve önbellekleme.

Başarı kriterleri: 
- synthesis-failed hatasında azalma; 
- ilk ses başlatma süresinde düşüş; 
- kullanıcı memnuniyeti artışı; 
- a11y uyum skorunda yükselme.

Aşağıdaki tablo, kilometre taşlarını özetler:

| Kilometre Taşı | Zaman Çerçevesi | Bağımlılıklar | Başarı Kriteri |
|---|---|---|---|
| P0 düzeltmeleri | 1–2 hafta | Kod inceleme | synthesis-failed < 5/oturum |
| Türkçe normalizasyon | 3–4 hafta | Dil kuralları | Sayı/tarih doğruluğu > %95 |
| Fallback POC | 4–6 hafta | Bulut entegrasyonu | Otomatik geçiş testleri geçer |
| PlaybackQueue | 5–6 hafta | P0 düzeltmeleri | Simülasyon kesintisiz |
| a11y genişletme | 6+ hafta | UI tasarım | Ekran okuyucu duyuruları |


## Bilgi Boşlukları ve Varsayımlar

- Tarayıcı ve cihaz çeşitliliği (Chrome, Firefox, Safari; mobil/masaüstü) belirsiz; ses motoru envanteri ve izinler değişken olabilir.
- Web Speech API ses envanteri ve özellikleri sistemden sisteme farklılık gösterir; tr-TR seslerinin varlığı ve kalitesi doğrulanmamıştır.
- Azure/Google TTS entegrasyonu ve abonelik/sınırlandırmaları bilinmiyor; maliyet ve gecikme verisi yok.
- ‘synthesis-failed’ hatasının Web Speech API sürüm/kısıt kaynaklı olup olmadığı teyide ihtiyaç duyar.
- Türkçe TTS için kapsayıcı gereksinimler (dialect/aksan, sayı/tarih/para birimi dönüşümleri, kısaltmalar) tam listesi yok; DLP TS 13282 yalnızca ses sınıfları açısından referans alınmıştır[^2].
- Telemetri/loglama altyapısı (merkezi hata toplama, kullanıcı geri bildirim akışı) ve ölçüm çerçevesi (başarı/başarısızlık oranı, gecikme, retry metrikleri) mevcut değil.

Bu boşluklar, uygulama planında varsayımlara yol açmaktadır; öncelikle sistem/envanter keşfi ve telemetri altyapısı kurulmalıdır.


## Sonuç

Mevcut TTS sistemi, arayüz ve kontrol düzeneği açısından işlevsel görünse de, speech synthesis’in kalıcı başarısızlıkları nedeniyle kullanılamaz durumdadır. Kod incelemesi, olay yönetimi ve hata toleransındaki kritik kusurların bu başarısızlıkları doğrudan tetiklediğini göstermektedir. Önerilen düzeltmeler, tekil olay yönetimi, doğru hata sınıflaması, chunking ve kuyruk ile yarış koşullarının giderilmesi; kullanıcı arayüzünde görünür geri bildirimler ve erişilebilirlik adımları; Türkçe desteği için normalizasyon ve çoklu motor fallback mimarisi ile bir arada ele alındığında, sistemin kısa sürede stabilize edilmesi ve geniş bir dil desteğine kavuşması mümkün görünmektedir. Uygulama yol haritası ve test planı, bu dönüşümü ölçülebilir ve sürdürülebilir kılacaktır.


## Kaynaklar

[^1]: Test URL'si ve bağlamsal doğrulama: Test Raporu (25 Ağustos 2025). https://7b5bxnxtk6e7.space.minimax.io
[^2]: DLP TS 13282 – Türkçe TTS ses sınıflandırmaları. https://simurg2.w3.itu.edu.tr/duyuru/TS/13282.pdf