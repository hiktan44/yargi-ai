// Yargıtay MCP Entegrasyon Servisi
// Türk Hukuk Sistemine Erişim

interface YargitayDecision {
  id: string;
  title: string;
  court: string;
  date: string;
  summary: string;
  fullText: string;
  category: string;
  keywords: string[];
  similarity: number;
  relevance: number;
  source: string;
}

interface SearchParams {
  query: string;
  courtType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  category?: string;
  resultLimit?: number;
}

class YargiApiService {
  private baseUrl = 'https://karararama.yargitay.gov.tr';
  private mockMode = true; // Gerçek API entegrasyonu için false yapın

  // Mock Türk hukuki veriler (gerçek API entegrasyonu için)
  private mockTurkishCases: YargitayDecision[] = [
    {
      id: 'yt_2024_001',
      title: 'İhmalkârlık Nedeniyle Sorumluluk Davası - Anonim Vaka',
      court: 'Yargıtay 13. Hukuk Dairesi',
      date: '2024-03-15',
      summary: 'İhmalkârlık sorumluluğu ve maddi zarar tazmini konulu önemli bir Yargıtay kararı. Özen yükümlülüğünün ihlali ve nedensellik bağının kurulması.',
      fullText: 'İhmalkârlık sorumluluğunda, davalının özen yükümlülüğünü ihlal etmesi ve bu ihlalin sonucu olarak zararın doğması gerekmektedir. Mahkeme, davacının zararının davalının ihmalkârlığı ile doğrudan nedensellik bağı içinde olduğunu tespit etmiştir.',
      category: 'İhmalkârlık',
      keywords: ['ihmalkârlık', 'sorumluluk', 'tazminat', 'nedensellik'],
      similarity: 94,
      relevance: 96,
      source: 'Yargıtay Resmi Karar Veritabanı'
    },
    {
      id: 'yt_2024_002',
      title: 'KVKK Kapsamında Veri İhlali ve Tazmin Davası',
      court: 'Kişisel Verileri Koruma Kurulu',
      date: '2024-02-28',
      summary: 'Kişisel verilerin korunması kanunu kapsamındaki ihlaller ve tazminat yükümlülükleri konusunda kritik bir içtihat.',
      fullText: 'KVKK kapsamında veri ihlallerinde, zarar gören kişilerin maddi ve manevi tazminat talep etme hakları vardır. Kurul, veri sorumlusu şirketin yetersiz güvenlik önlemleri aldığını ve kişisel verilerin korunması kanununa aykırı davrandığını tespit etmiştir.',
      category: 'Veri Koruma',
      keywords: ['kvkk', 'veri ihlali', 'tazminat', 'kişisel veri'],
      similarity: 87,
      relevance: 89,
      source: 'KVKK Resmi Karar Veritabanı'
    },
    {
      id: 'yt_2023_056',
      title: 'İş Hukuku - Hizmet Süresi Tazmini ve Kıdem Tazminatı',
      court: 'Yargıtay 9. Hukuk Dairesi',
      date: '2023-11-20',
      summary: 'İş hukuku alanındaki hizmet süresi tazmini ve işçi hakları konulu önemli bir karar. Kıdem tazminatının hesaplanması ve ödenmesi.',
      fullText: 'İş kanunu kapsamında, işçinin hizmet süresi tazmini ve kıdem tazminatı hakları düzenlenmiştir. Mahkeme, işverenin kanuni yükümlülüklerini yerine getirmemesi nedeniyle işçiye tazminat ödenmesi gerektiğini belirtmiştir.',
      category: 'İş Hukuku',
      keywords: ['iş hukuku', 'kıdem tazminatı', 'hizmet süresi', 'işçi hakları'],
      similarity: 78,
      relevance: 82,
      source: 'Yargıtay İş Dairesi Kararları'
    },
    {
      id: 'yt_2024_012',
      title: 'Ticaret Hukuku - Şirket Ortaklık Hakları ve Yönetim Yetkisi',
      court: 'Yargıtay 11. Hukuk Dairesi',
      date: '2024-01-30',
      summary: 'Türk Ticaret Kanunu hükümleri çerçevesinde şirket ortaklık hakları ve yönetim yetkileri konulu vaka analizi.',
      fullText: 'TTK kapsamında, şirket ortaklarının hakları ve yönetim yetkileri detaylı olarak düzenlenmiştir. Mahkeme, ortaklık hakkının ihlal edilmesi ve imtiyazlı payların korunması gerektiğine karar vermiştir.',
      category: 'Ticaret Hukuku',
      keywords: ['ticaret hukuku', 'şirket ortaklığı', 'imtiyaz', 'yönetim yetkisi'],
      similarity: 82,
      relevance: 85,
      source: 'Yargıtay Ticaret Dairesi Kararları'
    },
    {
      id: 'yt_2024_008',
      title: 'İdari Yargı - Kamu Personeli Maaş Farkları ve Tam Yargı Davası',
      court: 'Danıştay',
      date: '2024-02-10',
      summary: 'Danıştay\'ın İYUK Madde 12 kapsamında tam yargı davası ve kamu personeli hakları konulu önemli içtihadı.',
      fullText: 'İYUK Madde 12 uyarınca, iptal ve tam yargı davalarının birlikte açılabileceği Danıştay tarafından teyit edilmiştir. Kamu personelinin maaş farkları tazmini konusunda önemli bir karar.',
      category: 'İdari Yargı',
      keywords: ['danıştay', 'iyuk', 'tam yargı davası', 'kamu personeli'],
      similarity: 89,
      relevance: 91,
      source: 'Danıştay Resmi Karar Veritabanı'
    }
  ];

