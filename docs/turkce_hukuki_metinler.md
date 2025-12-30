# Türkçe Hukuki TTS İçerikleri Üretimi: Mahkeme Senaryoları, Hukuki Açıklamalar ve Danışmanlık Metinleri

Bu rapor, Türkiye odaklı hukuki terminolojiyi esas alarak metinden‑sese (Text‑to‑Speech, TTS) üretimine uygun Türkçe içeriklerin nasıl tasarlanacağını ve paketleneceğini anlatır. Amaç, yargı pratiğine uygun senaryo üretimi, terminolojik tutarlılık, zaman damgası ve altyazı (SRT) uygulaması, anonimleştirme ve telif uyumluluğu ile sürdürülebilir bir üretim iş akışını bütüncül biçimde kurmaktır. Türkiye’nin sivil hukuk (civil law) geleneği ve mahkeme hiyerarşisi, anlatının hukuki doğruluğunu belirlerken; İngilizce‑Amerikan menşeli kavramların Türkçedeki karşılıkları bağlama duyarlı bir yaklaşımla açıklayıcı notlarla verilir.[^1][^2][^3]

---

## 1) Amaç, Kapsam ve Anlatı Çerçevesi

Bu çalışma üç çıktı hattını birlikte ele alır: mahkeme senaryoları (adli, idari, anayasa ve icra yargısı bağlamında), hukuki açıklamalar (terim ve prosedürlerin sade dille aktarımı) ve danışmanlık metinleri (yol gösterici, tarafsız, eğitim amaçlı). Üretim, veri dosyalarında tanımlı sahneler (ör. açılış, tanık ifadesi, çapraz sorgu, hüküm, infaz, özet) ve rol/kategori sınıflandırmasına dayanır. Tüm anlatılar “eğitim ve simülasyon amaçlıdır; hukuki tavsiye teşkil etmez” uyarısını görünür biçimde taşır; anonimleştirme esastır.

Türkiye’nin sivil hukuk geleneği yazılı kanun ve kodlara dayanır; emsal kararlar bağlayıcı norm değil, yorum destekleyici unsurdur. Bu nedenle “case law” yerine içtihat/emsal kararlar bağlamı kullanılır; Anglo‑Amerikan kavramların Türkçeye aktarımında açıklayıcı not zorunludur.[^1][^2][^4] Yargı sistemi ve kurum adlarının Türkçe‑İngilizce karşılıkları, kurumsal sözlüklerle hizalı biçimde standardize edilir.[^3][^5][^6]

Terminoloji üç ilkeyle yönetilir:  
- Bağlama duyarlılık: “court” kurum anlamında mahkeme; “hearing/duruşma” oturum; “defendant” bağlama göre davalı/sanık.[^7][^8]  
- Mevzuat ve kurumsal çeviriyle uyum: Yargıtay (Court of Cassation), Danıştay (Council of State), Anayasa Mahkemesi (Constitutional Court) ve Bölge İstinaf Mahkemeleri (Regional Courts of Appeals) gibi karşılıkların doğruluğu korunur.[^5][^6][^3]  
- Açıklayıcı dipnot yaklaşımı: “injunction”, “consideration”, “beyond reasonable doubt” gibi kavramlar Türkçede birebir karşılığı olmayan durumlarda parantez/dipnotla anlamı koruyarak verilir.[^7][^9]

TTS yazım kuralları, uzun cümleleri duraklama işaretleriyle kırpmayı, sayı ve tarih gibi sayısal öğeleri yavaşlatmayı ve 24 saat formatında SRT zaman damgası (00:00:00,000) kullanmayı zorunlu kılar. UI/lokalizasyon metinlerinde eğitim/simülasyon etiketi ve hukuki tavsiye olmadığına dair beyan, erişilebilir biçimde sunulur. Common law’a özgü kavramlar için açıklayıcı notlar dipnot veya parantez içi Türkçe açıklamalarla verilir.[^3][^9]

### 1.1) Sözlük ve Kurumsal Çeviri Uyum

Resmî sözlükler ve kurumsal çeviri kılavuzları ile tutarlılık, TTS içeriklerinin hukuki doğruluğunu garanti eder. New Jersey Courts Glossary ve T.C. Dışişleri Bakanlığı’nın hukuk terminolojisi, mahkeme ve kurum adları için kurumsal sözlükler ile birlikte kullanılır.[^7][^9][^5][^6]

Terminoloji, sadece kelime karşılığı vermekle kalmaz; işlevsel bağlamı da açıklar. Örneğin “injunction” çoğu bağlamda “ihtiyati tedbir” veya “yasaklama kararı” olarak verilir; Türkiye’deki tedbir sistemine açıklayıcı bir dipnot eklenir. “Consideration” ise common law sözleşmelerinde geçerlilik koşulu iken, Türk sözleşme hukuku bağlamında “bedel/karşılık” olarak açıklanır ve işlevsel farklar dipnotla belirtilir.[^7][^9]

---

## 2) TTS Senaryo Paketleri: Mahkeme Senaryoları

Türkiye yargı sisteminde farklı kollar (adli, idari, anayasa, icra) ve farklı aşamalar (duruşma, hüküm, infaz) TTS anlatılarının temelini oluşturur.[^6][^3] Senaryolar; açılış ve talimatlar, tanık ifadeleri, çapraz sorgu, nihai hüküm ve hukuki açıklamalardan oluşur. “Beyond reasonable doubt” gibi ifadeler, Türkçede açıklayıcı bir ifadeyle (“makul şüphe ölçütünü aşan ispat”) verilir.[^7]

