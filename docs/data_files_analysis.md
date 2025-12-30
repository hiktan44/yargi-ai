# Uygulama Veri Dosyaları Analizi ve Türkçeleştirme Yol Haritası (legalCases.ts, mockCourtAudio.ts ve public/data Klasörü)

## Yürütücü Özet ve Kapsam

Bu rapor, uygulamanın çekirdek veri dosyalarında (legalCases.ts, mockCourtAudio.ts ve public/data klasöründeki JSON/MD dosyaları) yer alan İngilizce içeriklerin kapsamlı bir analizini sunar. Amacımız, her dosya için içerik özeti çıkarmak, İngilizce alan ve metinleri tespit etmek, hukuki terminolojinin doğru Türkçe karşılıklarını belirlemek ve Türkçeleştirme ile birlikte yürütülecek uyumluluk, anonimleştirme ve kalite güvence adımlarını tanımlamaktır. Çalışma; BAILII (British and Irish Legal Information Institute), HKLII (Hong Kong Legal Information Institute) ve Hong Kong Judiciary (HK Judiciary) gibi kamuya açık ve resmi kaynak referanslarıyla yürütülmüş, dosya içi veri yapıları ve metinler bu referanslarla ilişkilendirilmiştir.[^1][^2][^3]

Analiz kapsamındaki dosyalar ve konumları:
- src/data/legalCases.ts
- src/data/mockCourtAudio.ts
- public/data/bailii_info.json
- public/data/public_domain_legal_sources.md
- public/data/mock_court_audio_scripts.md
- public/data/hk_judiciary_info.json

İçerik ve kaynak güvenliği açısından öne çıkan bulgular:
- BAILII, HKLII ve Hong Kong Judiciary; eğitim ve tanıtım amaçlı kullanım için uygun, kamuya açık veya resmi erişime sahip veri kaynaklarıdır. BAILII ücretsiz erişim ilkesi ve bağış destekli sürdürüm modeliyle; HKLII ve HK Judiciary ise doğrudan resmi kanallar üzerinden erişimle öne çıkar.[^1][^2][^3]
- Veri setindeki mock (taklit) içerikler açıkça “eğitim amaçlı” ve “anonimleştirilmiş” olarak işaretlenmiştir; buna karşın adli süreç terminolojisinin (ör. cross-examination, reasonable doubt, duty of care) Türkçe karşılıklarının standartlaştırılması ve UI/lokalizasyon stratejisinin buna göre kurgulanması gereklidir.
- Önemli bilgi boşlukları: BAILII’nin telif ve kullanım politikalarının ayrıntı metinleri bu çalışmada görüntülenmemiş; HK Judiciary veri tabanında telif/yeniden kullanım beyanları; HK mahkeme hiyerarşisinin resmi Türkçe terminolojisi; Caparo ve Donoghue davalarına ait orijinal metin bağlantıları yer almamaktadır. Bu boşluklar, çeviri ve uyumluluk kararlarında ihtiyat gerektirir.

## Metodoloji ve Kaynak Doğrulaması

Analiz yöntemi, dosyaların içeriğini sistematik biçimde gözden geçiren bir çerçeve üzerine kuruldu. Önce her dosyanın amaç ve kapsamı belirlendi; sonra İngilizce alanlar ve metinler etiketlenerek Türkçe karşılıklarına ilişkin aday öneriler geliştirildi. Hukuki terimler için standart sözlükler ve resmi kaynaklar referans alındı; Türkçe-İngilizce karşılıklar konusunda New Jersey Courts Glossary gibi güvenilir sözlükler ile T.C. Dışişleri Bakanlığı’nın hukuk terminolojisi yayınları esas alındı.[^7][^8] Ayrıca Hong Kong Yargıtay (Court of Final Appeal) ve Yüksek Mahkeme (High Court, Court of Appeal ve Court of First Instance) için resmi mahkeme kaynakları ve açıklamaları kontrol edilerek HK mahkeme hiyerarşisi ve kapsamı doğrulandı.[^4][^5][^6]

Çeviri ilkeleri:
- Hukuki özel anlam içeren terimlerde (ör. negligence, duty of care, reasonable doubt) sözlük ve emsal metinlerle tutarlı karşılıklar tercih edilmiştir.
- Mahkeme adları ve unvanlar için yerleşik Türkçe karşılıklar kullanılmış; Türkçe karşılığı standartlaşmamış veya HK’ye özgü özel kurumsal isimlerde açıklayıcı notlar eklenmiştir.
- UI/lokalizasyon metinlerinde açıklık, bağlam ve anlaşılabilirlik öncelenmiş; teknik terimlerin ilk geçişinde parantez ile İngilizce asılları verilmiştir.

