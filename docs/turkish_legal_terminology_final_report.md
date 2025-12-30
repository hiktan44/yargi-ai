# Türk Hukuk Sistemi İngilizce-Amerikan Hukuk Terimleri Karşılıkları: Sivil Hukuk, Mahkemeler, Yargı Kolları ve Usul Terminolojisi

## Yönetici Özeti ve Amaç

Bu rapor, Türk hukuk ekosisteminde kullanılan temel kavram ve terimlerin İngilizce‑Amerikan (özellikle Anglo‑Sakson/Common Law) literatüründeki en yakın ve doğrulanabilir karşılıklarını sistematik biçimde eşleştirir. Kapsam, sivil hukuk (Medeni Hukuk, Borçlar Hukuku, Ticaret Hukuku, İş Hukuku ve Aile Hukuku), Türk kanun sistemi ve usul (Medeni Usul Hukuku, Ceza Usul Hukuku, İdari Yargılama Usulü), yargı kolları ve mahkeme türleri ile mahkeme kararlarına ilişkin terminolojiyi içerir. Çalışmanın temel amacı, çeviri ve terminoloji profesyonelleri, hukuk akademisyenleri, avukatlar, yargı personeli ve dışişleri/uluslararası ilişkiler uzmanları için güvenilir, tutarlı ve kullanıma hazır bir terim eşlemesi ve metodolojik çerçeve sunmaktır.

Bu bağlamda, “sivil hukuk” terimi Türkçe literatürde “medeni hukuk” anlamında kullanılmakta olup Anglo‑Sakson dünyasındaki “civil law” ifadesiyle birebir örtüşmez; zira “civil law” orada çoğu kei̇m “özel hukuk” anlamında kullanılır ve “private law” ile yakın bağ kurar. Bu semantik ayrım, raporun tamamında terminolojik eşlemenin nasıl yapılandırılacağını belirleyen kritik bir çerçevedir.[^13] Türkiye’nin yargı örgütü ve mahkeme türlerine ilişkin yapısal bilgi, yargı kolları ve kanun yolları üzerinden genel hatlarıyla yine bu raporda konsolide edilmiştir.[^1]

Metodolojik olarak çalışma, resmi sözlükler ve kanun metinleri (ör. 6102 sayılı Türk Ticaret Kanunu; 4721 sayılı Türk Medeni Kanunu), yükseköğretim materyalleri ve güvenilir hukuk bloglarından yararlanır; terimler kısa tanım, bağlam ve örnek kullanım cümlesi ile yapılandırılmış bir JSON şemasına bağlanmıştır.[^4][^5][^10][^11][^19] Eşleme, kaynak uyuşmazlıkları ve normatif-hukuki belirsizliklerde resmi mevzuat ve Adalet Bakanlığı/T.C. Dışişleri Bakanlığı kaynaklarını önceliklendiren bir doğrulama sırasına tabi tutulmuştur.

Raporun çıktısı, terimlerin makinece okunabilir ve insanca düzenlenebilir biçimde sunulması amacıyla tasarlanmış bir JSON dosyasıdır. Her terim girdisi için aşağıdaki alanlar önerilmektedir: kategori, Türkçe terim, İngilizce karşılık, kısa tanım, bağlam, örnek kullanım, kaynak(lar) ve gerektiğinde notlar (örn. alternatif karşılıklar, bağlamsal kısıtlar).

Bu yaklaşım sayesinde, örneğin Asliye Hukuk Mahkemesi – Civil Court of First Instance; Danıştay – Council of State; ihtiyati tedbir – interim injunction; temyiz – appeal; istinaf – appellate review gibi kritik eşlemeler tutarlı ve denetlenebilir biçimde kayıt altına alınmıştır.[^1][^3][^4][^19]

Bilgi boşlukları ve güncelleme ihtiyaçları da açık biçimde belirtilmiştir: iş hukuku terimlerinin resmi İngilizce karşılıklarında tam uyum, TTK m. 124’teki şirket türlerinin kapsamlı karşılaştırmalı özellik tablolarının bazı kaynaklarda kısmi kalması ve kanun yolları/iddia/istida/iddianame gibi terimlerde yer yer eş anlamlı ve bağlamsal kaymalar, çözüm bekleyen alanlardır. Bu hususlar, ilerleyen sürümlerde resmi sözlükler ve mevzuat güncellemeleriyle giderilmek üzere yol haritasına işlenmiştir.

## Hukuk Sistemleri Karşılaştırması: Türk (Civil Law) ve Anglo‑Amerikan (Common Law)

Türk hukuk sistemi, kodifikasyona dayalı kıta Avrupası geleneğinin (civil law) bir parçasıdır; yasalar, sistemin temel kaynağıdır ve hâkim, olguyu bu yazılı kurallar çerçevesinde değerlendirir. Anglo‑Sakson sistemde (common law) ise yargı içtihatları (precedent) norm üretiminin ve uygulamanın merkezî unsurlarıdır; stare decisis ilkesi gereği alt mahkemeler üst mahkemelerin içtihatlarıyla bağlıdır.[^13] Dolayısıyla, “civil law” ve “private law” kavramları, iki sistem arasında semantik olarak örtüşmez ve bu farklılık, çeviride sistematik kaymalara yol açabilir.