Tablo 1, yargı kollarına göre tipik TTS senaryolarını özetler.

Tablo 1 – Yargı Kolu → Tipik TTS Senaryoları
| Yargı Kolu | Senaryo Türleri | Anahtar İfadeler | Açıklayıcı Not |
|---|---|---|---|
| Adli Yargı | Açılış, tanık ifadesi, çapraz sorgu, hüküm, infaz | “Mahkeme açılmıştır.”, “delil değerlendirmesi”, “ceza hükmünün infazı” | “Court” kurum; “hearing” oturum bağlamında kullanılır.[^8][^7] |
| İdari Yargı | İptal/tam yargı davası, kabul edilebilirlik, cebrî icra | “İdarî işlem/eYLEM”, “tam yargı davası” | İYUK m.2 dava türleri ve terminoloji esas alınır.[^10] |
| Anayasa Yargısı | Soyut/somut norm denetimi, bireysel başvuru, iptal | “Genel Kurul/Bölüm”, “iptal” | AYM organları ve denetim türleri bağlamı korunur.[^11][^3] |
| İcra Yargısı | Haciz, rehinin paraya çevrilmesi, banka haczi | “cebrî icra”, “banka haczi” | İcra‑iflas süreçlerinde Türk terimleri önceliklidir.[^7][^9] |

Bu çerçeve, sesli anlatıda terminolojik doğruluğu ve rol/kategori uyumunu güvence altına alır; dipnotlar yoluyla açıklayıcı bağlam, anlatı akışını bozmadan verilir.[^7][^9]

### 2.1) Adli Yargı (Ceza ve Hukuk)

Adli yargıda duruşma akışı, rol ve üsluba göre seslendirilir. “Indictment” Türkçede “iddianame” olarak karşılanır; “bench trial” jüri olmayan, hâkim tarafından yapılan duruşma anlamına gelir; “bench warrant” tutuklama emridir; “bail” kefalettir.[^7] “Affidavit” (yeminli ifade) ile “deposition” (yeminli tanık beyanı) ayrımı, Türkiye’deki ilgili usul kurumlarına açıklayıcı dipnotla bağlanır.[^7]

Tablo 2 – Rol → Üslup → Kalıp İfadeler
| Rol | Üslup | Kalıp İfadeler |
|---|---|---|
| Hâkim | Otoriter, net | “Mahkeme açılmıştır.”, “Duruşma düzenini koruyalım.” |
| Savcı | Kesin, iddiacı | “İddia tarafı, delillerin makul şüphe ölçütünü aştığını ortaya koyacaktır.” |
| Müdafi/Savunma | Temkinli, itirazcı | “Delillerin bütünlüğü ve tutarlılığı incelenmelidir.” |
| Tanık | Betimleyici, kronolojik | “Olay şu saatte gerçekleşti; gözlemlerim şöyleydi.” |

Bu tablo, TTS seslendirmede rol bazlı ton ve vurgu farklarını somutlaştırır; akış ve anlaşılabilirlik artar.[^7]

### 2.2) İdari Yargı

İdari dava türlerinde İYUK m.2 terminolojisi standarttır: iptal davası, tam yargı davası, maddi gerçeğin araştırılması, yargı yolu ve görev gibi kavramlar açıklayıcı notlarla verilir.[^10] “Admissibility” kabul edilebilirlik; “administrative case” idari dava; “coercive execution” cebrî icra olarak karşılanır.[^9]

Tablo 3 – İYUK m.2 Dava Türleri → Türkçe Terimler
| Tür | Türkçe Karşılık | Açıklama |
|---|---|---|
| İptal davası | İdarî işlemin iptali | İşlemin hukuka aykırılığı iddiasıyla açılır. |
| Tam yargı davası | Ortadan kaldırma + tamamlayıcı yargı | İşlemin iptali ve doğrudan doğan zararın giderilmesi. |
| Maddi gerçeğin araştırılması | Delillerin derinlemesine incelenmesi | İdarî olgunun tespiti için kapsamlı inceleme. |
| Yargı yolu ve görev | Yetki ve görevli mahkeme | İdari yargının görev ve yetki şartları. |

### 2.3) Anayasa Yargısı

Anayasa Mahkemesi süreçleri; soyut/somut norm denetimi, iptal ve bireysel başvuru üzerinden işler. AYM organları (Genel Kurul, Bölüm) ve “annulment” (iptal) kavramı bağlamıyla kullanılır.[^11][^3]

Tablo 4 – AYM Süreçleri → Türkçe Terimler
| Süreç | Türkçe Karşılık | Açıklama |
|---|---|---|
| Soyut norm denetimi | Anayasa’ya aykırılığın genel denetimi | Normlar iptal edilir. |
| Somut norm denetimi | Mahkemeden gelen norm denetimi | Norm, somut uyuşmazlıkta incelenir. |
| Bireysel başvuru | Temel hak ihlali iddiası | AYM’ye bireysel başvuru yoluyla denetim. |
| İptal | Annulment | Anayasal denetim sonucu iptal. |

### 2.4) İcra ve İflas

İcra‑iflas bağlamında “enforcement” cebrî icra; “attachment” haciz; “foreclosure” rehinin paraya çevrilmesi; “bank levy” banka haczi; “bankruptcy discharge” iflas yükümsüzlüğü gibi terimler Türkçeleştirilir ve işlevsel açıklamalarla verilir.[^7][^9]