Bailii, HKLII ve HK Judiciary; ücretsiz/resmi erişim ve kapsam itibarıyla doğrulanmış kaynaklar olup, demo ve eğitim içerikleri için güvenli referans veri tabanlarıdır.[^1][^2][^3]

## Dosya Bazlı İncelemeler ve Türkçeleştirme Noktaları

### legalCases.ts – İçerik Özeti ve Türkçeleştirme Noktaları

legalCases.ts dosyası, iki ana veri yapısı içerir: verifiedLegalSources ve mockLegalCases. verifiedLegalSources, BAILII, HKLII ve HK Judiciary’nin temel tanımlarını (erişim türü, kapsam, doğrulama durumu) sunar. mockLegalCases ise eğitim ve demo amaçlı beş taklit vaka içerir. Bu vakalar, ihmal (negligence), sözleşme (contract) ve ceza (criminal) kategorilerini kapsayan örneklerdir. Ayrıca searchExamples dizisi ile tipik sorgu örnekleri verilmektedir.

Veri yapısının ana alanları: id, title, year, court, similarity, keyFactors, outcome, relevance, summary, jurisdiction, caseType, source.

Bu dosyada İngilizce içerik oldukça yoğundur. Mahkeme adları (ör. House of Lords, UK; District Court; Commercial Court; Magistrate Court), dava unvanları, hukuki terimler (ör. negligence, duty of care, proximate/justice fairness test; cross-examination; reasonable doubt) ve kaynak beyanları (ör. “Public domain educational materials”, “BAILII - Public domain case law”) Türkçeleştirilmeye uygun metin alanlarıdır.

Tablo 1, veri alanlarının Türkçe karşılıklarını ve notlarını özetler.

Tablo 1 – legalCases.ts Veri Alanları ve Türkçe Karşılıkları
| Alan | Veri Tipi | Örnek İngilizce | Önerilen Türkçe Karşılık | Not |
|---|---|---|---|---|
| id | string | case_001 | vaka_001 | Kimlik alanı; Türkçeleştirme gerekmez. |
| title | string | Anonymous v. Mountain Trail Authority (Anonymized Case Study) |anonimleştirilmiş eğitim vaka çalışması | Eğitim amaçlı ifadeyi Türkçe biçimde yansıtın. |
| year | number | 1996 | 1996 | Değişmez. |
| court | string | Hong Kong District Court (Educational Example) | Hong Kong Bölge Mahkemesi (Eğitim Örneği) | HK mahkeme adları için resmi çeviri standardı yoksa açıklayıcı not ekleyin. |
| similarity | number | 92 | 92 | Skor; değişmez. |
| keyFactors | string[] | Trail safety negligence, Inadequate barriers | patika güvenliğinde ihmal, yetersiz bariyerler | Çoğul terim listelerini tutarlı çevirin. |
| outcome | string | Defendant found liable for negligence | davalı ihmalden sorumlu bulundu | “ liable for negligence” = “ihmalden sorumlu”.[^7][^8] |
| relevance | number | 95 | 95 | Skor; değişmez. |
| summary | string | Educational case study demonstrating negligence principles... | ihmal ilkelerini gösteren eğitim vaka çalışması... | Kısa ve açıklayıcı. |
| jurisdiction | string | Hong Kong | Hong Kong | Değişmez. |
| caseType | string | negligence | ihmal | Sözlük uyumlu karşılık.[^7][^8] |
| source | string | Public domain educational materials | kamu malı eğitim materyalleri | “Public domain” terimi için bağlama göre “kamu malı” veya “kamuya açık” notu ekleyin. |

Dosyadaki mock vakaların Türkçe başlıkları, eğitim ve anonimleştirme vurgusunu koruyarak yeniden yazılmalıdır. Örnekler:
- “case_001”: “Anonim v. Mountain Trail Authority (Anonimleştirilmiş Vaka Çalışması)”
- “case_002”: “Donoghue v Stevenson (1932) – Klasik İhmal (Negligence) Precedentı”
- “case_003”: “Caparo Industries plc v Dickman (1990) – Üç Aşamalı (Three-Part) Test”
- “case_004”: “Sözleşme Uyuşmazlığı – Yazılım Lisanslama (Anonim)”
- “case_005”: “Tanık Güvenilirliği Analizi – Eğitim Vakası”

