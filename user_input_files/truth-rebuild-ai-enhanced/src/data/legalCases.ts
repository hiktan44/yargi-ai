import { LegalCase, LegalSource } from '../types';

// Türkiye'deki doğrulanmış hukuki kaynaklar
export const verifiedLegalSources: LegalSource[] = [
  {
    id: 'yargitay',
    name: 'Yargıtay (Türkiye Mahkeme Genel Kurulu)',
    url: 'https://www.yargitay.gov.tr/',
    description: 'Türkiye\'nin en yüksek mahkemesi - hukuk ve ceza davaları',
    accessType: 'government',
    coverage: ['Türkiye içtihadı', 'Cezai davalar', 'Hukuki davalar', 'Anayasa Mahkemesi kararları'],
    status: 'verified'
  },
  {
    id: 'danistay',
    name: 'Danıştay (Türkiye İdare Mahkemeleri)',
    url: 'https://www.danistay.gov.tr/',
    description: 'İdari yargı sistemi - kamu idareleri ve vergi davaları',
    accessType: 'government',
    coverage: ['İdari davalar', 'Vergi uyuşmazlıkları', 'Kamu personeli davaları'],
    status: 'verified'
  },
  {
    id: 'resmigazete',
    name: 'Resmi Gazete',
    url: 'https://www.resmigazete.gov.tr/',
    description: 'Türkiye Cumhuriyeti resmi kanun ve yönetmelik yayın organı',
    accessType: 'government',
    coverage: ['Kanunlar', 'Yönetmelikler', 'Cumhurbaşkanı kararları', 'Bakanlar Kurulu kararları'],
    status: 'verified'
  },
  {
    id: 'anayasamhk',
    name: 'Anayasa Mahkemesi',
    url: 'https://www.anayasa.gov.tr/',
    description: 'Anayasa Mahkemesi resmi kararlar ve içtihatları',
    accessType: 'government',
    coverage: ['Anayasa uygunluk denetimi', 'Bireysel başvuru kararları', 'Temel hak ve özgürlükler'],
    status: 'verified'
  },
  {
    id: 'hukukbireligi',
    name: 'Türkiye Barolar Birliği',
    url: 'https://www.barobirlik.org.tr/',
    description: 'Avukatlar ve hukuk profesyonelleri için kaynak merkezi',
    accessType: 'professional',
    coverage: ['Hukuk mesleği standartları', 'Mesleki duyurular', 'Yargı kararları özeti'],
    status: 'verified'
  }
];

// Türkiye hukuk sisteminden anonimleştirilmiş dava örnekleri
export const mockLegalCases: LegalCase[] = [
  {
    id: 'case_tr_001',
    title: 'İhmalkârlık Nedeniyle Maddi Zarar Tazmini Davası (Anonim Vaka Çalışması)',
    year: 2023,
    court: 'Asliye Hukuk Mahkemesi (Eğitim Örneği)',
    similarity: 94,
    keyFactors: ['İhmalkârlık sorumluluğu', 'Maddi zarar tazmini', 'Nedensellik bağı', 'Özen yükümlülüğü'],
    outcome: 'Davalının ihmalkârlık sorumluluğu tespit edildi',
    relevance: 96,
    summary: 'İhmalkârlık sorumluluğu ve maddi zarar tazmini konulu eğitim vaka çalışması. Detaylar mahremiyet koruması için anonimleştirilmiştir.',
    jurisdiction: 'Türkiye',
    caseType: 'ihmalkârlık',
    source: 'Kamuya açık eğitim materyalleri'
  },
  {
    id: 'case_tr_002',
    title: 'Kamu Personeli Maaş Farkları Tazmini Davası - Danıştay İçtihadı',
    year: 2024,
    court: 'Danıştay',
    similarity: 89,
    keyFactors: ['İYUK Madde 12', 'Tam yargı davası', 'İptal davası birlikte açma', 'Kamu personeli hakları'],
    outcome: 'İdare Mahkemesi kararının bozulması - tam yargı davasının esastan incelenmesi',
    relevance: 91,
    summary: 'İYUK Madde 12 uyarınca iptal ve tam yargı davalarının birlikte açılabileceği konusunda Danıştay içtihadı. Kamu personeli haklarının korunması.',
    jurisdiction: 'Türkiye',
    caseType: 'idari',
    source: 'Danıştay kararı - Kamuya açık'
  },
  {
    id: 'case_tr_003',
    title: 'KVKK Kapsamında Veri İhlali ve Tazmin Davası',
    year: 2023,
    court: 'Kişisel Verileri Koruma Kurulu',
    similarity: 87,
    keyFactors: ['KVKK ihlali', 'Kişisel veri koruma', 'Maddi ve manevi tazmin', 'Veri güvenliği'],
    outcome: 'Kurul kararı ile para cezası ve tazminat yükümlülüğü',
    relevance: 88,
    summary: 'Kişisel verilerin korunması kanunu kapsamındaki ihlaller ve tazminat yükümlülükleri konusunda önemli bir içtihat.',
    jurisdiction: 'Türkiye',
    caseType: 'veri_koruma',
    source: 'Kişisel Verileri Koruma Kurulu kararı'
  },
  {
    id: 'case_tr_004',
    title: 'İş Hukuku - Hizmet Süresi Tazmini Davası',
    year: 2024,
    court: 'İş Mahkemesi (Eğitim Örneği)',
    similarity: 76,
    keyFactors: ['Hizmet süresi tazmini', 'İş kanunu hükümleri', 'Kıdem tazminatı', 'İşçi hakları'],
    outcome: 'Kısmi tazminat kararı',
    relevance: 79,
    summary: 'İş hukuku alanındaki hizmet süresi tazmini ve işçi hakları konulu eğitim vaka çalışması.',
    jurisdiction: 'Türkiye',
    caseType: 'iş_hukuku',
    source: 'Eğitim simülasyonu - kamuya açık örneklerden'
  },
  {
    id: 'case_tr_005',
    title: 'Ticaret Hukuku - Şirket Ortaklık Anlaşmazlığı',
    year: 2023,
    court: 'Ticaret Mahkemesi (Eğitim Örneği)',
    similarity: 82,
    keyFactors: ['Şirket ortaklık hakları', 'TTK hükümleri', 'İmtiyazlı paylar', 'Ortaklar kurulu kararları'],
    outcome: 'Mahkemece ortaklık hakkının ihlal edildiği tespit edildi',
    relevance: 85,
    summary: 'Türk Ticaret Kanunu hükümleri çerçevesinde şirket ortaklık hakları ve yönetim yetkileri konulu vaka çalışması.',
    jurisdiction: 'Türkiye',
    caseType: 'ticaret',
    source: 'Kamuya açık eğitim materyalleri'
  }
];

// Türkçe arama örnekleri
export const searchExamples = [
  'İhmalkârlık davaları 2023 Türkiye',
  'KVKK veri ihlali tazminat',
  'Kamu personeli maaş farkları tazmini',
  'İş hukuku kıdem tazminatı',
  'Danıştay tam yargı davası',
  'Yargıtay ihmalkârlık sorumluluğu'
];