Tablo 5 – İcra‑İflas Terimleri → Açıklamalar
| Terim | Türkçe Karşılık | Açıklama |
|---|---|---|
| Cebrî icra | Enforcement | Tahsil süreçleri ve icra organları. |
| Haciz | Attachment | Mal/haklar üzerinde haciz. |
| Rehinin paraya çevrilmesi | Foreclosure | İpoteğin paraya çevrilmesi. |
| Banka haczi | Bank levy | Bankadaki mevduatın haczi. |
| İflas yükümsüzlüğü | Bankruptcy discharge | Borç terkinin onaylanması. |

---

## 3) Hukuki Açıklamalar (TTS için Uygun Anlatı)

Hukuki kavramların sade dille anlatımı, TTS akışını kolaylaştırır. Özellikle birebir karşılığı olmayan Anglo‑Amerikan kavramlar için açıklayıcı dipnotlar anlatı içinde, parantez içi Türkçe açıklamalarla verilir.[^7][^9][^12]

Tablo 6 – Zorlayıcı Kavramlar → Türkçe Açıklamalar
| Kavram | Önerilen Türkçe | Açıklayıcı Not |
|---|---|---|
| Case law | İçtihat/emsal kararlar | Sivil hukukta bağlayıcı emsal değil, yorum destekleyici.[^1] |
| Precedent | Emsal karar | Türkiye’de bağlayıcılığı sınırlı; içtihat bağlamı.[^1] |
| Injunction | İhtiyati tedbir/yasaklama kararı | Türkiye’de tedbir sistemi bağlamıyla açıklanmalı.[^7] |
| Consideration | Bedel/karşılık | Common law geçerlilik koşulu; Türk sözleşme hukukuna açıklayıcı not.[^7] |
| Beyond reasonable doubt | Makul şüphe ölçütünü aşan ispat | Ceza yargılamasında standardın Türkçe açıklaması.[^7] |
| Affidavit | Yeminli ifade | Yazılı ve yeminli beyan; tanıklık usulü bağlamı.[^7] |
| Deposition | Yeminli tanık beyanı | Tanıkların yeminli beyanı; işlevsel fark dipnotla.[^7] |
| Bench trial | Hâkim tarafından yapılan duruşma | Jüri olmayan yargılama; Türkiye pratiği açıklaması.[^7] |

Mahkeme ve kurum adlarının İngilizce karşılıklarının doğruluğu, çeviride tutarlılık sağlar; Yargıtay, Danıştay ve AYM gibi temel organlar için standart çeviriler korunur.[^5][^3]

---

## 4) Danışmanlık Metinleri (TTS için Uygun Format)

Danışmanlık metinleri tarafsız, açık ve eğitim amaçlı üretilir; hukuki tavsiye içermez. Yayın öncesi “hukuki tavsiye teşkil etmez” beyanı, görünür biçimde yer alır. Mevzuat ve kurumsal çevirilerle tutarlılık korunur.[^3][^13]

Tablo 7 – Danışmanlık Modülleri → Amaç → Anahtar Mesajlar
| Modül | Amaç | Anahtar Mesajlar |
|---|---|---|
| İdari Yargı | Başvuru yollarını açıklamak | İYUK m.2 dava türleri, kabul edilebilirlik şartları.[^10] |
| İcra‑İflas | Süreç adımlarını açıklamak | Haciz, rehinin paraya çevrilmesi, banka haczi; yükümsüzlük. |
| İş Hukuku | İş sözleşmesi ve haklar | İş güvencesi, iş kazası süreçleri; tarafların yükümlülükleri.[^13] |
| Anayasa Hukuku | Norm denetimi ve bireysel başvuru | AYM organları, denetim türleri, iptal/başvuru yolu.[^11] |

---

## 5) Üretim İş Akışı, Sözlük, Zaman Damgası ve Kalite

Üretim iş akışı; veri katmanı (JSON/TS metinleri) ve UI/lokalizasyon katmanını (kullanıcı etiket ve mesajları) birlikte yönetir. Sözlük uyumu ve rol bazlı üslup, TTS kalitesinin merkezindedir. Zaman damgası ve SRT formatı, özellikle duruşma ve analiz sahneleri için zorunludur.[^7][^10][^11][^9]

Tablo 8 – Dosya → İçerik → Türkçeleştirme Noktaları → TTS Notları
| Dosya | İçerik | Türkçeleştirme | TTS Not |
|---|---|---|---|
| legalCases.ts | Eğitim vakaları, mahkeme meta | Mahkeme adları, terimler, özet | SRT zaman damgası; sözlük dipnotları |
| mockCourtAudio.ts | Rol/kategori kısa metinleri | “Your Honor”, “beyond reasonable doubt” | Açıklayıcı not; duraklama/vurgu işaretleri |
| mock_court_audio_scripts.md | Zaman damgalı sahneler | Sahne başlıkları, rol/kategori | 00:00:00,000; rol bazlı üslup ipuçları |
| bailii_info.json | Tanıtım/özellik | Ürün isimleri, erişim modeli | Kaynak güvenliği beyanı |
| hk_judiciary_info.json | Kategori/erişim | Kaleme başvuru yönergesi | UI etiketleriyle uyum |
| public_domain_legal_sources.md | Güvenli kullanım | SAFE/RECOMMENDED/AVOID | UI metinlerinde uyarılar |