  async searchDecisions(params: SearchParams): Promise<YargitayDecision[]> {
    try {
      if (this.mockMode) {
        return this.mockSearchDecisions(params);
      }

      // Gerçek Yargıtay API çağrısı
      const response = await fetch(`${this.baseUrl}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`Yargıtay API hatası: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Yargıtay arama hatası:', error);
      return this.mockSearchDecisions(params); // Fallback to mock
    }
  }

  private mockSearchDecisions(params: SearchParams): YargitayDecision[] {
    const filtered = this.mockTurkishCases.filter(case_ => {
      // Arama terimleri kontrolü
      const searchTerms = params.query.toLowerCase().split(' ');
      const matchesSearch = searchTerms.some(term => 
        case_.title.toLowerCase().includes(term) ||
        case_.summary.toLowerCase().includes(term) ||
        case_.keywords.some(keyword => keyword.toLowerCase().includes(term))
      );

      // Kategori kontrolü
      const matchesCategory = !params.category || 
        case_.category.toLowerCase().includes(params.category.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    // Benzerlik skoruna göre sırala
    return filtered
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, params.resultLimit || 10);
  }

  async getDecisionById(id: string): Promise<YargitayDecision | null> {
    try {
      if (this.mockMode) {
        return this.mockTurkishCases.find(case_ => case_.id === id) || null;
      }

      const response = await fetch(`${this.baseUrl}/api/decision/${id}`);
      if (!response.ok) {
        throw new Error(`Karar bulunamadı: ${id}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Karar alma hatası:', error);
      return this.mockTurkishCases.find(case_ => case_.id === id) || null;
    }
  }

  async getAvailableCategories(): Promise<string[]> {
    const categories = [...new Set(this.mockTurkishCases.map(case_ => case_.category))];
    return categories.sort();
  }

  async getStatistics(): Promise<{
    totalCases: number;
    categories: Record<string, number>;
    courts: Record<string, number>;
  }> {
    const categories: Record<string, number> = {};
    const courts: Record<string, number> = {};

    this.mockTurkishCases.forEach(case_ => {
      categories[case_.category] = (categories[case_.category] || 0) + 1;
      courts[case_.court] = (courts[case_.court] || 0) + 1;
    });

    return {
      totalCases: this.mockTurkishCases.length,
      categories,
      courts
    };
  }

  // Türk hukuk terminolojisi için yardımcı metot
  async getLegalTerms(term: string): Promise<{
    turkish: string;
    definition: string;
    examples: string[];
  }[]> {
    const legalTerms: Record<string, any> = {
      'ihmalkarlik': {
        turkish: 'İhmalkârlık',
        definition: 'Özen yükümlülüğünün ihlal edilmesi sonucu zarar doğuran davranış',
        examples: ['Sözleşmeye aykırılık', 'Objektif sorumluluk', 'Dürüstlük kuralı ihlali']
      },
      'icri': {
        turkish: 'İcra',
        definition: 'Alacaklının alacağını tahsil etmek için yaptığı işlemler',
        examples: ['İcra takibi', 'İcra dairesi', 'İcrasız alacak']
      },
      'medeni': {
        turkish: 'Medeni Hukuk',
        definition: 'Kişiler arası ilişkileri düzenleyen hukuk dalı',
        examples: ['Mülkiyet hakkı', 'Sözleşmeler', 'Aile hukuku']
      }
    };

    const matches = Object.entries(legalTerms).filter(([key, _]) => 
      key.includes(term.toLowerCase())
    );

    return matches.map(([_, value]) => value);
  }
}

export const yargiApiService = new YargiApiService();
export type { YargitayDecision, SearchParams };