Bu ontolojik ayrım, usul alanında daha görünür hâle gelir: Türk medeni usul hukuku, tasarruf ilkesi ve hâkimin aktif konumu ile karakterize edilir; Anglo‑Sakson yargılamada çekişmeli usul (adversarial system) ve tanık/çapraz sorgu (cross‑examination) merkezî rol oynar.[^8][^12] Habeas corpus gibi Common Law’a özgü kurumların Türk sisteminde doğrudan muadili bulunmaz; bu tür kavramlar, Türk ceza usul sistemindeki koruma mekanizmaları ve bireysel başvuru yollarıyla işlevsel olarak kıyaslanabilir.[^7][^3]

Tablo 1, iki sistemin temel farklarını konsolide eder.

Tablo 1. Civil Law vs Common Law temel özellik karşılaştırması

| Kriter | Türk Hukuku (Civil Law) | Anglo‑Amerikan Hukuku (Common Law) |
|---|---|---|
| Temel kaynak | Kodifikasyon (kanunlar) | İçtihat (case law/precedent) |
| Normatif etki | Yasalar önceliklidir | Precedent bağlayıcıdır (stare decisis) |
| Yargı usulü | Hâkim aktif konumda; tasarruf ilkesi | Çekişmeli usul; taraflar inisiyatifte |
| Delil rejimi | Yasal sınırlar ve hâkim takdiri | Tanık ve çapraz sorgu merkezî delildir |
| Türetilmiş kavramlar | Kanun boşluğu ve tamamlayıcı normlar | Judge‑made law ve yargısal yaratım |
| Örnek kurumlar | İdari yargı; Danıştay denetimi | Habeas corpus; equity mahkemeleri |

Bu farkların pratik sonucu, aynı işlevi gören kurumların farklı adlandırmalarla ve farklı normatif zeminlerde tezahür etmesidir. Örneğin “inclosure” (İng. BKZ) Türk tarafında “esen hale getirme” gibi restoratif veya telafi edici kurumlarla ilişkilendirilebilir, ancak hiçbiri tam birebir örtüşmez; dolayısıyla eşleme yapılırken bağlamsal açıklamalara ihtiyaç vardır.

## Yargı Kolları ve Mahkeme Türleri (Türkiye)

Türkiye’de yargı teşkilatı çok kutupludur: adli yargı, idari yargı, anayasa yargısı, uyuşmazlık yargısı ve seçim yargısı başlıca kollardır.[^1][^2] Adli yargı, medeni ve ceza davalarını görür; idari yargı, idare işlem ve eylemlerinden doğan uyuşmazlıkları çözer; anayasa yargısı kanunların Anayasaya uygunluğunu denetler; uyuşmazlık yargısı, adli ve idari yargı mercileri arasındaki görev ve hüküm uyuşmazlıklarını kesin olarak çözer; seçim yargısı, Yüksek Seçim Kurulu (YSK) öncülüğünde seçim süreçlerine ilişkin denetimi yürütür.[^2][^24]

Tablo 2, yargı kollarını ve bağlı yüksek mahkemeleri/örgütlenmeyi özetler.

Tablo 2. Yargı kolları, görev alanları ve bağlı yüksek mahkemeler

| Yargı Kolu | Görev Alanı | Bağlı Yüksek Mahkeme/Organ | İkinci Derece Mahkemeler/Örgüt |
|---|---|---|---|
| Adli Yargı | Ceza ve özel hukuk uyuşmazlıkları | Yargıtay | Bölge Adliye Mahkemeleri (istinaf)[^1] |
| İdari Yargı | İdari işlem/eylem uyuşmazlıkları | Danıştay | Bölge İdare Mahkemeleri (istinaf)[^1] |
| Anayasa Yargısı | Norm denetimi ve bireysel başvuru | Anayasa Mahkemesi | — |
| Uyuşmazlık Yargısı | Görev/hüküm uyuşmazlıkları | Uyuşmazlık Mahkemesi | — |
| Seçim Yargısı | Seçim yönetimi ve itiraz | YSK (yargı organı değil; yargısal faaliyet yürütür) | İl/ilçe seçim kurulları[^2][^24] |

Mahkeme türleri, adli ve idari yargıda ilk derece, istinaf ve temyiz kademeleriyle örgütlenir. Adli yargıda Sulh Hukuk ve Asliye Hukuk mahkemeleri ile Asliye Ceza, Ağır Ceza mahkemeleri; idari yargıda İdare ve Vergi mahkemeleri bulunur. İstinaf, Bölge Adliye (adli) ve Bölge İdare (idari) mahkemeleri eliyle yürütülür; temyiz mercii ise Yargıtay (adli) ve Danıştay (idari) olup, anayasa yargısında Anayasa Mahkemesi’dir.[^1][^19][^20]

Tablo 3. Mahkeme türleri ve İngilizce karşılıkları (Türkiye)

| Türkçe Terim | İngilizce Karşılık |
|---|---|
| Asliye Hukuk Mahkemesi | Civil Court of First Instance |
| Sulh Hukuk Mahkemesi | Peace Court / Magistrate Court (civil) |
| Asliye Ceza Mahkemesi | Criminal Court of First Instance |
| Ağır Ceza Mahkemesi | Assize Court |
| Çocuk Mahkemesi | Juvenile Court |
| İdare Mahkemesi | Administrative Court |
| Vergi Mahkemesi | Tax Court |
| Bölge Adliye Mahkemesi | Regional Court of Justice (appellate) |
| Bölge İdare Mahkemesi | Regional Administrative Court (appellate) |
| Yargıtay | Supreme Court of Appeals |
| Danıştay | Council of State |
| Anayasa Mahkemesi | Constitutional Court |
| Uyuşmazlık Mahkemesi | Court of Jurisdictional Disputes |