Tablo 2, HK ve BK mahkeme isimlerinin önerilen Türkçe karşılıklarını ve açıklayıcı notlarını içerir.

Tablo 2 – HK ve BK Mahkeme İsimleri ve Türkçe Karşılıkları
| Orijinal İsim | Yargıç | Önerilen Türkçe | Açıklayıcı Not |
|---|---|---|---|
| Hong Kong District Court | HK | Hong Kong Bölge Mahkemesi | Asliye seviyesinde; ilk derece mahkemesi.[^4][^5] |
| Commercial Court (Educational Example) | HK | Ticaret Mahkemesi (Eğitim Örneği) | Uygulamada yargı birimi adı ülkeye göre değişebilir; HK özelinde resmi adlandırma doğrulanmalıdır.[^4][^5] |
| Magistrate Court (Educational Example) | HK | Hâkimler Mahkemesi (Eğitim Örneği) | Sulh ceza işlevleri; HK’de “Magistrates” terimi kullanılır.[^4][^5] |
| House of Lords, UK | BK | Birleşik Krallık, Lordlar Kamarası | tarihi en yüksek temyiz mercii (şu anki adı: Supreme Court). |

Arama örnekleri için Türkçe karşılıklar:
- “Negligence cases 1996 HK trail safety” → “1996 Hong Kong patika güvenliği ihmal davaları”
- “Contract breach software licensing” → “Yazılım lisanslama sözleşme ihlali”
- “Witness testimony credibility analysis” → “Tanık ifadesi güvenilirlik analizi”
- “Timeline reconstruction methods” → “Zaman çizelgesi yeniden yapım yöntemleri”

Tablo 3, anahtar hukuki terimler ve çeviri önerilerini özetler.

Tablo 3 – Hukuki Terimler Sözlüğü (Seçilmiş)
| İngilizce | Önerilen Türkçe | Bağlam Notu |
|---|---|---|
| negligence | ihmal | Hukuki bir kavram olarak “ihmal”, Türk hukuk terminolojisinde yerleşik karşılıktır.[^7][^8] |
| duty of care | özen borcu | “Özen ve sadakat” yükümlülüğü bağlamında kullanılır. |
| proximate/justice (fairness) test | yakınlık/adalet testi | Caparo üçlü testinin parçası: foreseeability, proximity, fairness. |
| cross-examination | çapraz sorgu | Tanık sorgusu usulü. |
| reasonable doubt | makul şüphe | Ceza muhakemesi standardı. |
| settlement reached | uzlaşma sağlandı | Gizli şartlar vurgusu korunmalı. |
| case dismissed with prejudice | esastan red/iptal (düşürülme) | Türkiye muhakemesi terimleriyle bire bir eşleşmez; HK/BK bağlamında kullanılır. |

### mockCourtAudio.ts – İçerik Özeti ve Türkçeleştirme Noktaları

Bu dosya, mahkeme duruşmasını simüle eden 10 adet kısa sesli/konuşma metni (AudioScript) içerir. Metinler; yargıç açılış, savcı savunma açıklamaları, tanık ifadesi, çapraz sorgu, uzman analizi, jüri talimatı, nihai hüküm ve vaka özetini kapsar. Rol bazlı ses tipi (voiceType) ve kategori (category) alanları mevcuttur.

Türkçeleştirme stratejisi:
- Hitap biçimleri (“Your Honor”) ve bağlamsal adreslemeler Türkiye pratiğine uygun şekilde “Sayın Hâkim” biçiminde karşılanabilir. Ancak HK/BK bağlamı korunacaksa “sayın” eklenmiş “Your Honor” kullanımı da mümkündür.
- Ceza muhakemesi terimleri (beyond reasonable doubt; case dismissed with prejudice) Türkçede doğrudan birebir karşılığı olmayan ifadelerdir. Bu nedenle anlamı bozmadan açıklayıcı notlarla verilmesi uygundur (ör. “makul şüphe ölçütünü aşan bir ispat elde edilememiştir”).
- Rol unvanları ve kategori isimleri sözlük referanslarıyla standartlaştırılmalıdır.[^7][^8]

Tablo 4, rol ve kategori alanlarının Türkçe karşılıklarını ve çeviri notlarını içerir.