Tablo 9 – Rol/Kategori → Üslup → Örnek TTS Cümleleri
| Rol/Kategori | Üslup | Örnek Cümle |
|---|---|---|
| Hâkim (opening) | Otoriter, net | “Mahkeme açılmıştır.” |
| Savcı (opening) | Kesin | “İddia tarafı, makul şüphe ölçütünü aşan deliller sunacaktır.” |
| Savunma (opening) | Temkinli | “Deliller bütüncül incelenmelidir.” |
| Tanık (testimony) | Betimleyici | “Olay saat 11:30’da gerçekleşti.” |
| Varsayılan (analysis) | Açıklayıcı | “Zaman çizelgesi üç kritik anı gösteriyor.” |

### 5.1) Terminoloji Tutarlılık Kontrolü

Sözlük uyumu ve alternatif terimler için dipnot/not kullanımı, TTS üretiminde kalite güvencesinin temelidir. NJ Courts Glossary ve Dışişleri terminolojisi, AB sözlükleri ve kurumsal mahkeme adlarıyla birlikte doğrulanır.[^7][^9][^5][^6]

Tablo 10 – Terim → Önerilen Türkçe → Alternatifler → Bağlam Notu
| Terim | Türkçe | Alternatif | Bağlam Notu |
|---|---|---|---|
| Injunction | İhtiyati tedbir | Yasaklama kararı | Hukuk/ceza bağlamı ve tedbir sistemi. |
| Consideration | Bedel/karşılık | İvaz | Common law geçerlilik koşulu; açıklayıcı dipnot. |
| Case law | İçtihat | Emsal kararlar | Bağlayıcı emsal yok; yorum destek. |
| Affidavit | Yeminli ifade | — | Yazılı ve yeminli beyan. |
| Deposition | Yeminli tanık beyanı | — | Tanık beyanı işlevi; ayrım dipnotla. |
| Enforcement | Cebrî icra | İcra | İcra‑iflas bağlamı; organlar. |
| Administrative case | İdari dava | — | İdari yargı; İYUK terminolojisi. |

---

## 6) Uyumluluk ve Telif

BAILII ücretsiz erişim ve bağış destekli sürdürüm modeliyle; HKLII ve Hong Kong Judiciary resmî erişim kanallarıyla doğrulanmış kaynaklardır. Yeniden kullanımda kaynak atfı ve sorumsuzluk beyanlarının korunması esastır. Demo içeriklerde “eğitim/simülasyon” etiketi ve hukuki tavsiye olmadığına dair beyan açıkça yer alır.[^14][^10][^11]

Tablo 11 – Kaynak → Erişim Modeli → Telif/Yeniden Kullanım Özeti
| Kaynak | Erişim | Özet |
|---|---|---|
| BAILII | Ücretsiz/bağış | Kamuya açık vaka hukuku ve mevzuat; bağış destekli sürdürüm; atıf ve beyanlar korunur.[^14] |
| HKLII | Ücretsiz/resmî | Hong Kong kararları ve mevzuat; resmî erişim; atıf ve kullanım şartlarına uyum.[^10] |
| HK Judiciary | Resmî/ücretsiz | Kararlar; kategoriler ve erişim penceresi; kaleme başvuru; sorumsuzluk beyanları ayrıca kontrol.[^11] |

---

## 7) Sonuç, Yol Haritası ve Teslimat

Bu rapor; mahkeme senaryoları, hukuki açıklamalar ve danışmanlık metinlerinin TTS üretimi için terminolojik, anlatısal ve teknik bir çerçeve sunmuştur. Teslimatlar; sahne bazlı TTS metinleri, SRT altyazılar ve sözlük/dipnot eklerinden oluşur. Zaman damgası standardı, rol bazlı üslup ve sözlük uyumu, üretim kalitesini güvence altına alır.

Bilgi boşlukları (BAILII ve HK Judiciary telif beyanlarının ayrıntı metinleri; HK mahkeme adlarının resmî Türkçe çevirileri; Caparo ve Donoghue orijinal metin bağlantıları) ihtiyatla yönetilir; açıklayıcı dipnotlar ve resmî kaynak referanslarıyla bağlam güçlendirilir. Sürdürülebilirlik için sözlük temelli standartların düzenli güncellenmesi, kullanım beyanlarının görünür kılınması ve geri bildirim döngülerinin işletilmesi önerilir.[^14][^10][^11]

---

## Kaynakça