Not: YSK’nin yargısal faaliyet yürüttüğü ancak “yüksek mahkeme” olmadığına ilişkin değerlendirmeler, Anayasa Mahkemesi içtihatları ve doktrin çerçevesinde yapılmaktadır; bu nedenle tablo “organ” sıfatını kullanır.[^2][^24]

## Sivil Hukuk (Özel Hukuk) Kavramları ve Terim Eşlemesi

Sivil hukuk, kişiler, eşya, borçlar, ticaret, aile ve miras alanlarını kapsayan geniş bir alanı tanımlar. Aşağıdaki alt bölümler, her alanın temel terimlerini İngilizce karşılıklarıyla birlikte kısa tanım, bağlam ve örnek kullanım ile sunar. İngilizce karşılıkların resmi veya standart kullanıma yakınlığı, öncelikle T.C. Dışişleri Bakanlığı Tercüme Dairesi (MFA) ve Adalet Bakanlığı Hukuk Sözlüğü kaynakları üzerinden doğrulanmıştır.[^3][^18]

### Medeni Hukuk – Temel Kavramlar

Medeni Hukuk (Türk Medeni Kanunu, TMK) kişiler ve eşya ekseninde mutlak ve nispi hakları, ehliyet ve fiil ehliyeti gibi kurucu kavramları düzenler.[^5][^17]

Tablo 4. Medeni Hukuk terimleri: Türkçe–İngilizce eşleme, tanım ve örnek

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Hak ehliyeti | Capacity to have rights | Haklara sahip olabilme ehliyeti | TMK kişiler | “Her gerçek kişi doğumla hak ehliyetine sahiptir.”[^5] |
| Fiil ehliyeti | Capacity to act | Hukuki işlem yapabilme ehliyeti | TMK kişiler | “Ayırt etme gücüne sahip olmayanların fiil ehliyeti sınırlıdır.”[^5] |
| İkametgah | Domicile | Kişinin hukuki ilişkileri açısından temel yerleşim yeri | TMK kişiler | “Davanın açılacağı mahkeme, davalının ikametgahına göre belirlenir.”[^3][^5] |
| Ehliyet | Capacity/Qualification | Bir işlemi yapabilme yeterliliği | Genel | “İşlem ehliyeti, sözleşmenin kurucu unsurlarındandır.”[^3][^6] |
| Mülkiyet | Ownership | Eşya üzerinde en geniş hâkimiyet hakkı | TMK eşya | “Tapu siciline kayıtlı taşınmazda mülkiyet devri resmi senetle olur.”[^5] |
| Zilyetlik | Possession | Eşya üzerinde fiili hakimiyet | TMK eşya | “Zilyetlik, eşya üzerinde fiili hâkimiyetin sürekliliğidir.”[^5] |
| Ayni hak | Real right | Eşyaya doğrudan ve mutlak olarak tanınan hak | TMK eşya | “Mülkiyet, ayni hakların başlıcasıdır.”[^5][^17] |
| Fer’i hak | Accessory right | Asıl hakka bağlı olarak var olan hak | TMK eşya/borç | “İpotek, borç için fer’i güvencedir.”[^3][^5] |
| Edinim | Acquisition | Hakkın kazanılması | TMK eşya | “Miras yoluyla edinim, kanuni sebeplerledir.”[^3][^5] |
| Eklenti | Accessory | Asıl şeye bağlı olan ve onunla birlikte kullanılan şey | TMK eşya | “Anahtar, kasanın eklentisidir.”[^3] |
| Esaslı hata | Fundamental error | Sözleşme özgürlüğünü sarsan ve iradeyi sakatlayan hata | Sözleşmeler | “Esaslı hata, sözleşmenin iptalini gerektirir.”[^3][^5] |
| Elde rehin | Pledge (as security) | Alacak güvencesi için rehin hakkı | TMK/borç | “Alacaklı, borçluya karşı elde rehin hakkına sahiptir.”[^3] |

Bu kavramlar arasındaki bağ, özellikle “ayni hak–fer’i hak” ve “ehliyet–fiil ehliyeti” ilişkileri, sözleşmesel risklerin paylaştırılmasında ve delil/rehin rejiminde belirleyicidir. Örneğin “fer’i haklar” bağlamında rehin/ipotek, alacak güvencesini teminat altına alırken, “ikametgah” ve “ehliyet” unsurları görev ve yetki hesaplamalarında doğrudan etkili olur.[^3][^5]

### Borçlar Hukuku

Borçlar ilişkisi, sözleşmeden doğan yükümlülükler ile haksız fiillerin yarattığı sorumluluk ekseninde şekillenir.