Tablo 4 – Rol ve Kategori Alanları ve Türkçe Karşılıkları
| Alan/İçerik | İngilizce | Önerilen Türkçe | Not |
|---|---|---|---|
| voiceType | judge | yargıç | Diksiyon ve üslup yargıç kimliğine uygun. |
| voiceType | prosecutor | savcı | Ceza yargılaması bağlamı. |
| voiceType | defense | savunma | Müdafi/savunma avukatı bağlamı. |
| voiceType | witness | tanık | Uzman tanık vs. genel tanık ayrımı korunabilir. |
| voiceType | default | varsayılan | Analitik/özetleyici metinler için. |
| category | opening | açılış | Oturumun başlangıcı. |
| category | testimony | ifade | Tanık beyanı. |
| category | cross-examination | çapraz sorgu | Karşı tarafça yapılan sorgu. |
| category | analysis | analiz | Uzman/yapısal değerlendirme. |
| category | instruction | talimat | Hâkim’in jüriye talimatı. |
| category | verdict | hüküm | Nihai karar/teşhis. |
| category | summary | özet | AI özetleyici notlar. |

Tablo 5, tipik cümle kalıplarının Türkçe karşılıklarını ve açıklayıcı notlarını gösterir.

Tablo 5 – Tipik Cümle Kalıpları ve Türkçe Karşılıkları
| İngilizce | Önerilen Türkçe | Bağlam/Not |
|---|---|---|
| All rise. This court is now in session. | Herkes ayağa kalksın. Mahkeme oturumu açılmıştır. | Protokol ifadesi. |
| Your Honor, the prosecution will demonstrate that... | Sayın Hâkim, iddia tarafı ... ortaya koyacaktır. | “Your Honor” bağlama göre yerelleştirilebilir. |
| ... beyond reasonable doubt | ... makul şüphe ölçütünü aşan bir ispatla | Ceza standardı; açıklayıcı not. |
| ... dismissed with prejudice | ... davanın esastan reddiyle düşürülmesi | Birebir karşılık yok; anlamı koruyun. |
| ... reasonable care under the circumstances | ... mevcut şartlar altında makul özen | “Reasonable care” için “makul özen”.[^7] |

### bailii_info.json – İçerik Özeti ve Türkçeleştirme Noktaları

bailii_info.json, BAILII’nin kapsamı, erişim modeli, veri tabanı çeşitliliği ve işlevselliğine ilişkin meta veriler içerir. Ücretsiz erişim, bağış destekli sürdürüm, çoklu yargı alanı kapsaması ve gelişmiş arama fonksiyonları öne çıkan unsurlardır.[^1] Metin alanlarının çoğu Türkçeleştirilmeye uygundur.

Tablo 6, öne çıkan alanların Türkçe karşılıklarını içerir.

Tablo 6 – BAILII Veri Alanları ve Türkçe Karşılıkları
| Alan | İngilizce | Önerilen Türkçe | Not |
|---|---|---|---|
| extracted_information | Free access to British and Irish case law & legislation... | Birleşik Krallık ve İrlanda vaka hukuku ve mevzuatına ücretsiz erişim... | Genel tanıtım metni. |
| features | Case Law Search, Legislation Search... | Vaka Hukuku Arama, Mevzuat Arama... | Ürün/özellik isimleri. |
| pricing.access_cost | Free | Ücretsiz | Değişmez. |
| pricing.donations_status | Voluntary donations requested | Gönüllü bağış talep edilmektedir | Sürdürüm modeli. |
| temporal_info | 25th anniversary; 2025 Sir Henry Brooke Lecture... | 25. yıl; 2025 Sir Henry Brooke Dersi... | Etkinlik/kronoloji. |
| geographical_data.coverage | United Kingdom, Ireland, Europe (EU), UAE, Qatar... | Birleşik Krallık, İrlanda, Avrupa (AB), BAE, Katar... | Coğrafi kapsam. |

UYARI: BAILII’nin telif politikası ve sorumsuzluk beyanlarının ayrıntılı metinleri bu bağlamda görüntülenmemiştir. Yeniden kullanımda kaynağa atıf ve beyanların korunması tavsiye edilir.[^1]

### public_domain_legal_sources.md – İçerik Özeti ve Türkçeleştirme Noktaları