[^1]: Turkish Legal System: An Overview of Its Civil Law Principles – Celebi Legal. https://www.celebilegal.com/turkish-legal-system/  
[^2]: Common Law – Vikipedi. https://tr.wikipedia.org/wiki/Ortak_hukuk  
[^3]: CONSTITUTION OF THE REPUBLIC OF TURKEY (English). https://www.anayasa.gov.tr/media/7258/anayasa_eng.pdf  
[^4]: Judicial system of Turkey – Wikipedia. https://en.wikipedia.org/wiki/Judicial_system_of_Turkey  
[^5]: Türk Yargı Kurum ve Mahkeme İsimlerinin İngilizce Karşılıkları Nelerdir? https://hukukingilizcesi.org/2017/03/01/turk-yargi-kurum-isimlerinin-ingilizce-karsiliklari-nelerdir/  
[^6]: First Instance Civil Courts in Turkey – İngilizce Karşılıkları. https://hukukingilizcesi.org/2019/08/05/first-instance-civil-courts-in-turkey-ilk-derece-hukuk-mahkemeleri/  
[^7]: Glossary of Legal (and Related) Terms – English/Turkish (NJ Courts). https://www.njcourts.gov/sites/default/files/forms/11783_glossary_turkish.pdf  
[^8]: court – Tureng. https://tureng.com/tr/turkce-ingilizce/mahkeme  
[^9]: T.C. Dışişleri Bakanlığı – Genel Hukuk Terminolojisi (İngilizce‑Türkçe). https://www.mfa.gov.tr/data/Terminoloji/hukuk-terminoloji-110615.pdf  
[^10]: 2577 sayılı İYUK – İdari Dava Türlerinin İngilizce Çevirisi. https://hukukingilizcesi.org/2018/03/06/2577-sayili-idari-yargilama-usulu-kanunu-idari-dava-turlerinin-ingilizce-cevirisi/  
[^11]: Law on Constitutional Court – Anayasa Mahkemesi. https://www.anayasa.gov.tr/en/legislation/law-on-constitutional-court/  
[^12]: Turkish Words and Phrases for Law & Justice (TurkishClass101). https://www.turkishclass101.com/turkish-vocabulary-lists/law-and-justice-legal-terms  
[^13]: Labour & Employment Law – Turkey (L&E Global). https://leglobal.law/countries/turkiye/employment-law/employment-law-overview-turkiye/  
[^14]: BAILII (British and Irish Legal Information Institute) – Resmi Site. https://www.bailii.org/  
[^15]: Hong Kong Legal Information Institute (HKLII) – Resmi Site. https://www.hklii.hk/  
[^16]: Hong Kong Judiciary – Judgments. https://www.judiciary.hk/en/judgments_legal_reference/judgments.html  
[^17]: Hong Kong Judiciary – Introduction. https://www.judiciary.hk/en/about_us/guide.html  
[^18]: Hong Kong Judiciary – High Court. https://www.judiciary.hk/en/court_services_facilities/hc.html
---

# Türkçe Hukuki TTS Senaryoları - Uygulama İçerikleri

## İçindekiler