Tablo 5. Borçlar Hukuku terimleri: sözleşme ve sorumluluk

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Sözleşme (akit) | Contract | Tarafların karşılıklı iradelerini uyumlayan borç doğuran işlem | BK/TMK | “Sözleşme, ehil tarafların anlaşmasıyla kurulur.”[^3] |
| Alacaklı | Creditor | Borç ilişkisinde alacağı olan taraf | Borçlar | “Alacaklı, borçludan ifayı talep edebilir.”[^3] |
| Borçlu | Debtor | Borç ilişkisinde borcu olan taraf | Borçlar | “Borçlu, edimini süresinde yerine getirmelidir.”[^3] |
| Borç | Obligation | Edim yerine getirme yükümlülüğü | Borçlar | “Para borcu, Türk Lirası üzerinden ifa edilir.”[^3] |
| Ceza koşulu | Penalty clause | Sözleşmeye aykırılığa karşı önceden kararlaştırılan bedel | Sözleşmeler | “Ceza koşulu, tarafların müeyyidesidir.”[^3] |
| Dürüstlük kuralı | Good faith | Hukuki işlem ve borç ilişkilerinde dürüstlük ölçütü | BK/TMK | “Dürüstlük kuralı, sözleşme yorumunu yönlendirir.”[^3] |
| Haksız fiil | Tort | Kusura dayalı sorumluluk doğuran fiil | Borçlar | “Haksız fiil, tazminat sorumluluğu doğurur.”[^3] |
| İfa | Performance | Edimin yerine getirilmesi | Borçlar | “İfa, borç ilişkisini sona erdirir.”[^3] |
| İmkansızlık | Impossibility | Edimin objektif veya sübjektif olarak yerine getirilememesi | Borçlar | “Objektif imkansızlık, borçlunun sorumluluğunu kaldırabilir.”[^3] |
| Eski hale getirme | Restitution in kind | İhlalin giderilmesine yönelik aynen iade/tazmin | İhlal/özel | “Eski hale getirme, ihlalin refatini hedefler.”[^3] |

Not: Anglo‑Sakson sisteminde “restitution in kind” (bkz. glossary) Türk özel hukukunda “eski hale getirme” veya “taşınırsa aynen iade” bağlamıyla yakınsar; ancak tam birebir örtüşme yoktur. Çeviride işlevsel eşleme yapılmalıdır.

### Ticaret Hukuku ve Şirket Türleri (TTK)

Türk Ticaret Kanunu (TTK), şirket türleri ve ticari işletmeleri düzenler. “Şirket türleri” başlığı altında TTK m. 124 uyarınca anonim (A.Ş.), limited (Ltd.), kollektif ve komandit şirketler ile “sermayesi paylara bölünmüş komandit şirket” yer alır.[^4] Aşağıdaki tablo, temel özellikler ve İngilizce karşılıkları özetler.

Tablo 6. TTK kapsamında şirket türleri ve temel özellikler

| Şirket Türü | İngilizce Karşılık | Sorumluluk | Ortak Sayısı | Asgari Sermaye | Organlar | Halka Açılma |
|---|---|---|---|---|---|---|
| Anonim Şirket (A.Ş.) | Joint Stock Company (JSC) / Corporation | Sınırlı (paylar ile) | ≥1 (gerçek/tüzel) | 250.000 TL (kayıtlı sermayede farklılaşabilir) | Genel Kurul, Yönetim Kurulu | Mümkün[^4][^10] |
| Limited Şirket (Ltd.) | Limited Liability Company (LLC) | Sınırlı (sermaye payı) | 1–50 | 50.000 TL | Ortaklar Kurulu, Müdür(ler) | Halka açılamaz[^4][^10] |
| Kollektif Şirket | General Partnership | Sınırsız ve müteselsil | Gerçek kişiler | Yok | Sözleşmeye göre; her ortağın yönetim hakkı | Hayır[^4][^10] |
| Komandit Şirket | Limited Partnership | Komandite: sınırsız; Komanditer: sınırlı | ≥2 (bir komandite, bir komanditer) | Yok | Sözleşmeye göre | Hayır[^4][^10] |
| Sermayesi Paylara Bölünmüş Komandit Şirket | Partnership Limited by Shares | Komandite: sınırsız; Komanditer: sınırlı | ≥5 (en az bir komandite) | Belirtilmemiş | A.Ş.’ye benzer | Sınırlı/özellikli[^4] |

Güncel mevzuat ve uygulama dokümanlarına göre asgari sermaye ve organ yapıları güncellenebilir; çeviri ve uygulama sırasında resmi kaynaklar esas alınmalıdır.[^4][^10][^11] Özellikle “sermayesi paylara bölünmüş komandit şirket” türünde bazı resmi özetlerde ayrıntı sınırlı olduğundan, TTK’nın güncel metni ve resmi rehberlerle teyit önerilir.[^4][^10][^11]

### İş Hukuku

İş hukuku, işçi–işveren ilişkilerini bağımlılık ve iş görme–ücret ödeme borcu ekseninde düzenler.[^15]

Tablo 7. İş Hukuku temel terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| İşçi | Employee | İşverene bağımlı olarak iş gören kişi | İş Kanunu | “İşçi, işverenin talimatlarına uygun çalışır.”[^15] |
| İşveren | Employer | İşçi çalıştıran ve ücret ödeme borcu olan taraf | İş Kanunu | “İşveren, iş sağlığı ve güvenliği yükümlülüklerine uymalıdır.”[^15] |
| İş ilişkisi | Employment relationship | İş görme–ücret borcu eksenindeki bağımlı ilişki | İş Hukuku | “İş ilişkisi, hizmet sözleşmesine dayanır.”[^15] |
| Alt işveren (müteahhit) | Subcontractor | Asıl işverenden iş alan ve kendi işçilerini çalıştıran işveren | İş/TTK | “Alt işveren ilişkilerinde müteselsil sorumluluk gündeme gelebilir.”[^15][^14] |
| Hizmet sözleşmesi | Service contract / Employment contract | İş görme ve ücret borcunu düzenleyen sözleşme | Borçlar/İş | “Hizmet sözleşmesi yazılı olmalıdır.” (pratik) |

Not: İş hukuku terminolojisinde bazı terimlerin resmi İngilizce karşılıklarının kaynaklar arasında tam uyumu bulunmayabilir; TTK ve iş kanunu uygulamalarına ilişkin resmi çeviri kılavuzları takip edilmelidir.[^3][^14][^15]

### Aile Hukuku