Bu dosya; BAILII, HKLII, Hong Kong Judiciary ve ek küresel veri tabanlarını (CaseLaw Access Project, Justia, Google Scholar, WorldLII) eğitim ve demo amaçlı kullanım için güvenli kaynaklar olarak listeler. Güvenli kullanım prensipleri, anonimleştirme, eski tarihli içerik önceliği ve hassas veriden kaçınma gibi pratikleri vurgular.[^1][^2][^3][^9][^10][^11][^12]

Türkçeleştirme gereksinimleri:
- Bölüm başlıkları ve yönergeler (“SAFE TO USE”, “RECOMMENDED PRACTICES”, “AVOID”) Türkçe alt başlıklarla verilmeli.
- Uyarı metinleri açık ve anlaşılır Türkçe ile ifade edilmeli.
- Kaynak adları orijinal haliyle bırakılabilir; ilk geçişte parantez içinde Türkçe açıklama eklenebilir.

Tablo 7, veri tabanlarının erişim ve kapsam bilgilerini Türkçeleştirilmiş biçimiyle özetler.

Tablo 7 – Kamuya Açık Hukuki Veri Tabanları (Özet)
| Kaynak | Erişim | Kapsam | Türkçe Özet |
|---|---|---|---|
| BAILII | Ücretsiz | BK ve İrlanda vaka hukuku ve mevzuatı; AB | Kamuya açık, aramalı veri tabanı.[^1] |
| HKLII | Ücretsiz | Hong Kong kararları ve mevzuatı | Resmi HK veri kaynağı.[^2] |
| HK Judiciary | Resmi/Ücretsiz | HK mahkeme kararları | Devlet veri tabanı; doğrudan erişim.[^3] |
| CaseLaw Access Project | Ücretsiz | ABD vaka hukuku | Akademik/kapsamlı ABD arşivi.[^9] |
| Justia | Ücretsiz | ABD federal ve eyalet davaları | Halka açık dava metinleri.[^10] |
| Google Scholar | Ücretsiz | Akademik hukuk araştırmaları | Hakemli içerik ve atıf analizi.[^11] |
| WorldLII | Üretsiz | Küresel hukuki veri tabanları | Dünya ölçeğinde açık erişim.[^12] |

Tablo 8, eğitim amaçlı kullanım ilkelerinin Türkçe uygulama örnekleriyle eşlemesini sunar.

Tablo 8 – Kullanım İlkeleri ve Türkçe Karşılıkları
| İngilizce | Türkçe | Örnek Uygulama |
|---|---|---|
| SAFE TO USE | GÜVENLİ KULLANIM | Kamuya açık tarihi içeriklerin tercih edilmesi. |
| RECOMMENDED PRACTICES | ÖNERİLEN UYGULAMALAR | Anonimleştirme, açık beyan, hassas veriyi budama. |
| AVOID | KAÇIN | Yakın tarihli,appeal sürecindeki tartışmalı davalar. |

### mock_court_audio_scripts.md – İçerik Özeti ve Türkçeleştirme Noktaları

Bu dosya, mockCourtAudio.ts ile birebir eşleşen sahneleri ayrıntılı açıklamalarla sunar. Rol bazlı seslendirme ipuçları, zaman damgalı zaman çizelgesi ve teknik uygulama notları (metinden ses üretimi – TTS; fallback stratejisi; entegrasyon) içerir. “Trail Safety Negligence” senaryosu, vaka simülasyonu için ana örnek olarak verilmiştir.

Tablo 9, sahne başlıklarının Türkçe karşılıklarını ve sahne/kategori eşlemesini gösterir.

Tablo 9 – Sahne Başlıkları ve Türkçe Karşılıkları
| Sahne | Rol | Kategori | Türkçe Başlık |
|---|---|---|---|
| Judge Opening Statement | yargıç | opening | Hâkim Açılış Bildirimi |
| Prosecutor Opening | savcı | opening | Savcı Açıklaması |
| Defense Opening | savunma | opening | Savunma Açıklaması |
| Witness Testimony – Safety Expert | tanık | testimony | Tanık İfadesi – Güvenlik Uzmanı |
| Cross-Examination Exchange | savcı | cross-examination | Çapraz Sorgu Diyaloğu |
| Witness Contradiction Analysis | varsayılan | analysis | Tanık Çelişki Analizi |
| Expert Analysis – Timeline Review | varsayılan | analysis | Uzman Analizi – Zaman Çizelgesi İncelemesi |
| Jury Instruction | yargıç | instruction | Hâkim’in Jüriye Talimatı |
| Final Verdict | yargıç | verdict | Nihai Hüküm |
| Case Summary for AI Analysis | varsayılan | summary | AI Analizi için Vaka Özeti |

