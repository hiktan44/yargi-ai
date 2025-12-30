// Türkçe Hukuki Asistan Logic
export function generateTurkishLegalResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Hukuki kurum soruları
  if (lowerMessage.includes('danıştay') || lowerMessage.includes('danistay')) {
    if (lowerMessage.includes('süre') || lowerMessage.includes('sure') || lowerMessage.includes('kaç') || lowerMessage.includes('zaman')) {
      return `Danıştay'a ilişkin süre bilgileri:

**İdari Dava Açma Süreleri:**
- Genel kural: İdari işlemin tebliğinden itibaren 60 gün
- Vergi davaları: Tebliğden itibaren 30 gün
- Tam yargı davaları: İşlemin öğrenilmesinden itibaren 1 yıl

**Danıştay Karar Süreleri:**
- Dava Daireleri: Ortalama 1-2 yıl
- İdari Dava Daireleri: 6-12 ay
- İçtihadı Birleştirme: Değişkenlik gösterir

Yargı AI sistemimizde Danıştay'ın 29,000'den fazla kararını inceleyebilirsiniz. Daha spesifik bilgi için Arama sekmesinden Danıştay kararlarını filtreleyebilirsiniz.`;
    }
    return `Danıştay, Türkiye'nin idari yargı sisteminin en üst merciidir.

**Görevleri:**
- İdari işlem ve eylemlerden kaynaklanan uyuşmazlıkları çözmek
- İlk derece mahkemesi olarak bazı davaları görmek
- İdari mahkeme kararlarına karşı istinaf ve temyiz başvurularını incelemek

**Danıştay Daireleri:**
- 15 Dava Dairesi (1-15)
- 3 İdari Dava Dairesi
- İçtihadı Birleştirme Kurulu

Yargı AI sistemimizde 29,000'den fazla Danıştay kararına ulaşabilirsiniz. Arama sekmesinden ilgili konuyu aratarak benzer içtihatlara erişebilirsiniz.`;
  }

  if (lowerMessage.includes('yargıtay') || lowerMessage.includes('yargitay')) {
    return `Yargıtay, Türkiye'nin adli yargı sisteminin en üst merciidir.

**Görevleri:**
- Adliye mahkemelerinden verilen kararları temyiz incelemesi yapmak
- Hukuk ve ceza davalarında son karar mercii olmak
- İçtihat birliği sağlamak

**Yargıtay Daireleri:**
- 23 Hukuk Dairesi
- 16 Ceza Dairesi
- Hukuk Genel Kurulu
- Ceza Genel Kurulu

**Temyiz Süreleri:**
- Hukuk davaları: 2 hafta
- Ceza davaları: 1 hafta (sanık), 15 gün (diğer taraflar)

Yargı AI sistemimizde binlerce Yargıtay kararına erişebilir, dava türünüze göre filtreleyebilirsiniz.`;
  }

  if (lowerMessage.includes('anayasa mahkemesi') || lowerMessage.includes('anayasa') || lowerMessage.includes('aym')) {
    return `Anayasa Mahkemesi, Türkiye'nin anayasal hakları koruyan en üst yargı organıdır.

**Görevleri:**
- Bireysel başvuruları incelemek (anayasal hakların ihlali)
- Kanunların anayasaya uygunluğunu denetlemek
- Norm denetimi yapmak

**Başvuru Süresi:**
- Bireysel başvuru: Hak ihlalinin öğrenilmesinden itibaren 30 gün
- Diğer kanun yolları tüketildikten sonra

Yargı AI sistemimizde 870'den fazla Anayasa Mahkemesi kararını inceleyebilir, özellikle tazminat davaları ile ilgili içtihatlara erişebilirsiniz.`;
  }

  // Dava türleri
  if (lowerMessage.includes('tazminat') || lowerMessage.includes('maddi') || lowerMessage.includes('manevi')) {
    return `Tazminat davaları hakkında bilgiler:

**Tazminat Türleri:**
1. **Maddi Tazminat**: Ekonomik kayıplar (tedavi, iş gücü kaybı, kazanç kaybı)
2. **Manevi Tazminat**: Acı, elem, üzüntü gibi manevi kayıplar

**Zamanaşımı Süreleri:**
- Genel kural: Zararın öğrenilmesinden itibaren 2 yıl
- Her halde zarara neden olan fiilin işlenmesinden itibaren 10 yıl
- İdari eylem ve işlemlerden kaynaklanan: 1 yıl

**Dava Açılacak Mahkeme:**
- Haksız fiil: Zararın meydana geldiği yer veya davalının yerleşim yeri
- İdari eylem: İdare mahkemeleri
- İş kazası: İşçinin yerleşim yeri

Yargı AI'da Arama sekmesinden "tazminat" araması yaparak 29,000'den fazla ilgili içtihata ulaşabilirsiniz.`;
  }

  if (lowerMessage.includes('iş hukuku') || lowerMessage.includes('işçi') || lowerMessage.includes('isci') || lowerMessage.includes('işveren')) {
    return `İş Hukuku ile ilgili bilgiler:

**Temel İlkeler:**
- İş güvencesi (30+ işçi çalıştıran işyerleri)
- Kıdem tazminatı hakkı
- İhbar tazminatı
- Yıllık izin hakkı
- Fazla mesai ücreti

**Dava Açma Süreleri:**
- İşe iade davası: Fesih bildiriminden itibaren 1 ay
- Alacak davaları: Alacağın muaccel olmasından itibaren 5 yıl
- İş kazası tazminatı: 10 yıl

**Görevli Mahkeme:**
- İş Mahkemeleri (işçi-işveren uyuşmazlıkları)

Yargı AI sisteminde iş hukuku ile ilgili Yargıtay kararlarını inceleyebilir, benzer davalardaki sonuçları görebilirsiniz.`;
  }

  if (lowerMessage.includes('boşanma') || lowerMessage.includes('bosanma') || lowerMessage.includes('nafaka') || lowerMessage.includes('velayet')) {
    return `Aile Hukuku konularında bilgiler:

**Boşanma Nedenleri:**
- Anlaşmalı boşanma (ortak talep)
- Evlilik birliğinin temelinden sarsılması
- Akıl hastalığı
- Zina, hayata kast, pek kötü muamele vb. özel nedenler

**Nafaka Türleri:**
- Tedbir nafakası (dava sürecinde)
- Yoksulluk nafakası (boşanma sonrası)
- İştirak nafakası (çocuk için)

**Velayet:**
- Ana kural: Çocuğun yararı gözetilir
- Küçük çocuklar genellikle anneye verilir
- Çocuğun görüşü dinlenir (12 yaş+)

**Mal Paylaşımı:**
- Edinilmiş mallara katılma rejimi (yasal)
- Mal rejimi sözleşmesi varsa ona göre

Detaylı analiz için Arama sekmesinden ilgili konuyu aratabilirsiniz.`;
  }

  if (lowerMessage.includes('tanık') || lowerMessage.includes('tanik') || lowerMessage.includes('delil') || lowerMessage.includes('ispat')) {
    return `Tanık ve Delil sistemi hakkında:

**Tanık Beyanı:**
- Tanık, gördüğü ve işittiği olguları anlatır
- Tanık beyanının değeri hakim takdirindedir
- Çelişkili beyanlar güvenilirliği azaltır
- Taraflarla yakınlık derecesi önemlidir

**Delil Türleri:**
1. Yazılı deliller (senet, fatura, belge)
2. Tanık beyanları
3. Bilirkişi raporu
4. Keşif
5. Yemin

**İspat Yükü:**
- İddia eden ispat eder
- Bazı durumlarda ispat yükü ters çevrilir (iş hukuku)

Yargı AI'ın Analiz sekmesinde tanık güvenilirliği analizi yapabilir, çelişkileri tespit edebilirsiniz.`;
  }

  if (lowerMessage.includes('miras') || lowerMessage.includes('vasiyet') || lowerMessage.includes('veraset')) {
    return `Miras Hukuku hakkında bilgiler:

**Yasal Mirasçılar:**
1. Zümre: Altsoyu (çocuklar, torunlar)
2. Zümre: Ana-baba ve onların altsoyu
3. Zümre: Büyükana-büyükbaba
- Eş her zümrede mirasçıdır

**Saklı Pay:**
- Çocuklar: Yasal payın 1/2'si
- Anne-baba: Yasal payın 1/4'ü
- Eş: Yasal payın tamamı (çocuk yoksa), 1/2'si (ana-baba ile)

**Vasiyetname:**
- El yazılı olmalı
- Tarih ve imza içermeli
- Noter huzurunda yapılabilir

**Mirasın Reddi:**
- Murisin ölümünden itibaren 3 ay
- Resmi ret beyanı gerekir

Miras davaları için Arama sekmesinden Yargıtay içtihatlarına ulaşabilirsiniz.`;
  }

  if (lowerMessage.includes('icra') || lowerMessage.includes('iflas') || lowerMessage.includes('borç') || lowerMessage.includes('borc') || lowerMessage.includes('haciz')) {
    return `İcra ve İflas Hukuku bilgileri:

**İcra Takip Türleri:**
1. İlamsız İcra (Genel Haciz)
   - 7 günlük ödeme emri
   - İtiraz süresi: 7 gün

2. İlamlı İcra
   - Mahkeme kararı, ilam gerekir
   - İtiraz hakkı sınırlı

3. Kambiyo Senetlerine Özgü İcra
   - Çek, senet, poliçe
   - İtiraz süresi: 5 gün

**Haciz İşlemleri:**
- Haczedilemez mallar: Temel ihtiyaç maddeleri, mesleki araçlar
- Maaşın 1/4'ü haczedilebilir

**İtiraz ve Şikayet:**
- İtiraz: 7 gün (genel), 5 gün (kambiyo)
- Şikayet: İcra işleminden itibaren 7 gün

İcra hukuku ile ilgili Yargıtay içtihatlarını sistemimizden inceleyebilirsiniz.`;
  }

  if (lowerMessage.includes('ceza') || lowerMessage.includes('suç') || lowerMessage.includes('suc') || lowerMessage.includes('hapis')) {
    return `Ceza Hukuku genel bilgiler:

**Temel İlkeler:**
- Suç ve ceza kanunla belirlenir
- Geriye yürümezlik (lehe olan hükümler hariç)
- Şahsilik ilkesi
- Masumiyet karinesi

**Ceza Türleri:**
- Hapis cezası
- Adli para cezası
- Güvenlik tedbirleri

**Zamanaşımı:**
- Müebbet hapis: 30 yıl
- 20+ yıl hapis: 25 yıl
- Diğer suçlar: Kanunda belirtilen süre

**Savunma Hakları:**
- Avukat tutma hakkı
- Susma hakkı
- İfade verme hakkı
- Delilleri inceleme hakkı

Ceza hukuku içtihatları için sistemimizden Yargıtay Ceza Daireleri kararlarını inceleyebilirsiniz.`;
  }

  if (lowerMessage.includes('nasıl kullan') || lowerMessage.includes('nasil kullan') || lowerMessage.includes('nasıl çalış') || lowerMessage.includes('nasil calis')) {
    return `Yargı AI Hukuk Asistanı Kullanım Rehberi:

**1. Arama Sekmesi:**
- 11 hukuki kurumdan arama yapın (Yargıtay, Danıştay, Anayasa Mahkemesi vb.)
- Kurum seçin ve arama yapın
- Benzerlik skorlarına göre sonuçları inceleyin
- Karar özetlerini okuyun
- Ses özelliği ile metinleri dinleyin

**2. Sohbet Sekmesi (Burası):**
- Hukuki sorularınızı sorun
- Dava analizi isteyin
- Hukuki kavramları öğrenin
- İçtihat örnekleri alın

**3. Analiz Sekmesi:**
- İçtihat analizi
- Tanık güvenilirlik değerlendirmesi
- Olay zaman çizelgesi
- Senaryo analizi

**Örnek Sorular:**
- "Danıştay'a dava açma süresi nedir?"
- "İş kazası tazminatı nasıl hesaplanır?"
- "Boşanma davası açmak için ne yapmam gerekir?"
- "Tanık beyanı ne kadar önemlidir?"

Her zaman profesyonel bir hukuk danışmanıyla görüşmeniz önerilir. Bu sistem sadece bilgi ve analiz sağlar.`;
  }

  if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('günaydın') || lowerMessage.includes('iyi günler')) {
    return `Merhaba! Yargı AI Hukuk Asistanı'na hoş geldiniz.

Size nasıl yardımcı olabilirim?

**Yapabileceklerim:**
- Hukuki sorularınızı yanıtlamak
- Dava analizi yapmak
- İçtihat örnekleri vermek
- Hukuki süreçler hakkında bilgi vermek
- Mahkeme ve kurum bilgileri sağlamak

**Örnek Sorular:**
- "Tazminat davası açmak için ne yapmam gerekir?"
- "Danıştay kararları nerede bulabilirim?"
- "İş hukuku hakları nelerdir?"
- "Tanık beyanı nasıl değerlendirilir?"

Lütfen sorunuzu sorun!`;
  }

  if (lowerMessage.includes('teşekkür') || lowerMessage.includes('tesekkur') || lowerMessage.includes('sağol') || lowerMessage.includes('sagol')) {
    return `Rica ederim! Başka sorularınız olursa her zaman buradayım.

Yargı AI olarak:
- 11 hukuki kurumdan veri topluyoruz
- 50,000+ karar içtihadımız var
- Yapay zeka destekli analiz sağlıyoruz
- Türkçe hukuki terminoloji kullanıyoruz

Daha fazla bilgi için:
- Arama sekmesinden detaylı içtihat araması yapabilirsiniz
- Analiz sekmesinden dava analizleri görebilirsiniz

İyi günler dilerim!`;
  }

  // Varsayılan yanıt
  return `Yargı AI Hukuk Asistanı olarak size yardımcı olmaya hazırım.

Sorduğunuz konu "${message.substring(0, 50)}..." hakkında daha spesifik bilgi verebilmem için:

**Seçenekler:**
1. Hangi mahkeme veya kurum hakkında bilgi istiyorsunuz?
   (Yargıtay, Danıştay, Anayasa Mahkemesi, vb.)

2. Hangi hukuk dalı ile ilgili?
   (İş hukuku, aile hukuku, ceza hukuku, idare hukuku, vb.)

3. Ne tür bir analiz istiyorsunuz?
   (Dava açma, süre bilgisi, içtihat, tanık analizi, vb.)

**Veya şu konularda soru sorabilirsiniz:**
- Mahkeme ve kurum bilgileri
- Dava açma süreleri
- İçtihat örnekleri
- Hukuki kavramlar
- Tanık ve delil değerlendirmesi

Lütfen sorunuzu daha detaylı açıklayın, size daha iyi yardımcı olabileyim.

**Not:** Bu sistem hukuki bilgi sağlar, resmi hukuki danışmanlık yerine geçmez. Önemli konularda mutlaka bir avukata danışın.`;
}