Türk Medeni Kanunu, evlenme, evlat edinme, hısımlık ve soybağına ilişkin kuralları içerir.[^5]

Tablo 8. Aile Hukuku terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Evlenme | Marriage | Kadın ve erkek arasında kurulan yasal birliktelik | TMK | “Evlenme, medeni nikâh ile kurulur.”[^5] |
| Evlat edinme | Adoption | Bir kişinin başkasının çocuğunu kendi çocuğu sayması | TMK | “Evlat edinme, mahkeme kararıyla hüküm doğurur.”[^5] |
| Hısımlık | Kinship | Kan veya kayın yoluyla kurulan yakınlık | TMK | “Hısımlık, miras ve nafaka haklarını etkiler.”[^5] |
| Soybağı | Lineage | Ana–baba–çocuk arasındaki bağ | TMK | “Soybağı, evlilik veya tanıma ile kurulur.”[^5] |

### Miras Hukuku

Miras, tereke üzerinde kanuni veya vasiyetname yoluyla hak devrini konu alır.[^5]

Tablo 9. Miras Hukuku terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Miras | Inheritance | Ölenin malvarlığı haklarının intikali | TMK | “Miras, yasal ve atanmış mirasçılara geçer.”[^5] |
| Tereke | Estate | Mirasbırakanın malvarlığından oluşan bütün | TMK | “Tereke, mirasçılar arasında paylaştırılır.”[^5] |
| Vasiyetname | Will | Mirasbırakanın son arzusunu belirten belge | TMK | “Vasiyetname, miras düzenini değiştirebilir.”[^5] |

## Usul Hukuku: Medeni, Ceza ve İdari Yargılama Terimleri

Usul hukuku, hak arama ve koruma süreçlerinin kurallarını düzenler; Türkiye’de farklı yargı kollarında farklı kodifikasyonlar ve ilkeler uygulanır. Medeni usul hukuku tasarruf ilkesi, hâkimin aktif konumu ve delil serbestisi prensipleriyle tanınır; ceza usulü “adil yargılanma” ilkesini merkeze alır; idari yargılama, idare hukuku ilkeleri ve iptal/tazmin fonksiyonlarına bağlı olarak işler.[^8][^12][^9][^20]

### Medeni Usul Hukuku Terimleri

Medeni usul, dava açılmasından hüküm ve kanun yollarına kadar sürecin adımlarını düzenler.

Tablo 10. Medeni Usul terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Dava | Action / Lawsuit | Mahkemeden hakkın korunmasını isteme talebi | HMK | “Dava, görevli ve yetkili mahkemede açılır.”[^8] |
| Davacı | Claimant / Plaintiff | Dava açan taraf | HMK | “Davacı, iddialarını delillerle desteklemelidir.”[^8] |
| Davalı | Defendant | Dava açılan taraf | HMK | “Davalı, cevap dilekçesinde savunmasını ileri sürer.”[^8] |
| Delil | Evidence | Vakıaların ispatına yarayan araçlar | HMK | “Delil, mahkemece değerlendirilir.”[^8] |
| Duruşma | Hearing | Tarafların dinlenmesi ve argümanların sunulduğu oturum | HMK | “Duruşma tutanağı, yargılamanın akışını kayda geçirir.”[^3][^8] |
| İstinaf | Appellate review | İlk derece hükümlerine karşı ikinci derece denetimi | HMK/Bölge Adliye | “İstinaf, hukuki ve fiili denetimi kapsar.”[^1][^8] |
| Temyiz | Appeal (to Supreme Court) | Bölge mahkemesi veya ilk derece hükmünün son mercie götürülmesi | HMK/Yargıtay | “Temyiz, hukuki denetim mercii nezdinde yapılır.”[^1][^8] |
| İddia | Claim / Allegation | Tarafın hakkında hüküm istenen vakıa ve talebi | HMK | “İddia, cevap ve ikrar/inkar ile karşılaşır.”[^8] |
| Cevap | Defence / Reply | Davalının davaya verdiği yanıt | HMK | “Cevap dilekçesinde defi ve itirazlar ileri sürülür.”[^3][^8] |
| Hükmün tefhimi | Delivery of judgment | Hükmün açıklanması | HMK | “Tefhim, yargılamanın son aşamasıdır.”[^3][^8] |
| İcra | Enforcement | Hükmün veya alacağın zorla icrası | İcra | “İcra, icra müdürlüğünce yürütülür.”[^3] |
| İcra memuru | Enforcement officer | İcra işlemlerini yürüten görevli | İcra | “İcra memuru, haciz ve satış işlemlerini yapar.”[^3] |
| İhtiyati tedbir | Interim injunction | Dava süresince geçici koruma tedbiri | HMK | “İhtiyati tedbir, telafisi güç zararları önlemeye yöneliktir.”[^3][^8] |

Not: “İstida” (petition/dilekçe) ve “iddianame” (indictment) terimleri çeviride bağlamsal ayrıma ihtiyaç duyar; ceza usulünde “iddianame” (prosecutor’s indictment) hukuk davalarında “istida” (petition) karşılığına denk düşer.[^3][^7][^8]

### Ceza Usul Hukuku Terimleri

Ceza yargılaması, adil yargılanma ilkesi (fair trial), savunma hakkı, çapraz sorgu ve delil rejiminin sınırları ekseninde şekillenir.[^7][^12]