Zaman damgalı ifadeler için standart biçim önerisi:
- “Timeline reconstruction shows three critical moments: 9:15 AM safety check completion, 11:30 AM incident occurrence, and 2:45 PM emergency response.” → “Zaman çizelgesi yeniden yapımı üç kritik anı gösteriyor: 09.15’te güvenlik kontrolünün tamamlanması, 11.30’da olayın gerçekleşmesi ve 14.45’te acil müdahale.” 24 saat formatı ve yerelleştirme tercih edilmelidir.

### hk_judiciary_info.json – İçerik Özeti ve Türkçeleştirme Noktaları

HK Judiciary veri tabanı; “Judgments”, “Newly Added Judgments (son altı iş günü)”, “Reasons for Verdict” ve “Reasons for Sentence” kategorilerini sunar. Sitede yer almayan kararlar için ilgili mahkeme kalemine başvuru yolu gereklidir.[^3] Resmi telif/yeniden kullanım beyanları bu bağlamda yer almamıştır; erişim ve kullanımda HK Judiciary’nin resmî sayfalarındaki hükümlere uyum esastır.[^3][^4]

Tablo 10, HK Judiciary veri tabanı özellikleri ve Türkçe karşılıklarını özetler.

Tablo 10 – HK Judiciary Veri Tabanı Özellikleri
| Özellik | İngilizce | Önerilen Türkçe | Not |
|---|---|---|---|
| Judgment Categories | Judgments; Newly Added Judgments; Reasons for Verdict; Reasons for Sentence | Kararlar; Yeni Eklenen Kararlar (son 6 iş günü); Hüküm Gerekçeleri; Ceza Gerekçeleri | Kategori yapısı ve erişim penceresi. |
| Access Policy | Direct online access for available judgments; offline request to court registry | Sitede yer alan kararlar için doğrudan erişim; bulunmayanlar için kaleme yazılı başvuru | Başvuru gerekçelendirilmelidir. |
| Disclaimer | Not found in provided content | Bu bağlamda bulunamadı | Resmî beyanlar ayrıca kontrol edilmelidir.[^3] |

## Hukuki Terminoloji Sözlüğü ve Çeviri İlkeleri

Seçili anahtar terimler ve önerilen Türkçe karşılıklar aşağıdadır. Çevirilerde New Jersey Courts Glossary ve T.C. Dışişleri Bakanlığı’nın hukuk terminolojisi dokümanları esas alınmış, yerleşik kullanım gözetilmiştir.[^7][^8]

Tablo 11 – Seçili Hukuki Terimler (TR)
| İngilizce | Türkçe | Bağlam/Açıklama |
|---|---|---|
| negligence | ihmal | Hukuki sorumluluk doğuran ihmal. |
| duty of care | özen borcu | Özen ve sadakat yükümlülüğü. |
| proximate/justice test | yakınlık/adalet testi | Caparo üçlü testinin parçası. |
| breach of contract | sözleşme ihlali | Sözleşmesel yükümlülüğün ihlali. |
| damages | zarar/hasar (tazminat) | Maddi tazminat bağlamında “hasar” değil “tazminat”. |
| cross-examination | çapraz sorgu | Tanığın karşı tarafça sorgulanması. |
| reasonable doubt | makul şüphe | Ceza yargılamasında ispat standardı. |
| verdict | hüküm (nihai karar) | Yargısal sonuç bildirimi. |
| judgment | karar | Mahkeme kararı. |
| appeal | temyiz | Temyiz süreci. |
| jurisdiction | yargı yetkisi | Hukuk/ceza muhakemesi bağlamı. |
| cause of causation | nedensellik | Hukuki nedensellik bağı. |
| plaintiff | davacı | Medeni usul hukuku. |
| defendant | davalı | Medeni usul hukuku. |
| evidence | delil | İspat araçları. |
| court of first instance | birinci derece mahkemesi | İlk derece yargı mercii. |
| court of appeal | istinaf mahkemesi (Bölge İstinaf) | Temyiz inceleme mercii. |

İlkeler:
- Birebir karşılığı olmayan terimlerde (ör. “beyond reasonable doubt”) açıklayıcı dipnot veya parantez içi İngilizce terim ile anlamı koruyun.
- Mahkeme unvanlarında Türkiye’de yerleşik karşılıklar bulunmuyorsa orijinal adlandırma korunup parantez içi Türkçe açıklama eklenmelidir.