1. [Mahkeme Duruşması Senaryoları](#mahkeme-duruşması-senaryoları)
2. [Hukuki Açıklama Metinleri](#hukuki-açıklama-metınlerı)
3. [Danışmanlık Metinleri](#danışmanlık-metınlerı)
4. [TTS Ses Parametreleri](#tts-ses-parametrelerı)

---

## Mahkeme Duruşması Senaryoları

### Ceza Mahkemesi - Hâkim Açılış

**[Ses: h001_judge_male] [Hız: Orta] [Ton: Kararlı] [Vurgu: Açılış cümlelerinde]**

**[0:00]**
Mahkeme açılmıştır. Bu davada Anayasa Mahkemesi'nin hükmü, Yargıtay'ın kararı ve Türk Ceza Hukuku'nun maddeleri uygulanacaktır.

**[0:03]**
İlk derece mahkemesi olan Asliye Ceza Mahkemesi'nde görülen bu davada, sanığın Ceza Muhakemesi Kanunu kapsamındaki hakları korunacaktır.

**[0:06]**
Adil yargılanma prensibi gereği, tarafların delilleri eşit şekilde değerlendirilecektir. Hukuk devleti ilkemizin gereklerine uygun olarak usul işlemleri yürütülecektir.

---

### Ceza Mahkemesi - Savcı İddiaları

**[Ses: h002_lawyer_male] [Hız: Hızlı] [Ton: Keskin] [Vurgu: Suç unsurları üzerine]**

**[0:00]**
Sayın hâkim, iddia makamı olarak müvekkilimiz mağdurun haklarını korumak için bu davada hareket ediyoruz.

**[0:03]**
Sanığın işlediği fiil, Türk Ceza Kanunu'nun 151. maddesinde düzenlenen mala zarar verme suçunu oluşturmaktadır.

**[0:06]**
İşlem sırasında kullanılan kesici alet ve muhakeme başında alınan ifadeler, suçun unsurlarını oluşturan kastı açıkça göstermektedir.

**[0:09]**
Bu durumda sanığın kasten hareket ettiği ve hukuk kurallarını bilerek ihlal ettiği sabittir.

---

### Ceza Mahkemesi - Savunma Argümanları

**[Ses: w002_lawyer_female] [Hız: Orta] [Ton: Sakin] [Vurgu: Savunma noktalarında]**

**[0:00]**
Sayın hâkim, müvekkilim adli kovuşturmada haklarını ihlal eden bir takım süreç hatalarının bulunduğunu savunmaktadır.

**[0:03]**
İlk olarak, hukukta "makul şüphe" ilkesi gereği, delillerin kesin ve net olması gerekmektedir.

**[0:06]**
Mevcut deliller arasında çelişkiler bulunmakta ve bunlar irdelenmemiştir. Ceza muhakemesinde tarafsız yargılanma hakkı ihlal edilmiştir.

**[0:09]**
Müdafi olarak, müvekkilimin bu davada iyi niyetli hareket ettiğini ve hukuk sistemi içinde haklarını kullandığını belirtiyoruz.

---

### Medeni Hukuk Mahkemesi - Davalı Savunması

**[Ses: h002_lawyer_male] [Hız: Yavaş] [Ton: Kararlı] [Vurgu: Hukuki argümanlarda]**

**[0:00]**
Sayın hâkim, bu tazminat davasında davalı olarak haklarımızı korumak için davanın reddini talep ediyoruz.

**[0:03]**
Türk Borçlar Kanunu'na göre, sorumluluk doğması için kusur ve zarar arasında illiyet bağının bulunması gerekmektedir.

**[0:06]**
Ancak müvekkilimizin herhangi bir kusuru bulunmadığı gibi, meydana gelen zarar da önlenebilir nitelikte değildir.

**[0:09]**
Bu nedenle hukuki sorumluluk doğmamış olup, davanın esastan reddi gerekmektedir.

---

### İş Mahkemesi - Tanık Dinlenmesi

**[Ses: w002_lawyer_female] [Hız: Orta] [Ton: Sorgulayıcı] [Vurgu: Soru cümlelerinde]**

**[0:00]**
Sayın hâkim, tanık beyanı alınacaktır. Tanık, yemin vererek ifade verecektir.

**[0:03]**
"Siz şirketin İnsan Kaynakları departmanında çalışıyor musunuz?"
"Yaklaşık üç yıldır bu pozisyondayım."

**[0:06]**
"İşveren ile işçi arasındaki anlaşmazlıkta hangi süreçleri yaşadınız?"
"İşveren, önce disiplin soruşturması açtı, ardından işten çıkarma sürecini başlattı."

**[0:09]**
"Bu süreçte hukuki danışmanlık alındı mı?"
"Evet, iş hukuku konusunda uzman bir avukattan danışmanlık hizmeti alındı."

---

### İcra Mahkemesi - Haciz İşlemi

**[Ses: h003_official_male] [Hız: Yavaş] [Ton: Resmi] [Vurgu: Yasal işlemlerde]**

**[0:00]**
İcra Mahkemesi'nde alacaklı tarafın talebi üzerine cebrî icra işlemi başlatılmıştır.

**[0:03]**
Türk İcra ve İflas Hukuku'na göre, borçlunun malvarlığı üzerine haciz konulmasına karar verilmiştir.

**[0:06]**
Haciz, İcra Dairesi tarafından yürütülecek olup, haczedilen malların muhafazası ve satış işlemleri yapılacaktır.

**[0:09]**
Borçlu, haciz işlemi sırasında ıttıla sahip olmuş ve itirazlarını belirtme imkânına sahip olmuştur.

---

### İdari Yargı - İptal Davası

**[Ses: w001_judge_female] [Hız: Yavaş] [Ton: Tarafsız] [Vurgu: Yasal prosedürlerde]**

**[0:00]**
Danıştay'da görülen idari yargıda, başvuranın idare mahkemesine başvurmuş olduğu görülmektedir.

**[0:03]**
2577 sayılı İdari Yargılama Usulü Kanunu'nun 2. maddesi uyarınca, idari işlemin iptali talep edilmiştir.

**[0:06]**
İdari yargıda tam yargı davası açısından, idari işlemin iptali ve tamamen ortadan kaldırılması değerlendirilmektedir.

**[0:09]**
Bu süreçte kabul edilebilirlik şartları ve idari yargının görev alanı dikkate alınmaktadır.

---

## Hukuki Açıklama Metinleri

### İşçi Hakları ve Koruma

**[Ses: w003_consultant_female] [Hız: Yavaş] [Ton: Eğitici] [Vurgu: Önemli kavramlarda]**

**[0:00]**
Merhaba, bu video'da Türk İş Hukuku'ndaki işçi hakları ve koruma mekanizmalarını açıklayacağım.

**[0:03]**
İş Kanunu'na göre işçi, işverenle yaptığı iş sözleşmesi çerçevesinde çalışma hakkına sahiptir.

**[0:06]**
İş güvencesi, işçinin işten çıkarılmasını önleyen önemli bir koruma mekanizmasıdır. İşveren, usulüne uygun fesih bildiriminde bulunmak zorundadır.

**[0:09]**
İş sağlığı ve güvenliği, çalışanların işyerinde güvenli şekilde çalışmasını sağlayan kurallar bütünüdür.

**[0:12]**
İş kazası durumunda, işverenin sorumluluğu ve işçinin hakları ayrı bir başlık altında düzenlenmiştir.

---

### Sözleşme Türleri ve Hukuki Boyutları

**[Ses: h002_lawyer_male] [Hız: Orta] [Ton: Eğitici] [Vurgu: Hukuki terimlerde]**

**[0:00]**
Sözleşme hukuku, taraflar arasında kurulan hukuki ilişkileri düzenleyen önemli bir alandır.

**[0:03]**
Türk Borçlar Kanunu'nda düzenlenen sözleşme türleri arasında: alım-satım sözleşmesi, hizmet sözleşmesi, kira sözleşmesi ve iş sözleşmesi bulunmaktadır.

**[0:06]**
Sözleşmenin geçerli olabilmesi için rıza, şekil ve kabiliyet şartlarının sağlanması gerekmektedir.

**[0:09]**
İfade serbestliği ilkesi gereği, taraflar sözleşme şartlarını karşılıklı anlaşma ile belirleyebilirler.

**[0:12]**
Sözleşme ihlali durumunda, tazminat sorumluluğu ve aynen ifa hakkı devreye girer.

---

### Ceza Yargılama Süreçleri

**[Ses: h001_judge_male] [Hız: Yavaş] [Ton: Bilgilendirici] [Vurgu: Prosedür adımlarında]**

**[0:00]**
Türk Ceza Muhakemesi Kanunu, ceza yargılama süreçlerini düzenleyen temel mevzuatdır.

**[0:03]**
İlk aşamada, Cumhuriyet Savcılığı şikayet veya ihbar üzerine soruşturma başlatır. Bu aşamada şüpheli, tanık ve mağdur ifadeleri alınır.

**[0:06]**
Soruşturma sonunda yeterli delil bulunursa, iddianame düzenlenerek Asliye Ceza Mahkemesi'ne gönderilir.

**[0:09]**
Yargılama aşamasında, mahkeme delilleri değerlendirir ve taraflara sözlü açıklama hakkı tanır.

**[0:12]**
Son aşamada hâkim, suçun sabit olup olmadığını değerlendirerek beraat veya mahkûmiyet hükmü verir.

---

### İcra-İflas Prosedürleri

**[Ses: w001_judge_female] [Hız: Orta] [Ton: Bilgilendirici] [Vurgu: İşlem türlerinde]**

**[0:00]**
İcra ve İflas Hukuku, alacakların tahsili için kullanılan hukuki süreçleri düzenler.

**[0:03]**
İcra takibi, alacaklının borçlu aleyhine İcra Müdürlüğü'ne başvurmasıyla başlar.

**[0:06]**
Borçlu, ödeme emri tebliğinden sonra yirmi dört saat içinde borcu ödemek veya icranın geri bırakılmasını istemek zorundadır.

**[0:09]**
Haciz işlemi, borçlunun malvarlığı üzerine İcra Müdürlüğü tarafından icra organları marifetiyle konulur.

**[0:12]**
İflas halinde ise, borçlunun tüm malvarlığı haczedilerek paraya çevrilir ve alacaklılar arasında paylaştırılır.

---

### Anayasa Hukuku - Temel Haklar

**[Ses: h002_lawyer_male] [Hız: Yavaş] [Ton: Akademik] [Vurgu: Anayasal prensiplerde]**

**[0:00]**
Türkiye Cumhuriyeti Anayasası, devletin temel yapısını ve vatandaşların temel hak ve ödevlerini düzenler.

**[0:03]**
Anayasa Mahkemesi, norm denetimi ve bireysel başvuru mekanizmaları aracılığıyla anayasal denetim yapar.

**[0:06]**
Soyut norm denetimi, kanunların Anayasa'ya uygunluğunun genel olarak incelenmesidir.

**[0:09]**
Somut norm denetimi ise, mahkemece ilgili kanun hükmünün iptali talep edilerek yapılan denetimdir.

**[0:12]**
Bireysel başvuru, temel hak ve özgürlüklerin ihlal edildiği iddiasıyla Anayasa Mahkemesi'ne yapılan başvurudur.

---

## Danışmanlık Metinleri

### Ceza Hukuku - İşe Alma Riskleri

**[Ses: w003_consultant_female] [Hız: Orta] [Ton: Danışman] [Vurgu: Risk faktörlerinde]**

**[0:00]**
Merhaba, bu danışmanlık seansında işe alma sürecindeki ceza hukuku risklerini değerlendireceğiz.

**[0:03]**
İşveren olarak, işe aldığınız kişinin geçmişinde bulunan suç kayıtları, iş ortamını etkileyebilecek riskler taşımaktadır.

**[0:06]**
Adli sicil kaydı bulunan adayların işe alımı, şirket politikası ve hukuki düzenlemeler çerçevesinde değerlendirilmelidir.

**[0:09]**
Özellikle şirketin değerleri ile çelişen suç türleri varsa, işe alım kararı dikkatli şekilde verilmelidir.

**[0:12]**
Bu konuda hukuki danışmanlık alarak, hem şirketin çıkarlarını koruyabilir hem de işçinin haklarını ihlal etmeyebilirsiniz.

---

### Medeni Hukuk - Evlilik Öncesi Sözleşme

**[Ses: h002_lawyer_male] [Hız: Yavaş] [Ton: Uzman] [Vurgu: Hukuki önerilerde]**

**[0:00]**
Evlilik öncesi sözleşme, çiftlerin evlilik süresince ve sonrasındaki mali haklarını güvence altına alan önemli bir hukuki araçtır.

**[0:03]**
Türk Medeni Kanunu'na göre, eşlerin mal rejimi anlaşması yapmaları mümkündür. Bu anlaşma evlilikten önce veya sonra yapılabilir.

**[0:06]**
Evlilik öncesi mal rejimi anlaşması, gayrimenkul, taşınır mal ve hatta gelecekte edinilecek mallar üzerindeki hakları düzenleyebilir.

**[0:09]**
Bu sözleşmenin noterde düzenlenmesi ve resmî şekil şartlarına uyulması gerekmektedir.

**[0:12]**
Ayrıca, aile mahkemesinde onay süreci de tamamlanarak hukuki geçerlilik sağlanır.

---

### Ticaret Hukuku - Şirket Kuruluşu

**[Ses: h002_lawyer_male] [Hız: Orta] [Ton: Rehber] [Vurgu: Önemli adımlarda]**

**[0:00]**
Şirket kuruluşu süreci, Türk Ticaret Kanunu hükümlerine göre yürütülmektedir.

**[0:03]**
Anonim şirket kurmak için en az 250.000 TL sermaye gerekmektedir. Limited şirket içinse 10.000 TL yeterlidir.

**[0:06]**
Kuruluş aşamasında, ana sözleşme hazırlanması, ticaret sicili müdürlüğüne başvuru yapılması ve gerekli belgelerin sunulması gerekir.

**[0:09]**
Ticaret Mahkemesi, şirket kuruluşu sırasında ortaya çıkan uyuşmazlıklara bakma yetkisine sahiptir.

**[0:12]**
İş dünyasında rekabet hukuku kurallarına uyum da şirket faaliyetlerinde dikkat edilmesi gereken önemli bir husustur.

---

### İş Hukuku - İşten Çıkarma Süreci

**[Ses: w003_consultant_female] [Hız: Orta] [Ton: Bilgilendirici] [Vurgu: Yasal süreçlerde]**

**[0:00]**
İşveren olarak işçiyi işten çıkarma süreci, İş Kanunu'nda belirtilen şartlara uygun şekilde yürütülmelidir.

**[0:03]**
Geçerli fesih nedeni bulunmadığı hallerde, işçinin iş güvencesi kapsamında işe iade davası açma hakkı bulunmaktadır.

**[0:06]**
Disiplin kurulu toplantısı yapılarak, işçinin savunması alınmalı ve süreç objektif kriterlerle değerlendirilmelidir.

**[0:09]**
Arabuluculuk süreci de iş yargısında alternatif çözüm yöntemi olarak değerlendirilebilir.

**[0:12]**
İş mahkemesi kararlarına karşı istinaf ve temyiz yolu mevcuttur. Bu süreçlerde hukuki temsil önem taşımaktadır.

---

### İdari Hukuk - Belediye İşlemleri

**[Ses: h003_official_male] [Hız: Yavaş] [Ton: Resmi] [Vurgu: İdari prosedürlerde]**

**[0:00]**
İdare hukuku kapsamında, belediye işlemlerinin hukuka uygunluğu Danıştay tarafından denetlenir.

**[0:03]**
İdarî işlem ve eylemlerden doğan uyuşmazlıklarda, idari yargı yolu açıktır.

**[0:06]**
Tam yargı davası ile idari işlemin iptali ve tamamen ortadan kaldırılması talep edilebilir.

**[0:09]**
İdarenin cebri icra yetkisi, hukuka uygun şekilde kullanılmalıdır.

**[0:12]**
Bu süreçlerde kabul edilebilirlik şartlarının sağlanması önemlidir.

---

## TTS Ses Parametreleri

### Ana Karakter Profilleri

| Ses ID | Cinsiyet | Hız | Ton | Kullanım Alanı |
|--------|----------|-----|-----|----------------|
| h001_judge_male | Erkek | Orta | Kararlı | Hâkim konuşmaları, resmi açıklamalar |
| h002_lawyer_male | Erkek | Orta | Güvenilir | Avukat argumentları, hukuki açıklamalar |
| h003_official_male | Erkek | Yavaş | Resmi | Devlet yetkilisi, hukuki prosedürler |
| w001_judge_female | Kadın | Yavaş | Tarafsız | Hâkim hanım, hukuki yorumlar |
| w002_lawyer_female | Kadın | Orta | Yetkin | Avukat kadın, savunma argümanları |
| w003_consultant_female | Kadın | Yavaş | Samimi | Hukuki danışmanlık, eğitim metinleri |

### Ses Efektleri ve İşaretler

**[Vurgu İşaretleri:]**
- **Bold**: Önemli kelimeleri vurgulamak için
- *İtalik*: Duygusal vurgular için
- "Alıntı": Doğrudan alıntılar için
- [...] Açıklama notları

**[Duraklama İşaretleri:]**
- "...": Orta duraklama (0.5 saniye)
- "—": Uzun duraklama (1 saniye)
- "•": Kısa duraklama (0.2 saniye)

**[Telaffuz İşaretleri:]**
- ** fonetik yazım**: Karmaşık terimler için
- [parantez]: Açıklama notları
- {büyük harf}: Vurgulama

### Metin Formatı Örneği

**[Ses: h001_judge_male] [Hız: Yavaş] [Ton: Kararlı] [Vurgu: Hükümde]**

**[0:00]**
Mahkeme • açılmıştır — ve yargılama süreci • başlamıştır...

**[0:03]**
Bu davada • Anayasa • hükümleri ve • Yargıtay • kararları • uygulanacaktır...

### Hukuki Terimlerin Telaffuzu

| Terim | Fonetik Yazım | Vurgu |
|-------|---------------|-------|
| Anayasa | a-na-ya-sa | 1. hece |
| Yargıtay | yar-gı-tay | 1. hece |
| Danıştay | da-nış-tay | 1. hece |
| Hukuk | hu-kuk | 1. hece |
| Mahkeme | mah-ke-me | 2. hece |
| Avukat | a-vu-kat | 2. hece |
| Hâkim | ha-kim | 1. hece |
| Savcı | sav-cı | 1. hece |
| Dava | da-va | 1. hece |
| Temyiz | te-mi-yiz | 2. hece |
| İcra | i-cra | 1. hece |
| İflas | i-flas | 1. hece |
| Borçlar | borç-lar | 1. hece |
| Medeni | me-de-ni | 2. hece |
| Ceza | ce-za | 1. hece |
| İş Kanunu | iş ka-u-nu | 1. hece |

Bu TTS parametreleri ve formatlar, hukuki metinlerin profesyonel ve anlaşılır şekilde seslendirilmesi için optimize edilmiştir.