Tablo 11. Ceza Usul terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Adil yargılanma | Fair trial | Yargılamanın tarafsız, bağımsız ve hakkaniyete uygun yürütülmesi | CMK/ECHR | “Adil yargılanma, savunma haklarının etkin kullanımını gerektirir.”[^7][^12] |
| İddianame | Indictment | Savcının sanık hakkında düzenlediği ve mahkemeye sunduğu belge | CMK | “İddianamenin kabulü, davanın açılmasını sağlar.”[^3][^7] |
| Çapraz sorgu | Cross‑examination | Tarafların tanıkları sorguya çekmesi | CMK/Anglo‑Sakson | “Çapraz sorgu, tanık beyanlarının güvenilirliğini test eder.”[^7] |
| Kovuşturma | Prosecution | Soruşturmanın sonuçlanması ve dava açılması süreci | CMK | “Kovuşturma, iddianamenin kabulüyle başlar.”[^7] |
| Soruşturma | Investigation | Suç şüphesi üzerine delil toplanması ve şüphelinin tespiti | CMK | “Soruşturma, savcılık yönergesinde yürütülür.”[^7] |
| Gözaltı | Custody | Şüphelinin özgürlüğünün sınırlanması | CMK | “Gözaltı süresi, kanunla sınırlandırılmıştır.”[^3][^7] |
| Tutuklama | Detention / Pre‑trial detention | Sanığın yargılama süresince özgürlüğünün kısıtlanması | CMK | “Tutuklama, kaçma ve delil karartma riskine dayanır.”[^7] |
| Beraat | Acquittal | Sanığın suçsuz bulunması | CMK | “Beraat, yeterli delil bulunmadığında verilir.”[^3][^7] |
| Hüküm | Sentence / Judgment | Mahkemenin verdiği karar | CMK | “Hüküm, tefhim ile yürürlüğe girer.”[^3][^7] |

“Habeas corpus” ve “arraignment” gibi Anglo‑Sakson kurumlar, Türk ceza usulünde doğrudan birebir karşılıktan yoksundur; işlevsel eşleme yapılırken Türk sistemindeki gözaltı/tutuklama ve duruşma aşamalarının güvenceleri ile kıyas yapılmalıdır.[^7]

### İdari Yargılama Usulü Terimleri

İdari yargı, idari işlem ve eylemlerin hukuka uygunluğunu denetleyerek iptal ve tazmin fonksiyonlarını yerine getirir.[^20]

Tablo 12. İdari yargılama terimleri

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| İdari işlem | Administrative act | İdarenin tek taraflı irade beyanıyla tesis ettiği hukuki işlem | İYUK/İdare | “İdari işlem, yetki, şekil, konu ve sebep unsurlarına tabidir.”[^20] |
| Danıştay | Council of State | İdari yargının yüksek mahkemesi | İYUK | “İdari yargıda temyiz mercii Danıştay’dır.”[^1][^20] |
| Bölge İdare Mahkemesi | Regional Administrative Court (appellate) | İdare ve vergi mahkemeleri kararlarına karşı istinaf incelemesi yapan mahkeme | İYUK | “İdari yargıda istinaf, Bölge İdare Mahkemelerinde görülür.”[^1][^20] |
| İptal | Annulment | Hukuka aykırı idari işlemin iptali | İYUK | “İptal davası, yetki unsuru yönünden açılabilir.”[^20] |
| Tazmin | Compensation | İdare işlem/eyleminden doğan zararın karşılanması | İYUK | “Tazmin davası, iptal ile birlikte veya ayrı açılır.”[^20] |

## Mahkeme Kararları ve İşlemleri: Terminoloji ve İngilizce Karşılıklar

Mahkeme kararları ve yargısal işlemler, pratikte sık kullanılan terminoloji ile günlük dil ve çeviriye geçer. Bu kısım, gerekçeli hüküm, ara karar, tefhim ve yürütmenin durdurulması gibi terimleri İngilizce karşılıklarıyla bir arada sunar.

Tablo 13. Mahkeme işlem ve karar terminolojisi

| Türkçe Terim | İngilizce Karşılık | Kısa Tanım | Bağlam | Örnek Kullanım |
|---|---|---|---|---|
| Gerekçeli hüküm | Reasoned judgment | Hüküm gerekçesinin yazılı olarak açıklanması | HMK/CMK | “Gerekçeli hüküm, temyiz denetiminde esastır.”[^3][^8] |
| Ara karar | Interlocutory decision / Interim order | Yargılama sırasında verilen geçici veya ara düzenleyici karar | HMK | “Ara karar, yargılamanın seyrini düzenler.”[^3][^8] |
| Hükmün tefhim edilmesi | Delivery of judgment | Hükmün açıklanması | HMK/CMK | “Tefhim, usul ve esasa ilişkin sonuçları içerir.”[^3][^7] |
| Yürütmenin durdurulması | Stay of execution | Hükmün veya işlemin icrasının geçici olarak durdurulması | İdari yargılama | “Yürütmenin durdurulması, telafisi güç zararları önlemeye yöneliktir.”[^3][^20] |
| Kısa sürede karara bağlama | Speedy trial / Prompt adjudication | Yargılamanın makul sürede sonuçlandırılması | CMK/ECHR | “Kısa sürede karara bağlama, adil yargılanmanın parçasıdır.”[^7][^12] |
| Bireysel başvuru | Individual application | Anayasa Mahkemesi’ne bireysel hak ihlali iddiasıyla başvuru | Anayasa yargısı | “Bireysel başvuru, olağan kanun yolları tüketildikten sonra yapılır.”[^3] |
| Hakem | Arbitrator | Uyuşmazlığı hakem sıfatıyla çözen kişi | Tahkim | “Hakem kararı, tarafların anlaşmasına dayanır.”[^3] |
| Tahkim | Arbitration | Uyuşmazlığın hakemde çözümü | Tahkim | “Tahkim, ticari uyuşmazlıklarda tercih edilir.”[^3] |