## Lokalizasyon Stratejisi ve Uygulama Planı

Türkçeleştirme kapsamı iki katmanda ilerlemelidir: (i) veri katmanı (JSON/TS dosyalarındaki metinler) ve (ii) UI/lokalizasyon katmanı (kullanıcıya gösterilen etiket ve mesajlar). Eğitim ve demo içerikler için açık beyan metinleri (“Bu içerik eğitim amaçlı simülasyondur; hukuki tavsiye teşkil etmez.”) ve anonimleştirme uyarıları eklenmelidir.

İş akışı önerisi:
1. Çeviri ve QA: Dosya bazlı çeviri listeleri ve sürüm kontrol; hukuk terminolojisi sözlüğü ile terim tutarlılığı denetimi.[^7][^8]
2. Terminoloji onayı: Hukuk danışması ile kritik terimlerin nihai onayı; HK mahkeme adlandırmalarında resmi kaynaklarla teyit.[^3][^4][^5][^6]
3. Yayın ve izleme: Hata günlüğü ve değişiklik kaydı (CHANGELOG); geri bildirim döngüsü.

Riskler ve önleyici tedbirler:
- Telif/yeniden kullanım: Resmî beyanların ve kullanım şartlarının doğrulanmaması risktir. BAILII, HKLII ve HK Judiciary’nin resmî sayfalarındaki telif ve kullanım hükümleri takip edilmelidir.[^1][^2][^3]
- Mahkeme hiyerarşisi çevirileri: HK’ye özgü mahkeme adlandırmalarında resmi Türkçe çevirinin yokluğu. Bu durumda orijinal adlar korunup parantez içi açıklama kullanılmalı; gerektiğinde “Mahkeme Hiyerarşisi” bölümündeki resmi kaynaklara dipnot verilmelidir.[^4][^5][^6]
- Vaka metinleri: Caparo ve Donoghue için orijinal metin bağlantılarının yokluğu. Bu nedenle dava unvanları ve ilkeleri sözlüklerle doğrulanmalı; metinlere atıf yapılmadan sadece tanım ve ilke düzeyinde bilgi verilmelidir.[^7][^8]

## Mahkeme Hiyerarşisi ve İsimlendirme (HK ve BK Bağlamı)

Hong Kong yargı sistemi, en üstte Court of Final Appeal, onun altında High Court (Court of Appeal ve Court of First Instance), ardından District Court ve Magistrates’ Courts biçiminde hiyerarşik yapıya sahiptir.[^5][^6] Bu yapı, uygulama içinde HK mahkemeleri ve görevlerinin doğru etiketlenmesi için temel oluşturur. Birleşik Krallık’ta tarihsel olarak House of Lords temyiz mercii iken güncel en yüksek mahkeme Supreme Court’tur; bu nedenle “House of Lords” ibareleri tarihsel bağlamda açıklanmalıdır.

Tablo 12, HK ve BK mahkemelerinin Türkçe adlandırma önerilerini ve açıklama notlarını içerir.

Tablo 12 – HK ve BK Mahkemeleri (Hiyerarşi ve Türkçe Karşılık)
| Yargı | Mahkeme | Türkçe Öneri | Açıklama |
|---|---|---|---|
| HK | Court of Final Appeal | Hong Kong Temyiz Mahkemesi | En yüksek temyiz mercii.[^4] |
| HK | High Court (Court of Appeal) | Yüksek Mahkeme (İstinaf) | Yüksek Mahkeme Daire İstinaf.[^5] |
| HK | High Court (Court of First Instance) | Yüksek Mahkeme (Birinci Derece) | Geniş asliye yetkili.[^5] |
| HK | District Court | Bölge Mahkemesi | İlk derece mahkemesi.[^4] |
| HK | Magistrates’ Courts | Hâkimler Mahkemesi (Sulh Ceza) | Sulh ceza işlevleri.[^4] |
| BK | House of Lords (historical) | Lordlar Kamarası (tarihsel) | Eski en yüksek temyiz mercii; güncel Supreme Court. |

## Sonuç, Önceliklendirme ve Yol Haritası

