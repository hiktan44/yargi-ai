# Türkiye Mahkeme Kararları Araştırma Planı

## Araştırma Hedefi
Türkiye'deki önemli mahkeme kararlarını toplayarak, anonimleştirilmiş vaka örnekleri oluşturmak ve JSON formatında yapılandırmak.

## Araştırma Kapsamı
1. **Yargıtay** - Türkiye'nin en yüksek mahkemesi
2. **Danıştay** - İdari yargının en yüksek mahkemesi
3. **Anayasa Mahkemesi** - Anayasal denetim mahkemesi
4. **Bölge Mahkemeleri** - İkinci derece mahkemeler

## Araştırma Görevleri

### 1. Kaynak Belirleme ve Erişim
- [x] Resmi mahkeme web sitelerini tespit etme
- [x] Hukuki veri tabanlarına erişim sağlama
- [x] Güvenilir akademik ve profesyonel kaynakları belirleme

**Tespit Edilen Kaynaklar:**
- Yargıtay Karar Arama: https://karararama.yargitay.gov.tr/
- Anayasa Mahkemesi: https://www.anayasa.gov.tr/tr/kararlar-bilgi-bankasi/
- Danıştay: https://www.danistay.gov.tr/guncel-karar-arsiv
- Hukuki Veri Tabanları: Lexpera, Legalbank, KararTürk

### 2. Mahkeme Bazlı Araştırma
- [x] Yargıtay önemli kararlarını araştırma
- [x] Danıştay önemli kararlarını araştırma
- [x] Anayasa Mahkemesi önemli kararlarını araştırma
- [x] Bölge mahkemeleri önemli kararlarını araştırma

**Toplanan Veriler:**
- Danıştay İYUK Madde 12 kapsamında 4 farklı vaka
- Yargıtay aile hukuku alanında 40+ karar örneği
- Anayasa Mahkemesi adil yargılanma hakkı kategorisinde 60+ vaka
- Bölge Adliye Mahkemeleri istinaf süreci bilgileri

### 3. Vaka Seçimi ve Kategorizasyon
- [x] Dava türlerine göre kategorizasyon yapma
- [x] Önemli ve örnek niteliğindeki davaları seçme
- [x] Güncel ve tarihi önemi olan kararları belirleme

**Kategoriler:**
- İdari Yargı (Danıştay): İYUK Madde 12 kapsamında 4 vaka
- Anayasa Mahkemesi: Adil yargılanma hakkı 60+ vaka
- Yargıtay Aile Hukuku: 40+ karar örneği
- Ceza Hukuku: Çeşitli suç türlerinden örnekler
- İş Hukuku: İş mahkemesi kararları
- Vergi Hukuku: Vergi davaları ve uyuşmazlıkları
- Bölge Adliye Mahkemeleri: İstinaf süreçleri

### 4. Veri Toplama ve Anonimleştirme
- [x] Her vaka için gerekli bilgileri toplama
- [x] Kişisel bilgileri anonimleştirme
- [x] Hukuki detayları özetleme

**Veri Toplama Tamamlandı:**
- Toplam 25+ anonimleştirilmiş vaka örneği hazırlandı
- Tüm kategorilerde eşit dağılım sağlandı
- Her vaka için gerekli hukuki bilgiler sistematik olarak toplandı

### 5. JSON Yapılandırması ve Dosya Oluşturma
- [x] JSON şeması tasarlama
- [x] Veri dosyasını oluşturma
- [x] Son kontrolleri yapma

**JSON Dosyası Oluşturuldu:**
- Dosya yolu: /workspace/data/turkish_court_cases.json
- Toplam 25 anonimleştirilmiş vaka örneği
- 7 farklı kategoride dağılım
- Her vaka için kapsamlı hukuki detaylar
- Dava türü, ana konu, hukuki süreç, sonuç bilgileri dahil

## Beklenen Çıktı
- data/turkish_court_cases.json dosyası
- En az 20-30 farklı vaka örneği
- Çeşitli dava türlerinden örnekler
- Anonimleştirilmiş vaka detayları

## Başlangıç Tarihi
2025-11-04 08:02:30