## Çeviri ve Terminoloji Eşlemesi İçin Metodoloji ve JSON Şeması

Terminolojik eşlemenin güvenilirliği, kaynak hiyerarşisi ve doğrulama adımlarına bağlıdır. Bu rapor, aşağıdaki kaynak önceliğini benimser:

- Resmi mevzuat ve sözlükler: Kanun metinleri (TTK, TMK), T.C. Dışişleri Bakanlığı Tercüme Dairesi Terminolojisi, Adalet Bakanlığı Hukuk Sözlüğü.[^3][^4][^5][^18]
- Yükseköğretim ve akademik ders notları/kitapları: Medeni Usul, Ceza Usul, İdari Yargılama ve genel hukuk sistemleri üzerine kapsamlı ders malzemeleri.[^8][^9][^12][^13][^20]
- Güvenilir hukuk blogları ve rehberleri: Uygulama merkezli yargı örgütü ve şirket türleri açıklamaları.[^2][^10][^11][^14][^15][^19]

Eşleme adımları, semantik denklik (bir kavramın iki dilde aynı hukuki işlevi görmesi), bağlamsal uyum (usul–maddi hukuk ayrımı), kaynak doğrulaması (resmi sözlükler ve mevzuat önceliği), kullanım sıklığı ve pratik örneklerle zenginleştirme üzerinden ilerler. Anglo‑Sakson kurumlar için birebir karşılık yoksa (ör. habeas corpus), işlevsel yaklaşım benimsenir ve not alanı kullanılır.

Önerilen JSON şeması:

- kategori: Özel Hukuk/Usul Hukuku/Anayasa/İdari vb.
- turkce_terim: Terimin Türkçe adı
- ingilizce_karsilik: Resmi/yerleşik İngilizce karşılık
- kisa_tanim: Terimin kısa ve öz tanımı
- baglam: İlgili kanun veya alan
- ornek_kullanim: Pratik veya yargısal cümle
- kaynaklar: Referans numaraları
- notlar: Alternatifler, bağlamsal uyarılar, Anglo‑Sakson karşılık farklılıkları

Tablo 14, JSON alanları ve açıklamalarını örnekler.

Tablo 14. JSON alanları ve açıklamaları

| Alan Adı | Açıklama | Örnek Değer |
|---|---|---|
| kategori | Terimin hukuk dalı | “Özel Hukuk – Ticaret Hukuku” |
| turkce_terim | Türkçe terim | “Anonim Şirket” |
| ingilizce_karsilik | İngilizce karşılık | “Joint Stock Company (JSC)” |
| kisa_tanim | Kısa ve öz tanım | “Sermayesi paylara bölünmüş, ortakları sınırlı sorumlu şirket.” |
| baglam | Kanun/alanda kullanım | “TTK m. 124; A.Ş. organları: Genel Kurul, Yönetim Kurulu” |
| ornek_kullanim | Pratik cümle | “A.Ş., kayıtlı sermaye sistemiyle halka açılabilir.” |
| kaynaklar | Referans numaraları | “[4,10,11]” |
| notlar | Ek açıklamalar | “PLC kullanımı bağlama göre değişir.” |

Bu şema, terimlerin çok kaynaklı doğrulamasını destekler ve çeviri–uygulama döngüsünde terminolojik istikrar sağlar.

## Bilgi Boşlukları ve Güncelleme İhtiyaçları

- Resmi İngilizce karşılıkların eksikliği: İş hukukunda (ör. “alt işveren”, “işveren vekili”, “işyeri devri”) ve bazı usul terimlerinde (“istida”, “iddianame”) resmi ve tekil karşılıklar kaynaklar arasında farklılık gösterebilir. Bu alanlarda Adalet Bakanlığı Hukuk Sözlüğü ve ilgili kanunların güncel çeviri kılavuzları takip edilmelidir.[^3][^18]
- TTK şirket türleri: Özellikle “sermayesi paylara bölünmüş komandit şirket” ve ayrıntılı özellik matrisleri için (sorumluluk, organ yapısı, asgari sermaye) resmi TTK metni ve güncel rehberlerin konsolidasyonu önerilir.[^4][^10][^11]
- Kanun yolları: Temyiz ve istinafın Türkçe tanımları ile İngilizce karşılıklarında kaynaklar arası uyumsuzluklar görülebilir. HMK ve yüksek mahkeme rehberleri temel alınarak ortak kullanımın teyidi gerekir.[^8][^19]
- Uygulama örnekleri: Vaka bazlı örnek kullanım cümleleri çoğu terim için standartlaştırılmalı; yargı kararlarından seçilmiş cümleler ile bağlam zenginleştirilmeli.
- İdari yargılama: “Yürütmenin durdurulması” ve iptal/tazmin kombinasyonlarına ilişkin açıklayıcı vaka örnekleri, ilerleyen sürümlerde eklenmelidir.[^20]
- Terminolojik istikrar: Mevzuat değişiklikleri ve içtihat gelişmeleri periyodik güncelleme gerektirir; kaynak tarihleri ve revizyon notları ile sürümleme yapılmalıdır.[^3][^18]

## Sonuç ve Yol Haritası