Öncelikli çeviri setleri:
- legalCases.ts: başlık, court, summary, keyFactors, outcome, caseType ve source alanları; HK/BK mahkeme adları ve hukuki terimler.
- mockCourtAudio.ts ve mock_court_audio_scripts.md: rol/kategori adları ve sahne metinleri; “Your Honor”, “beyond reasonable doubt”, “with prejudice” gibi kalıpların açıklayıcı Türkçe karşılıkları.
- bailii_info.json ve hk_judiciary_info.json: tanıtım ve özellik metinleri; kategori isimleri ve erişim beyanları.
- public_domain_legal_sources.md: başlık ve yönerge metinleri; güvenli kullanım ilkelerinin Türkçe versiyonları.

Hukuki terimler sözlüğü ve QA:
- Sözlük (Tablo 11) uygulama çapında standart olarak benimsenmeli; ilk geçişte parantez içi İngilizce terim ile not verilmeli.[^7][^8]
- Çeviri sonrası kontrol listesi: terim tutarlılığı, tarihsel bağlam açıklamaları (House of Lords), açıklayıcı notlar (beyond reasonable doubt; with prejudice), HK mahkeme adlandırmalarının resmi kaynaklarla uyumu.[^4][^5][^6]

Uygulama takvimi ve sorumluluklar:
- Hafta 1: Veri çevirisi (legalCases.ts, audio script’leri) ve sözlük standardizasyonu.
- Hafta 2: MD ve JSON meta veri çevirileri; HK Judiciary erişim politikası metinlerinin gözden geçirilmesi.
- Hafta 3: Hukuk danışmanlığı onayı, QA ve düzeltmeler; kullanım beyanlarının eklenmesi.
- Sürekli: Telif ve kullanım şartları izlemesi; kaynak değişikliklerine uyum.

Elde edilecek çıktılar:
- Her dosya için Türkçe içerik eşlemeleri ve sözlük temelli terim karşılıkları.
- Açık kullanım beyanı ve anonimleştirme notlarıyla güvenli demo veri seti.
- Hukuki ve teknik ekipler arasında paylaşılan, sürümlenen bir çeviri kılavuzu ve değişiklik kayıtları.

## Bilgi Boşlukları (Açıkça Tespit Edilen)
- BAILII telif ve kullanım politikalarının ayrıntılı metinleri bu bağlamda görüntülenmemiştir; genel “ücretsiz erişim” ve “bağış” vurgusu mevcuttur.[^1]
- Hong Kong Judiciary veri tabanında telif/yeniden kullanım beyanlarına ilişkin ayrıntılar bu çalışmada yer almamaktadır; yalnızca kategori tanımları ve erişim politikası özet bilgileri mevcuttur.[^3]
- HK mahkeme hiyerarşisi için resmi Türkçe çeviri/terminoloji doğrulaması bu bağlamda yoktur; İngilizce resmi kaynaklar kullanılmıştır.[^4][^5][^6]
- Caparo ve Donoghue davalarına ait orijinal metin bağlantıları bu veri setinde yer almamaktadır.

---

## References

[^1]: BAILII (British and Irish Legal Information Institute) – Resmi Site. https://www.bailii.org/
[^2]: Hong Kong Legal Information Institute (HKLII) – Resmi Site. https://www.hklii.hk/
[^3]: Hong Kong Judiciary – Judgments. https://www.judiciary.hk/en/judgments_legal_reference/judgments.html
[^4]: Hong Kong Judiciary – Introduction. https://www.judiciary.hk/en/about_us/guide.html
[^5]: Hong Kong Judiciary – High Court. https://www.judiciary.hk/en/court_services_facilities/hc.html
[^6]: Hong Kong Court of First Instance – Wikipedia. https://en.wikipedia.org/wiki/Hong_Kong_Court_of_First_Instance
[^7]: Glossary of Legal (and Related) Terms – English/Turkish – NJ Courts (PDF). https://www.njcourts.gov/sites/default/files/forms/11783_glossary_turkish.pdf
[^8]: T.C. Dışişleri Bakanlığı – Hukuk Terminolojisi (Türkçe-İngilizce) (PDF). https://www.mfa.gov.tr/data/Terminoloji/hukuk-terminoloji-110615.pdf
[^9]: CaseLaw Access Project – Harvard. https://case.law/
[^10]: Justia Free Case Law – ABD. https://law.justia.com/cases/
[^11]: Google Scholar – Hukuk Akademik Araştırmalar. https://scholar.google.com/schhp?hl=en&as_sdt=0,5&as_vis=1
[^12]: WorldLII – Global Legal Information Institute. http://www.worldlii.org/
[^13]: CAF Donate – BAILII Bağış Sayfası. https://cafdonate.cafonline.org/24984