Bu rapor, Türk hukuk terimlerinin İngilizce‑Amerikan sistemindeki en yakın, güvenilir ve doğrulanabilir karşılıklarını sistematik bir metodoloji ile sunmuş, yargı kolları ve mahkeme türleri, sivil ve usul hukuku alanlarında temel kavramları JSON şemasına bağlayarak kullanıma hazırlamıştır. Civil law–common law ayrımının semantik ve işlevsel sonuçları, çeviri ve terminoloji üretiminde bağlam duyarlılığının önemini göstermektedir.

Kısa vadede, iş hukuku ve şirket türleri modülleri resmi sözlükler ve TTK/TMK metinleri ile tamamlanmalı; JSON şemasında “notlar” alanı, Anglo‑Sakson muadilleri olmayan kurumlar için işlevsel açıklamalarla zenginleştirilmelidir. Orta vadede, kanun yolları ve delil rejimi örnekleri yargı kararları ile güçlendirilmeli; terminoloji veri tabanı sürümlenerek değişiklikler izlenmelidir. Uzun vadede, çapraz‑sistemli (Türk–ABD/İngiltere) vaka sözlüğü ve bağlamsal “glossary of institutions” üretilmesi, eşlemenin derinlemesine güvenilirliğini artıracaktır.

---

## Kaynaklar

[^1]: Türkiye'de yargı teşkilatı - Vikipedi. https://tr.wikipedia.org/wiki/T%C3%BCrkiye%27de_yarg%C4%B1_te%C5%9Fkilat%C4%B1
[^2]: Türkiye'de Yargı Kolları ve Yüksek Mahkemeler. https://cigdemtopac.av.tr/blog/detay/turkiye-de-yargi-kollari-ve-yuksek-mahkemeler/15
[^3]: T.C. Dışişleri Bakanlığı Tercüme Dairesi – Hukuk Terminolojisi (TR‑EN). https://www.mfa.gov.tr/data/Terminoloji/hukuk-terminoloji-110615.pdf
[^4]: 6102 Sayılı Türk Ticaret Kanunu (TTK) – Resmi Metin. http://www.mevzuat.gov.tr/MevzuatMetin/1.5.6102.pdf
[^5]: 4721 Sayılı Türk Medeni Kanunu (TMK) – Resmi Sayfa. https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4721&MevzuatTur=1&MevzuatTertip=5
[^6]: Kemal Gözler – Hukukun Temel Kavramları: Türkçe‑İngilizce Terimler. https://www.anayasa.gen.tr/htk-sozlukler.htm
[^7]: Ceza Usul Hukuku (Galatasaray Ü. PDF). https://dosya.gsu.edu.tr/Docs/HukukFakultesi/TR/cezausulhukuku.pdf
[^8]: Medeni Usul Hukuku (Onikilevha PDF). https://www.onikilevha.com.tr/images/books/9786051521480.pdf
[^9]: Türk Medeni Usul Hukuku’nun Yüz Yıllık Tarihi (DergiPark PDF). https://dergipark.org.tr/en/download/article-file/3547624
[^10]: Ticaret Bakanlığı – Ticaret Şirketleri ve Şirket Bilgileri. https://ticaret.gov.tr/ic-ticaret/sirketler/sirket-bilgiler
[^11]: TTK Kapsamındaki Şirket Türleri (Uşak Invest Rehberi). https://usakinvest.zafer.gov.tr/yatirimci-rehberi/usak-ta-Is-kurmak/ttk-kapsamindaki-sirket-turleri-ve-alternatif-yapilar
[^12]: Ceza Muhakemesi ve Fair Trial İlkesi (DergiPark PDF). https://dergipark.org.tr/tr/download/article-file/3150930
[^13]: Hukuk Sistemleri – Civil Law ve Common Law (Arman Hukuk). https://arman.av.tr/2018/11/21/hukuk-sistemleri/
[^14]: İş Hukuku – Temel Kavramlar (Ekin Hukuk). https://www.ekinhukuk.com.tr/is-hukuku/
[^15]: İş Hukuku (İstanbul Gedik Ü. PDF). https://www.gedik.edu.tr/wp-content/uploads/is-hukuku.pdf
[^16]: Türk Hukuk Lügatı (Türk Hukuk Kurumu). https://bozbel.files.wordpress.com/2013/01/tc3bcrk-hukuk-lc3bcgatc4b1.pdf
[^17]: Eşya Hukuku – Genel Bilgi (Ahmet Ekin). https://www.ahmetekin.av.tr/esya-hukuku/
[^18]: Adalet Bakanlığı – Hukuk Sözlüğü. https://sozluk.adalet.gov.tr/
[^19]: Türk Yargı Sistemindeki Mahkemelerin İngilizce Karşılıkları (Legistranslate). https://legistranslate.com/tr/5/turk-yargi-sistemindeki-mahkemelerin-ingilizce-hukuki-terminolojisindeki-karsiliklari.html
[^20]: Türk Yargı Örgütü ve Hukuk Yargısı (Ankara Ü. Açık Ders PDF). https://acikders.ankara.edu.tr/pluginfile.php/52227/mod_resource/content/2/2-Tu%CC%88rk%20Yarg%C4%B1%20O%CC%88rgu%CC%88tu%CC%88%20ve%20Hukuk%20Yarg%C4%B1s%C4%B1%20.pdf
[^21]: İngilizce Hukuk Terimleri (ÇAĞ Ü. PDF). https://www.cag.edu.tr/uploads/site/lecturer-files/aet-220-ingilizce-hukuk-terimleri-Z8Xk.pdf
[^24]: Yargı Nedir? (Hakkım Var!). https://hakkimvar.com/hv-akademi/f/yarg%C4%B1-nedir